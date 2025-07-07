
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface AiResponseCardProps {
  content: string;
  createdAt: string;
  isGenerating?: boolean;
}

const AiResponseCard = ({ content, createdAt, isGenerating = false }: AiResponseCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <Card className="ml-8 mt-3 border-l-4 border-l-blue-500 bg-blue-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 bg-blue-500">
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot size={16} />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-blue-700">AI Community Moderator</div>
            <div className="text-xs text-muted-foreground">{formattedDate}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {isGenerating ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AiResponseCard;
