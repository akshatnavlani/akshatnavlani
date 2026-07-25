export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string[];
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  org?: string;
  detail?: string;
}

export interface LeadershipRole {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  highlights: string[];
  coursework: string[];
}
