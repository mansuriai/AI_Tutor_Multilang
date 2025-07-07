
import { useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface EssayTimerProps {
  timeRemaining: number;
  timerActive: boolean;
  toggleTimer: () => void;
  formatTime: (seconds: number) => string;
}

const EssayTimer = ({ timeRemaining, timerActive, toggleTimer, formatTime }: EssayTimerProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleTimer}
        className={timerActive ? "bg-red-50" : "bg-green-50"}
      >
        {timerActive ? "Pause Timer" : "Resume Timer"}
      </Button>
      <div className="flex items-center text-lg font-medium">
        <Clock className="h-5 w-5 mr-2 text-tutor-primary" />
        <span className={`${timeRemaining < 60 ? 'text-red-500 animate-pulse' : ''}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};

export default EssayTimer;
