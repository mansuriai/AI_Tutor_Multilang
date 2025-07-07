
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProblemCard from "@/components/practice/ProblemCard";
import { usePracticeProblems } from "@/hooks/usePracticeProblems";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageCircle, FileText, List, Edit } from "lucide-react";
import { useAiTutor } from "@/contexts/AiTutorContext";

const PracticeProblems = () => {
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get("subject");
  const { problems } = usePracticeProblems(subjectFilter);
  const navigate = useNavigate();
  const { setIsSheetOpen } = useAiTutor();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  
  // Get unique topics from available problems
  const topics = Array.from(new Set(problems.map(problem => problem.topic)));
  
  // Apply filters
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === "all" || problem.topic === topicFilter;
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });
  
  return (
    <MainLayout>
      <div className="bg-white border-b pt-8 pb-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">{t('practice.title')}</h1>
              <p className="text-muted-foreground">
                {subjectFilter 
                  ? t('practice.subtitle').replace('{{subject}}', subjectFilter)
                  : t('practice.subtitleGeneral')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => navigate("/subjects")}>
                {t('dashboard.changeSubject')}
              </Button>
              <Button variant="outline" onClick={() => navigate("/practice-quiz")}>
                <FileText className="mr-2 h-5 w-5" />
                {t('practice.takeQuiz')}
              </Button>
              <Button variant="outline" onClick={() => navigate("/essay-quiz")}>
                <Edit className="mr-2 h-5 w-5" />
                {t('practice.essayQuizzes')}
              </Button>
              <Button 
                onClick={() => setIsSheetOpen(true)}
                className="bg-tutor-primary hover:bg-tutor-primary/90"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('nav.askAiTutor')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl py-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder={t('practice.searchProblems')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('practice.filterDifficulty')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('practice.allDifficulties')}</SelectItem>
                <SelectItem value="easy">{t('practice.easy')}</SelectItem>
                <SelectItem value="medium">{t('practice.medium')}</SelectItem>
                <SelectItem value="hard">{t('practice.hard')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('practice.filterTopic')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('practice.allTopics')}</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Problem Count */}
        <div className="flex items-center mb-6">
          <List className="mr-2 h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {t('practice.showing')} {filteredProblems.length} {filteredProblems.length === 1 ? t('practice.problem') : t('practice.problems')}
          </span>
        </div>
        
        {/* Problems List */}
        <div className="space-y-6">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">{t('practice.noProblems')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('practice.noProblemsDesc')}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PracticeProblems;
