import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

const GradeSelector = ({ selectedGrade, onGradeChange }: GradeSelectorProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <GraduationCap size={18} className="mr-2" />
          {t('community.selectGrade')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedGrade} onValueChange={onGradeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('community.chooseGrade')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('community.allGrades')}</SelectItem>
            {Array.from({length: 12}, (_, i) => i + 1).map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                {t('community.grade').replace('{{grade}}', grade.toString())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default GradeSelector;
