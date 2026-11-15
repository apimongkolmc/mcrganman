import React, { useState } from 'react';
import { Gamepad2, ArrowRight, Check, LogIn } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const Hero: React.FC = () => {
  const { t, language } = useSettings();
  const [copied, setCopied] = useState(false);

  const copyGamertag = () => {
    navigator.clipboard.writeText('MCrganMan');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: t.hero.stats.repos, value: t.hero.stats.reposVal },
    { label: t.hero.stats.lines, value: t.hero.stats.linesVal },
    { label: t.hero.stats.packages, value: t.hero.stats.packagesVal },
    { label: t.hero.stats.uptime, value: t.hero.stats.uptimeVal },
  ];

  return (
    <section id="overview" className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Quiet Sub-header / Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-6 tracking-wide">
        <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-2 font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          {t.hero.systemOnline}
        </span>
        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">/</span>
        <span>{t.hero.openSourceUtility}</span>
        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">/</span>
        <span>{t.hero.zeroBloat}</span>
        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{t.hero.xboxGamertag}</span>
      </div>

      {/* Main Minimalist Card with Rounded Corners & Beautiful Shading */}
      <div className="minimal-card shimmer-card border-beam-glow rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Bio */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1] hologram-title">
                MCrgan<span className="text-cyan-600 dark:text-cyan-400">Man</span>
              </h1>
              <p className="mt-2 text-base sm:text-lg text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-2">
                <span>{t.hero.subtitle}</span>
                <span className="h-px w-8 bg-cyan-500/40 inline-block"></span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light max-w-xl">
              {t.hero.bio}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium minimal-button-primary group shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.explorePhilosophy}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={copyGamertag}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono minimal-button hover:-translate-y-0.5 transition-all duration-200"
                title="Copy Gamertag"
              >
                <Gamepad2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Xbox: MCrganMan</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
              </button>

              <a
                href="/login.html"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium minimal-button hover:-translate-y-0.5 transition-all duration-200"
                title="Go to Login Portal"
              >
                <LogIn className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t.hero.signInPortal}</span>
              </a>
            </div>
          </div>

          {/* Clean Minimalist Profile Card with Minecraft Avatar */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl minimal-input p-6 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              {/* Subtle top iridescent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-md shrink-0 bg-zinc-800 group-hover:scale-105 group-hover:border-cyan-500/60 transition-all duration-300">
                  <img
                    src="https://mcrganman.page.gd/profile/mcrganman.jpg"
                    alt="MCrganMan"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-950 dark:text-white font-display truncate">
                      MCrganMan
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {t.hero.verified}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    {t.hero.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex justify-between items-center py-1 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">{t.hero.gamertagLabel}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white font-mono">MCrganMan (Xbox)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">{t.hero.philosophyLabel}</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{t.hero.philosophyValue}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">{t.hero.methodologyLabel}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{t.hero.methodologyValue}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">{t.hero.projectLabel}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-pixel text-[11px]">{t.hero.projectValue}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">Released</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-light border-t border-zinc-200 dark:border-zinc-800">
                {t.hero.quote}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metric Row */}
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-2 rounded-xl hover:bg-zinc-500/5 transition-colors">
              <div className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
