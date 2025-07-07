
import { Progress } from "@/components/ui/progress";
import EssayTimer from "./EssayTimer";

interface EssayQuizHeaderProps {
  title: string;
  subject: string;
  topic: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  timerActive: boolean;
  toggleTimer: () => void;
  formatTime: (seconds: number) => string;
}

const EssayQuizHeader = ({
  title,
  subject,
  topic,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  timerActive,
  toggleTimer,
  formatTime
}: EssayQuizHeaderProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm">{subject} - {topic}</p>
        </div>
        <EssayTimer 
          timeRemaining={timeRemaining} 
          timerActive={timerActive} 
          toggleTimer={toggleTimer} 
          formatTime={formatTime} 
        />
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
  );
};

export default EssayQuizHeader;
