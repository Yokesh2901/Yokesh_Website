import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import type { Project } from '../../data/types';
import { ProjectVisualizer } from './ProjectVisualizers';
import { GithubIcon } from '../common/BrandIcons';
import { TiltCard } from '../common/TiltCard';
import { soundManager } from '../../utils/audio';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onSelectProject
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'ALL SYSTEMS (10)' },
    { id: 'FLAGSHIP_DL_CV', label: 'DEEP LEARNING & CV' },
    { id: 'VOICE_AI_AGENTS', label: 'VOICE AI & AGENTS' },
    { id: 'DATA_SCIENCE_ML', label: 'DATA SCIENCE & ML' },
    { id: 'FULL_STACK_QUANT', label: 'QUANT & FULL-STACK' }
  ];

  const filteredProjects = portfolioData.projects.filter((proj) => {
    if (activeFilter === 'ALL') return true;
    return proj.category === activeFilter;
  });

  const handleFilterChange = (id: string) => {
    soundManager.playSwitch();
    setActiveFilter(id);
  };

  const handleProjectClick = (proj: Project) => {
    soundManager.playOpenModal();
    onSelectProject(proj);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 04. PROJECTS ATELIER"
        title="Production Systems & Research"
        subtitle="End-to-end machine learning pipelines, deep learning safety systems, autonomous voice agents, and spatial algorithms delivered with engineering discipline."
        badge="PROJECT ARCHIVE"
      />

      {/* Filter Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech text-slate-500">
          <Filter className="w-3.5 h-3.5 text-indigo-600" />
          <span>FILTER::</span>
        </div>
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleFilterChange(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono-tech transition-all border ${
                isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white shadow-2xs'
              }`}
              data-cursor={tab.label}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Flagship Projects Featured Grid with 3D Tilt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {filteredProjects
          .filter((p) => p.featured)
          .map((project) => (
            <TiltCard key={project.id} maxTilt={5}>
              <div className="cyber-panel rounded-3xl p-6 sm:p-8 border-slate-200/90 relative overflow-hidden flex flex-col justify-between group hover:border-indigo-300 hover:shadow-xl transition-all duration-300 bg-white/85 h-full">
                <div>
                  {/* Project Meta Bar */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-xs text-indigo-700 font-bold">
                        SYSTEM_{project.number}
                      </span>
                      <span className="text-slate-300 font-mono-tech text-xs">//</span>
                      <span className="text-[11px] font-mono-tech text-slate-600 uppercase">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-mono-tech text-indigo-800 font-medium">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>FLAGSHIP</span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* Interactive Simulation Module */}
                  <div className="my-6">
                    <ProjectVisualizer interactiveType={project.interactiveType} />
                  </div>

                  {/* Key Results Summary */}
                  <p className="text-xs text-slate-700 leading-relaxed font-sans mb-4">
                    <strong className="text-indigo-700 font-mono-tech uppercase font-semibold">Outcome: </strong>
                    {project.result}
                  </p>
                </div>

                {/* Technologies & Actions */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono-tech text-[11px] text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono-tech text-[11px] text-slate-400">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="flex items-center gap-2 text-xs font-mono-tech text-indigo-600 hover:text-indigo-800 font-semibold group/btn"
                      data-cursor="INSPECT"
                    >
                      <span>INSPECT DOSSIER & SPECS</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
                      title="View GitHub Repository"
                      data-cursor="GITHUB"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
      </div>

      {/* Additional Projects Showcase with 3D Tilt */}
      <div className="space-y-4">
        <div className="font-mono-tech text-xs tracking-wider uppercase text-slate-500 px-1">
          // Additional Systems & Explorations
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects
            .filter((p) => !p.featured)
            .map((project) => (
              <TiltCard key={project.id} maxTilt={8} onClick={() => handleProjectClick(project)}>
                <div
                  className="cyber-panel p-5 rounded-2xl border-slate-200/90 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all duration-300 group flex flex-col justify-between bg-white/80 h-full"
                  data-cursor="INSPECT"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500 mb-2">
                      <span className="text-indigo-700 font-semibold">SYSTEM_{project.number}</span>
                      <span className="truncate max-w-[150px]">{project.categoryLabel}</span>
                    </div>

                    <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-sans line-clamp-3 mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 font-mono-tech text-[10px] text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech text-indigo-600 font-medium">
                      <span>VIEW DOSSIER</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
        </div>
      </div>
    </section>
  );
};
