
import { useNavigate } from "react-router-dom";
import { useQuizState } from "@/hooks/useQuizState";
import { PracticeQuiz } from "@/hooks/usePracticeQuizzes";
import { useAiTutor } from "@/contexts/AiTutorContext";
import QuizIntro from "./QuizIntro";
import QuizTaking from "./QuizTaking";
import QuizCompletion from "./QuizCompletion";
import MainLayout from "@/components/layouts/MainLayout";

interface ActiveQuizViewProps {
  quiz: PracticeQuiz;
}

const ActiveQuizView = ({ quiz }: ActiveQuizViewProps) => {
  const { setIsSheetOpen } = useAiTutor();
  
  const {
    currentQuestion,
    currentQuestionIndex,
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
    totalQuestions,
    setCurrentQuestionIndex
  } = useQuizState({
    questions: quiz.questions,
    timeLimit: quiz.timeLimit
  });
  
  // Quiz completion view
  if (isSubmitted) {
    const score = calculateScore();
    return (
      <MainLayout>
        <QuizCompletion 
          quiz={quiz} 
          selectedAnswers={selectedAnswers} 
          score={score} 
        />
      </MainLayout>
    );
  }
  
  // Quiz introduction screen
  if (!isQuizStarted) {
    return (
      <MainLayout>
        <QuizIntro quiz={quiz} onStartQuiz={startQuiz} />
      </MainLayout>
    );
  }
  
  // Active quiz-taking view
  return (
    <MainLayout>
      <QuizTaking
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        selectedAnswers={selectedAnswers}
        quizTitle={quiz.title}
        quizSubject={quiz.subject}
        quizTopic={quiz.topic}
        onSelectAnswer={selectAnswer}
        onNextQuestion={nextQuestion}
        onPrevQuestion={prevQuestion}
        onSubmitQuiz={submitQuiz}
        onQuestionSelect={setCurrentQuestionIndex}
      />
    </MainLayout>
  );
};

export default ActiveQuizView;
