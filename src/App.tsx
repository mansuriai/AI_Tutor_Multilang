
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Subjects from "@/pages/Subjects";
import Lessons from "@/pages/Lessons";
import MetricDetail from "@/pages/MetricDetail";
import PracticeProblems from "@/pages/PracticeProblems";
import PracticeQuiz from "@/pages/PracticeQuiz";
import Community from "@/pages/Community";
import NotFound from "@/pages/NotFound";
import AiTutorSheet from "@/components/AiTutorSheet";
import { AiTutorProvider } from "@/contexts/AiTutorContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import EssayQuiz from "@/pages/EssayQuiz";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AiTutorProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:metricId" element={<MetricDetail />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<Subjects />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/metrics/:metricId" element={<MetricDetail />} />
            <Route path="/practice-problems" element={<PracticeProblems />} />
            <Route path="/practice-problems/:subjectId" element={<PracticeProblems />} />
            <Route path="/practice-quiz" element={<PracticeQuiz />} />
            <Route path="/practice-quiz/:subjectId" element={<PracticeQuiz />} />
            <Route path="/essay-quiz" element={<EssayQuiz />} />
            <Route path="/essay-quiz/:quizId" element={<EssayQuiz />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AiTutorSheet />
          <Toaster />
        </AiTutorProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
