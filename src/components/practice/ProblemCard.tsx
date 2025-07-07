
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PracticeProblem } from "@/hooks/usePracticeProblems";
import { BookOpen, Check, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ProblemCardProps {
  problem: PracticeProblem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const handleCheckAnswer = () => {
    if (problem.isMultipleChoice) {
      setIsCorrect(selectedOption === problem.solution);
    } else {
      // For open-ended questions, we just show the solution for comparison
      setShowSolution(true);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <Card className="mb-6 border-l-4 hover:shadow-md transition-all" 
      style={{ borderLeftColor: getDifficultyColor(problem.difficulty).replace("bg-", "#") }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`${getDifficultyColor(problem.difficulty)} text-white mb-2`}>
              {problem.difficulty}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {problem.subject} - {problem.topic}
            </div>
          </div>
          <Badge variant="outline" className="bg-white">
            {problem.isMultipleChoice ? "Multiple Choice" : "Open-Ended"}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-1">{problem.question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {problem.isMultipleChoice && problem.options ? (
          <div className="space-y-2">
            {problem.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`option-${index}`} 
                  checked={selectedOption === option}
                  onCheckedChange={() => {
                    setSelectedOption(option);
                    setIsCorrect(null);
                  }}
                  disabled={showSolution}
                />
                <label 
                  htmlFor={`option-${index}`} 
                  className={`text-sm ${selectedOption === option ? 'font-medium' : ''} 
                    ${showSolution && option === problem.solution ? 'text-green-600 font-semibold' : ''}`}
                >
                  {option} {showSolution && option === problem.solution && "✓"}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Textarea 
              placeholder="Enter your answer here..." 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)}
              disabled={showSolution}
              className="min-h-[100px]"
            />
          </div>
        )}
        
        {isCorrect !== null && !showSolution && (
          <div className={`mt-4 p-3 rounded-md ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isCorrect ? (
              <p className="flex items-center font-medium">
                <Check className="mr-2 h-5 w-5" /> Correct!
              </p>
            ) : (
              <p className="text-red-600">Not quite right. Try again or check the solution.</p>
            )}
          </div>
        )}
        
        {/* Solution Section */}
        <Collapsible open={showSolution} className="mt-4">
          <CollapsibleContent>
            <div className="bg-soft-blue p-4 rounded-md">
              <h4 className="font-semibold text-sm flex items-center mb-2">
                <FileText className="mr-2 h-4 w-4" /> Solution
              </h4>
              <div className="text-sm whitespace-pre-line">{problem.solution}</div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Hint Section */}
        {problem.hint && (
          <Collapsible open={showHint} className="mt-4">
            <CollapsibleContent>
              <div className="bg-soft-yellow p-4 rounded-md">
                <h4 className="font-semibold text-sm flex items-center mb-2">
                  <BookOpen className="mr-2 h-4 w-4" /> Hint
                </h4>
                <div className="text-sm">{problem.hint}</div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between bg-muted/20 pt-4">
        <div className="space-x-2">
          {!showSolution && problem.hint && (
            <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}
          {showSolution ? (
            <Button variant="outline" size="sm" onClick={() => setShowSolution(false)}>
              Hide Solution
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowSolution(true)}>
              Show Solution
            </Button>
          )}
        </div>
        
        {!showSolution && (
          <Button onClick={handleCheckAnswer} size="sm">
            Check Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
