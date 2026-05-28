// ─── Services ────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

export const services: Service[] = [
  { id: "company-building", icon: "Building2", titleKey: "services.items.0.title", descKey: "services.items.0.desc" },
  { id: "ai-integration",   icon: "Cpu",       titleKey: "services.items.1.title", descKey: "services.items.1.desc" },
  { id: "tech-strategy",    icon: "Layers",    titleKey: "services.items.2.title", descKey: "services.items.2.desc" },
  { id: "mvp-dev",          icon: "Zap",       titleKey: "services.items.3.title", descKey: "services.items.3.desc" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  metric: string;
  url: string;
  github?: string;
  techStack: string[];
}

export const projects: Project[] = [
  { id: '01', slug: 'zolfo-medicina-estetica', category: 'Portal Médico',      title: 'Zolfo Medicina Estética', metric: 'Lighthouse 100',   url: 'https://zolfoestetica.com.ar',                                            techStack: ['Next.js', 'React', 'Supabase', 'Vercel'] },
  { id: '02', slug: 'nurestetica',              category: 'Web Institucional',  title: 'NurEstética',             metric: 'Real Score 100', url: 'https://nurestetica.com.ar',                                               techStack: ['Next.js', 'React', 'Tailwind', 'Vercel'] },
  { id: '03', slug: 'authmotion',               category: 'IAM System',         title: 'AuthMotion',              metric: 'Open Source',    url: 'https://github.com/malcom-builder/AuthMotion',    github: 'https://github.com/malcom-builder/AuthMotion',    techStack: ['.NET 10', 'SQL Server', 'Docker', 'EF Core'] },
  { id: '04', slug: 'smartwallet',              category: 'Fintech',            title: 'SmartWallet',             metric: 'Double-Entry',   url: 'https://github.com/malcom-builder/SmartWallet',    github: 'https://github.com/malcom-builder/SmartWallet',    techStack: ['.NET 8', 'SQL Server', 'Azure', 'Docker'] },
  { id: '05', slug: 'malcombuilder',            category: 'Portfolio',          title: 'malcombuilder.com',       metric: 'AI-native',      url: 'https://malcombuilder.com',                                                techStack: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'next-intl', 'Vercel'] },
  { id: '06', slug: 'pulse',                    category: 'Monitoring',         title: 'Pulse',                   metric: '24/7 Uptime',    url: 'https://pulse.malcombuilder.com',                                          techStack: ['Next.js', 'Supabase', 'Telegram API', 'Vercel'] },
];

// ─── Stack ────────────────────────────────────────────────────────────────────
export interface StackItem {
  label: string;
  color: string;
}

export const stackItems: StackItem[] = [
  { label: "Next.js",       color: "#ffffff" },
  { label: "React",         color: "#61DAFB" },
  { label: "TypeScript",    color: "#3178C6" },
  { label: "C#",            color: "#68217A" },
  { label: ".NET",          color: "#512BD4" },
  { label: "Docker",        color: "#2496ED" },
  { label: "SQL Server",    color: "#CC292B" },
  { label: "Azure",         color: "#0078D4" },
  { label: "Vercel",        color: "#ffffff" },
  { label: "Tailwind",      color: "#06B6D4" },
  { label: "Framer Motion", color: "#FF4154" },
  { label: "Supabase",      color: "#3ECF8E" },
  { label: "GitHub",        color: "#ffffff" },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = {
  email:     "contact@malcombuilder.com",
  whatsapp:  "https://wa.me/543412282853",
  linkedin:  "https://linkedin.com/in/malcom-foca",
  github:    "https://github.com/malcom-builder",
  instagram: "https://instagram.com/malcom.builder",
};
