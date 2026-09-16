import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Navbar, type StudioLighting } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsEcosystem } from './components/sections/SkillsEcosystem';
import { ProjectsShowcase } from './components/sections/ProjectsShowcase';
import { MLSystemsSandbox } from './components/sections/MLSystemsSandbox';
import { ExperiencePipeline } from './components/sections/ExperiencePipeline';
import { CredentialsSection } from './components/sections/CredentialsSection';
import { ContactTerminal } from './components/sections/ContactTerminal';
import { CustomCursor } from './components/common/CustomCursor';
import { CommandPalette } from './components/common/CommandPalette';
import { ScrollBackground } from './components/common/ScrollBackground';
import { ScrollProgressRail } from './components/common/ScrollProgressRail';
import { ScrollAssemblyCanvas } from './components/3d/ScrollAssemblyCanvas';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { ResumeModal } from './components/modals/ResumeModal';
import type { Project } from './data/types';
import { portfolioData } from './data/portfolioData';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [lightingMode, setLightingMode] = useState<StudioLighting>('daylight');

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProgressVal(v);
    });
  }, [scrollYProgress]);

  const handleCycleLighting = () => {
    setLightingMode((prev) => {
      if (prev === 'daylight') return 'prism';
      if (prev === 'prism') return 'twilight';
      return 'daylight';
    });
  };

  const handleSelectProjectById = (projectId: string) => {
    const proj = portfolioData.projects.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-700 selection:bg-indigo-500/15 selection:text-indigo-900 ${
        lightingMode === 'twilight'
          ? 'bg-[#090d16] text-slate-100'
          : lightingMode === 'prism'
          ? 'bg-[#f9fafc] text-slate-900'
          : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Dynamic Scroll-Linked Generative Background */}
      <ScrollBackground lightingMode={lightingMode} />

      {/* Persistent Progressive 3D Model Assembly (Materializes from scattered points to 100% complete core) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-80 overflow-hidden">
        <ScrollAssemblyCanvas scrollProgress={scrollProgressVal} />
      </div>

      {/* Floating Scroll Depth Rail */}
      <ScrollProgressRail />

      {/* Precision Custom Pointer */}
      <CustomCursor />

      {/* Floating Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        lightingMode={lightingMode}
        onCycleLighting={handleCycleLighting}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 space-y-12 sm:space-y-16">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <AboutSection />
        <SkillsEcosystem />
        <ProjectsShowcase onSelectProject={(project) => setSelectedProject(project)} />
        <MLSystemsSandbox />
        <ExperiencePipeline />
        <CredentialsSection />
        <ContactTerminal />
      </main>

      {/* Futuristic Command Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={handleSelectProjectById}
      />
    </div>
  );
}

export default App;
