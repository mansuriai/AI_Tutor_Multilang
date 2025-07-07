
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface SubjectFilterProps {
  selectedGrade: string;
  selectedSubject: string;
  availableSubjects: string[];
  onSubjectChange: (subject: string) => void;
}

const SubjectFilter = ({ selectedGrade, selectedSubject, availableSubjects, onSubjectChange }: SubjectFilterProps) => {
  if (selectedGrade === "all") return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users size={18} className="mr-2" />
          Grade {selectedGrade} Subjects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <Button 
            variant={!selectedSubject ? "default" : "ghost"} 
            className="justify-start w-full text-sm"
            onClick={() => onSubjectChange("")}
          >
            All Subjects
          </Button>
          {availableSubjects.map((subject) => (
            <Button 
              key={subject} 
              variant={selectedSubject === subject ? "default" : "ghost"} 
              className="justify-start w-full text-sm"
              onClick={() => onSubjectChange(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectFilter;
