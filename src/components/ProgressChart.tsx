import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressData {
  name: string;
  value: number;
  average: number;
  score?: number;
}

interface ProgressChartProps {
  data: ProgressData[];
  title: string;
  description?: string;
}

const ProgressChart = ({ data, title, description }: ProgressChartProps) => {
  const formatYAxis = (value: number) => `${value}`;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                tickFormatter={formatYAxis} 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [value, '']}
                labelStyle={{ fontWeight: 'bold', color: '#555' }}
                contentStyle={{ border: '1px solid #eee', borderRadius: '8px' }}
              />
              <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="average" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
