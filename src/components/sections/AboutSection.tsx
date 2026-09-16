import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { ShieldCheck, HeartHandshake, Binary, Database, CheckCircle, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 02. PHILOSOPHY & CRAFTSMANSHIP"
        title="Engineering with Purpose"
        subtitle="Moving machine learning out of isolated notebooks into resilient systems that protect human lives, simplify interfaces, and scale predictably."
        badge="HUMAN TOUCH"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Engineering Storytelling Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="cyber-panel p-6 sm:p-8 rounded-3xl space-y-5 bg-white/80">
            <div className="flex items-center gap-2 text-indigo-700 font-mono-tech text-xs font-semibold uppercase">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>THE PERSPECTIVE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-snug">
              Machine learning isn't just about loss curves—it's about operational reliability when real stakes are on the line.
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Throughout my 2.5+ years working across <strong>Innodata</strong>, <strong>Amazon</strong>, and <strong>Innodatics</strong>, I've seen that the hardest part of ML isn't training a baseline model—it's the end-to-end discipline: collecting custom data when none exists, designing clean augmentation pipelines, testing failure modes, and ensuring sub-second inference at the edge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-mono-tech text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Industrial Safety</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Curated a 486-image dataset to detect explosive canisters in scrap metal before reaching blast furnaces, safeguarding plant workers and equipment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-mono-tech text-xs font-semibold">
                  <HeartHandshake className="w-4 h-4 text-indigo-600" />
                  <span>Language Accessibility</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Built VIKI to converse naturally in Tamil with GPT-4o function-calling and sentiment classification, performing warm transfers when urgency is detected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-mono-tech text-xs font-semibold">
                  <Binary className="w-4 h-4 text-indigo-600" />
                  <span>Mathematical Filtering</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Damped high-frequency tracking jitter with a custom Kalman-filter utility layer, transforming 21 webcam landmarks into butter-smooth OS control.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-mono-tech text-xs font-semibold">
                  <Database className="w-4 h-4 text-indigo-600" />
                  <span>Data Highways</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Engineered enterprise ETL architectures using Azure Data Factory and Synapse Analytics, enforcing data governance standards on large datasets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Personal Profile & Verified Foundations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="cyber-panel p-6 sm:p-8 rounded-3xl space-y-6 bg-white/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  {portfolioData.personal.name}
                </h4>
                <div className="font-mono-tech text-xs text-indigo-600 font-medium">
                  {portfolioData.personal.location}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                VERIFIED CREDENTIALS
              </span>
            </div>

            {/* Core Pillars */}
            <div className="space-y-3 font-mono-tech text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">CRISP-ML(Q) End-to-End Delivery</div>
                  <div className="text-slate-500 font-sans text-xs mt-0.5">
                    Ownership from business requirements through data augmentation to edge deployment.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">450+ LeetCode Solutions</div>
                  <div className="text-slate-500 font-sans text-xs mt-0.5">
                    Deep intuition for algorithmic complexity, tree structures, dynamic programming, and graphs.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">Cross-Functional Agile Ownership</div>
                  <div className="text-slate-500 font-sans text-xs mt-0.5">
                    Working alongside software engineers and product owners at Amazon, Innodata, and Innodatatics.
                  </div>
                </div>
              </div>
            </div>

            {/* Education Summary */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-mono-tech text-xs text-slate-600">
              <span>{portfolioData.education.degree}</span>
              <span className="font-bold text-indigo-700">CGPA {portfolioData.education.cgpa}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
