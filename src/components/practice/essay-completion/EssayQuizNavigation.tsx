
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EssayQuestion } from "../EssayQuizTaking";

interface EssayQuizNavigationProps {
  questions: EssayQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  navigateToQuestion: (index: number) => void;
}

const EssayQuizNavigation = ({
  questions,
  currentQuestionIndex,
  answers,
  navigateToQuestion
}: EssayQuizNavigationProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Separator className="my-4" />
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((_, idx) => (
          <Button
            key={idx}
            variant={idx === currentQuestionIndex ? "default" : "outline"}
            size="sm"
            className={`w-10 h-10 p-0 ${
              answers[questions[idx].id]?.trim().length > 0 ? 'bg-muted border-tutor-primary' : ''
            }`}
            onClick={() => navigateToQuestion(idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EssayQuizNavigation;
