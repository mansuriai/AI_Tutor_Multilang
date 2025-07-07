import React, { useRef, useEffect } from "react";
import { Bot, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types/chat";
import MarkdownRenderer from "./MarkdownRenderer";
import SourceCitations from "./SourceCitations";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  open?: boolean;
}

const MessageList = ({ messages, isLoading = false, open = true }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Enable scrolling for the entire chat conversation, not within individual messages
  return (
    <div className="flex-1 py-4 px-6 overflow-y-auto max-h-[60vh]">
      <div className="space-y-4 min-h-[200px]">
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
                <div className="flex-1 min-w-0">
                  {message.role === "assistant" ? (
                    <MarkdownRenderer content={message.content} className="text-sm" />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                  {message.role === "assistant" && message.sources && (
                    <SourceCitations sources={message.sources} />
                  )}
                </div>
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
    </div>
  );
};

export default MessageList;
