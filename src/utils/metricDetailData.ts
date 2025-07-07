
// Define types for metric data
export interface TableItem {
  name: string;
  status: string;
  date: string;
  grade: string;
}

export interface ProgressData {
  name: string;
  value: number;
  average: number;
  score?: number; // Make score optional since some data uses value instead
}

export interface InsightItem {
  title: string;
  value: string | number;
  description: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

// Sample data for different metrics
export const metricsChartData: Record<string, ProgressData[]> = {
  "lessons-completed": [
    { name: "Week 1", value: 4, average: 3, score: 4 },
    { name: "Week 2", value: 7, average: 5, score: 7 },
    { name: "Week 3", value: 5, average: 4, score: 5 },
    { name: "Week 4", value: 8, average: 6, score: 8 },
  ],
  "quizzes-taken": [
    { name: "Week 1", value: 2, average: 1, score: 2 },
    { name: "Week 2", value: 3, average: 2, score: 3 },
    { name: "Week 3", value: 2, average: 2, score: 2 },
    { name: "Week 4", value: 5, average: 3, score: 5 },
  ],
  "average-score": [
    { name: "Quiz 1", value: 78, average: 72, score: 78 },
    { name: "Quiz 2", value: 82, average: 74, score: 82 },
    { name: "Quiz 3", value: 85, average: 76, score: 85 },
    { name: "Quiz 4", value: 91, average: 79, score: 91 },
    { name: "Quiz 5", value: 94, average: 81, score: 94 },
  ],
  "study-time": [
    { name: "Week 1", value: 6.5, average: 4.5, score: 6.5 },
    { name: "Week 2", value: 8.2, average: 5.0, score: 8.2 },
    { name: "Week 3", value: 9.5, average: 5.5, score: 9.5 },
    { name: "Week 4", value: 11.3, average: 6.0, score: 11.3 },
  ],
};

// Generate table data based on metric
export const getTableData = (metricId: string | undefined): TableItem[] => {
  switch (metricId) {
    case "lessons-completed":
      return [
        { name: "Introduction to Algebra", status: "Completed", date: "Sep 15, 2025", grade: "A" },
        { name: "Linear Equations", status: "Completed", date: "Sep 18, 2025", grade: "A-" },
        { name: "Quadratic Functions", status: "Completed", date: "Sep 22, 2025", grade: "B+" },
        { name: "Polynomials", status: "Completed", date: "Sep 25, 2025", grade: "A" },
        { name: "Rational Expressions", status: "In Progress", date: "Oct 1, 2025", grade: "-" },
      ];
    case "quizzes-taken":
      return [
        { name: "Quiz 1: Basic Algebra", status: "Completed", date: "Sep 17, 2025", grade: "85%" },
        { name: "Quiz 2: Linear Equations", status: "Completed", date: "Sep 20, 2025", grade: "92%" },
        { name: "Quiz 3: Functions", status: "Completed", date: "Sep 24, 2025", grade: "78%" },
        { name: "Quiz 4: Applications", status: "Completed", date: "Sep 28, 2025", grade: "88%" },
        { name: "Midterm Assessment", status: "Scheduled", date: "Oct 5, 2025", grade: "-" },
      ];
    case "average-score":
      return [
        { name: "Homework Assignments", status: "12/15 Complete", date: "Ongoing", grade: "87%" },
        { name: "Quizzes", status: "4/6 Complete", date: "Ongoing", grade: "83%" },
        { name: "Practice Problems", status: "85/100 Complete", date: "Ongoing", grade: "90%" },
        { name: "Discussion Participation", status: "Active", date: "Ongoing", grade: "95%" },
        { name: "Overall Performance", status: "Good", date: "Current", grade: "88%" },
      ];
    case "study-time":
      return [
        { name: "Video Lectures", status: "8.5 hours", date: "Last 30 days", grade: "N/A" },
        { name: "Reading Materials", status: "5.2 hours", date: "Last 30 days", grade: "N/A" },
        { name: "Practice Problems", status: "12.3 hours", date: "Last 30 days", grade: "N/A" },
        { name: "Discussion Forums", status: "3.5 hours", date: "Last 30 days", grade: "N/A" },
        { name: "AI Tutor Sessions", status: "6.0 hours", date: "Last 30 days", grade: "N/A" },
      ];
    default:
      return [];
  }
};

// Generate recommendations based on metric
export const getRecommendations = (metricId: string | undefined): string[] => {
  switch (metricId) {
    case "lessons-completed":
      return [
        "Complete the 'Rational Expressions' lesson by October 3rd",
        "Review the 'Quadratic Functions' material where you scored lower",
        "Try the supplementary materials for 'Linear Equations'",
        "Consider forming a study group for the upcoming topics",
        "Focus on applying concepts from completed lessons to real-world problems"
      ];
    case "quizzes-taken":
      return [
        "Prepare for the upcoming Midterm Assessment using the study guide",
        "Review Quiz 3 where you scored lower than your average",
        "Practice more application problems before your next quiz",
        "Try taking the practice quiz for the upcoming material",
        "Schedule a session with your AI tutor to review difficult concepts"
      ];
    case "average-score":
      return [
        "Focus on completing the remaining homework assignments",
        "Consider attending office hours to improve your quiz performance",
        "Continue your excellent participation in discussions",
        "Review questions you got wrong on previous quizzes",
        "Practice explaining concepts to others to solidify your understanding"
      ];
    case "study-time":
      return [
        "Try to balance your time more evenly between video lectures and reading",
        "Consider increasing your time spent on discussion forums",
        "Your practice problem time is excellent - keep it up!",
        "Try the pomodoro technique (25 min study, 5 min break) to improve focus",
        "Consider scheduling fixed study blocks in your calendar"
      ];
    default:
      return [];
  }
};

// Function to get metric title and description
export const getMetricInfo = (metricId: string | undefined): { title: string; description: string } => {
  let title = "";
  let description = "";
  
  if (metricId) {
    const formattedId = metricId.replace(/-/g, ' ');
    title = formattedId.replace(/\b\w/g, l => l.toUpperCase());

    switch (metricId) {
      case "lessons-completed":
        description = "Track your progress through course material";
        break;
      case "quizzes-taken":
        description = "View your quiz history and performance";
        break;
      case "average-score":
        description = "Monitor your overall academic performance";
        break;
      case "study-time":
        description = "Analyze how you're spending your study time";
        break;
      default:
        description = "Detailed information about your learning";
    }
  }
  
  return { title, description };
};

// Function to get insights specific to each metric
export const getMetricInsights = (
  metricId: string | undefined, 
  studyStats: any
): InsightItem[] => {
  switch (metricId) {
    case "lessons-completed":
      return [
        {
          title: "Completion Rate",
          value: `${Math.round((studyStats.lessonsCompleted / studyStats.totalLessons) * 100)}%`,
          description: "Of total curriculum completed",
          change: { value: 15, isPositive: true }
        },
        {
          title: "Pace",
          value: "On Track",
          description: "Compared to expected timeline"
        },
        {
          title: "Last Completed",
          value: studyStats.lastLessonDate || "Oct 3, 2025",
          description: "Most recent lesson finished"
        },
        {
          title: "Remaining",
          value: studyStats.totalLessons - studyStats.lessonsCompleted,
          description: "Lessons left in curriculum"
        }
      ];
    case "quizzes-taken":
      return [
        {
          title: "Participation Rate",
          value: `${Math.round((studyStats.quizzesTaken / studyStats.totalQuizzes) * 100)}%`,
          description: "Of available quizzes completed",
          change: { value: 12, isPositive: true }
        },
        {
          title: "Last Quiz",
          value: studyStats.lastQuizDate || "Sep 30, 2025",
          description: "Most recent quiz taken"
        },
        {
          title: "Average Score",
          value: `${studyStats.averageScore}%`,
          description: "Across all quizzes",
          change: { value: 5, isPositive: true }
        },
        {
          title: "Next Quiz",
          value: "Oct 5, 2025",
          description: "Midterm Assessment scheduled"
        }
      ];
    case "average-score":
      return [
        {
          title: "Current Average",
          value: `${studyStats.averageScore}%`,
          description: "Across all assessments",
          change: { value: 5, isPositive: true }
        },
        {
          title: "Highest Score",
          value: "94%",
          description: "Your best performance"
        },
        {
          title: "Class Ranking",
          value: "Top 15%",
          description: "Among your peers"
        },
        {
          title: "Improvement",
          value: `${studyStats.improvement || 12}%`,
          description: "From initial assessment",
          change: { value: studyStats.improvement || 12, isPositive: true }
        }
      ];
    case "study-time":
      return [
        {
          title: "Weekly Average",
          value: `${(studyStats.studyTime / 4).toFixed(1)}h`,
          description: "Hours studied per week",
          change: { value: 8, isPositive: true }
        },
        {
          title: "Goal Progress",
          value: `${Math.round((studyStats.studyTime / (studyStats.studyGoal || 40)) * 100)}%`,
          description: "Of weekly study goal"
        },
        {
          title: "Most Productive",
          value: "Evenings",
          description: "Your peak study time"
        },
        {
          title: "Focus Time",
          value: "62%",
          description: "Time spent in deep focus"
        }
      ];
    default:
      return [];
  }
};
