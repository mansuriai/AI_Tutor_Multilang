
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressChart from "@/components/ProgressChart";

// Define the type to match what ProgressChart expects
interface ProgressData {
  name: string;
  value: number;
  average: number;
  score?: number;
}

interface ChartSectionProps {
  metricTitle: string;
  chartData: ProgressData[];
}

const ChartSection = ({ metricTitle, chartData }: ChartSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed View</CardTitle>
        <CardDescription>
          Your {metricTitle.toLowerCase()} over time compared to class average
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ProgressChart 
            data={chartData} 
            title=""
            description=""
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
