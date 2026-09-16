import React, { useState, useEffect } from 'react';
import { Menu, X, Command, FileText, Sun, Moon, Sparkles } from 'lucide-react';
import { AudioController } from '../common/AudioController';
import { scrollToSection } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';

export type StudioLighting = 'daylight' | 'prism' | 'twilight';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  lightingMode?: StudioLighting;
  onCycleLighting?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenCommandPalette,
  lightingMode = 'daylight',
  onCycleLighting
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'OVERVIEW', code: '01' },
    { id: 'about', label: 'PHILOSOPHY', code: '02' },
    { id: 'skills', label: 'SKILLS', code: '03' },
    { id: 'projects', label: 'PROJECTS', code: '04' },
    { id: 'sandbox', label: 'SANDBOX', code: '05' },
    { id: 'experience', label: 'EXPERIENCE', code: '06' },
    { id: 'credentials', label: 'CREDENTIALS', code: '07' },
    { id: 'contact', label: 'CONTACT', code: '08' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`w-full max-w-7xl rounded-2xl border transition-all duration-300 pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 ${
          isScrolled
            ? 'bg-white/85 border-slate-200 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06)] backdrop-blur-xl'
            : 'bg-white/60 border-slate-200/60 backdrop-blur-md shadow-xs'
        }`}
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-mono-tech text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
              YS
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                YOKESH S
              </div>
              <div className="hidden sm:flex items-center gap-1.5 font-mono-tech text-[10px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />
                <span>ML & DATA ENGINEER</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation HUD Links */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/70 border border-slate-200/80">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                data-cursor={item.label}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-indigo-900 font-semibold bg-white shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Tactical Tools & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Studio Lighting Preset Switcher */}
          <button
            onClick={() => {
              soundManager.playSwitch();
              onCycleLighting?.();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300 text-slate-700 text-xs font-mono-tech transition-all shadow-xs"
            title={`Studio Lighting: ${lightingMode.toUpperCase()} (Click to change atmosphere)`}
            data-cursor="LIGHTING"
          >
            {lightingMode === 'twilight' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            ) : lightingMode === 'prism' ? (
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span className="text-[10px] hidden md:inline uppercase font-semibold text-slate-600">
              {lightingMode}
            </span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <AudioController />

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              soundManager.playSwitch();
              onOpenCommandPalette();
            }}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300 text-slate-600 text-xs font-mono-tech transition-all shadow-xs"
            title="Command Palette (Cmd+K / Ctrl+K)"
            data-cursor="SEARCH"
          >
            <Command className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[10px] text-slate-400 hidden xl:inline">⌘K</span>
          </button>

          {/* Access Resume CTA */}
          <button
            onClick={() => {
              soundManager.playOpenModal();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-medium text-xs shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            data-cursor="RESUME"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span className="font-semibold tracking-wide">RESUME</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-indigo-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-white/95 rounded-2xl p-4 border border-slate-200 shadow-xl pointer-events-auto backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono-tech text-left ${
                  activeSection === item.id
                    ? 'bg-indigo-50 text-indigo-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-400">{item.code}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-2 text-xs font-mono-tech text-indigo-600 py-1"
              >
                <Command className="w-3.5 h-3.5" />
                <span>SEARCH (⌘K)</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs"
              >
                VIEW RESUME
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
