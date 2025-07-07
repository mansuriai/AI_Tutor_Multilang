
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

const GradeSelector = ({ selectedGrade, onGradeChange }: GradeSelectorProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <GraduationCap size={18} className="mr-2" />
          Select Grade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedGrade} onValueChange={onGradeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {Array.from({length: 12}, (_, i) => i + 1).map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default GradeSelector;
