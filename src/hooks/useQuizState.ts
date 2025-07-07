
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/hooks/usePracticeQuizzes";
import { useToast } from "@/components/ui/use-toast";

interface UseQuizStateProps {
  questions: QuizQuestion[];
  timeLimit: number;
}

export function useQuizState({ questions, timeLimit }: UseQuizStateProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // in seconds
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isQuizStarted && !isSubmitted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your quiz has been automatically submitted.",
              variant: "destructive",
            });
            setIsSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isQuizStarted, isSubmitted, timeRemaining, toast]);
  
  const startQuiz = () => {
    setIsQuizStarted(true);
  };
  
  const selectAnswer = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const submitQuiz = () => {
    setIsSubmitted(true);
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    setCurrentQuestionIndex, // Export this function
    selectedAnswers,
    isSubmitted,
    timeRemaining,
    isQuizStarted,
    formatTime,
    selectAnswer,
    submitQuiz,
    nextQuestion,
    prevQuestion,
    calculateScore,
    startQuiz,
    totalQuestions: questions.length
  };
}
