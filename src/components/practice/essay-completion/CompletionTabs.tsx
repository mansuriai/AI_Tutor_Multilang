
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryTabContent from "./SummaryTabContent";
import AnalysisTabContent from "./AnalysisTabContent";
import ResponsesTabContent from "./ResponsesTabContent";
import { EssayQuestion } from "../EssayQuizTaking";

interface CompletionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  questions: EssayQuestion[];
  answers: Record<string, string>;
  timeSpent: number;
  totalWords: number;
  mockAnalysis: {
    overallScore: number;
    clarity: number;
    organization: number;
    evidence: number;
    grammar: number;
    strengths: string[];
    improvements: string[];
  };
}

const CompletionTabs = ({
  activeTab,
  onTabChange,
  questions,
  answers,
  timeSpent,
  totalWords,
  mockAnalysis
}: CompletionTabsProps) => {
  return (
    <Tabs defaultValue="summary" value={activeTab} onValueChange={onTabChange} className="mx-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="responses">Your Responses</TabsTrigger>
      </TabsList>
      
      {/* Summary Tab */}
      <TabsContent value="summary">
        <SummaryTabContent
          overallScore={mockAnalysis.overallScore}
          timeSpent={timeSpent}
          totalWords={totalWords}
          questionsCount={questions.length}
          wordsPerMinute={
            timeSpent > 0 
              ? Math.round((totalWords / (timeSpent / 60)) * 10) / 10 
              : 0
          }
          strengths={mockAnalysis.strengths}
          improvements={mockAnalysis.improvements}
        />
      </TabsContent>
      
      {/* Analysis Tab */}
      <TabsContent value="analysis">
        <AnalysisTabContent
          clarity={mockAnalysis.clarity}
          organization={mockAnalysis.organization}
          evidence={mockAnalysis.evidence}
          grammar={mockAnalysis.grammar}
        />
      </TabsContent>
      
      {/* Responses Tab */}
      <TabsContent value="responses">
        <ResponsesTabContent
          questions={questions}
          answers={answers}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CompletionTabs;
