
export type Language = 'en' | 'id' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
