import React, { useState, useRef, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { SettingsModal } from './components/SettingsModal';
import { LiquidGlassBackground } from './components/LiquidGlassBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VibePhilosophy } from './components/VibePhilosophy';
import { ServerToolsCard } from './components/ServerToolsCard';
import { Footer } from './components/Footer';

function MainContent() {
  const { settings, toggleTheme, openSettings } = useSettings();

  // Sound generator
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const subOscRef = useRef<OscillatorNode | null>(null);

  // Web Audio API Ambient Coding Drone (432Hz warm ambient tone)
  const toggleSound = () => {
    if (isSoundPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            subOscRef.current?.stop();
            audioCtxRef.current?.close();
          } catch (e) {}
          audioCtxRef.current = null;
          setIsSoundPlaying(false);
        }, 800);
      } else {
        setIsSoundPlaying(false);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const mainOsc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        mainOsc.type = 'sine';
        mainOsc.frequency.setValueAtTime(216, ctx.currentTime);

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(108, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2);

        mainOsc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        mainOsc.start();
        subOsc.start();

        oscRef.current = mainOsc;
        subOscRef.current = subOsc;
        gainNodeRef.current = gainNode;

        setIsSoundPlaying(true);
      } catch (err) {
        console.warn('AudioContext not allowed or unsupported in current environment', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Interactive Liquid Glass Background */}
      <LiquidGlassBackground theme={settings.theme} />

      {/* Navigation Bar */}
      <Navbar 
        onToggleSound={toggleSound} 
        isSoundPlaying={isSoundPlaying}
        theme={settings.theme}
        onToggleTheme={toggleTheme}
        onOpenSettings={openSettings}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <VibePhilosophy />
        <ServerToolsCard />
      </main>

      {/* Minimalist Footer */}
      <Footer onOpenSettings={openSettings} />

      {/* Dedicated Separated Settings Modal */}
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MainContent />
    </SettingsProvider>
  );
}
