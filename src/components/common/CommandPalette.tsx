import React, { useState, useEffect } from 'react';
import { Search, Command, ExternalLink, Code2, Briefcase, FileText, Mail, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { scrollToSection } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundManager.playSwitch();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = portfolioData.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.categoryLabel.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (callback: () => void) => {
    soundManager.playClick();
    callback();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl cyber-panel rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white relative">
        {/* Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50/70">
          <Search className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, technologies, or commands (e.g. 'YOLO', 'VIKI', 'Resume')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm font-mono-tech focus:outline-none"
          />
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3.5 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase text-slate-400 font-semibold">
              Direct Access
            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleAction(() => onOpenResume())}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-slate-800 font-medium group-hover:text-indigo-600">Access Official Resume</span>
                </div>
                <span className="font-mono-tech text-[10px] text-indigo-600 font-semibold">DOSSIER</span>
              </button>

              <button
                onClick={() => handleAction(() => scrollToSection('contact'))}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-slate-800 font-medium group-hover:text-emerald-700">Contact Yokesh S</span>
                </div>
                <span className="font-mono-tech text-[10px] text-emerald-700 font-semibold">COMMS</span>
              </button>

              <button
                onClick={() => handleAction(() => scrollToSection('skills'))}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-sky-600" />
                  <span className="text-sm text-slate-800 font-medium group-hover:text-sky-700">Explore Neural Skills Matrix</span>
                </div>
                <span className="font-mono-tech text-[10px] text-sky-700 font-semibold">MATRIX</span>
              </button>
            </div>
          </div>

          {/* Filtered Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase text-slate-400 font-semibold">
                Verified Projects ({filteredProjects.length})
              </div>
              <div className="mt-1 space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleAction(() => onSelectProject(proj.id))}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent text-left transition-all group"
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                      <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div className="truncate">
                        <span className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 block truncate">
                          {proj.title}
                        </span>
                        <span className="text-xs text-slate-500 block truncate">
                          {proj.technologies.slice(0, 4).join(', ')}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono-tech text-[10px] text-slate-400 shrink-0">
                      {proj.number}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase text-slate-400 font-semibold">
              External Profiles
            </div>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium transition-all"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium transition-all"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] font-mono-tech text-slate-500">
          <div className="flex items-center gap-2">
            <Command className="w-3 h-3 text-indigo-600" />
            <span>PRESS ESC TO CLOSE</span>
          </div>
          <span>YOKESH S PORTFOLIO</span>
        </div>
      </div>
    </div>
  );
};
