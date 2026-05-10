import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import arData from '@/locales/ar.json';
import enData from '@/locales/en.json';

type Lang = 'ar' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      result[newKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flatten(val as Record<string, unknown>, newKey));
    }
  }
  return result;
}

const flatAr = flatten(arData as Record<string, unknown>);
const flatEn = flatten(enData as Record<string, unknown>);

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('medicore-lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  const isRTL = lang === 'ar';

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('medicore-lang', l);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('medicore-lang', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    const flat = lang === 'ar' ? flatAr : flatEn;
    return flat[key] || key;
  }, [lang]);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.lang = lang;
    if (isRTL) {
      html.classList.add('rtl');
    } else {
      html.classList.remove('rtl');
    }
  }, [isRTL, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
