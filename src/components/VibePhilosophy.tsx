import React, { useState } from 'react';
import { Sparkles, Cpu, ShieldCheck, Gauge, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const VibePhilosophy: React.FC = () => {
  const { t } = useSettings();
  const [selectedTools, setSelectedTools] = useState<string[]>(['formatting', 'state']);

  const bloatEstimates: Record<string, { label: string; standardSize: number; minimalistSize: number }> = {
    formatting: { label: t.philosophy.toolFormatting, standardSize: 240, minimalistSize: 2 },
    state: { label: t.philosophy.toolState, standardSize: 85, minimalistSize: 0.4 },
    diff: { label: t.philosophy.toolDiff, standardSize: 310, minimalistSize: 4 },
    terminal: { label: t.philosophy.toolTerminal, standardSize: 450, minimalistSize: 6 },
  };

  const toggleTool = (key: string) => {
    if (selectedTools.includes(key)) {
      setSelectedTools(selectedTools.filter(k => k !== key));
    } else {
      setSelectedTools([...selectedTools, key]);
    }
  };

  const totalStandard = selectedTools.reduce((acc, k) => acc + (bloatEstimates[k]?.standardSize || 0), 0);
  const totalMinimal = selectedTools.reduce((acc, k) => acc + (bloatEstimates[k]?.minimalistSize || 0), 0);
  const savedKb = Math.max(0, totalStandard - totalMinimal);
  const savedPercent = totalStandard > 0 ? Math.round((savedKb / totalStandard) * 100) : 0;

  return (
    <section id="philosophy" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <span className="text-cyan-600 dark:text-cyan-400">01</span>
          <span aria-hidden="true">/</span>
          <span>{t.philosophy.sectionTag}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
          {t.philosophy.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
          {t.philosophy.subhead}
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="minimal-card shimmer-card border-beam-glow rounded-2xl p-6 space-y-4 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-base font-semibold text-zinc-950 dark:text-white tracking-tight">
            {t.philosophy.pillar1Title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            {t.philosophy.pillar1Desc}
          </p>
          <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {t.philosophy.pillar1Principle}
          </div>
        </div>

        <div className="minimal-card shimmer-card border-beam-glow rounded-2xl p-6 space-y-4 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-950 dark:text-white tracking-tight">
            {t.philosophy.pillar2Title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            {t.philosophy.pillar2Desc}
          </p>
          <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {t.philosophy.pillar2Principle}
          </div>
        </div>

        <div className="minimal-card shimmer-card border-beam-glow rounded-2xl p-6 space-y-4 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-950 dark:text-white tracking-tight">
            {t.philosophy.pillar3Title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            {t.philosophy.pillar3Desc}
          </p>
          <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {t.philosophy.pillar3Principle}
          </div>
        </div>
      </div>

      {/* Interactive Anti-Bloat Impact Calculator */}
      <div className="minimal-card shimmer-card border-beam-glow rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white">
                {t.philosophy.calcTitle}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-light">
              {t.philosophy.calcDesc}
            </p>
          </div>
        </div>

        {/* Capability Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(bloatEstimates).map(([key, item]) => {
            const isSelected = selectedTools.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleTool(key)}
                className={`p-3.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-400 dark:border-cyan-600 shadow-sm'
                    : 'minimal-input opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-cyan-600 text-white' : 'border border-zinc-400 dark:border-zinc-600'}`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{t.philosophy.stdAbbrev}: ~{item.standardSize} KB</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t.philosophy.mcAbbrev}: ~{item.minimalistSize} KB</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Calculation Result */}
        <div className="minimal-input rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t.philosophy.calcTitle}
            </span>
            <div className="flex items-center gap-4 text-sm font-mono">
              <span className="text-zinc-400 dark:text-zinc-500 line-through">{t.philosophy.calcStandard}: {totalStandard} KB</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{t.philosophy.calcMinimalist}: {totalMinimal} KB</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              -{savedKb} KB ({savedPercent}%)
            </span>
            <span className="block text-[11px] text-zinc-500 font-mono">
              {t.philosophy.calcEliminated}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
