
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PracticeQuiz } from "@/hooks/usePracticeQuizzes";
import { Clock } from "lucide-react";

interface QuizIntroProps {
  quiz: PracticeQuiz;
  onStartQuiz: () => void;
}

const QuizIntro = ({ quiz, onStartQuiz }: QuizIntroProps) => {
  return (
    <div className="container mx-auto px-6 max-w-6xl py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Time Limit: {quiz.timeLimit} minutes</span>
              </div>
              <div>
                <span>Questions: {quiz.questions.length}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Topic: {quiz.topic}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Instructions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Read each question carefully before answering</li>
              <li>You can navigate between questions using the next/previous buttons</li>
              <li>You can change your answers at any time before submitting</li>
              <li>Once the time is up, the quiz will automatically be submitted</li>
              <li>Click "Submit Quiz" when you're done to see your results</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onStartQuiz} 
            className="w-full bg-tutor-primary hover:bg-tutor-primary/90"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizIntro;
