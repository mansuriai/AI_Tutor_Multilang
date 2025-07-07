
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalysisTabContentProps {
  clarity: number;
  organization: number;
  evidence: number;
  grammar: number;
}

const AnalysisTabContent = ({
  clarity,
  organization,
  evidence,
  grammar
}: AnalysisTabContentProps) => {
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>
            Breakdown of different aspects of your responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Clarity of Thought</span>
                <span>{clarity}%</span>
              </div>
              <Progress value={clarity} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                Your ideas were generally clear, with some room for more precise expression in questions 2 and 3.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Organization</span>
                <span>{organization}%</span>
              </div>
              <Progress value={organization} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                Strong organization overall with clear introductions and conclusions. Consider strengthening transitions between ideas.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Evidence & Support</span>
                <span>{evidence}%</span>
              </div>
              <Progress value={evidence} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                Good use of examples in some responses, but could benefit from more specific evidence and citations.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Grammar & Style</span>
                <span>{grammar}%</span>
              </div>
              <Progress value={grammar} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                Strong grammar and sentence structure throughout. Minor punctuation errors in a few places.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTabContent;
