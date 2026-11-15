import React, { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  Zap, 
  RotateCcw, 
  Check, 
  Sun, 
  Moon,
  Sliders,
  Eye,
  Globe
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const SettingsModal: React.FC = () => {
  const { 
    settings, 
    language,
    t,
    isSettingsOpen, 
    closeSettings, 
    toggleLiquidGlass, 
    toggleAnimations, 
    toggleTheme, 
    setLanguage,
    resetDefaults 
  } = useSettings();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSettingsOpen) {
        closeSettings();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, closeSettings]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSettingsOpen]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeSettings}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 minimal-card shadow-2xl z-10 space-y-6 my-auto max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-dialog-title" className="text-xl font-bold text-zinc-950 dark:text-white font-display tracking-tight">
                {t.settings.title}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                {t.settings.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={closeSettings}
            className="p-2 rounded-xl minimal-button text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:outline-none"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Setting Items */}
        <div className="space-y-4">
          {/* Setting 1: Language Switcher */}
          <div className="p-4 rounded-2xl minimal-panel border border-zinc-200 dark:border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {t.settings.languageTitle}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
                {language === 'th' ? 'ภาษาไทย' : 'English'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
              {t.settings.languageDesc}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  language === 'en'
                    ? 'minimal-button-primary shadow-sm'
                    : 'minimal-button hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <span>English</span>
                {language === 'en' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
              <button
                type="button"
                onClick={() => setLanguage('th')}
                className={`py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  language === 'th'
                    ? 'minimal-button-primary shadow-sm'
                    : 'minimal-button hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <span>ภาษาไทย (Thai)</span>
                {language === 'th' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>
          </div>

          {/* Setting 2: Liquid Glass Toggle */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-2xl minimal-panel border border-zinc-200 dark:border-zinc-800/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {t.settings.liquidGlassTitle}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  settings.liquidGlass 
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' 
                    : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                }`}>
                  {settings.liquidGlass ? t.settings.liquidGlassActive : t.settings.liquidGlassOff}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {t.settings.liquidGlassDesc}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={settings.liquidGlass}
              onClick={toggleLiquidGlass}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                settings.liquidGlass ? 'bg-cyan-500' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.liquidGlass ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Setting 3: Animations & Motion Toggle */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-2xl minimal-panel border border-zinc-200 dark:border-zinc-800/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {t.settings.animationsTitle}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  settings.animations 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                    : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                }`}>
                  {settings.animations ? t.settings.animationsActive : t.settings.animationsOff}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                {t.settings.animationsDesc}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={settings.animations}
              onClick={toggleAnimations}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                settings.animations ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.animations ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Setting 4: Theme Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl minimal-panel border border-zinc-200 dark:border-zinc-800/80">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {settings.theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {t.settings.themeTitle}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.settings.themeDesc} {settings.theme === 'dark' ? 'Dark' : 'Light'} Mode
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-xl minimal-button text-xs font-medium flex items-center gap-1.5"
            >
              {settings.theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.settings.switchThemeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.settings.switchThemeDark}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Interactive Preview Box */}
        <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
              <Eye className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.settings.previewTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Live</span>
          </div>

          {/* Sample Mini Preview Card */}
          <div className={`p-4 rounded-2xl minimal-card transition-all relative overflow-hidden group ${
            settings.animations ? 'hover:-translate-y-1' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 text-xs font-mono font-bold ${
                  settings.animations ? 'animate-pulse' : ''
                }`}>
                  ST
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950 dark:text-white font-display">
                    ServerTools Bedrock Utility
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">
                    Refraction: {settings.liquidGlass ? (language === 'th' ? 'กระจกใสเบลอ' : 'Frosted Blur') : (language === 'th' ? 'ด้านเรียบ' : 'Solid Matte')}
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-pixel px-2 py-0.5 rounded-full ${
                settings.liquidGlass
                  ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                  : 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
              }`}>
                {settings.liquidGlass ? 'LIQUID' : 'MATTE'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={resetDefaults}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 font-mono flex items-center gap-1.5 transition-colors focus:outline-none"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.settings.restoreDefaults}</span>
          </button>

          <button
            onClick={closeSettings}
            className="px-5 py-2 rounded-xl text-xs font-semibold minimal-button-primary flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.settings.done}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
