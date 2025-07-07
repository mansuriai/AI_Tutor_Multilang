
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextType, LanguageProviderProps } from '@/types/language';
import { translations } from '@/data/translations/index';
import { setDocumentLanguage, getSavedLanguage, saveLanguage } from '@/utils/languageUtils';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDocumentLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    saveLanguage(lang);
    setDocumentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export type { Language };
