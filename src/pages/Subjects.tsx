import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectCard from "@/components/SubjectCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const subjects = [
  {
    id: "math-algebra",
    name: "Algebra",
    icon: "📊",
    description: "Learn equations, functions, polynomials, and more. Master the fundamentals of algebra with interactive lessons.",
    level: "Beginner to Advanced",
    category: "Mathematics",
    categoryColor: "bg-blue-500",
    studentsCount: 12453
  },
  {
    id: "math-calculus",
    name: "Calculus",
    icon: "📈",
    description: "Master derivatives, integrals, limits and applications of calculus with step-by-step guidance.",
    level: "Intermediate",
    category: "Mathematics",
    categoryColor: "bg-blue-500",
    studentsCount: 8932
  },
  {
    id: "science-physics",
    name: "Physics",
    icon: "🧲",
    description: "Learn mechanics, electromagnetism, thermodynamics, and modern physics with interactive simulations.",
    level: "Intermediate",
    category: "Science",
    categoryColor: "bg-green-500",
    studentsCount: 7821
  },
  {
    id: "science-chemistry",
    name: "Chemistry",
    icon: "⚗️",
    description: "Study atoms, molecules, reactions, and learn lab techniques with virtual experiments.",
    level: "Beginner to Advanced",
    category: "Science",
    categoryColor: "bg-green-500",
    studentsCount: 6543
  },
  {
    id: "language-english",
    name: "English",
    icon: "📝",
    description: "Improve grammar, vocabulary, writing skills, and literature analysis with our comprehensive English curriculum.",
    level: "All Levels",
    category: "Languages",
    categoryColor: "bg-yellow-500",
    studentsCount: 15678
  },
  {
    id: "language-spanish",
    name: "Spanish",
    icon: "🗣️",
    description: "Learn conversational Spanish, grammar, and cultural context through interactive lessons and practice.",
    level: "Beginner",
    category: "Languages",
    categoryColor: "bg-yellow-500",
    studentsCount: 9876
  },
  {
    id: "cs-programming",
    name: "Programming",
    icon: "💻",
    description: "Learn coding fundamentals, algorithms, and programming languages like Python, JavaScript, and Java.",
    level: "Beginner to Advanced",
    category: "Computer Science",
    categoryColor: "bg-purple-500",
    studentsCount: 14532
  },
  {
    id: "cs-ai",
    name: "Artificial Intelligence",
    icon: "🤖",
    description: "Discover machine learning, neural networks, and AI applications through practical projects.",
    level: "Advanced",
    category: "Computer Science",
    categoryColor: "bg-purple-500",
    studentsCount: 7654
  },
  {
    id: "humanities-history",
    name: "History",
    icon: "🏛️",
    description: "Explore world civilizations, important events, and historical analysis with engaging content.",
    level: "All Levels",
    category: "Humanities",
    categoryColor: "bg-red-500",
    studentsCount: 5432
  },
  {
    id: "humanities-philosophy",
    name: "Philosophy",
    icon: "🤔",
    description: "Study great thinkers, ethical theories, and philosophical concepts with guided discussions.",
    level: "Intermediate",
    category: "Humanities",
    categoryColor: "bg-red-500",
    studentsCount: 3210
  },
  {
    id: "arts-music",
    name: "Music Theory",
    icon: "🎵",
    description: "Learn notation, harmony, composition, and ear training with interactive exercises.",
    level: "Beginner to Advanced",
    category: "Arts",
    categoryColor: "bg-pink-500",
    studentsCount: 4321
  },
  {
    id: "arts-drawing",
    name: "Drawing & Illustration",
    icon: "🎨",
    description: "Learn fundamental drawing techniques, perspective, anatomy, and digital illustration skills.",
    level: "Beginner",
    category: "Arts",
    categoryColor: "bg-pink-500",
    studentsCount: 5678
  },
  {
    id: "business-finance",
    name: "Finance",
    icon: "💵",
    description: "Explore the fundamentals of managerial finance, investment decisions, risk analysis, and financial planning for real-world business scenarios.",
    level: "Beginner to Advanced",
    category: "Business",
    categoryColor: "bg-teal-500",
    studentsCount: 0
  }
];

const categories = [
  { id: "all", name: "All Subjects" },
  { id: "mathematics", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "languages", name: "Languages" },
  { id: "computer-science", name: "Computer Science" },
  { id: "humanities", name: "Humanities" },
  { id: "arts", name: "Arts" }
];

const Subjects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const { t } = useLanguage();

  const filteredSubjects = subjects.filter(subject => {
    const matchesCategory = 
      selectedCategory === "all" || 
      subject.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch = 
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = 
      levelFilter === "all" || 
      subject.level.toLowerCase().includes(levelFilter.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tutor-primary/10 to-tutor-secondary/10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('subjects.exploreSubjects')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('subjects.exploreSubjectsDesc')}
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder={t('subjects.searchPlaceholder')}
              className="pl-10 py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Tabs 
              defaultValue="all" 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 lg:flex">
                {categories.slice(0, 4).map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {t(`subjects.${category.id === 'all' ? 'allSubjects' : category.id}`)}
                  </TabsTrigger>
                ))}
                <div className="hidden lg:block">
                  {categories.slice(4).map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {t(`subjects.${category.id}`)}
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
            </Tabs>
            
            <div className="w-full md:w-auto">
              <Select 
                value={levelFilter} 
                onValueChange={setLevelFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder={t('subjects.filterByLevel')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('subjects.allLevels')}</SelectItem>
                  <SelectItem value="beginner">{t('subjects.beginner')}</SelectItem>
                  <SelectItem value="intermediate">{t('subjects.intermediate')}</SelectItem>
                  <SelectItem value="advanced">{t('subjects.advanced')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="lg:hidden mt-4 flex overflow-x-auto pb-2 space-x-2">
            {categories.slice(4).map(category => (
              <Button 
                key={category.id} 
                variant={selectedCategory === category.id ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {t(`subjects.${category.id}`)}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subject Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSubjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  name={subject.name}
                  icon={subject.icon}
                  description={subject.description}
                  level={subject.level}
                  categoryColor={subject.categoryColor}
                  studentsCount={subject.studentsCount}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">{t('subjects.noSubjectsFound')}</h3>
              <p className="text-gray-500 mb-6">{t('subjects.noSubjectsFoundDesc')}</p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setLevelFilter("all");
              }}>
                {t('subjects.resetFilters')}
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-tutor-primary text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t('subjects.cantFindWhat')}</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('subjects.cantFindWhatDesc')}
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-tutor-primary hover:bg-gray-100">
            {t('subjects.requestCustomSubject')}
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Subjects;
