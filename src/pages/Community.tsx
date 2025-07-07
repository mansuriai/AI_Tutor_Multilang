import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CommunityHeader from "@/components/community/CommunityHeader";
import GradeSelector from "@/components/community/GradeSelector";
import SubjectFilter from "@/components/community/SubjectFilter";
import TopContributors from "@/components/community/TopContributors";
import AiModerationInfo from "@/components/community/AiModerationInfo";
import PostCreator from "@/components/community/PostCreator";
import PostsFeed from "@/components/community/PostsFeed";
import { useLanguage } from "@/contexts/LanguageContext";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("");
  const { t } = useLanguage();

  const gradeSubjects = {
    "1-5": ["Mathematics", "English", "Science", "Social Studies", "Art"],
    "6-8": ["Mathematics", "English", "Science", "History", "Geography", "Art", "Physical Education"],
    "9-12": ["Algebra", "Geometry", "Calculus", "Biology", "Chemistry", "Physics", "English Literature", "World History", "Computer Science"]
  };

  const getSubjectsForGrade = (grade: string) => {
    if (grade === "all") return [];
    const gradeNum = parseInt(grade);
    if (gradeNum >= 1 && gradeNum <= 5) return gradeSubjects["1-5"];
    if (gradeNum >= 6 && gradeNum <= 8) return gradeSubjects["6-8"];
    if (gradeNum >= 9 && gradeNum <= 12) return gradeSubjects["9-12"];
    return [];
  };

  const posts = [
    {
      id: "post-1",
      author: {
        nameKey: "community.users.alexJohnson",
        initials: "AJ",
      },
      content: t('community.post1Content'),
      createdAt: "2025-05-04T15:30:00",
      likesCount: 24,
      commentsCount: 8,
      subject: "Calculus",
      subjectKey: "community.subjects.calculus",
      grade: "12"
    },
    {
      id: "post-2",
      author: {
        nameKey: "community.users.mariaGarcia",
        initials: "MG",
      },
      content: t('community.post2Content'),
      createdAt: "2025-05-04T10:15:00",
      likesCount: 42,
      commentsCount: 13,
      subject: "Physics",
      subjectKey: "community.subjects.physics",
      grade: "11"
    },
    {
      id: "post-3",
      author: {
        nameKey: "community.users.jamesWilson",
        initials: "JW",
      },
      content: t('community.post3Content'),
      createdAt: "2025-05-03T18:45:00",
      likesCount: 15,
      commentsCount: 6,
      subject: "Spanish",
      subjectKey: "community.subjects.spanish",
      grade: "9"
    },
    {
      id: "post-4",
      author: {
        nameKey: "community.users.sophiaChen",
        initials: "SC",
      },
      content: t('community.post4Content'),
      createdAt: "2025-05-03T14:20:00",
      likesCount: 37,
      commentsCount: 12,
      subject: "Computer Science",
      subjectKey: "community.subjects.computerScience",
      grade: "12"
    },
    {
      id: "post-5",
      author: {
        nameKey: "community.users.danielBrown",
        initials: "DB",
      },
      content: t('community.post5Content'),
      createdAt: "2025-05-02T09:10:00",
      likesCount: 19,
      commentsCount: 11,
      subject: "Chemistry",
      subjectKey: "community.subjects.chemistry",
      grade: "10"
    },
    {
      id: "post-6",
      author: {
        nameKey: "community.users.emmaDavis",
        initials: "ED",
      },
      content: t('community.post6Content'),
      createdAt: "2025-05-02T16:30:00",
      likesCount: 8,
      commentsCount: 5,
      subject: "Mathematics",
      subjectKey: "community.subjects.mathematics",
      grade: "7"
    },
    {
      id: "post-7",
      author: {
        nameKey: "community.users.lucasMiller",
        initials: "LM",
      },
      content: t('community.post7Content'),
      createdAt: "2025-05-01T11:20:00",
      likesCount: 12,
      commentsCount: 7,
      subject: "Science",
      subjectKey: "community.subjects.science",
      grade: "7"
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesGrade = selectedGrade === "all" || post.grade === selectedGrade;
    const matchesSubject = !selectedSubject || post.subjectKey === selectedSubject;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t(post.author.nameKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t(post.subjectKey).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    setSelectedSubject("");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGrade("all");
    setSelectedSubject("");
  };

  const availableSubjects = selectedGrade === "all" 
    ? [...new Set(posts.map(post => post.subjectKey))]
    : getSubjectsForGrade(selectedGrade).map(name => {
        // Map display name to translation key
        const nameToKey: Record<string, string> = {
          'Mathematics': 'community.subjects.mathematics',
          'English': 'community.subjects.english',
          'Science': 'community.subjects.science',
          'Social Studies': 'community.subjects.socialStudies',
          'Art': 'community.subjects.art',
          'History': 'community.subjects.history',
          'Geography': 'community.subjects.geography',
          'Physical Education': 'community.subjects.physicalEducation',
          'Algebra': 'community.subjects.algebra',
          'Geometry': 'community.subjects.geometry',
          'Calculus': 'community.subjects.calculus',
          'Biology': 'community.subjects.biology',
          'Chemistry': 'community.subjects.chemistry',
          'Physics': 'community.subjects.physics',
          'English Literature': 'community.subjects.englishLiterature',
          'World History': 'community.subjects.worldHistory',
          'Computer Science': 'community.subjects.computerScience',
        };
        return nameToKey[name] || name;
      });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <CommunityHeader />
        
        <div className="container mx-auto px-6 max-w-6xl py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <GradeSelector 
                selectedGrade={selectedGrade}
                onGradeChange={handleGradeChange}
              />

              <SubjectFilter
                selectedGrade={selectedGrade}
                selectedSubject={selectedSubject}
                availableSubjects={availableSubjects}
                onSubjectChange={setSelectedSubject}
              />
              
              <TopContributors />
              
              <AiModerationInfo />
            </div>
            
            {/* Main Feed */}
            <div className="md:col-span-3 space-y-6">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder={t('community.searchDiscussions')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={handleResetFilters}>
                  {t('community.clearFilters')}
                </Button>
              </div>
              
              <PostCreator availableSubjects={availableSubjects} />
              
              {/* Active Filters Display */}
              {(selectedGrade !== "all" || selectedSubject) && (
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-muted-foreground">{t('community.activeFilters')}</span>
                  {selectedGrade !== "all" && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      {t('community.gradeLabel').replace('{{grade}}', selectedGrade)}
                    </span>
                  )}
                  {selectedSubject && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                      {t(selectedSubject)}
                    </span>
                  )}
                </div>
              )}
              
              <PostsFeed
                filteredPosts={filteredPosts}
                selectedGrade={selectedGrade}
                selectedSubject={selectedSubject}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
