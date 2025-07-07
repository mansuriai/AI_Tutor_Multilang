
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { EssayQuestion } from "@/components/practice/EssayQuizTaking";
import EssayQuizTaking from "@/components/practice/EssayQuizTaking";
import EssayQuizCompletion from "@/components/practice/EssayQuizCompletion";

interface EssayQuizData {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: EssayQuestion[];
}

// Mock data for essay quizzes
const essayQuizzes: EssayQuizData[] = [
  {
    id: "essay1",
    subject: "English",
    topic: "Literary Analysis",
    title: "Analysis of Literary Themes",
    description: "Explore themes in classic literature through short essay responses",
    timeLimit: 30,
    questions: [
      {
        id: "eq1_1",
        question: "Analyze how the theme of ambition is presented in Shakespeare's Macbeth. Provide specific examples from the text.",
        targetLength: "200-300 words",
        sampleAnswer: "In Shakespeare's Macbeth, ambition is portrayed as a corrupting and destructive force. Initially, Macbeth is presented as a loyal and honorable soldier, but his ambition, sparked by the witches' prophecies and fueled by Lady Macbeth's persuasion, leads to his moral decline.\n\nThe playwright demonstrates how unchecked ambition can corrupt even virtuous individuals. Macbeth acknowledges that his ambition is dangerous, stating that 'I have no spur to prick the sides of my intent, but only vaulting ambition, which o'erleaps itself.' Despite his moral hesitations, his desire for power overrides his conscience.\n\nThe consequences of this ambition are severe. Macbeth's actions lead to multiple murders, his psychological deterioration, Lady Macbeth's madness and suicide, and ultimately his own downfall. Through this tragedy, Shakespeare suggests that ambition detached from ethical considerations leads to destruction."
      },
      {
        id: "eq1_2",
        question: "Compare and contrast how two different authors use symbolism to convey their central message. Cite specific examples from the texts you discuss.",
        targetLength: "250-350 words"
      },
      {
        id: "eq1_3",
        question: "Explain how setting contributes to the mood and theme in a novel or short story of your choice.",
        targetLength: "200-300 words"
      }
    ]
  },
  {
    id: "essay2",
    subject: "History",
    topic: "World War II",
    title: "Causes and Impacts of WWII",
    description: "Examine the historical significance and consequences of World War II",
    timeLimit: 45,
    questions: [
      {
        id: "eq2_1",
        question: "Analyze the major causes that led to the outbreak of World War II in Europe.",
        targetLength: "250-350 words"
      },
      {
        id: "eq2_2",
        question: "Evaluate the significance of the D-Day invasion in determining the outcome of World War II.",
        targetLength: "300-400 words"
      },
      {
        id: "eq2_3",
        question: "Discuss the social and economic impacts of World War II on civilian populations in at least two different countries.",
        targetLength: "300-400 words"
      },
      {
        id: "eq2_4",
        question: "Explain how World War II led to significant geopolitical changes and the beginning of the Cold War.",
        targetLength: "250-350 words"
      }
    ]
  }
];

const EssayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedQuiz, setSelectedQuiz] = useState<EssayQuizData | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Find selected quiz
  useEffect(() => {
    if (quizId) {
      const quiz = essayQuizzes.find(q => q.id === quizId);
      if (quiz) {
        setSelectedQuiz(quiz);
        setStartTime(Date.now());
      } else {
        // If no quiz found, redirect back
        navigate("/essay-quiz");
        toast({
          title: "Quiz Not Found",
          description: "The requested quiz could not be found.",
          variant: "destructive",
        });
      }
    } else {
      setSelectedQuiz(null);
    }
  }, [quizId, navigate, toast]);
  
  const handleSubmitQuiz = (answers: Record<string, string>) => {
    setAnswers(answers);
    setIsSubmitted(true);
    // Calculate time spent
    if (startTime) {
      const endTime = Date.now();
      const timeElapsed = Math.floor((endTime - startTime) / 1000); // in seconds
      setTimeSpent(timeElapsed);
    }
  };
  
  // If specific quiz is not selected or not found, show the quiz list
  if (!selectedQuiz) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 max-w-6xl py-8">
          <h1 className="text-3xl font-bold mb-6">Essay Quizzes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essayQuizzes.map((quiz) => (
              <div 
                key={quiz.id}
                className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/essay-quiz/${quiz.id}`)}
              >
                <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                <div className="text-sm text-muted-foreground mb-3">
                  {quiz.subject} - {quiz.topic}
                </div>
                <p className="mb-4">{quiz.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span>{quiz.questions.length} questions</span>
                  <span>{quiz.timeLimit} minutes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Quiz completion view
  if (isSubmitted) {
    return (
      <MainLayout>
        <EssayQuizCompletion 
          title={selectedQuiz.title}
          subject={selectedQuiz.subject}
          topic={selectedQuiz.topic}
          questions={selectedQuiz.questions}
          answers={answers}
          timeSpent={timeSpent}
        />
      </MainLayout>
    );
  }
  
  // Active quiz-taking view
  return (
    <MainLayout>
      <EssayQuizTaking 
        title={selectedQuiz.title}
        subject={selectedQuiz.subject}
        topic={selectedQuiz.topic}
        questions={selectedQuiz.questions}
        timeLimit={selectedQuiz.timeLimit}
        onSubmit={handleSubmitQuiz}
      />
    </MainLayout>
  );
};

export default EssayQuiz;
