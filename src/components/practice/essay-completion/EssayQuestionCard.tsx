
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EssayQuestion } from "../EssayQuizTaking";

interface EssayQuestionCardProps {
  question: EssayQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  answerValue: string;
  onAnswerChange: (value: string) => void;
  navigatePrevious: () => void;
  navigateNext: () => void;
  onSubmit: () => void;
}

const EssayQuestionCard = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  answerValue,
  onAnswerChange,
  navigatePrevious,
  navigateNext,
  onSubmit
}: EssayQuestionCardProps) => {
  return (
    <Card className="max-w-3xl mx-auto mb-6">
      <CardHeader>
        <div className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1}</div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
        {question.targetLength && (
          <p className="text-sm text-muted-foreground mt-1">
            Target response length: {question.targetLength}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Label htmlFor={`answer-${question.id}`} className="sr-only">
            Your Answer
          </Label>
          <Textarea 
            id={`answer-${question.id}`}
            value={answerValue}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Write your answer here..."
            className="min-h-[200px]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Character count: {answerValue?.length || 0}</span>
            <span>Word count: {answerValue?.split(/\s+/).filter(Boolean).length || 0} words</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button 
            variant="outline" 
            onClick={navigatePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </Button>
        </div>
        <div className="flex gap-2">
          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={onSubmit}>Submit All Answers</Button>
          ) : (
            <Button onClick={navigateNext}>
              Next Question
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EssayQuestionCard;
