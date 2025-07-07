
import { useNavigate } from "react-router-dom";
import MetricsCard from "@/components/MetricsCard";
import { BookOpen, FileText, Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatsCardGridProps {
  studyStats: {
    subjectName: string;
    lessonsCompleted: number;
    quizzesTaken: number;
    averageScore: number;
    studyTime: number;
    streak: number;
    totalLessons: number;
    totalQuizzes: number;
    lastLessonDate?: string;
    lastQuizDate?: string;
    studyGoal?: number;
    improvement?: number;
  };
  selectedSubject: string | null;
}

const StatsCardGrid = ({ studyStats, selectedSubject }: StatsCardGridProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Handle metric card clicks
  const handleMetricCardClick = (metric: string) => {
    const metricId = metric.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/${metricId}?subject=${selectedSubject || ''}`);
  };

  // Calculate completion percentages
  const lessonCompletionPercent = Math.round((studyStats.lessonsCompleted / studyStats.totalLessons) * 100);
  const quizCompletionPercent = Math.round((studyStats.quizzesTaken / studyStats.totalQuizzes) * 100);
  const studyTimePercent = studyStats.studyGoal 
    ? Math.round((studyStats.studyTime / studyStats.studyGoal) * 100)
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div onClick={() => handleMetricCardClick("Lessons Completed")} className="cursor-pointer transform transition-transform hover:scale-[1.03]">
        <MetricsCard
          title={t('metrics.lessonsCompleted')}
          value={studyStats.lessonsCompleted}
          icon={<BookOpen className="text-tutor-primary" size={20} />}
          trend={{ value: 12, isPositive: true }}
          description={t('metrics.lessonsCompletedDesc').replace('{{percent}}', lessonCompletionPercent.toString())}
          footer={
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{studyStats.lessonsCompleted}</span>
                <span>{studyStats.totalLessons}</span>
              </div>
              <Progress value={lessonCompletionPercent} className="h-1" />
            </div>
          }
        />
      </div>
      <div onClick={() => handleMetricCardClick("Quizzes Taken")} className="cursor-pointer transform transition-transform hover:scale-[1.03]">
        <MetricsCard
          title={t('metrics.quizzesTaken')}
          value={studyStats.quizzesTaken}
          icon={<FileText className="text-orange-500" size={20} />}
          trend={{ value: 8, isPositive: true }}
          description={t('metrics.quizzesTakenDesc').replace('{{percent}}', quizCompletionPercent.toString())}
          footer={
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{studyStats.quizzesTaken}</span>
                <span>{studyStats.totalQuizzes}</span>
              </div>
              <Progress value={quizCompletionPercent} className="h-1" />
            </div>
          }
        />
      </div>
      <div onClick={() => handleMetricCardClick("Average Score")} className="cursor-pointer transform transition-transform hover:scale-[1.03]">
        <MetricsCard
          title={t('metrics.averageScore')}
          value={`${studyStats.averageScore}%`}
          icon={<Award className="text-yellow-500" size={20} />}
          trend={{ value: studyStats.improvement || 5, isPositive: true }}
          description={t('metrics.averageScoreDesc')}
          footer={
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t('metrics.lastQuiz')}</span>
              <span className="font-medium">{studyStats.lastQuizDate || "Sep 30, 2025"}</span>
            </div>
          }
        />
      </div>
      <div onClick={() => handleMetricCardClick("Study Time")} className="cursor-pointer transform transition-transform hover:scale-[1.03]">
        <MetricsCard
          title={t('metrics.studyTime')}
          value={`${studyStats.studyTime}h`}
          icon={<Clock className="text-green-500" size={20} />}
          trend={{ value: 2.5, isPositive: false }}
          description={t('metrics.studyTimeDesc')}
          footer={
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{studyStats.studyTime}h</span>
                <span>{studyStats.studyGoal || 40}h {t('metrics.goal')}</span>
              </div>
              <Progress value={studyTimePercent} className="h-1" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default StatsCardGrid;
