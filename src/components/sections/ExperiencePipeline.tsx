import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/audio';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

export const ExperiencePipeline: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<string>(
    portfolioData.experiences[0].id
  );

  const currentExp = portfolioData.experiences.find(
    (e) => e.id === selectedExperience
  ) || portfolioData.experiences[0];

  const handleSelectExp = (id: string) => {
    soundManager.playClick();
    setSelectedExperience(id);
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 05. CAREER TIMELINE"
        title="Professional Experience"
        subtitle="2.5+ years of verified industry experience engineering data pipelines, ML model evaluation workflows, and enterprise data governance."
        badge="EXPERIENCE"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Timeline Navigation */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono-tech uppercase text-slate-500 tracking-wider mb-2 px-1">
            // Sequential Positions
          </div>

          {portfolioData.experiences.map((exp, index) => {
            const isSelected = selectedExperience === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => handleSelectExp(exp.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative ${
                  isSelected
                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
                data-cursor="SELECT_ROLE"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                      <span className="font-mono-tech text-xs text-indigo-700 font-semibold">
                        0{index + 1}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-900">
                      {exp.role}
                    </h4>
                    <div className="text-sm text-slate-600 font-medium font-sans">
                      {exp.company}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 font-mono-tech text-[10px] text-slate-600 shrink-0 font-medium">
                    {exp.duration}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Experience Panel */}
        <div className="lg:col-span-7">
          <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden bg-white/85 shadow-sm">
            {/* Role Header */}
            <div className="border-b border-slate-200 pb-5 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech text-indigo-700 mb-2">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>ACTIVE RECORD</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentExp.duration}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                {currentExp.role}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-600 font-mono-tech">
                <span className="text-indigo-800 font-bold">{currentExp.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentExp.location}</span>
                </span>
              </div>
            </div>

            {/* Core Responsibilities */}
            <div className="space-y-4 font-sans mb-8">
              <div className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider">
                // Responsibilities & Deliverables
              </div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {currentExp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider mb-2.5">
                // Applied Competencies
              </div>
              <div className="flex flex-wrap gap-2">
                {currentExp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono-tech text-xs text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
