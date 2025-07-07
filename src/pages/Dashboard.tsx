import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCardGrid from "@/components/dashboard/StatsCardGrid";
import TabContent from "@/components/dashboard/TabContent";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, BookOpen, GraduationCap, MessageCircle } from "lucide-react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const selectedSubject = searchParams.get("subject");
  const [activeTab, setActiveTab] = useState("overview");
  const { setIsSheetOpen, setSubjectName } = useAiTutor();
  const { t } = useLanguage();
  
  // Use our custom hook to get dashboard data
  const {
    studyStats,
    weeklyProgressData,
    quizPerformanceData,
    upcomingLessons,
    recentActivity
  } = useDashboardData(selectedSubject);

  // Update the AI tutor context with the current subject
  useEffect(() => {
    setSubjectName(studyStats.subjectName);
  }, [studyStats.subjectName, setSubjectName]);

  // Get translated subject name for display
  const getTranslatedSubjectName = () => {
    const subjectKeyMap: Record<string, string> = {
      'Finance': 'dashboard.subjects.finance',
      'Mathematics': 'dashboard.subjects.mathematics',
      'Science': 'dashboard.subjects.science',
      'English': 'dashboard.subjects.english',
      'History': 'dashboard.subjects.history',
      'Geography': 'dashboard.subjects.geography',
      'Art': 'dashboard.subjects.art',
      'Physical Education': 'dashboard.subjects.physicalEducation',
      'Algebra': 'dashboard.subjects.algebra',
      'Geometry': 'dashboard.subjects.geometry',
      'Calculus': 'dashboard.subjects.calculus',
      'Biology': 'dashboard.subjects.biology',
      'Chemistry': 'dashboard.subjects.chemistry',
      'Physics': 'dashboard.subjects.physics',
      'English Literature': 'dashboard.subjects.englishLiterature',
      'World History': 'dashboard.subjects.worldHistory',
      'Computer Science': 'dashboard.subjects.computerScience',
      'Philosophy': 'dashboard.subjects.philosophy',
      'Music Theory': 'dashboard.subjects.musicTheory',
      'Drawing & Illustration': 'dashboard.subjects.drawingIllustration',
    };
    
    return subjectKeyMap[studyStats.subjectName] || studyStats.subjectName;
  };

  const translatedSubjectName = getTranslatedSubjectName();
  const subjectKey = translatedSubjectName.startsWith('dashboard.subjects.') ? translatedSubjectName : undefined;
  const displaySubjectName = subjectKey ? t(subjectKey) : studyStats.subjectName;

  // Function to open AI Tutor
  const openAiTutor = () => {
    setIsSheetOpen(true);
  };

  return (
    <MainLayout containerClassName="" bgColor="bg-gray-50 pb-12">
      {/* Header Section */}
      <DashboardHeader 
        selectedSubject={selectedSubject} 
        subjectName={displaySubjectName}
        subjectKey={subjectKey}
      />
      
      <div className="container mx-auto px-6 max-w-6xl pt-8">
        {/* AI Tutor Hero Section */}
        <div className="mb-8">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-br from-tutor-primary to-tutor-secondary p-8 text-white">
              <div className="flex flex-col-reverse md:flex-row gap-6 items-center">
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                    <Bot size={16} />
                    <span>{t('common.yourPersonalAiTutor')}</span>
                  </div>
                  <h2 className="text-3xl font-bold">{t('dashboard.needHelp').replace('{{subject}}', displaySubjectName)}</h2>
                  <p className="text-lg opacity-90">
                    {t('dashboard.aiTutorDescription')}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button 
                      onClick={openAiTutor}
                      size="lg"
                      className="bg-white text-tutor-primary hover:bg-white/90"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t('dashboard.askAiTutor')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-transparent border-white text-white hover:bg-white/10"
                      onClick={() => window.open("/subjects", "_self")}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      {t('dashboard.browseLessons')}
                    </Button>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center">
                  <div className="relative">
                    <GraduationCap size={180} className="text-white opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-white/30 to-white/5 flex items-center justify-center">
                      <div className="w-[200px] h-[200px] rounded-full border-4 border-white/30 bg-gradient-to-br from-tutor-primary/80 to-tutor-secondary/80 flex items-center justify-center">
                        <Bot size={80} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tutor-light flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-tutor-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('dashboard.askAnyQuestion')}</h3>
                    <p className="text-sm text-muted-foreground">{t('dashboard.askAnyQuestionDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tutor-light flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-tutor-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('dashboard.personalizedLearning')}</h3>
                    <p className="text-sm text-muted-foreground">{t('dashboard.personalizedLearningDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tutor-light flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-tutor-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t('dashboard.practiceReview')}</h3>
                    <p className="text-sm text-muted-foreground">{t('dashboard.practiceReviewDesc')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Cards */}
        <StatsCardGrid 
          studyStats={studyStats} 
          selectedSubject={selectedSubject} 
        />
        
        {/* Main Content Tabs */}
        <TabContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          weeklyProgressData={weeklyProgressData}
          quizPerformanceData={quizPerformanceData}
          upcomingLessons={upcomingLessons}
          recentActivity={recentActivity}
          studyStats={studyStats}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
