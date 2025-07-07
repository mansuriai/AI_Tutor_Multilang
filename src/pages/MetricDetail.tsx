
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useAiTutor } from "@/contexts/AiTutorContext";
import DetailHeader from "@/components/metric-detail/DetailHeader";
import ChartSection from "@/components/metric-detail/ChartSection";
import DetailTable from "@/components/metric-detail/DetailTable";
import RecommendationsSection from "@/components/metric-detail/RecommendationsSection";
import InsightsSection from "@/components/metric-detail/InsightsSection";
import { useMetricData } from "@/hooks/useMetricData";

const MetricDetail = () => {
  const { metricId } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSubject = searchParams.get('subject');
  const { setSubjectName } = useAiTutor();
  
  // Use our custom hook to fetch and manage metric data
  const {
    metricTitle,
    metricDescription,
    subjectName,
    chartData,
    tableData,
    recommendations,
    insights
  } = useMetricData({ metricId, selectedSubject });

  // Update the AI tutor context with the current subject
  useEffect(() => {
    setSubjectName(subjectName);
  }, [subjectName, setSubjectName]);

  return (
    <MainLayout containerClassName="" bgColor="bg-gray-50 pb-12">
      {/* Header */}
      <DetailHeader 
        metricTitle={metricTitle}
        metricDescription={metricDescription}
        subjectName={subjectName}
        selectedSubject={selectedSubject}
      />
      
      <div className="container mx-auto px-6 max-w-6xl pt-8">
        {/* Key Insights Grid */}
        <div className="mb-6">
          <InsightsSection insights={insights} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Main Chart */}
          <ChartSection 
            metricTitle={metricTitle} 
            chartData={chartData} 
          />
          
          {/* Data Table */}
          <DetailTable
            metricTitle={metricTitle}
            tableData={tableData}
          />
          
          {/* Recommendations */}
          <RecommendationsSection
            metricTitle={metricTitle}
            recommendations={recommendations}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default MetricDetail;
