import { useNavigate } from "react-router-dom";
import ProgressChart from "@/components/ProgressChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface OverviewTabProps {
  weeklyProgressData: any[];
  quizPerformanceData: any[];
  upcomingLessons: {
    titleKey: string;
    subject: string;
    dateKey: string;
    dateParams?: any;
  }[];
  recentActivity: {
    user: string;
    actionKey: string;
    actionParams?: any;
    timeKey: string;
    timeParams?: any;
  }[];
  studyStats: {
    subjectName: string;
    lessonsCompleted: number;
    quizzesTaken: number;
    averageScore: number;
    studyTime: number;
    streak: number;
  };
}

const OverviewTab = ({
  weeklyProgressData,
  quizPerformanceData,
  upcomingLessons,
  recentActivity,
  studyStats
}: OverviewTabProps) => {
  const { setIsOpen } = useAiTutor();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Helper function to translate quiz data
  const translateQuizData = (quizData: any[]) => {
    return quizData.map((quiz, index) => {
      const title = t(quiz.nameParams.title);
      const name = t(quiz.nameKey).replace('{{num}}', quiz.nameParams.num).replace('{{title}}', title);
      
      // Debug logging for the 3rd quiz
      if (index === 2) {
        console.log('3rd Quiz Debug:', {
          original: quiz,
          titleKey: quiz.nameParams.title,
          translatedTitle: title,
          nameKey: quiz.nameKey,
          translatedName: name,
          finalName: name
        });
      }
      
      return {
        ...quiz,
        name
      };
    });
  };

  // Helper function to translate time strings
  const translateTime = (timeKey: string, timeParams?: any) => {
    if (!timeParams) return t(timeKey);
    
    let timeString = t(timeKey);
    if (timeParams.count) {
      timeString = timeString.replace('{{count}}', timeParams.count.toString());
    }
    return timeString;
  };

  // Helper function to translate action strings
  const translateAction = (actionKey: string, actionParams?: any) => {
    if (!actionParams) return t(actionKey);
    
    let actionString = t(actionKey);
    if (actionParams.topic) {
      const topic = t(actionParams.topic);
      actionString = actionString.replace('{{topic}}', topic);
    }
    return actionString;
  };

  // Helper function to translate date strings
  const translateDate = (dateKey: string, dateParams?: any) => {
    if (!dateParams) return t(dateKey);
    
    let dateString = t(dateKey);
    if (dateParams.time) {
      dateString = dateString.replace('{{time}}', dateParams.time);
    }
    if (dateParams.date) {
      dateString = dateString.replace('{{date}}', dateParams.date);
    }
    return dateString;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Weekly Progress Chart */}
        <ProgressChart 
          data={weeklyProgressData} 
          title={t('dashboard.weeklyProgress')}
          description={t('dashboard.weeklyProgressDesc')}
        />
        
        {/* Quiz Performance */}
        <ProgressChart 
          data={(() => {
            const translatedData = translateQuizData(quizPerformanceData);
            console.log('Final Quiz Data for Chart:', translatedData);
            return translatedData;
          })()} 
          title={t('dashboard.recentQuizPerformance')}
          description={t('dashboard.recentQuizPerformanceDesc')}
        />
        
        {/* Current Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('dashboard.currentProgress')}</CardTitle>
            <CardDescription>
              {t('dashboard.currentProgressDesc')
                .replace('{{completed}}', studyStats.lessonsCompleted.toString())
                .replace('{{total}}', '40')
                .replace('{{subject}}', studyStats.subjectName)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.courseProgress')}</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.estimatedCompletion')}</span>
                <span className="font-medium">Oct 25, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.dailyLearningStreak')}</span>
                <span className="font-medium">{studyStats.streak} {t('dashboard.days')} 🔥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {/* Upcoming Lessons */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('dashboard.upcomingLessons')}</CardTitle>
            <CardDescription>{t('dashboard.upcomingLessonsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t(lesson.titleKey)}</p>
                    <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {translateDate(lesson.dateKey, lesson.dateParams)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ChevronRight size={18} />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => navigate("/lessons")}
            >
              {t('dashboard.viewAllLessons')}
            </Button>
          </CardContent>
        </Card>
        
        {/* Recent Community Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('dashboard.communityActivity')}</CardTitle>
            <CardDescription>{t('dashboard.communityActivityDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-tutor-primary/20 flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-tutor-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {
                        translateAction(activity.actionKey, activity.actionParams)
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {translateTime(activity.timeKey, activity.timeParams)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => navigate("/community")}
            >
              {t('dashboard.viewCommunity')}
            </Button>
          </CardContent>
        </Card>
        
        {/* AI Tutor Quick Access */}
        <Card className="bg-gradient-to-br from-tutor-primary to-tutor-secondary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('dashboard.aiTutorQuickAccess')}</CardTitle>
            <CardDescription className="text-white/80">{t('dashboard.aiTutorQuickAccessDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              {t('dashboard.aiTutorQuickAccessText')}
            </p>
            <Button 
              variant="secondary" 
              className="w-full bg-white text-tutor-primary hover:bg-white/90"
              onClick={() => setIsOpen(true)}
            >
              {t('dashboard.askAiTutor')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
