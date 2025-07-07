
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EssayQuestion } from "./EssayQuizTaking";
import { useAiTutor } from "@/contexts/AiTutorContext";
import { MessageCircle } from "lucide-react";
import CompletionTabs from "./essay-completion/CompletionTabs";

interface EssayQuizCompletionProps {
  title: string;
  subject: string;
  topic: string;
  questions: EssayQuestion[];
  answers: Record<string, string>;
  timeSpent: number; // in seconds
}

const EssayQuizCompletion = ({ 
  title, 
  subject, 
  topic, 
  questions, 
  answers,
  timeSpent
}: EssayQuizCompletionProps) => {
  const navigate = useNavigate();
  const { setIsSheetOpen } = useAiTutor();
  const [activeTab, setActiveTab] = useState("summary");
  
  // Calculate stats
  const totalWords = Object.values(answers).reduce((total, answer) => 
    total + (answer?.split(/\s+/).filter(Boolean).length || 0), 0);
  
  // Mock analysis - in a real app, this would come from an AI assessment
  const mockAnalysis = {
    overallScore: 85,
    clarity: 82,
    organization: 88,
    evidence: 79,
    grammar: 90,
    strengths: [
      "Strong thesis statements",
      "Good use of supporting examples",
      "Clear structure in responses"
    ],
    improvements: [
      "Expand on key points with more specific evidence",
      "Vary sentence structure for better flow",
      "Consider counter-arguments in longer responses"
    ]
  };
  
  return (
    <div className="container mx-auto px-6 max-w-6xl py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>
            Here's your assessment for the {title} ({subject} - {topic})
          </CardDescription>
        </CardHeader>
        
        <CompletionTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          questions={questions}
          answers={answers}
          timeSpent={timeSpent}
          totalWords={totalWords}
          mockAnalysis={mockAnalysis}
        />
        
        <CardFooter className="justify-between flex-wrap gap-2 pt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/practice-quiz")}
          >
            Back to Quizzes
          </Button>
          <Button 
            onClick={() => setIsSheetOpen(true)}
            className="bg-tutor-primary hover:bg-tutor-primary/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Ask AI Tutor for Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EssayQuizCompletion;
