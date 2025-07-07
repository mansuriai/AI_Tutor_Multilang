import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatMessage, Source } from "@/types/chat";

interface ApiResponse {
  response: string;
  chat_history: Array<{
    role: string;
    content: string;
  }>;
  sources?: Source[];
}

export function useAiTutorChat(subjectName: string) {
  const { t } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: t('aiTutor.welcomeMessage').replace('{{subject}}', subjectName) || `Hi there! I'm your AI tutor for ${subjectName}. How can I help you today?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string; content: string}>>([]);

  // Reset messages when subjectName changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: t('aiTutor.welcomeMessage').replace('{{subject}}', subjectName) || `Hi there! I'm your AI tutor for ${subjectName}. How can I help you today?`
      }
    ]);
    setChatHistory([]);
  }, [subjectName, t]);

  const sendMessage = async (content: string) => {
    // Add user message to the chat
    const userMessage: ChatMessage = { role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://ai-tutor-production-847a.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          chat_history: chatHistory,
          context_window: 5,
          max_history: 10,
          include_sources: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Add AI response to the chat with sources
      const assistantMessage: ChatMessage = { 
        role: "assistant", 
        content: data.response,
        sources: data.sources || []
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update chat history for future requests
      setChatHistory(data.chat_history || []);
      
    } catch (error) {
      console.error('AI Tutor API Error:', error);
      toast.error("Failed to get a response from the AI tutor. Please try again.");
      
      // Remove the user message that failed to get a response
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: t('aiTutor.welcomeMessage').replace('{{subject}}', subjectName) || `Hi there! I'm your AI tutor for ${subjectName}. How can I help you today?`
      }
    ]);
    setChatHistory([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearConversation
  };
}
