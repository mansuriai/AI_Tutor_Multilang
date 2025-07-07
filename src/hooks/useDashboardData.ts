import { useState, useEffect } from "react";
import { 
  weeklyProgressData, 
  quizPerformanceData, 
  upcomingLessons, 
  recentActivity 
} from "@/components/dashboard/StudyData";

interface StudyStats {
  subjectName: string;
  lessonsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  studyTime: number;
  streak: number;
  totalLessons: number; // Total lessons available in the subject
  totalQuizzes: number; // Total quizzes available in the subject
  lastLessonDate: string; // Date of the last completed lesson
  lastQuizDate: string; // Date of the last taken quiz
  studyGoal: number; // Weekly study goal in hours
  improvement: number; // Percentage improvement in average score
  recentScores: number[]; // Recent quiz scores
}

interface UseDashboardDataReturn {
  studyStats: StudyStats;
  weeklyProgressData: any[];
  quizPerformanceData: any[];
  upcomingLessons: {
    titleKey: string;
    subject: string;
    dateKey: string;
    dateParams?: any;
  }[];
  recentActivity: {
    user: string;
    actionKey: string;
    actionParams?: any;
    timeKey: string;
    timeParams?: any;
  }[];
}

export function useDashboardData(selectedSubject: string | null): UseDashboardDataReturn {
  const [studyStats, setStudyStats] = useState<StudyStats>({
    subjectName: "Mathematics",
    lessonsCompleted: 24,
    quizzesTaken: 12,
    averageScore: 87,
    studyTime: 35.5,
    streak: 7,
    totalLessons: 40,
    totalQuizzes: 15,
    lastLessonDate: "October 3, 2025",
    lastQuizDate: "September 30, 2025",
    studyGoal: 40,
    improvement: 12,
    recentScores: [78, 82, 85, 91, 94]
  });

  useEffect(() => {
    // Update study statistics based on selected subject
    if (selectedSubject) {
      const subjectMap: Record<string, string> = {
        "math-algebra": "Algebra",
        "math-calculus": "Calculus",
        "science-physics": "Physics",
        "science-chemistry": "Chemistry",
        "language-english": "English",
        "language-spanish": "Spanish",
        "cs-programming": "Programming",
        "cs-ai": "Artificial Intelligence",
        "business-finance": "Finance",
      };
      
      const newSubjectName = subjectMap[selectedSubject] || studyStats.subjectName;
      
      // Each subject has slightly different stats
      const subjectStats: Record<string, Partial<StudyStats>> = {
        "Algebra": {
          lessonsCompleted: 24, 
          quizzesTaken: 12, 
          totalLessons: 40,
          totalQuizzes: 15
        },
        "Calculus": {
          lessonsCompleted: 18, 
          quizzesTaken: 8, 
          totalLessons: 35,
          totalQuizzes: 12
        },
        "Physics": {
          lessonsCompleted: 15, 
          quizzesTaken: 7, 
          totalLessons: 30,
          totalQuizzes: 10
        },
        "Chemistry": {
          lessonsCompleted: 20, 
          quizzesTaken: 10, 
          totalLessons: 38,
          totalQuizzes: 14
        },
        "English": {
          lessonsCompleted: 28, 
          quizzesTaken: 14, 
          totalLessons: 45,
          totalQuizzes: 18
        },
        "Spanish": {
          lessonsCompleted: 22, 
          quizzesTaken: 11, 
          totalLessons: 42,
          totalQuizzes: 16
        },
        "Programming": {
          lessonsCompleted: 26, 
          quizzesTaken: 13, 
          totalLessons: 50,
          totalQuizzes: 20
        },
        "Artificial Intelligence": {
          lessonsCompleted: 16, 
          quizzesTaken: 8, 
          totalLessons: 32,
          totalQuizzes: 12
        },
        "Finance": {
          lessonsCompleted: 4,
          quizzesTaken: 2,
          totalLessons: 8,
          totalQuizzes: 4,
          lastLessonDate: "May 19, 2025",
          lastQuizDate: "May 19, 2025",
          studyGoal: 10,
          improvement: 0,
          recentScores: [80, 85, 90, 88]
        }
      };
      
      setStudyStats(prev => ({
        ...prev,
        subjectName: newSubjectName,
        ...(subjectStats[newSubjectName] || {})
      }));
    }
  }, [selectedSubject]);

  return {
    studyStats,
    weeklyProgressData,
    quizPerformanceData,
    upcomingLessons,
    recentActivity
  };
}
