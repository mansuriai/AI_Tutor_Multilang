
import { useMemo } from "react";
import {
  metricsChartData,
  getTableData,
  getRecommendations,
  getMetricInfo,
  ProgressData,
  TableItem
} from "@/utils/metricDetailData";

interface UseMetricsReturn {
  getAllMetricIds: () => string[];
  getMetricById: (metricId: string) => {
    title: string;
    description: string;
    chartData: ProgressData[];
    tableData: TableItem[];
    recommendations: string[];
  };
}

export function useMetrics(): UseMetricsReturn {
  /**
   * Returns all available metric IDs
   */
  const getAllMetricIds = (): string[] => {
    return Object.keys(metricsChartData);
  };

  /**
   * Gets comprehensive data for a specific metric
   */
  const getMetricById = (metricId: string) => {
    const { title, description } = getMetricInfo(metricId);
    
    return {
      title,
      description,
      chartData: metricsChartData[metricId] || [],
      tableData: getTableData(metricId),
      recommendations: getRecommendations(metricId)
    };
  };
  
  return {
    getAllMetricIds,
    getMetricById
  };
}
