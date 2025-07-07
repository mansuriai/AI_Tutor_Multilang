
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our context
interface AiTutorContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  subjectName: string;
  setSubjectName: (name: string) => void;
  currentSubject: string | undefined;
  setCurrentSubject: (subject: string | undefined) => void;
  lastQuestion?: string;
  setLastQuestion: (question?: string) => void;
}

// Create the context with default values
const AiTutorContext = createContext<AiTutorContextType>({
  isOpen: false,
  setIsOpen: () => {},
  isSheetOpen: false,
  setIsSheetOpen: () => {},
  subjectName: "Mathematics",
  setSubjectName: () => {},
  currentSubject: undefined,
  setCurrentSubject: () => {},
  lastQuestion: undefined,
  setLastQuestion: () => {},
});

// Create a provider component
interface AiTutorProviderProps {
  children: ReactNode;
}

export const AiTutorProvider = ({ children }: AiTutorProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("Mathematics");
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);
  const [lastQuestion, setLastQuestion] = useState<string | undefined>();

  return (
    <AiTutorContext.Provider value={{ 
      isOpen, 
      setIsOpen, 
      isSheetOpen,
      setIsSheetOpen,
      subjectName, 
      setSubjectName,
      currentSubject,
      setCurrentSubject,
      lastQuestion,
      setLastQuestion
    }}>
      {children}
    </AiTutorContext.Provider>
  );
};

// Create a hook for using this context
export const useAiTutor = () => useContext(AiTutorContext);
