
import { useState, useRef, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle, Bot, Send, PlusCircle, HelpCircle, BookOpen } from "lucide-react";
import { useAiTutorChat } from "@/hooks/useAiTutorChat";

interface AskAITutorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectName?: string;
}

const AskAITutor = ({ open, onOpenChange, subjectName = "Mathematics" }: AskAITutorProps) => {
  const { messages, isLoading, sendMessage, clearConversation } = useAiTutorChat(subjectName);
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    sendMessage(question);
    setQuestion("");
  };

  const quickPrompts = [
    "What is the key concept I should understand?",
    "Can you explain this topic in simpler terms?", 
    "How is this applied in real life?",
    "Give me practice problems"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] h-[80vh] max-h-[800px] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="text-tutor-primary" size={20} />
            AI Tutor for {subjectName}
          </DialogTitle>
          <DialogDescription>
            Ask questions and get personalized tutoring help with your studies.
          </DialogDescription>
        </DialogHeader>
        
        {/* Messages container with scroll */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg 
                  ${message.role === "assistant" 
                    ? "bg-muted text-foreground" 
                    : "bg-tutor-primary text-white"}`}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && (
                    <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  {message.role === "user" && (
                    <MessageCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-tutor-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 bg-tutor-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    <div className="h-2 w-2 bg-tutor-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick prompts */}
        {messages.length < 2 && (
          <div className="px-6 py-3 flex flex-wrap gap-2 border-t">
            {quickPrompts.map((prompt, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => {
                  setQuestion(prompt);
                }}
              >
                <PlusCircle className="mr-1 h-3 w-3" />
                {prompt}
              </Button>
            ))}
          </div>
        )}
        
        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea 
              placeholder="Ask a question about your studies..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="flex flex-col gap-2 justify-end">
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || !question.trim()} 
                className="h-10"
              >
                <Send className="h-4 w-4" />
              </Button>
              {messages.length > 1 && (
                <Button
                  onClick={clearConversation}
                  variant="outline"
                  className="h-10"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAITutor;
