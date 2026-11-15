import React from 'react';
import { Gamepad2, Shield, ArrowUp, Sliders } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useSettings } from '../context/SettingsContext';

interface FooterProps {
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSettings }) => {
  const { t } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/5 dark:border-white/10 pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-black/5 dark:border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">
              {PROFILE.handle}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 font-mono">/</span>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{t.footer.tagline}</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md font-light">
            {t.footer.bio}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Xbox: MCrganMan</span>
          </span>
          <span className="text-zinc-400 dark:text-zinc-700">·</span>
          {onOpenSettings && (
            <>
              <button
                onClick={onOpenSettings}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{t.footer.settings}</span>
              </button>
              <span className="text-zinc-400 dark:text-zinc-700">·</span>
            </>
          )}
          <a
            href="/login.html"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            {t.footer.portal}
          </a>
          <span className="text-zinc-400 dark:text-zinc-700">·</span>
          <button
            onClick={scrollToTop}
            className="hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t.footer.top}</span>
          </button>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>{t.footer.anonymous}</span>
        </div>
        <div>
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};
