import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/audio';
import { Code2, Brain, Eye, Database, Server, Compass, CheckCircle } from 'lucide-react';

export const SkillsEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('programming');

  const categoryIcons: Record<string, React.ReactNode> = {
    'programming': <Code2 className="w-4 h-4" />,
    'ml-nlp': <Brain className="w-4 h-4" />,
    'deep-learning-cv': <Eye className="w-4 h-4" />,
    'data-engineering': <Database className="w-4 h-4" />,
    'backend-apis': <Server className="w-4 h-4" />,
    'methodologies': <Compass className="w-4 h-4" />
  };

  const currentCategoryData = portfolioData.skills.find(
    (cat) => cat.id === selectedCategory
  ) || portfolioData.skills[0];

  const handleSelectCategory = (id: string) => {
    soundManager.playSwitch();
    setSelectedCategory(id);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 03. TECHNICAL ECOSYSTEM"
        title="Engineering Domains"
        subtitle="A verified technical matrix grouped by engineering domain. Select any cluster to inspect connection pathways and real-world deployment context."
        badge="NEURAL SKILL MAP"
      />

      {/* Category Cluster Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {portfolioData.skills.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono-tech transition-all duration-300 border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white hover:border-slate-300 shadow-xs'
              }`}
              data-cursor={cat.name}
            >
              <span>{categoryIcons[cat.id]}</span>
              <span className="font-semibold">{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {cat.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Ecosystem Display */}
      <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden bg-white/80 shadow-sm">
        {/* Dynamic Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-indigo-700 font-semibold">
              <span>DOMAIN::</span>
              <span className="font-bold text-slate-900 uppercase">{currentCategoryData.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-800 font-medium">
                {currentCategoryData.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {currentCategoryData.description}
            </p>
          </div>

          <div className="font-mono-tech text-[11px] text-slate-500 self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
            <span>VERIFIED IN PRODUCTION</span>
          </div>
        </div>

        {/* Skill Node Grid with Verified Deployment Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategoryData.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 group relative"
            >
              {/* Tactical Node Indicator */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
                  <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {skill.name}
                  </h4>
                </div>
                <span className="font-mono-tech text-[10px] text-slate-400">
                  #{String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Verified Context extracted from resume/projects */}
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                {skill.verifiedContext}
              </p>

              {/* Node Verification Marker */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between font-mono-tech text-[10px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>APPLIED IN CODE</span>
                </span>
                <span className="text-slate-400">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-slate-500 gap-2">
          <div>
            SOURCE OF TRUTH: 100% EXTRACTED FROM SUBMITTED RESUME & PROJECT RECORDS
          </div>
          <div className="text-indigo-700 font-semibold">
            {currentCategoryData.skills.length} TECHNOLOGIES IN THIS CLUSTER
          </div>
        </div>
      </div>
    </section>
  );
};
