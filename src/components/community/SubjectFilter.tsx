import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubjectFilterProps {
  selectedGrade: string;
  selectedSubject: string;
  availableSubjects: string[];
  onSubjectChange: (subject: string) => void;
}

const SubjectFilter = ({ selectedGrade, selectedSubject, availableSubjects, onSubjectChange }: SubjectFilterProps) => {
  const { t } = useLanguage();
  
  if (selectedGrade === "all") return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users size={18} className="mr-2" />
          {t('community.gradeLabel').replace('{{grade}}', selectedGrade)} {t('community.subjects')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <Button 
            variant={!selectedSubject ? "default" : "ghost"} 
            className="justify-start w-full text-sm"
            onClick={() => onSubjectChange("")}
          >
            {t('community.allSubjects')}
          </Button>
          {availableSubjects.map((subjectKey) => (
            <Button 
              key={subjectKey} 
              variant={selectedSubject === subjectKey ? "default" : "ghost"} 
              className="justify-start w-full text-sm"
              onClick={() => onSubjectChange(subjectKey)}
            >
              {t(subjectKey)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectFilter;
