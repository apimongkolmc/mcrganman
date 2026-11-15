import React, { useState, useEffect } from 'react';
import { Gamepad2, Volume2, VolumeX, Menu, X, Check, Sun, Moon, LogIn, Sliders } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { useSettings } from '../context/SettingsContext';

interface NavbarProps {
  onToggleSound?: () => void;
  isSoundPlaying?: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onToggleSound, 
  isSoundPlaying,
  theme,
  onToggleTheme,
  onOpenSettings
}) => {
  const { t, language } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedGamertag, setCopiedGamertag] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyGamertag = () => {
    navigator.clipboard.writeText('MCrganMan');
    setCopiedGamertag(true);
    setTimeout(() => setCopiedGamertag(false), 2000);
  };

  const navLinks = [
    { label: t.nav.overview, href: '#overview' },
    { label: t.nav.philosophy, href: '#philosophy' },
    { label: t.nav.servertools, href: '#servertools' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2">
      <div 
        className={`max-w-4xl mx-auto transition-all duration-200 rounded-2xl ${
          scrolled 
            ? 'minimal-panel shadow-md py-2 px-3.5 sm:px-6' 
            : 'minimal-panel shadow-sm py-2.5 px-3.5 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand & Gamertag with Custom Minecraft Avatar */}
          <a 
            href="#overview" 
            className="flex items-center gap-2.5 group focus:outline-none text-left shrink-0"
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/80 shadow-sm group-hover:border-cyan-500/50 transition-colors bg-zinc-800">
              <img 
                src="https://mcrganman.page.gd/profile/mcrganman.jpg" 
                alt="MCrganMan" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors font-display">
                  {PROFILE.handle}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
                {t.nav.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons (Carefully tuned for Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Settings Button (Houses Visual, Language & Motion Settings) */}
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                title={t.settings.title}
                className="p-2 rounded-xl minimal-button text-xs transition-colors shrink-0 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                aria-label="Open settings dialog"
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}

            {/* Theme Toggle - Visible on both mobile and desktop */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? t.settings.switchThemeLight : t.settings.switchThemeDark}
              className="p-2 rounded-xl minimal-button text-xs transition-colors shrink-0"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Ambient Sound Toggle - Hidden on small mobile to avoid crowding */}
            {onToggleSound && (
              <button
                onClick={onToggleSound}
                title={isSoundPlaying ? t.nav.soundOn : t.nav.soundOff}
                className={`hidden sm:inline-flex p-2 rounded-xl minimal-button text-xs transition-colors shrink-0 ${
                  isSoundPlaying ? 'text-cyan-600 dark:text-cyan-400 border-cyan-500/40' : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {isSoundPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            {/* Gamertag Quick Copy - Hidden on mobile, available in dropdown */}
            <button
              onClick={handleCopyGamertag}
              title={t.nav.copyGamertag}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono minimal-button shrink-0"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>MCrganMan</span>
              {copiedGamertag ? (
                <Check className="w-3 h-3 text-emerald-500 ml-0.5" />
              ) : (
                <span className="text-[10px] text-zinc-400 font-sans ml-0.5">{language === 'th' ? 'ก๊อป' : 'copy'}</span>
              )}
            </button>

            {/* LOGIN BUTTON - Visible on tablet/desktop */}
            <a
              href="/login.html"
              title="Creator Login Portal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium minimal-button-primary shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav.signIn}</span>
            </a>

            {/* Mobile Menu Button - Shown only on mobile screens */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl minimal-button shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Polished, Spacious Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-zinc-200 dark:border-zinc-800 mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Primary Mobile Action: Full Width Sign In Button */}
            <a
              href="/login.html"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium minimal-button-primary shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav.signIn}</span>
            </a>

            {/* Navigation Links */}
            <div className="space-y-1 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Utility Actions (Settings, Gamertag & Audio) */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              {onOpenSettings && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 minimal-button rounded-xl"
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{t.settings.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">
                    ⚙️
                  </span>
                </button>
              )}

              <button
                onClick={handleCopyGamertag}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 minimal-button rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Xbox: MCrganMan</span>
                </span>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-sans">
                  {copiedGamertag ? t.nav.copied : (language === 'th' ? 'คัดลอก' : 'Copy')}
                </span>
              </button>

              {onToggleSound && (
                <button
                  onClick={onToggleSound}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 minimal-button rounded-xl"
                >
                  <span className="flex items-center gap-2">
                    {isSoundPlaying ? <Volume2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{t.nav.ambientDrone}</span>
                  </span>
                  <span className={`text-[11px] font-mono ${isSoundPlaying ? 'text-emerald-500' : 'text-zinc-400'}`}>
                    {isSoundPlaying ? 'ON' : 'OFF'}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
