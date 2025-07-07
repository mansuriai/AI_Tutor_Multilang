
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InputAreaProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
  showClearButton: boolean;
}

const InputArea = ({
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
  onClear,
  showClearButton
}: InputAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without shift for new line)
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div 
      className={`relative rounded-lg border transition-all duration-200 ${
        isFocused ? "border-blue-400 shadow-sm" : "border-input"
      }`}
    >
      <div className="flex">
        <Textarea
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask a question..."
          className="min-h-[80px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        {showClearButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClear}
                  className="h-8 w-8 rounded-full hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Button
          size="sm"
          className="rounded-full"
          onClick={onSubmit}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="ml-2 sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
};

export default InputArea;
