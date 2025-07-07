
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, FileCheck } from "lucide-react";
import QuizCard from "@/components/practice/QuizCard";
import { PracticeQuiz } from "@/hooks/usePracticeQuizzes";
import { useAiTutor } from "@/contexts/AiTutorContext";

interface QuizListProps {
  quizzes: PracticeQuiz[];
}

const QuizList = ({ quizzes }: QuizListProps) => {
  const navigate = useNavigate();
  const { setIsSheetOpen } = useAiTutor();

  return (
    <>
      <div className="bg-white border-b pt-8 pb-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Practice Quizzes</h1>
              <p className="text-muted-foreground">
                Test your knowledge with timed quizzes
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => navigate("/subjects")}>
                Change Subject
              </Button>
              <Button variant="outline" onClick={() => navigate("/practice-problems")}>
                <BookOpen className="mr-2 h-5 w-5" />
                Practice Problems
              </Button>
              <Button 
                onClick={() => setIsSheetOpen(true)}
                className="bg-tutor-primary hover:bg-tutor-primary/90"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask AI Tutor
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))
          ) : (
            <div className="text-center py-12 col-span-3">
              <FileCheck className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No quizzes available</h3>
              <p className="mt-2 text-muted-foreground">
                Try selecting a different subject or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizList;
