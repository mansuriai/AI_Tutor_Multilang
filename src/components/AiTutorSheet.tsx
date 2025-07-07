
import AskAITutorSheet from "./AskAITutorSheet";
import { useAiTutor } from "@/contexts/AiTutorContext";

const AiTutorSheet = () => {
  const { isSheetOpen, setIsSheetOpen, subjectName } = useAiTutor();
  
  return (
    <AskAITutorSheet 
      open={isSheetOpen} 
      onOpenChange={setIsSheetOpen} 
      subjectName={subjectName || "General"}
    />
  );
};

export default AiTutorSheet;
