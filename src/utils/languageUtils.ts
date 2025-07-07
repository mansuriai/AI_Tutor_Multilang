
import { Language } from "@/types/language";

export const setDocumentLanguage = (language: Language) => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
};

export const isValidLanguage = (lang: string): lang is Language => {
  return ['en', 'id', 'ar'].includes(lang);
};

export const getSavedLanguage = (): Language | null => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && isValidLanguage(savedLanguage)) {
    return savedLanguage;
  }
  return null;
};

export const saveLanguage = (language: Language) => {
  localStorage.setItem('language', language);
};
