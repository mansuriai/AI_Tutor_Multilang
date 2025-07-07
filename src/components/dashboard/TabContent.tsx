import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewTab from "./OverviewTab";
import { useLanguage } from "@/contexts/LanguageContext";

interface TabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
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

const TabContent = ({
  activeTab,
  setActiveTab,
  weeklyProgressData,
  quizPerformanceData,
  upcomingLessons,
  recentActivity,
  studyStats
}: TabContentProps) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-8 bg-white border">
        <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
        <TabsTrigger value="lessons">{t('dashboard.lessons')}</TabsTrigger>
        <TabsTrigger value="quizzes">{t('dashboard.quizzes')}</TabsTrigger>
        <TabsTrigger value="community">{t('dashboard.community')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          weeklyProgressData={weeklyProgressData}
          quizPerformanceData={quizPerformanceData}
          upcomingLessons={upcomingLessons}
          recentActivity={recentActivity}
          studyStats={studyStats}
        />
      </TabsContent>
      
      <TabsContent value="lessons">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.lessons')}</CardTitle>
            <CardDescription>
              {t('tabs.lessonsDesc').replace('{{subject}}', studyStats.subjectName)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10">
              {t('tabs.lessonsContent')}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="quizzes">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quizzes')}</CardTitle>
            <CardDescription>
              {t('tabs.quizzesDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10">
              {t('tabs.quizzesContent')}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="community">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.community')}</CardTitle>
            <CardDescription>
              {t('tabs.communityDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10">
              {t('tabs.communityContent')}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
