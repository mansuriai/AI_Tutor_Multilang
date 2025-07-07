
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuickPromptsProps {
  subject: string;
  onPromptSelect: (prompt: string) => void;
  prompts?: string[];
}

const QuickPrompts = ({ subject, onPromptSelect, prompts }: QuickPromptsProps) => {
  const { t } = useLanguage();
  
  // Generate default prompts based on subject
  const defaultPrompts = [
    t('prompts.explainSimpler'),
    t('prompts.practiceProblems'),
    t('prompts.realLife'),
    t('prompts.keyConcepts'),
    t('prompts.startQuiz')
  ];
  
  // Add subject-specific prompts
  const subjectPrompts = subject.toLowerCase().includes("math")
    ? [t('prompts.solveEquation'), t('prompts.derivative')]
    : subject.toLowerCase().includes("science")
    ? [t('prompts.scientificTheory'), t('prompts.experiment')]
    : [];
    
  const displayPrompts = prompts || [...defaultPrompts, ...subjectPrompts];
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayPrompts.map((prompt, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm"
          className="text-xs"
          onClick={() => onPromptSelect(prompt)}
        >
          <PlusCircle className="mr-1 h-3 w-3" />
          {prompt}
        </Button>
      ))}
    </div>
  );
};

export default QuickPrompts;
