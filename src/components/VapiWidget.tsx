import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { useLanguage } from '@/contexts/LanguageContext';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  fullScreenLayout?: boolean;
}

interface EvaluationData {
  analysis: {
    detailed_feedback: {
      business_judgment: {
        feedback: string;
        improvements: string;
        score: number;
        strengths: string;
      };
      communication_clarity: {
        feedback: string;
        improvements: string;
        score: number;
        strengths: string;
      };
      creativity: {
        feedback: string;
        improvements: string;
        score: number;
        strengths: string;
      };
      problem_structuring: {
        feedback: string;
        improvements: string;
        score: number;
        strengths: string;
      };
      quantitative_analysis: {
        feedback: string;
        improvements: string;
        score: number;
        strengths: string;
      };
    };
    overall_score: number;
    summary: string;
  };
  success: boolean;
  transcript_length: number;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ 
  apiKey, 
  assistantId, 
  config = {},
  fullScreenLayout = false
}) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);
  const [callId, setCallId] = useState<string | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluationData, setEvaluationData] = useState<EvaluationData | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const { t } = useLanguage();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1.0);

  // PDF Controls
  const minZoom = 0.5;
  const maxZoom = 2.5;
  const zoomStep = 0.1;
  const pageWidth = fullScreenLayout ? 500 * zoom : 650 * zoom;

  const handleZoomIn = () => setZoom(z => Math.min(maxZoom, +(z + zoomStep).toFixed(2)));
  const handleZoomOut = () => setZoom(z => Math.max(minZoom, +(z - zoomStep).toFixed(2)));
  const handleZoomReset = () => setZoom(1.0);
  const goToFirstPage = () => setPageNumber(1);
  const goToLastPage = () => numPages && setPageNumber(numPages);
  const goToPrevPage = () => setPageNumber(p => Math.max(1, p - 1));
  const goToNextPage = () => numPages && setPageNumber(p => Math.min(numPages, p + 1));

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        setIsInitializing(true);
        setError(null);
        
        if (!apiKey) {
          throw new Error('API key is required');
        }
        
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        vapiInstance.on('call-start', () => {
          console.log('Call started');
          setIsConnected(true);
          try {
            const currentCallId = (vapiInstance as any).callId || (vapiInstance as any).call?.id;
            console.log('Current call ID from instance:', currentCallId);
            setCallId(currentCallId);
          } catch (err) {
            console.error('Error getting call ID:', err);
          }
        });

        vapiInstance.on('call-end', () => {
          console.log('Call ended');
          setIsConnected(false);
          setIsSpeaking(false);
          setShowEvaluation(true);
        });

        vapiInstance.on('speech-start', () => {
          console.log('Assistant started speaking');
          setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
          console.log('Assistant stopped speaking');
          setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
          try {
            if (message.type === 'transcript') {
              setTranscript(prev => {
                const existingIndex = prev.findIndex(msg => msg.role === message.role);
                
                if (existingIndex !== -1) {
                  const updated = [...prev];
                  updated[existingIndex] = {
                    role: message.role,
                    text: message.transcript
                  };
                  return updated;
                } else {
                  return [...prev, {
                    role: message.role,
                    text: message.transcript
                  }];
                }
              });
            }
          } catch (err) {
            console.error('Error processing message:', err);
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
          setError(`Vapi error: ${error.message || 'Unknown error'}`);
        });

        setIsInitializing(false);
      } catch (err) {
        console.error('Error initializing Vapi:', err);
        setError(`Failed to initialize Vapi: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsInitializing(false);
      }
    };

    initializeVapi();

    return () => {
      try {
        if (vapi) {
          vapi.stop();
        }
      } catch (err) {
        console.error('Error cleaning up Vapi:', err);
      }
    };
  }, [apiKey]);

  const startCall = async () => {
    if (!vapi) {
      setError('Vapi is not initialized');
      return;
    }

    try {
      setError(null);
      const result = await vapi.start(assistantId);
      console.log('Start result:', result);
      if (result && typeof result === 'object' && result.id) {
        setCallId(result.id);
        console.log('Call ID from start result:', result.id);
        (vapi as any).lastStartResult = result;
      }
    } catch (error) {
      console.error('Error starting call:', error);
      setError(`Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const endCall = () => {
    try {
      if (vapi) {
        vapi.stop();
      }
    } catch (error) {
      console.error('Error ending call:', error);
      setError(`Failed to end call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getEvaluation = async () => {
    let currentCallId = callId;
    
    if (!currentCallId && vapi) {
      try {
        currentCallId = (vapi as any).callId || (vapi as any).call?.id;
      } catch (err) {
        console.error('Error getting call ID from vapi instance:', err);
      }
    }
    
    if (!currentCallId && vapi) {
      try {
        currentCallId = (vapi as any).lastStartResult?.id;
      } catch (e) {
        console.log('Could not get call ID from last start result');
      }
    }
    
    console.log('getEvaluation called, callId:', currentCallId);
    if (!currentCallId) {
      console.error('No callId available');
      setError('No call ID found. Please try starting a new call.');
      return;
    }
    
    setIsLoadingEvaluation(true);
    setError(null);
    
    try {
      const apiUrl = `https://case-study-evaluator-api-production.up.railway.app/analyze-call/${currentCallId}`;
      console.log('Making API request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      setEvaluationData(data);
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      setError(`Error fetching evaluation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return '#10B981';
    if (score >= 3) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreText = (score: number) => {
    if (score >= 4) return t('vapi.excellent');
    if (score >= 3) return t('vapi.good');
    if (score >= 2) return t('vapi.fair');
    return t('vapi.needsImprovement');
  };

  const renderEvaluationCard = () => {
    if (!evaluationData) return null;

    const { analysis } = evaluationData;
    const categories = [
      { key: 'business_judgment', label: t('vapi.businessJudgment'), icon: '💼' },
      { key: 'communication_clarity', label: t('vapi.communicationClarity'), icon: '💬' },
      { key: 'creativity', label: t('vapi.creativity'), icon: '🎨' },
      { key: 'problem_structuring', label: t('vapi.problemStructuring'), icon: '🧩' },
      { key: 'quantitative_analysis', label: t('vapi.quantitativeAnalysis'), icon: '📊' },
    ];

    return (
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        width: '100%',
        height: '100%',
        maxWidth: '95vw',
        maxHeight: '95vh',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '1px solid #e1e5e9',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          borderBottom: '1px solid #e1e5e9',
          background: '#fff',
          flexShrink: 0
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            color: '#333', 
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: 'bold'
          }}>
            {t('vapi.caseStudyEvaluationReport')}
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 'bold',
              color: getScoreColor(analysis.overall_score)
            }}>
              {analysis.overall_score}/5
            </div>
            <div style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: getScoreColor(analysis.overall_score) + '20',
              color: getScoreColor(analysis.overall_score),
              fontWeight: 'bold',
              fontSize: 'clamp(12px, 2.5vw, 14px)'
            }}>
              {getScoreText(analysis.overall_score)}
            </div>
          </div>
          <p style={{ 
            margin: 0, 
            color: '#666', 
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            lineHeight: '1.4'
          }}>
            {analysis.summary}
          </p>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          minHeight: 0
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: '#333', 
              fontSize: 'clamp(16px, 3.5vw, 18px)',
              fontWeight: 'bold'
            }}>
              {t('vapi.detailedFeedback')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categories.map(({ key, label, icon }) => {
                const category = analysis.detailed_feedback[key as keyof typeof analysis.detailed_feedback];
                return (
                  <div key={key} style={{
                    border: '1px solid #e1e5e9',
                    borderRadius: '8px',
                    padding: '16px',
                    background: '#f8f9fa'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{icon}</span>
                        <span style={{ 
                          fontWeight: 'bold', 
                          color: '#333',
                          fontSize: 'clamp(14px, 3vw, 16px)'
                        }}>
                          {label}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          fontSize: 'clamp(16px, 3.5vw, 18px)',
                          fontWeight: 'bold',
                          color: getScoreColor(category.score)
                        }}>
                          {category.score}/5
                        </span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          background: getScoreColor(category.score) + '20',
                          color: getScoreColor(category.score),
                          fontSize: 'clamp(10px, 2vw, 12px)',
                          fontWeight: 'bold'
                        }}>
                          {getScoreText(category.score)}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <strong style={{ 
                        color: '#333',
                        fontSize: 'clamp(12px, 2.5vw, 14px)'
                      }}>
                        {t('vapi.feedback')}
                      </strong>
                      <p style={{ 
                        margin: '4px 0 0 0', 
                        color: '#666', 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        lineHeight: '1.4'
                      }}>
                        {category.feedback}
                      </p>
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <strong style={{ 
                        color: '#333',
                        fontSize: 'clamp(12px, 2.5vw, 14px)'
                      }}>
                        {t('vapi.strengths')}
                      </strong>
                      <p style={{ 
                        margin: '4px 0 0 0', 
                        color: '#666', 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        lineHeight: '1.4'
                      }}>
                        {category.strengths}
                      </p>
                    </div>
                    
                    <div>
                      <strong style={{ 
                        color: '#333',
                        fontSize: 'clamp(12px, 2.5vw, 14px)'
                      }}>
                        {t('vapi.areasForImprovement')}
                      </strong>
                      <p style={{ 
                        margin: '4px 0 0 0', 
                        color: '#666', 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        lineHeight: '1.4'
                      }}>
                        {category.improvements}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e1e5e9',
          background: '#fff',
          flexShrink: 0,
          textAlign: 'center'
        }}>
          <button
            onClick={() => {
              setShowEvaluation(false);
              setEvaluationData(null);
              setTranscript([]);
              setError(null);
            }}
            style={{
              background: '#6B7280',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#4B5563';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#6B7280';
            }}
          >
            {t('vapi.startNewCaseStudy')}
          </button>
        </div>
      </div>
    );
  };

  // PDF event handlers
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e1e5e9',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #12A594',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ margin: 0, color: '#666' }}>
            {t('vapi.initializingVoiceAssistant')}
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e1e5e9',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            ⚠️
          </div>
          <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
            {t('vapi.somethingWentWrong')}
          </h3>
          <p style={{ 
            margin: '0 0 24px 0', 
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            {error}
          </p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            style={{
              background: '#12A594',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#0F9488';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#12A594';
            }}
          >
            {t('vapi.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (fullScreenLayout) {
    // Full screen, two-column layout: PDF left, call interface right
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', minHeight: 0, minWidth: 0 }}>
        {/* Left: PDF Viewer */}
        <div style={{ flex: 1.2, minWidth: 0, minHeight: 0, borderRight: '1px solid #e1e5e9', background: '#f9f9f9', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '24px 24px 0 24px', borderBottom: '1px solid #e1e5e9', background: '#fff', flexShrink: 0 }}>
            <h3 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>Case Study PDF</h3>
            {/* PDF Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <button onClick={goToFirstPage} disabled={pageNumber <= 1} style={{ padding: '4px 10px', marginRight: 2 }}>⏮️</button>
              <button onClick={goToPrevPage} disabled={pageNumber <= 1} style={{ padding: '4px 10px', marginRight: 8 }}>◀️</button>
              <span>Page {pageNumber} of {numPages || '-'}</span>
              <button onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages} style={{ padding: '4px 10px', marginLeft: 8 }}>▶️</button>
              <button onClick={goToLastPage} disabled={!numPages || pageNumber >= numPages} style={{ padding: '4px 10px', marginLeft: 2 }}>⏭️</button>
              <span style={{ marginLeft: 16, marginRight: 8 }}>|</span>
              <button onClick={handleZoomOut} disabled={zoom <= minZoom} style={{ padding: '4px 10px' }}>➖</button>
              <span style={{ minWidth: 48, textAlign: 'center' }}>{(zoom * 100).toFixed(0)}%</span>
              <button onClick={handleZoomIn} disabled={zoom >= maxZoom} style={{ padding: '4px 10px' }}>➕</button>
              <button onClick={handleZoomReset} disabled={zoom === 1.0} style={{ padding: '4px 10px', marginLeft: 8 }}>Reset</button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 24, minHeight: 0 }}>
            <Document
              file="/strategy-case-nestle.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div style={{ padding: 24, textAlign: 'center' }}>Loading PDF...</div>}
              error={<div style={{ padding: 24, color: 'red', textAlign: 'center' }}>Failed to load PDF.</div>}
            >
              {numPages && (
                <Page
                  key={`page_${pageNumber}`}
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              )}
            </Document>
          </div>
        </div>
        {/* Right: Call Interface */}
        <div style={{ flex: 1.5, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 32, background: '#f5f7fa' }}>
          <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {!isConnected && !showEvaluation ? (
              <button
                onClick={startCall}
                style={{
                  background: '#12A594',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
                }}
              >
                {t('vapi.startPracticeCaseStudy')}
              </button>
            ) : isConnected ? (
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '24px',
                width: '100%',
                maxWidth: '600px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: isSpeaking ? '#ff4444' : '#12A594',
                      animation: isSpeaking ? 'pulse 1s infinite' : 'none'
                    }}></div>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>
                      {isSpeaking ? t('vapi.assistantSpeaking') : t('vapi.listening')}
                    </span>
                  </div>
                  <button
                    onClick={endCall}
                    style={{
                      background: '#ff4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    {t('vapi.endCall')}
                  </button>
                </div>
                {/* Voice Wave Animation */}
                {isSpeaking && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '20px',
                    padding: '24px',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '4px',
                          height: '20px',
                          background: '#12A594',
                          borderRadius: '2px',
                          animation: `wave 1s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                )}
                {/* Transcript */}
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginBottom: '16px',
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  {transcript.length === 0 ? (
                    <p style={{ color: '#666', fontSize: '14px', margin: 0, textAlign: 'center' }}>
                      {t('vapi.conversationWillAppear')}
                    </p>
                  ) : (
                    transcript.map((msg, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: '8px',
                          textAlign: msg.role === 'user' ? 'right' : 'left'
                        }}
                      >
                        <span style={{
                          background: msg.role === 'user' ? '#12A594' : '#333',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          display: 'inline-block',
                          fontSize: '14px',
                          maxWidth: '80%'
                        }}>
                          {msg.text}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : showEvaluation && !evaluationData ? (
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '32px',
                width: '100%',
                maxWidth: '500px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e1e5e9',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
                  {t('vapi.caseStudyCompleted')}
                </h3>
                <p style={{ margin: '0 0 24px 0', color: '#666' }}>
                  {t('vapi.getEvaluationDesc')}
                </p>
                <button
                  onClick={getEvaluation}
                  disabled={isLoadingEvaluation}
                  style={{
                    background: isLoadingEvaluation ? '#9CA3AF' : '#12A594',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isLoadingEvaluation ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLoadingEvaluation ? t('vapi.analyzing') : t('vapi.getEvaluationReport')}
                </button>
              </div>
            ) : (
              renderEvaluationCard()
            )}
            <style>{`
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
              @keyframes wave {
                0%, 40%, 100% {
                  transform: scaleY(0.4);
                }
                20% {
                  transform: scaleY(1);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  // Default: single column layout
  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
      {/* PDF Viewer Section */}
      <div style={{ marginBottom: 32, background: '#f9f9f9', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontWeight: 600, fontSize: 18 }}>Case Study PDF</h3>
        {/* PDF Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
          <button onClick={goToFirstPage} disabled={pageNumber <= 1} style={{ padding: '4px 10px', marginRight: 2 }}>⏮️</button>
          <button onClick={goToPrevPage} disabled={pageNumber <= 1} style={{ padding: '4px 10px', marginRight: 8 }}>◀️</button>
          <span>Page {pageNumber} of {numPages || '-'}</span>
          <button onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages} style={{ padding: '4px 10px', marginLeft: 8 }}>▶️</button>
          <button onClick={goToLastPage} disabled={!numPages || pageNumber >= numPages} style={{ padding: '4px 10px', marginLeft: 2 }}>⏭️</button>
          <span style={{ marginLeft: 16, marginRight: 8 }}>|</span>
          <button onClick={handleZoomOut} disabled={zoom <= minZoom} style={{ padding: '4px 10px' }}>➖</button>
          <span style={{ minWidth: 48, textAlign: 'center' }}>{(zoom * 100).toFixed(0)}%</span>
          <button onClick={handleZoomIn} disabled={zoom >= maxZoom} style={{ padding: '4px 10px' }}>➕</button>
          <button onClick={handleZoomReset} disabled={zoom === 1.0} style={{ padding: '4px 10px', marginLeft: 8 }}>Reset</button>
        </div>
        <div style={{ width: '100%', minHeight: 400, maxHeight: 600, overflow: 'auto', border: '1px solid #e1e5e9', borderRadius: 6, background: '#fff' }}>
          <Document
            file="/strategy-case-nestle.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div style={{ padding: 24, textAlign: 'center' }}>Loading PDF...</div>}
            error={<div style={{ padding: 24, color: 'red', textAlign: 'center' }}>Failed to load PDF.</div>}
          >
            {numPages && (
              <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            )}
          </Document>
        </div>
      </div>
      {/* Divider for separation */}
      <div style={{ height: 1, background: '#e1e5e9', margin: '0 0 32px 0' }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Arial, sans-serif'
      }}>
        {!isConnected && !showEvaluation ? (
          <button
            onClick={startCall}
            style={{
              background: '#12A594',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
            }}
          >
            {t('vapi.startPracticeCaseStudy')}
          </button>
        ) : isConnected ? (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e1e5e9'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: isSpeaking ? '#ff4444' : '#12A594',
                  animation: isSpeaking ? 'pulse 1s infinite' : 'none'
                }}></div>
                <span style={{ fontWeight: 'bold', color: '#333' }}>
                  {isSpeaking ? t('vapi.assistantSpeaking') : t('vapi.listening')}
                </span>
              </div>
              <button
                onClick={endCall}
                style={{
                  background: '#ff4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {t('vapi.endCall')}
              </button>
            </div>
            
            {/* Voice Wave Animation */}
            {isSpeaking && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '20px',
                padding: '24px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '4px',
                      height: '20px',
                      background: '#12A594',
                      borderRadius: '2px',
                      animation: `wave 1s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Transcript */}
            <div style={{
              maxHeight: '300px',
              overflowY: 'auto',
              marginBottom: '16px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              {transcript.length === 0 ? (
                <p style={{ color: '#666', fontSize: '14px', margin: 0, textAlign: 'center' }}>
                  {t('vapi.conversationWillAppear')}
                </p>
              ) : (
                transcript.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: '8px',
                      textAlign: msg.role === 'user' ? 'right' : 'left'
                    }}
                  >
                    <span style={{
                      background: msg.role === 'user' ? '#12A594' : '#333',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      display: 'inline-block',
                      fontSize: '14px',
                      maxWidth: '80%'
                    }}>
                      {msg.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : showEvaluation && !evaluationData ? (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e1e5e9',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
              {t('vapi.caseStudyCompleted')}
            </h3>
            <p style={{ margin: '0 0 24px 0', color: '#666' }}>
              {t('vapi.getEvaluationDesc')}
            </p>
            <button
              onClick={getEvaluation}
              disabled={isLoadingEvaluation}
              style={{
                background: isLoadingEvaluation ? '#9CA3AF' : '#12A594',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isLoadingEvaluation ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoadingEvaluation ? t('vapi.analyzing') : t('vapi.getEvaluationReport')}
            </button>
          </div>
        ) : (
          renderEvaluationCard()
        )}
        
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @keyframes wave {
            0%, 40%, 100% {
              transform: scaleY(0.4);
            }
            20% {
              transform: scaleY(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VapiWidget; 
