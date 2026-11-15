import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

interface BackgroundProps {
  theme?: 'dark' | 'light';
}

export const LiquidGlassBackground: React.FC<BackgroundProps> = ({ theme = 'dark' }) => {
  const { settings } = useSettings();
  const isDark = (settings?.theme || theme) === 'dark';
  const showGlass = settings?.liquidGlass ?? true;
  const showAnim = settings?.animations ?? true;

  // Interactive mouse glow coordinates
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!showAnim) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showAnim]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Base Canvas Layer */}
      <div className={`absolute inset-0 transition-colors duration-300 ${isDark ? 'bg-[#09090b]' : 'bg-[#fafafa]'}`} />

      {/* Interactive Liquid Mouse Glow Spotlight (Follows cursor smoothly) */}
      {showAnim && (
        <div 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-500 blur-[90px]"
          style={{
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            background: isDark 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 80%)' 
              : 'radial-gradient(circle, rgba(14, 165, 233, 0.09) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 80%)',
            opacity: mousePos.x > 0 ? 1 : 0,
            transition: 'opacity 0.4s ease, left 0.1s cubic-bezier(0.1, 0.9, 0.2, 1), top 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)',
          }}
        />
      )}

      {/* Top Center Ambient Radiant Sun */}
      <div 
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[110px] transition-all duration-700 pointer-events-none ${
          isDark ? 'opacity-30' : 'opacity-40'
        } ${showAnim ? 'animate-glow-breathe' : ''}`}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.35) 0%, rgba(129, 140, 248, 0.18) 45%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.22) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 75%)',
        }}
      />

      {/* Dynamic Floating Liquid Glass Ambient Caustics */}
      {showGlass && (
        <>
          {/* Cyan Fluid Orb (Floating slow) */}
          <div 
            className={`absolute top-1/3 -left-20 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
              isDark ? 'opacity-20 bg-cyan-500/25' : 'opacity-25 bg-sky-400/25'
            } ${showAnim ? 'animate-float-slow' : ''}`}
          />
          {/* Indigo Fluid Orb (Floating reverse) */}
          <div 
            className={`absolute bottom-1/4 -right-20 w-[460px] h-[460px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
              isDark ? 'opacity-20 bg-purple-600/20' : 'opacity-25 bg-indigo-400/20'
            } ${showAnim ? 'animate-float-reverse' : ''}`}
          />
          {/* Emerald Subtle Accent Glow near bottom */}
          <div 
            className={`absolute bottom-10 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
              isDark ? 'opacity-10 bg-emerald-500/15' : 'opacity-15 bg-emerald-400/15'
            }`}
          />
        </>
      )}

      {/* Subtle Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
};
