// Weekly progress data (Finance)
export const weeklyProgressData = [
  { name: "Mon", score: 70, average: 60 },
  { name: "Tue", score: 75, average: 62 },
  { name: "Wed", score: 80, average: 65 },
  { name: "Thu", score: 85, average: 68 },
  { name: "Fri", score: 90, average: 70 },
  { name: "Sat", score: 88, average: 72 },
  { name: "Sun", score: 92, average: 75 },
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
    subject: "Finance", 
    dateKey: "dashboard.todayAt",
    dateParams: { time: "2:00 PM" }
  },
  { 
    titleKey: "dashboard.lesson.financialStatements", 
    subject: "Finance", 
    dateKey: "dashboard.tomorrowAt",
    dateParams: { time: "10:00 AM" }
  },
  { 
    titleKey: "dashboard.lesson.valuationSecurities", 
    subject: "Finance", 
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
