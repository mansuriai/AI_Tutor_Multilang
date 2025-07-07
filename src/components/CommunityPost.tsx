import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import AiResponseCard from "./AiResponseCard";
import AiMentionInput from "./AiMentionInput";
import { useAiCommunityModerator } from "@/hooks/useAiCommunityModerator";
import { useLanguage } from "@/contexts/LanguageContext";

interface AiResponse {
  id: string;
  content: string;
  createdAt: string;
}

interface CommunityPostProps {
  id: string;
  author: {
    name?: string;
    nameKey?: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  subject?: string;
  subjectKey?: string;
}

const CommunityPost = ({
  id,
  author,
  content,
  createdAt,
  likesCount: initialLikesCount,
  commentsCount,
  subject,
  subjectKey,
}: CommunityPostProps) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [aiResponses, setAiResponses] = useState<AiResponse[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const { generateAiResponse } = useAiCommunityModerator();
  const { t } = useLanguage();
  
  // Get translated author name
  const authorName = author.nameKey ? t(author.nameKey) : author.name || 'Unknown User';
  
  // Get translated subject
  const subjectDisplay = subjectKey ? t(subjectKey) : subject || 'General';
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleReplySubmit = async (message: string) => {
    // Check if message mentions AI
    if (message.toLowerCase().includes('@ai')) {
      setIsGeneratingAi(true);
      
      try {
        const aiResponse = await generateAiResponse(content, message);
        const newAiResponse: AiResponse = {
          id: `ai-${Date.now()}`,
          content: aiResponse,
          createdAt: new Date().toISOString()
        };
        
        setAiResponses(prev => [...prev, newAiResponse]);
      } catch (error) {
        console.error('Failed to generate AI response:', error);
      } finally {
        setIsGeneratingAi(false);
      }
    }
    
    setShowReplyInput(false);
  };

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <div className="mb-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={author.avatar} alt={authorName} />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{authorName}</div>
                <div className="text-xs text-muted-foreground flex items-center space-x-2">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span className="text-tutor-primary">{subjectDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="whitespace-pre-line">{content}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={liked ? "text-tutor-primary" : ""} 
              onClick={handleLike}
            >
              ❤️ {likesCount}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="mr-1 h-4 w-4" />
              {commentsCount}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowReplyInput(!showReplyInput)}
          >
            {t('community.reply')}
          </Button>
        </CardFooter>
        
        {showReplyInput && (
          <div className="px-6 pb-4">
            <AiMentionInput
              onSubmit={handleReplySubmit}
              isLoading={isGeneratingAi}
              placeholder="Reply to this post... Type @ai to ask AI moderator"
            />
          </div>
        )}
      </Card>

      {/* AI Responses */}
      {isGeneratingAi && (
        <AiResponseCard
          content=""
          createdAt={new Date().toISOString()}
          isGenerating={true}
        />
      )}
      
      {aiResponses.map((response) => (
        <AiResponseCard
          key={response.id}
          content={response.content}
          createdAt={response.createdAt}
        />
      ))}
    </div>
  );
};

export default CommunityPost;
