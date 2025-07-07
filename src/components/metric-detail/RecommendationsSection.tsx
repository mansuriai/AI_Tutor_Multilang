
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAiTutor } from "@/contexts/AiTutorContext";

interface RecommendationsSectionProps {
  metricTitle: string;
  recommendations: string[];
}

const RecommendationsSection = ({ metricTitle, recommendations }: RecommendationsSectionProps) => {
  const { setIsOpen } = useAiTutor();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
        <CardDescription>
          Based on your {metricTitle.toLowerCase()} data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-tutor-primary">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need more help understanding these metrics?
          </p>
          <Button onClick={() => setIsOpen(true)}>
            Ask AI Tutor for Help
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
