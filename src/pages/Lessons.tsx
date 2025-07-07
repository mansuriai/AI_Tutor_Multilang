import { useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Calendar, BookOpen, Search } from "lucide-react";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import VapiWidget from "@/components/VapiWidget";
import { useLanguage } from "@/contexts/LanguageContext";

interface Lesson {
  id: string;
  title: string;
  subject: string;
  date: string;
  description: string;
  duration: string;
  status: "completed" | "upcoming" | "ongoing" | "missed";
  progress?: number;
}

// Custom hook to manage lesson data and translations
const useLessonsData = () => {
  const { t } = useLanguage();

  const allLessons: Lesson[] = [
    // Completed
    { id: "completed-1", title: t('lesson.algebra.title'), subject: t('subjects.mathematics'), date: t('lesson.date.may2'), description: t('lesson.algebra.desc'), duration: "45 min", status: "completed", progress: 100 },
    { id: "completed-2", title: t('lesson.linearEquations.title'), subject: t('subjects.mathematics'), date: t('lesson.date.may3'), description: t('lesson.linearEquations.desc'), duration: "45 min", status: "completed", progress: 100 },
    // Ongoing
    { id: "ongoing-1", title: t('lesson.quadraticFunctions.title'), subject: t('subjects.mathematics'), date: t('lesson.date.may5'), description: t('lesson.quadraticFunctions.desc'), duration: "45 min", status: "ongoing", progress: 65 },
    // Upcoming
    { id: "upcoming-extra-1", title: t('lesson.systemsOfEquations.title'), subject: t('subjects.mathematics'), date: t('lesson.date.may8'), description: t('lesson.systemsOfEquations.desc'), duration: "45 min", status: "upcoming" },
    { id: "upcoming-extra-2", title: t('lesson.introToFunctions.title'), subject: t('subjects.mathematics'), date: t('lesson.date.may10'), description: t('lesson.introToFunctions.desc'), duration: "45 min", status: "upcoming" },
    // Missed
    { id: "missed-1", title: t('lesson.polynomials.title'), subject: t('subjects.mathematics'), date: t('lesson.date.apr28'), description: t('lesson.polynomials.desc'), duration: "45 min", status: "missed" },
    // Finance
    { id: "finance-1", title: t('lesson.managerialFinance.title'), subject: t('subjects.finance'), date: t('lesson.date.may12'), description: t('lesson.managerialFinance.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-2", title: t('lesson.financialTools.title'), subject: t('subjects.finance'), date: t('lesson.date.may13'), description: t('lesson.financialTools.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-3", title: t('lesson.securitiesValuation.title'), subject: t('subjects.finance'), date: t('lesson.date.may14'), description: t('lesson.securitiesValuation.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-4", title: t('lesson.riskAndReturn.title'), subject: t('subjects.finance'), date: t('lesson.date.may15'), description: t('lesson.riskAndReturn.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-5", title: t('lesson.longTermInvestment.title'), subject: t('subjects.finance'), date: t('lesson.date.may16'), description: t('lesson.longTermInvestment.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-6", title: t('lesson.longTermFinancialDecisions.title'), subject: t('subjects.finance'), date: t('lesson.date.may17'), description: t('lesson.longTermFinancialDecisions.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-7", title: t('lesson.shortTermFinancialDecisions.title'), subject: t('subjects.finance'), date: t('lesson.date.may18'), description: t('lesson.shortTermFinancialDecisions.desc'), duration: "45 min", status: "upcoming" },
    { id: "finance-8", title: t('lesson.specialTopicsFinance.title'), subject: t('subjects.finance'), date: t('lesson.date.may19'), description: t('lesson.specialTopicsFinance.desc'), duration: "45 min", status: "upcoming" }
  ];

  return { allLessons };
};

const Lessons = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const selectedSubject = new URLSearchParams(location.search).get("subject");
  const { studyStats } = useDashboardData(selectedSubject);
  const { setIsSheetOpen } = useAiTutor();
  const [vapiModalOpen, setVapiModalOpen] = useState(false);
  const { t } = useLanguage();
  const { allLessons } = useLessonsData();

  const filteredLessons = allLessons.filter((lesson) => {
    const matchesTab = activeTab === "all" || lesson.status === activeTab;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      completed: { textKey: 'lessonStatus.completed', classes: "bg-green-100 text-green-800" },
      upcoming: { textKey: 'lessonStatus.upcoming', classes: "bg-blue-100 text-blue-800" },
      ongoing: { textKey: 'lessonStatus.ongoing', classes: "bg-purple-100 text-purple-800" },
      missed: { textKey: 'lessonStatus.missed', classes: "bg-red-100 text-red-800" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return statusInfo ? <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.classes}`}>{t(statusInfo.textKey)}</span> : null;
  };

  return (
    <MainLayout containerClassName="" bgColor="bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-white border-b pt-8 pb-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">{t('lessons.title')}</h1>
              <p className="text-muted-foreground">
                {selectedSubject
                  ? `${t('lessons.currentlyStudying')} ${studyStats.subjectName}`
                  : t('lessons.browseSessions')}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setIsSheetOpen(true)} className="bg-tutor-primary hover:bg-tutor-primary/90">
                <BookOpen className="mr-2 h-5 w-5" />
                {t('nav.askAiTutor')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-6xl py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder={t('lessons.searchLessons')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-white border">
              <TabsTrigger value="all">{t('lessons.all')}</TabsTrigger>
              <TabsTrigger value="upcoming">{t('lessons.upcoming')}</TabsTrigger>
              <TabsTrigger value="ongoing">{t('lessons.ongoing')}</TabsTrigger>
              <TabsTrigger value="completed">{t('lessons.completed')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Calendar View */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar size={18} className="mr-2" />
              {t('lessons.weeklySchedule')}
            </CardTitle>
            <CardDescription>{t('lessons.weeklyScheduleDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[t('lessons.mon'), t('lessons.tue'), t('lessons.wed'), t('lessons.thu'), t('lessons.fri'), t('lessons.sat'), t('lessons.sun')].map((day, i) => (
                <div key={i} className="font-medium">{day}</div>
              ))}
              {[t('lesson.date.may5'), t('lesson.date.may6'), t('lesson.date.may7'), t('lesson.date.may8'), t('lesson.date.may9'), t('lesson.date.may10'), t('lesson.date.may11')].map((date, i) => (
                <div key={i} className="text-sm text-muted-foreground">{date}</div>
              ))}
              {[
                { hasLesson: true, title: t('lesson.quadraticFunctions.title') },
                { hasLesson: false },
                { hasLesson: false },
                { hasLesson: true, title: t('lesson.systemsOfEquations.title') },
                { hasLesson: false },
                { hasLesson: true, title: t('lesson.introToFunctions.title') },
                { hasLesson: false }
              ].map((day, i) => (
                <div key={i} className={`p-2 rounded-md ${day.hasLesson ? "bg-tutor-light border border-tutor-primary/30" : "bg-gray-50"}`}>
                  {day.hasLesson && (
                    <div className="text-xs text-center">
                      <div className="w-2 h-2 bg-tutor-primary rounded-full mx-auto mb-1"></div>
                      <span className="font-medium text-tutor-primary">{day.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className={`w-full md:w-2 h-2 md:h-auto ${lesson.status === "completed" ? "bg-green-500" : lesson.status === "ongoing" ? "bg-purple-500" : lesson.status === "upcoming" ? "bg-blue-500" : "bg-red-500"}`}></div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 space-y-2 md:space-y-0">
                        <div>
                          <h3 className="font-medium text-lg">{lesson.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{lesson.subject}</span><span>•</span><span>{lesson.date}</span><span>•</span><span>{lesson.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(lesson.status)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm" style={{ whiteSpace: 'pre-line' }}>{lesson.description}</p>
                      {lesson.status === "ongoing" && lesson.progress !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t('lessons.progress')}</span>
                            <span>{lesson.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-tutor-primary h-2 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                         <Button variant={lesson.status === "upcoming" || lesson.status === "ongoing" ? "default" : "outline"} className={lesson.status === "upcoming" || lesson.status === "ongoing" ? "bg-tutor-primary hover:bg-tutor-primary/90" : ""}>
                          {lesson.status === "completed" ? t('lessons.reviewLesson') : lesson.status === "ongoing" ? t('lessons.continueLesson') : lesson.status === "upcoming" ? t('lessons.startLesson') : t('lessons.viewDetails')}
                         </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsSheetOpen(true)}>{t('lessons.needHelp')}</Button>
                        {lesson.id === "finance-1" && (
                          <Button variant="secondary" size="sm" onClick={() => setVapiModalOpen(true)}>{t('lessons.practiceCaseStudy')}</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-muted-foreground">{t('lessons.noLessonsFound')}</p>
              <Button className="mt-3" variant="outline" onClick={() => { setSearchQuery(""); setActiveTab("all"); }}>
                {t('lessons.resetFilters')}
              </Button>
            </div>
          )}
        </div>
        
        {/* Vapi Modal */}
        <Dialog open={vapiModalOpen} onOpenChange={setVapiModalOpen}>
          <DialogContent className="w-screen h-screen max-w-none max-h-none p-0 flex flex-col bg-background">
            <DialogHeader className="px-8 pt-8 pb-4">
              <DialogTitle>{t('lessons.practiceCaseStudyTitle')}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
              <VapiWidget apiKey="08168b07-9500-495b-b3f0-0a76d715c18d" assistantId="2a814b5d-3e3b-4540-a801-5eec51e37039" fullScreenLayout />
            </div>
            <DialogClose asChild>
              <Button variant="outline" className="w-full mt-2 rounded-none">{t('close')}</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Lessons;