
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SummaryTabContentProps {
  overallScore: number;
  timeSpent: number;
  totalWords: number;
  questionsCount: number;
  wordsPerMinute: number;
  strengths: string[];
  improvements: string[];
}

const SummaryTabContent = ({
  overallScore,
  timeSpent,
  totalWords,
  questionsCount,
  wordsPerMinute,
  strengths,
  improvements,
}: SummaryTabContentProps) => {
  // Format time helper function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-tutor-primary">{overallScore}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
              <div className="text-2xl font-medium">{formatTime(timeSpent)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Writing Speed</div>
              <div className="text-xl font-medium">{wordsPerMinute} words/min</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Response Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="text-sm text-muted-foreground">Total Words</div>
              <div className="text-2xl font-medium">{totalWords}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average per Question</div>
              <div className="text-xl font-medium">
                {Math.round(totalWords / questionsCount)} words
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 text-amber-500 mr-2 flex items-center justify-center">•</div>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryTabContent;
