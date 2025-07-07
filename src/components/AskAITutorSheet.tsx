import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAiTutorChat } from "@/hooks/useAiTutorChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageList from "./chat/MessageList";
import QuickPrompts from "./chat/QuickPrompts";
import InputArea from "./chat/InputArea";
import QuizInChat from "./chat/QuizInChat";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AskAITutorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectName?: string;
}

const AskAITutorSheet = ({ open, onOpenChange, subjectName = "General" }: AskAITutorSheetProps) => {
  const [mode, setMode] = useState<"chat" | "practice">("chat");
  const [tab, setTab] = useState("quickprompt");
  const [question, setQuestion] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [pendingQuiz, setPendingQuiz] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string>("Finance - Basics");
  const { t } = useLanguage();
  const {
    messages,
    sendMessage,
    isLoading,
    clearConversation
  } = useAiTutorChat(subjectName);

  // Reset the state when the sheet is opened
  useEffect(() => {
    if (open) {
      setQuestion("");
      setShowQuiz(false);
    }
  }, [open]);

  // Handle submit for the chat
  const handleSubmit = async () => {
    if (!question.trim() || isLoading) return;
    
    // Check if the message is about starting a quiz
    if (question.toLowerCase().includes("quiz") || question.toLowerCase().includes("start a quick quiz")) {
      await sendMessage(question);
      setShowQuiz(true);
    } else {
      await sendMessage(question);
    }
    
    setQuestion("");
    setTab("chat"); // Switch to chat tab after sending a message
  };

  const handlePromptSelect = (prompt: string) => {
    setQuestion(prompt);
    if (prompt.toLowerCase().includes("quiz")) {
      handleSubmit();
      setTab("chat"); // Switch to chat tab after sending a message from quick prompt
    } else {
      handleSubmit();
      setTab("chat"); // Switch to chat tab after sending a message from quick prompt
    }
  };

  const hasMessages = messages.length > 0;

  // Common header content
  const headerContent = (
    <div className="mb-4 pb-4 border-b">
      <h3 className="text-xl font-semibold mb-1">{t('aiTutor.title')}</h3>
      <p className="text-sm text-muted-foreground">
        {t('aiTutor.subtitle').replace('{{subject}}', subjectName)}
      </p>
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => value && setMode(value as "chat" | "practice")}
        className="justify-start mt-4"
      >
        <ToggleGroupItem value="chat" aria-label="Chat mode">
          {t('aiTutor.chat')}
        </ToggleGroupItem>
        <ToggleGroupItem value="practice" aria-label="Practice mode">
          {t('aiTutor.practice')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col h-full p-0">
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          {headerContent}

          {showQuiz ? (
            <div className="flex-1 overflow-hidden flex flex-col">
              <QuizInChat 
                subject={subjectName === 'Finance' ? selectedLesson : subjectName}
                onComplete={() => setShowQuiz(false)}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Show QuickPrompts only at the start of the conversation */}
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div className="mb-4">
                  <QuickPrompts
                    subject={subjectName}
                    onPromptSelect={handlePromptSelect}
                  />
                </div>
              )}
              <MessageList 
                messages={messages} 
                isLoading={isLoading}
                open={open}
              />
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            {/* Add a button to start a quiz directly, only if not already in quiz mode */}
            {!showQuiz && !pendingQuiz && (
              <div className="mb-4 flex justify-end">
                {subjectName === 'Finance' ? (
                  <Button
                    variant="secondary"
                    onClick={() => setPendingQuiz(true)}
                    className="bg-tutor-primary text-white hover:bg-tutor-primary/90"
                  >
                    Start Quiz
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => setShowQuiz(true)}
                    className="bg-tutor-primary text-white hover:bg-tutor-primary/90"
                  >
                    Start Quiz
                  </Button>
                )}
              </div>
            )}
            {/* Show lesson selection if Finance and pendingQuiz is true */}
            {!showQuiz && pendingQuiz && subjectName === 'Finance' && (
              <div className="mb-4 flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Select Lesson:</span>
                  <Select value={selectedLesson} onValueChange={setSelectedLesson}>
                    <SelectTrigger className="w-56">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finance - Basics">Finance - Basics</SelectItem>
                      <SelectItem value="Finance - Investing">Finance - Investing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="bg-tutor-primary text-white hover:bg-tutor-primary/90"
                    onClick={() => { setShowQuiz(true); setPendingQuiz(false); }}
                  >
                    Start Selected Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPendingQuiz(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {!showQuiz && (
              <InputArea
                onInputChange={setQuestion}
                inputValue={question}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onClear={clearConversation}
                showClearButton={hasMessages}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AskAITutorSheet;
