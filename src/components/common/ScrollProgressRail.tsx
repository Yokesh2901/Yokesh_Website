import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { scrollToSection } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';

export const ScrollProgressRail: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const [percent, setPercent] = useState(0);

  const milestones = [
    { id: 'hero', label: '01', title: 'Overview' },
    { id: 'about', label: '02', title: 'Philosophy' },
    { id: 'skills', label: '03', title: 'Skills' },
    { id: 'projects', label: '04', title: 'Projects' },
    { id: 'sandbox', label: '05', title: 'Sandbox' },
    { id: 'experience', label: '06', title: 'Experience' },
    { id: 'credentials', label: '07', title: 'Credentials' },
    { id: 'contact', label: '08', title: 'Contact' }
  ];

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercent(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  const handleClick = (id: string) => {
    soundManager.playClick();
    scrollToSection(id);
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 select-none">
      {/* Percentage Gauge */}
      <div className="font-mono-tech text-[9px] text-slate-400 tracking-wider">
        {percent}%
      </div>

      {/* Vertical Rail Container */}
      <div className="relative w-[2px] h-48 bg-slate-200/80 rounded-full overflow-hidden flex flex-col justify-start">
        {/* Animated Fill Bar */}
        <motion.div
          className="w-full bg-gradient-to-b from-indigo-500 to-blue-500 origin-top rounded-full"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      {/* Section Node Dots */}
      <div className="flex flex-col gap-2.5">
        {milestones.map((m) => (
          <button
            key={m.id}
            onClick={() => handleClick(m.id)}
            className="group relative flex items-center justify-center p-1"
            data-cursor={m.title}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-600 group-hover:scale-150 transition-all" />
            
            {/* Tooltip Label */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-xs font-mono-tech text-[10px] text-slate-700 whitespace-nowrap">
              {m.label}. {m.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
