// Weekly progress data (Finance) - using translation keys
export const weeklyProgressData = [
  { nameKey: "common.weekdays.mon", score: 70, average: 60 },
  { nameKey: "common.weekdays.tue", score: 75, average: 62 },
  { nameKey: "common.weekdays.wed", score: 80, average: 65 },
  { nameKey: "common.weekdays.thu", score: 85, average: 68 },
  { nameKey: "common.weekdays.fri", score: 90, average: 70 },
  { nameKey: "common.weekdays.sat", score: 88, average: 72 },
  { nameKey: "common.weekdays.sun", score: 92, average: 75 },
];

// Quiz performance data (Finance) - using translation keys
export const quizPerformanceData = [
  { 
    nameKey: "dashboard.quizName", 
    nameParams: { num: 1, title: "dashboard.quiz.managerialFinance" },
    score: 78, 
    average: 70 
  },
  { 
    nameKey: "dashboard.quizName", 
    nameParams: { num: 2, title: "dashboard.quiz.financialTools" },
    score: 85, 
    average: 75 
  },
  { 
    nameKey: "dashboard.quizName", 
    nameParams: { num: 3, title: "dashboard.quiz.valuationSecurities" },
    score: 90, 
    average: 80 
  },
  { 
    nameKey: "dashboard.quizName", 
    nameParams: { num: 4, title: "dashboard.quiz.riskReturn" },
    score: 88, 
    average: 82 
  },
];

// Upcoming lessons (Finance) - using translation keys
export const upcomingLessons = [
  { 
    titleKey: "dashboard.lesson.introManagerialFinance", 
    subjectKey: "dashboard.subjects.finance", 
    dateKey: "dashboard.todayAt",
    dateParams: { time: "2:00 PM" }
  },
  { 
    titleKey: "dashboard.lesson.financialStatements", 
    subjectKey: "dashboard.subjects.finance", 
    dateKey: "dashboard.tomorrowAt",
    dateParams: { time: "10:00 AM" }
  },
  { 
    titleKey: "dashboard.lesson.valuationSecurities", 
    subjectKey: "dashboard.subjects.finance", 
    dateKey: "dashboard.dateAt",
    dateParams: { date: "May 14", time: "3:30 PM" }
  },
];

// Recent community activity (Finance) - using translation keys
export const recentActivity = [
  { 
    user: "Alex P.", 
    actionKey: "dashboard.activity.sharedSummary",
    actionParams: { topic: "dashboard.topic.capitalBudgeting" },
    timeKey: "dashboard.time.hourAgo",
    timeParams: { count: 1 }
  },
  { 
    user: "Priya S.", 
    actionKey: "dashboard.activity.answeredQuestion",
    actionParams: { topic: "dashboard.topic.riskReturn" },
    timeKey: "dashboard.time.yesterday"
  },
  { 
    user: "Michael T.", 
    actionKey: "dashboard.activity.postedProblems",
    actionParams: { topic: "dashboard.topic.financialPlanning" },
    timeKey: "dashboard.time.daysAgo",
    timeParams: { count: 2 }
  },
];
