import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, Award, Binary, CheckCircle } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 06. ACADEMICS & CERTIFICATIONS"
        title="Verified Credentials"
        subtitle="University foundations in computer applications, certified data science specializations, and extensive algorithmic problem solving."
        badge="VALIDATED"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Education Card */}
        <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden flex flex-col justify-between bg-white/80 shadow-sm">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-indigo-700 mb-4 border-b border-slate-200 pb-3">
              <span className="flex items-center gap-1.5 font-semibold">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>ACADEMIC FOUNDATION</span>
              </span>
              <span className="text-slate-500">{portfolioData.education.year}</span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">
              {portfolioData.education.degree}
            </h3>
            <div className="text-sm font-mono-tech text-slate-600 mt-1">
              {portfolioData.education.institution}
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between font-mono-tech">
              <span className="text-xs text-indigo-900 uppercase font-semibold">CUMULATIVE CGPA</span>
              <span className="text-lg font-bold text-indigo-700">
                {portfolioData.education.cgpa}
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-600 font-sans leading-relaxed">
              {portfolioData.education.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono-tech text-slate-500 mt-6">
            OFFICIALLY CONFERRED DEGREE
          </div>
        </div>

        {/* LeetCode Milestone Module */}
        <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden flex flex-col justify-between bg-white/80 shadow-sm">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-indigo-700 mb-4 border-b border-slate-200 pb-3">
              <span className="flex items-center gap-1.5 font-semibold">
                <Binary className="w-4 h-4 text-indigo-600" />
                <span>ALGORITHMIC RIGOR</span>
              </span>
              <span className="text-emerald-700 font-medium">450+ MILESTONE</span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">
              LeetCode Problem Solving
            </h3>
            <div className="text-sm font-mono-tech text-slate-600 mt-1">
              Data Structures & Algorithmic Foundations
            </div>

            <div className="my-4 p-5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
              <div className="text-4xl font-extrabold text-indigo-900 font-display">
                {portfolioData.personal.leetcodeProblems}
              </div>
              <div className="text-xs font-mono-tech text-indigo-700 uppercase tracking-wider mt-1 font-medium">
                Problems Solved
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Reflects strong problem-solving fundamentals across dynamic programming, graph traversal, trees, heaps, sliding windows, and algorithmic complexity optimizations.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono-tech text-slate-500 mt-6">
            VERIFIED IN OFFICIAL RESUME
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="cyber-panel p-6 sm:p-8 rounded-3xl border-slate-200/90 relative overflow-hidden flex flex-col justify-between bg-white/80 shadow-sm">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-indigo-700 mb-4 border-b border-slate-200 pb-3">
              <span className="flex items-center gap-1.5 font-semibold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>CERTIFICATIONS</span>
              </span>
              <span className="text-slate-500">{portfolioData.certifications.length} CREDENTIALS</span>
            </div>

            <div className="space-y-3.5">
              {portfolioData.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="text-[11px] font-mono-tech text-indigo-700 pl-5 font-medium">
                    {cert.issuer}
                  </div>
                  <p className="text-xs text-slate-600 pl-5 font-sans leading-normal">
                    {cert.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono-tech text-slate-500 mt-6">
            VALIDATED SPECIALIZATIONS
          </div>
        </div>
      </div>
    </section>
  );
};
