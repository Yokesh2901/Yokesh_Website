import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { scrollToSection } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white/90 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-mono-tech text-xs font-bold shadow-xs">
                YS
              </div>
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-mono-tech max-w-md leading-relaxed">
              {portfolioData.personal.headline} • Machine Learning & Data Systems Engineer specializing in computer vision safety, voice AI agents, and enterprise data engineering.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech text-slate-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
              <span>BASED IN CHENNAI, INDIA // 13.0827° N, 80.2707° E</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-slate-500 font-semibold mb-3">
              Navigation
            </div>
            <div className="flex flex-col space-y-1.5 text-xs font-mono-tech">
              <button
                onClick={() => {
                  soundManager.playClick();
                  scrollToSection('about');
                }}
                className="text-slate-600 hover:text-indigo-600 text-left transition-colors"
              >
                // 02. PHILOSOPHY & ETHOS
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  scrollToSection('skills');
                }}
                className="text-slate-600 hover:text-indigo-600 text-left transition-colors"
              >
                // 03. SKILLS MATRIX
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  scrollToSection('projects');
                }}
                className="text-slate-600 hover:text-indigo-600 text-left transition-colors"
              >
                // 04. PROJECTS ATELIER
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  scrollToSection('experience');
                }}
                className="text-slate-600 hover:text-indigo-600 text-left transition-colors"
              >
                // 05. EXPERIENCE TIMELINE
              </button>
            </div>
          </div>

          {/* Col 3: Direct Comms */}
          <div className="space-y-3">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-slate-500 font-semibold mb-3">
              Profiles & Contact
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all shadow-2xs"
                title="GitHub Profile"
                data-cursor="GITHUB"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all shadow-2xs"
                title="LinkedIn Profile"
                data-cursor="LINKEDIN"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all shadow-2xs"
                title="Email Transmission"
                data-cursor="EMAIL"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] font-mono-tech text-slate-600">
              {portfolioData.personal.email}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-500">
          <div>
            © 2026 {portfolioData.personal.name}. All verified credentials extracted from official portfolio records.
          </div>
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-all shadow-2xs"
            data-cursor="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
