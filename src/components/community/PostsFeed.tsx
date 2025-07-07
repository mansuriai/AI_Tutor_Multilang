import { Button } from "@/components/ui/button";
import CommunityPost from "@/components/CommunityPost";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Post {
  id: string;
  author: {
    name?: string;
    nameKey?: string;
    initials: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  subject?: string;
  subjectKey?: string;
  grade: string;
}

interface PostsFeedProps {
  filteredPosts: Post[];
  selectedGrade: string;
  selectedSubject: string;
  onResetFilters: () => void;
}

const PostsFeed = ({ filteredPosts, selectedGrade, selectedSubject, onResetFilters }: PostsFeedProps) => {
  const { t } = useLanguage();

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <GraduationCap size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('community.noPostsFound')}</h3>
        <p className="text-muted-foreground mb-4">
          {selectedGrade !== "all" 
            ? `${t('community.noPostsFoundDesc')} Grade ${selectedGrade}${selectedSubject ? ` in ${selectedSubject}` : ''}.`
            : t('community.noPostsFoundDesc')
          }
        </p>
        <Button variant="outline" onClick={onResetFilters}>
          {t('community.resetFilters')}
        </Button>
      </div>
    );
  }

  return (
    <>
      {filteredPosts.map(post => (
        <CommunityPost
          key={post.id}
          id={post.id}
          author={post.author}
          content={post.content}
          createdAt={post.createdAt}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          subject={post.subject}
          subjectKey={post.subjectKey}
        />
      ))}
    </>
  );
};

export default PostsFeed;
