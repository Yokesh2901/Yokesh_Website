import { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, AlertTriangle, Layers, Box } from 'lucide-react';
import type { Project } from '../../data/types';
import { ProjectVisualizer } from '../sections/ProjectVisualizers';
import { ProjectPipeline3D } from '../3d/ProjectPipeline3D';
import { GithubIcon } from '../common/BrandIcons';
import { soundManager } from '../../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  const [viewMode, setViewMode] = useState<'simulator' | 'pipeline'>('simulator');

  if (!project) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-4xl cyber-panel rounded-3xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-2xl my-8 bg-white text-slate-900">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-indigo-700 font-semibold">
              <span>PROJECT_{project.number} //</span>
              <span className="text-slate-500">{project.categoryLabel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shrink-0"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher: Interactive Simulator vs 3D Pipeline Exploder */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              soundManager.playSwitch();
              setViewMode('simulator');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono-tech transition-all border ${
              viewMode === 'simulator'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => {
              soundManager.playSwitch();
              setViewMode('pipeline');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono-tech transition-all border ${
              viewMode === 'pipeline'
                ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Pipeline Exploder</span>
          </button>
        </div>

        {/* Visualizer Simulation or 3D Pipeline Block */}
        <div className="mb-6">
          {viewMode === 'simulator' ? (
            <ProjectVisualizer interactiveType={project.interactiveType} />
          ) : (
            <ProjectPipeline3D interactiveType={project.interactiveType} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          {/* Problem Statement */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-amber-800 uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>The Engineering Problem</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Results & Delivery */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
            <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-emerald-800 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Results & Real-World Impact</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* Technical Approach */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-indigo-900 uppercase">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Technical Methodology & Architecture</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
            {project.approach.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics List */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
            <div className="font-mono-tech text-xs font-semibold text-indigo-900 uppercase">
              // Key Benchmarks & Verifications
            </div>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white border border-indigo-200/80 font-mono-tech text-xs text-indigo-900 shadow-2xs font-medium"
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 font-mono-tech text-xs font-semibold text-slate-500 uppercase">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Verified Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono-tech text-xs text-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-slate-500">
            OFFICIAL RECORD VERIFIED // YOKESH S ARCHIVE
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition-all shadow-sm"
                data-cursor="GITHUB"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW ON GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-mono-tech text-slate-700 shadow-2xs"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
