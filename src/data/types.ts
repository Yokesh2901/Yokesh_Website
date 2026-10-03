export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'FLAGSHIP_DL_CV' | 'VOICE_AI_AGENTS' | 'DATA_SCIENCE_ML' | 'FULL_STACK_QUANT';
  categoryLabel: string;
  featured: boolean;
  technologies: string[];
  problem: string;
  approach: string[];
  result: string;
  metrics?: string[];
  architecture?: string[];
  github?: string;
  demo?: string;
  interactiveType: 'blast-furnace' | 'voice-viki' | 'hand-gesture' | 'agent-cron' | 'downtime-stream' | 'movie-rating' | 'employee-scoring' | 'trading' | 'game' | 'desktop-pet' | 'agent-shield';
}

export interface SkillItem {
  name: string;
  verifiedContext: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  badge: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  cgpa: string;
  year: string;
  details: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  details: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    experienceYears: string;
    leetcodeProblems: string;
    summary: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education;
  certifications: Certification[];
  highlights: string[];
}
