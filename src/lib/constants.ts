// ─── Services ────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: string; // lucide icon name
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
  category: string;
  title: string;
  metric: string;
  url: string;
}

export const projects: Project[] = [
  { id: '01', category: 'Portal Médico',      title: 'Zolfo Medicina Estética', metric: '100 Lighthouse', url: 'https://zolfoestetica.com.ar' },
  { id: '02', category: 'Web Institucional',  title: 'NurEstética',             metric: 'Real Score 100', url: 'https://nurestetica.com.ar' },
  { id: '03', category: 'IAM System',         title: 'AuthMotion',              metric: 'Open Source',    url: 'https://github.com/malcom-builder/AuthMotion' },
  { id: '04', category: 'Fintech',            title: 'SmartWallet',             metric: 'Double-Entry',   url: 'https://github.com/malcom-builder/SmartWallet' },
];

// ─── Stack ────────────────────────────────────────────────────────────────────
export interface StackItem {
  label: string;
  color: string; // accent color for hover
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
