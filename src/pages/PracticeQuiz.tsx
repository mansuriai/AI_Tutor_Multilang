
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { usePracticeQuizzes, PracticeQuiz as QuizType } from "@/hooks/usePracticeQuizzes";
import { useToast } from "@/components/ui/use-toast";
import QuizList from "@/components/practice/QuizList";
import ActiveQuizView from "@/components/practice/ActiveQuizView";

const PracticeQuiz = () => {
  const { subjectId } = useParams();
  const { quizzes } = usePracticeQuizzes(subjectId || null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find selected quiz either from params or set to null if we're on the quiz list page
  useEffect(() => {
    if (subjectId) {
      const quiz = quizzes.find(q => q.id === subjectId);
      if (quiz) {
        setSelectedQuiz(quiz);
      } else {
        // If no quiz found, redirect back to quiz list
        navigate("/practice-quiz");
        toast({
          title: "Quiz Not Found",
          description: "The requested quiz could not be found.",
          variant: "destructive",
        });
      }
    } else {
      setSelectedQuiz(null);
    }
  }, [subjectId, quizzes, navigate, toast]);
  
  // If no specific quiz is selected, show the quiz list
  if (!selectedQuiz) {
    return (
      <MainLayout>
        <QuizList quizzes={quizzes} />
      </MainLayout>
    );
  }
  
  // Quiz taking experience
  return <ActiveQuizView quiz={selectedQuiz} />;
};

export default PracticeQuiz;
