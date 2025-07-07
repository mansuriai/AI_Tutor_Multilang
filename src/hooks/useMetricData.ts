
import { useEffect, useState } from 'react';
import { 
  metricsChartData, 
  getTableData, 
  getRecommendations, 
  getMetricInfo, 
  getMetricInsights 
} from '../utils/metricDetailData';
import { useDashboardData } from './useDashboardData';

interface UseMetricDataParams {
  metricId: string | undefined;
  selectedSubject: string | null;
}

interface UseMetricDataReturn {
  metricTitle: string;
  metricDescription: string;
  subjectName: string;
  chartData: any[];
  tableData: any[];
  recommendations: string[];
  insights: {
    title: string;
    value: string | number;
    description: string;
    change?: {
      value: number;
      isPositive: boolean;
    };
  }[];
}

export function useMetricData({ metricId, selectedSubject }: UseMetricDataParams): UseMetricDataReturn {
  const [chartData, setChartData] = useState<any[]>([]);
  const [insights, setInsights] = useState<UseMetricDataReturn['insights']>([]);
  
  // Get general dashboard data
  const { studyStats } = useDashboardData(selectedSubject);
  
  // Get metric specific info from utility
  const { title: metricTitle, description: metricDescription } = getMetricInfo(metricId);
  const tableData = getTableData(metricId);
  const recommendations = getRecommendations(metricId);
  
  useEffect(() => {
    // Set chart data based on metric ID
    if (metricId && metricId in metricsChartData) {
      setChartData(metricsChartData[metricId as keyof typeof metricsChartData]);
    }
    
    // Get specific insights for this metric
    if (metricId) {
      setInsights(getMetricInsights(metricId, studyStats));
    }
  }, [metricId, studyStats]);
  
  return {
    metricTitle,
    metricDescription,
    subjectName: studyStats.subjectName,
    chartData,
    tableData,
    recommendations,
    insights
  };
}
