import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, TRANSLATIONS, Translations } from '../data/translations';

export interface AppSettings {
  liquidGlass: boolean;
  animations: boolean;
  theme: 'dark' | 'light';
  language: Language;
}

interface SettingsContextType {
  settings: AppSettings;
  language: Language;
  t: Translations;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleLiquidGlass: () => void;
  toggleAnimations: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  resetDefaults: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  liquidGlass: true,
  animations: true,
  theme: 'dark',
  language: 'en',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const savedGlass = localStorage.getItem('mcrganman_liquid_glass');
      const savedAnim = localStorage.getItem('mcrganman_animations');
      const savedTheme = localStorage.getItem('theme');
      const savedLang = localStorage.getItem('mcrganman_lang') as Language | null;

      const lang: Language = (savedLang === 'th' || savedLang === 'en')
        ? savedLang
        : (navigator.language.startsWith('th') ? 'th' : 'en');

      return {
        liquidGlass: savedGlass !== null ? savedGlass === 'true' : DEFAULT_SETTINGS.liquidGlass,
        animations: savedAnim !== null ? savedAnim === 'true' : DEFAULT_SETTINGS.animations,
        theme: (savedTheme === 'light' || savedTheme === 'dark') 
          ? savedTheme 
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        language: lang,
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Sync DOM classes and language attribute
  useEffect(() => {
    const root = document.documentElement;

    // Language attribute
    root.setAttribute('lang', settings.language);
    if (settings.language === 'th') {
      root.classList.add('lang-th');
    } else {
      root.classList.remove('lang-th');
    }

    // Liquid Glass class
    if (settings.liquidGlass) {
      root.classList.add('liquid-glass-active');
    } else {
      root.classList.remove('liquid-glass-active');
    }

    // Animation / Motion class
    if (!settings.animations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }

    // Dark theme class
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to localStorage
    try {
      localStorage.setItem('mcrganman_liquid_glass', String(settings.liquidGlass));
      localStorage.setItem('mcrganman_animations', String(settings.animations));
      localStorage.setItem('theme', settings.theme);
      localStorage.setItem('mcrganman_lang', settings.language);
    } catch (e) {
      console.warn('Unable to persist settings to localStorage:', e);
    }
  }, [settings]);

  const toggleLiquidGlass = () => {
    setSettings(prev => ({ ...prev, liquidGlass: !prev.liquidGlass }));
  };

  const toggleAnimations = () => {
    setSettings(prev => ({ ...prev, animations: !prev.animations }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const setLanguage = (lang: Language) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const toggleLanguage = () => {
    setSettings(prev => ({ ...prev, language: prev.language === 'en' ? 'th' : 'en' }));
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const currentTranslations = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  return (
    <SettingsContext.Provider
      value={{
        settings,
        language: settings.language,
        t: currentTranslations,
        isSettingsOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false),
        toggleLiquidGlass,
        toggleAnimations,
        toggleTheme,
        setLanguage,
        toggleLanguage,
        resetDefaults,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
