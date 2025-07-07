
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, AtSign } from "lucide-react";

interface AiMentionInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const AiMentionInput = ({ onSubmit, isLoading = false, placeholder = "Type @ to mention AI moderator..." }: AiMentionInputProps) => {
  const [message, setMessage] = useState("");
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Show AI suggestion when user types @
    if (value.endsWith('@')) {
      setShowAiSuggestion(true);
    } else {
      setShowAiSuggestion(false);
    }
  };

  const handleAiMention = () => {
    setMessage(prev => prev + "ai ");
    setShowAiSuggestion(false);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="min-h-[60px] resize-none pr-10"
            disabled={isLoading}
          />
          {showAiSuggestion && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={handleAiMention}
                className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-left"
              >
                <AtSign size={16} className="mr-2 text-blue-500" />
                <span className="text-sm">ai (AI Community Moderator)</span>
              </button>
            </div>
          )}
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          size="sm"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default AiMentionInput;
