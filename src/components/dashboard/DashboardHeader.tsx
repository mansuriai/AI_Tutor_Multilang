import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, BookOpen, FileText } from "lucide-react";

interface DashboardHeaderProps {
  selectedSubject: string | null;
  subjectName: string;
  subjectKey?: string;
}

const DashboardHeader = ({ selectedSubject, subjectName, subjectKey }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { setIsSheetOpen } = useAiTutor();
  const { t } = useLanguage();
  
  // Get translated subject name
  const translatedSubjectName = subjectKey ? t(subjectKey) : subjectName;
  
  return (
    <div className="bg-white border-b pt-8 pb-6">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              {selectedSubject 
                ? `${t('dashboard.currentlyStudying')} ${translatedSubjectName}`
                : t('dashboard.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate("/subjects")}>
              {t('dashboard.changeSubject')}
            </Button>
            <Button variant="outline" onClick={() => navigate("/lessons")}>
              <BookOpen className="mr-2 h-5 w-5" />
              {t('dashboard.viewLessons')}
            </Button>
            <Button variant="outline" onClick={() => navigate("/practice-problems")}>
              <FileText className="mr-2 h-5 w-5" />
              {t('dashboard.practiceProblems')}
            </Button>
            <Button 
              onClick={() => setIsSheetOpen(true)}
              className="bg-tutor-primary hover:bg-tutor-primary/90"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('nav.askAiTutor')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
