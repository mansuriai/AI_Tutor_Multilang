
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import EssayQuizHeader from "./essay-completion/EssayQuizHeader";
import EssayQuestionCard from "./essay-completion/EssayQuestionCard";
import EssayQuizNavigation from "./essay-completion/EssayQuizNavigation";

export interface EssayQuestion {
  id: string;
  question: string;
  targetLength?: string;
  sampleAnswer?: string;
}

interface EssayQuizTakingProps {
  title: string;
  subject: string;
  topic: string;
  questions: EssayQuestion[];
  timeLimit: number; // in minutes
  onSubmit: (answers: Record<string, string>) => void;
}

const EssayQuizTaking = ({
  title,
  subject,
  topic,
  questions,
  timeLimit,
  onSubmit
}: EssayQuizTakingProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const { toast } = useToast();

  // Initialize empty answers
  useEffect(() => {
    const initialAnswers: Record<string, string> = {};
    questions.forEach(q => {
      initialAnswers[q.id] = "";
    });
    setAnswers(initialAnswers);
  }, [questions]);
  
  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your time has expired. Your answers will be submitted automatically.",
              variant: "destructive",
            });
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleSubmit = () => {
    setTimerActive(false);
    onSubmit(answers);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };
  
  const navigateNext = () => {
    navigateToQuestion(currentQuestionIndex + 1);
  };
  
  const navigatePrevious = () => {
    navigateToQuestion(currentQuestionIndex - 1);
  };
  
  const toggleTimer = () => {
    setTimerActive(prev => !prev);
    toast({
      title: timerActive ? "Timer paused" : "Timer resumed",
      description: timerActive 
        ? "You've paused the timer. Resume when you're ready." 
        : "The timer is now running again.",
    });
  };
  
  return (
    <div className="container mx-auto px-6 max-w-6xl py-8">
      {/* Quiz header with timer */}
      <EssayQuizHeader
        title={title}
        subject={subject}
        topic={topic}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        timerActive={timerActive}
        toggleTimer={toggleTimer}
        formatTime={formatTime}
      />
      
      {/* Current Question Card */}
      <EssayQuestionCard
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        answerValue={answers[currentQuestion.id]}
        onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
        navigatePrevious={navigatePrevious}
        navigateNext={navigateNext}
        onSubmit={handleSubmit}
      />
      
      {/* Question navigation */}
      <EssayQuizNavigation
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        navigateToQuestion={navigateToQuestion}
      />
    </div>
  );
};

export default EssayQuizTaking;
