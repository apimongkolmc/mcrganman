import React, { useState } from 'react';
import { 
  Server, 
  ExternalLink, 
  Coins, 
  Compass, 
  ShoppingBag, 
  Send, 
  Sparkles, 
  Info, 
  X, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const ServerToolsCard: React.FC = () => {
  const { t } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetUrl = 'http://servertools-mcrganman.page.gd';

  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <section id="servertools" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <span className="text-cyan-600 dark:text-cyan-400">02</span>
          <span aria-hidden="true">/</span>
          <span>{t.servertools.sectionTag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
          {t.servertools.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
          {t.servertools.subhead}
        </p>
      </div>

      {/* Main ServerTools Card with Rounded Corners & Beautiful Shading */}
      <div className="minimal-card shimmer-card border-beam-glow rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Top Header Row with Official Pack Icon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700/80 shadow-md shrink-0 bg-zinc-900 group hover:border-cyan-500/80 transition-all duration-300 hover:scale-105">
              <img
                src="/pack_icon.png"
                alt="ServerTools Minecraft Bedrock Pack Icon"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ imageRendering: 'pixelated' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-display">
                  ServerTools
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-pixel font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  {t.servertools.comingSoon}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5" />
                  {t.servertools.wipBadge}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                servertools-mcrganman.page.gd
              </div>
            </div>
          </div>

          {/* More Info Button (Triggers Redirect Popup) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium minimal-button-primary group shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>{t.servertools.moreInfo}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Grid: Minecraft Bedrock Add-ons & Systems */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6">
          {/* Economy System */}
          <div className="p-4 rounded-2xl minimal-input space-y-2 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-md transition-all duration-200 group cursor-default">
            <div className="flex items-center gap-2 text-amber-500">
              <Coins className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                {t.servertools.economyTitle}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {t.servertools.economyDesc}
            </p>
          </div>

          {/* Teleport Request (/tpa) */}
          <div className="p-4 rounded-2xl minimal-input space-y-2 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md transition-all duration-200 group cursor-default">
            <div className="flex items-center gap-2 text-cyan-500">
              <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                {t.servertools.tpaTitle}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {t.servertools.tpaDesc}
            </p>
          </div>

          {/* Random Teleport (/rtp) */}
          <div className="p-4 rounded-2xl minimal-input space-y-2 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md transition-all duration-200 group cursor-default">
            <div className="flex items-center gap-2 text-indigo-500">
              <Compass className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                {t.servertools.rtpTitle}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {t.servertools.rtpDesc}
            </p>
          </div>

          {/* In-Game Shop (/shop) */}
          <div className="p-4 rounded-2xl minimal-input space-y-2 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md transition-all duration-200 group cursor-default">
            <div className="flex items-center gap-2 text-emerald-500">
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                {t.servertools.shopTitle}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {t.servertools.shopDesc}
            </p>
          </div>
        </div>

        {/* Footer Sub-note */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t.servertools.footerNote}</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-cyan-600 dark:text-cyan-400 hover:underline text-left sm:text-right"
          >
            {t.servertools.previewDetails}
          </button>
        </div>
      </div>

      {/* Redirect Warning & Information Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 minimal-card shadow-2xl border border-zinc-200 dark:border-zinc-700/80 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white font-display">
                    {t.servertools.modalTitle}
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">servertools-mcrganman.page.gd</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg minimal-button text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              {t.servertools.modalDesc}
            </p>

            <div className="p-3.5 rounded-xl minimal-input text-xs font-mono text-cyan-600 dark:text-cyan-400 flex items-center justify-between break-all">
              <span>{targetUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium minimal-button"
              >
                {t.servertools.modalCancel}
              </button>
              <button
                onClick={handleProceed}
                className="px-5 py-2 rounded-xl text-xs font-semibold minimal-button-primary flex items-center gap-1.5"
              >
                <span>{t.servertools.modalProceed}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
