
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { QuizQuestion } from "@/hooks/usePracticeQuizzes";

interface QuizTakingProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  selectedAnswers: Record<string, string>;
  quizTitle: string;
  quizSubject: string;
  quizTopic: string;
  onSelectAnswer: (questionId: string, answer: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmitQuiz: () => void;
  onQuestionSelect: (index: number) => void;
}

const QuizTaking = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  formatTime,
  selectedAnswers,
  quizTitle,
  quizSubject,
  quizTopic,
  onSelectAnswer,
  onNextQuestion,
  onPrevQuestion,
  onSubmitQuiz,
  onQuestionSelect
}: QuizTakingProps) => {
  return (
    <div className="container mx-auto px-6 max-w-6xl py-8">
      {/* Quiz header with timer */}
      <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{quizTitle}</h2>
            <p className="text-muted-foreground text-sm">{quizSubject} - {quizTopic}</p>
          </div>
          <div className="flex items-center text-lg font-medium">
            <Clock className="h-5 w-5 mr-2 text-tutor-primary" />
            <span className={`${timeRemaining < 60 ? 'text-red-500 animate-pulse' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <Progress 
            value={(currentQuestionIndex + 1) / totalQuestions * 100} 
            className="h-2"
          />
        </div>
      </div>
      
      {/* Question card */}
      <Card className="max-w-3xl mx-auto mb-6">
        <CardHeader>
          <div className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1}</div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`border rounded-md p-3 cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion.id] === option
                    ? 'border-tutor-primary bg-tutor-light'
                    : 'hover:border-muted-foreground'
                }`}
                onClick={() => onSelectAnswer(currentQuestion.id, option)}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 ${
                    selectedAnswers[currentQuestion.id] === option
                      ? 'bg-tutor-primary text-white'
                      : 'border'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>{option}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button 
              variant="outline" 
              onClick={onPrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </div>
          <div className="flex gap-2">
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button onClick={onSubmitQuiz}>Submit Quiz</Button>
            ) : (
              <Button onClick={onNextQuestion}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      {/* Question navigation */}
      <div className="max-w-3xl mx-auto">
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              className={`w-10 h-10 p-0 ${
                idx === currentQuestionIndex ? 'border-tutor-primary bg-tutor-light' : ''
              } ${
                selectedAnswers[currentQuestion.id] ? 'bg-muted' : ''
              }`}
              onClick={() => onQuestionSelect(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;
