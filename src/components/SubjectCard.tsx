import { BookOpen } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: string;
  categoryColor: string;
  studentsCount: number;
}

const SubjectCard = ({ 
  id, 
  name, 
  icon, 
  description, 
  level, 
  categoryColor, 
  studentsCount 
}: SubjectCardProps) => {
  const { t } = useLanguage();
  
  // Level translations mapping
  const levelKeyMap: Record<string, string> = {
    'Beginner': 'subjects.beginner',
    'Intermediate': 'subjects.intermediate',
    'Advanced': 'subjects.advanced',
    'Beginner to Advanced': 'subjects.levelBeginnerToAdvanced',
    'All Levels': 'subjects.levelAllLevels',
  };

  // Clean the subject ID by removing any prefix like "math-"
  const cleanSubjectId = id.replace(/^[a-z]+-/, '');

  // Get translations with proper fallbacks
  const translatedLevel = t(levelKeyMap[level] || level);
  const translatedName = t(`subjects.${cleanSubjectId}`);
  const translatedDesc = t(`subjects.${cleanSubjectId}Desc`);

  return (
    <Link to={`/dashboard?subject=${id}`} className="block w-full">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer">
        <div className={`h-2 ${categoryColor}`}></div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full ${categoryColor} bg-opacity-20 flex items-center justify-center`}>
              <BookOpen size={20} className={categoryColor.replace('bg-', 'text-')} />
            </div>
            <Badge variant="outline">{translatedLevel}</Badge>
          </div>
          <CardTitle className="mt-2">{translatedName}</CardTitle>
          <CardDescription className="text-xs">
            {studentsCount.toLocaleString()} {t('subjects.studentsEnrolled')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {translatedDesc}
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            {t('home.startLearning')}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SubjectCard;
