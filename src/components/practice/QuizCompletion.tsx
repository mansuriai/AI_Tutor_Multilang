
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, MessageCircle } from "lucide-react";
import { PracticeQuiz } from "@/hooks/usePracticeQuizzes";
import { useAiTutor } from "@/contexts/AiTutorContext";

interface QuizCompletionProps {
  quiz: PracticeQuiz;
  selectedAnswers: Record<string, string>;
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
}

const QuizCompletion = ({ quiz, selectedAnswers, score }: QuizCompletionProps) => {
  const navigate = useNavigate();
  const { setIsSheetOpen } = useAiTutor();
  
  return (
    <div className="container mx-auto px-6 max-w-6xl py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>
            Here's how you did on the {quiz.title} quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score display */}
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold mb-2 text-tutor-primary">
              {score.percentage}%
            </div>
            <p className="text-muted-foreground">
              You got <span className="font-semibold">{score.correct}</span> out 
              of <span className="font-semibold">{score.total}</span> questions correct
            </p>
          </div>
          
          {/* Questions review */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Question Review</h3>
            
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id] || "Not answered";
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div className="font-medium">Question {index + 1}</div>
                    {isCorrect ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="w-4 h-4 mr-1" /> Correct
                      </span>
                    ) : (
                      <span className="text-red-600">Incorrect</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{question.question}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Your answer: </span> 
                    <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600"}>
                      {userAnswer}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="mt-1 text-sm">
                      <span className="text-muted-foreground">Correct answer: </span>
                      <span className="text-green-600 font-medium">{question.correctAnswer}</span>
                    </div>
                  )}
                  <div className="mt-3 text-sm bg-soft-blue p-3 rounded">
                    <p className="font-medium">Explanation:</p>
                    <p className="whitespace-pre-line">{question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="justify-between flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/practice-quiz")}
          >
            Back to Quizzes
          </Button>
          <Button 
            onClick={() => setIsSheetOpen(true)}
            className="bg-tutor-primary hover:bg-tutor-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Ask AI Tutor Questions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizCompletion;
