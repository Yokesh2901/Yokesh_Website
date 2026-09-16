import React from 'react';

interface SectionHeadingProps {
  code: string;
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  code,
  title,
  subtitle,
  badge,
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 relative ${className}`}>
      {/* Code & Badge Header Line */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono-tech text-xs tracking-wider text-indigo-600 font-semibold uppercase">
          {code}
        </span>
        <div className="h-[1px] w-6 bg-indigo-200" />
        {badge && (
          <span className="px-2.5 py-0.5 text-[10px] font-mono-tech tracking-wider uppercase text-indigo-800 bg-indigo-50 border border-indigo-100 rounded-full font-medium shadow-xs">
            {badge}
          </span>
        )}
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 flex items-baseline gap-3">
        <span>{title}</span>
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shadow-sm" />
      </h2>

      {/* Subtitle Description */}
      <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
        {subtitle}
      </p>

      {/* Subtle Divider Line */}
      <div className="mt-6 w-full h-[1px] bg-gradient-to-r from-slate-200 via-indigo-100 to-transparent flex items-center justify-between">
        <div className="w-1.5 h-1.5 rounded-full -translate-y-1/2 bg-indigo-500" />
      </div>
    </div>
  );
};
