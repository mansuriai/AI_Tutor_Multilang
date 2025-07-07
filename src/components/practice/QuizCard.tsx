
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PracticeQuiz } from "@/hooks/usePracticeQuizzes";
import { FileText, Clock, BookOpen } from "lucide-react";

interface QuizCardProps {
  quiz: PracticeQuiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6 hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="text-sm text-muted-foreground">
            {quiz.subject} - {quiz.topic}
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="w-4 h-4 mr-1" /> {quiz.timeLimit} min
          </div>
        </div>
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>{quiz.questions.length} questions</span>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/20 pt-4">
        <Button 
          onClick={() => navigate(`/practice-quiz/${quiz.id}`)}
          className="w-full bg-tutor-primary hover:bg-tutor-primary/90"
        >
          <BookOpen className="mr-2 h-5 w-5" /> Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
