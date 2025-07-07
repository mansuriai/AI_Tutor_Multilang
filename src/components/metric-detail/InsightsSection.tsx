
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InsightProps {
  title: string;
  value: string | number;
  description: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

interface InsightsSectionProps {
  insights: InsightProps[];
}

const InsightCard = ({ title, value, description, change }: InsightProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-2xl font-bold">{value}</h4>
          {change && (
            <span className={cn(
              "text-sm font-medium",
              change.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight, i) => (
        <InsightCard key={i} {...insight} />
      ))}
    </div>
  );
};

export default InsightsSection;
