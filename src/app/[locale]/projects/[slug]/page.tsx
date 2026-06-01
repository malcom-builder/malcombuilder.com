import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { projects } from "@/lib/constants";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectMockup } from "@/components/project/ProjectMockup";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { ProjectMetrics } from "@/components/project/ProjectMetrics";
import { ProjectTechStack } from "@/components/project/ProjectTechStack";
import { ProjectFeatures } from "@/components/project/ProjectFeatures";
import { ProjectLinks } from "@/components/project/ProjectLinks";

export async function generateStaticParams() {
  const locales = ["es", "en"];
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const messages = (await getMessages()) as any;
  const pageData = messages.projectPages?.[slug];
  const tagline = pageData?.tagline ?? project.title;

  return {
    title: `${project.title} — malcom.builder`,
    description: tagline,
    openGraph: {
      title: `${project.title} — malcom.builder`,
      description: tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const messages = (await getMessages()) as any;
  const pageData = messages.projectPages?.[slug];
  if (!pageData) notFound();

  return (
    <article>
      <ProjectHero title={project.title} category={project.category} tagline={pageData.tagline} />
      <ProjectMockup slug={project.slug} />
      <ProjectOverview description={pageData.description} />
      <ProjectMetrics slug={project.slug} metrics={pageData.metrics} />
      <ProjectTechStack techStack={project.techStack} />
      <ProjectFeatures features={pageData.features} sectionLabel={pageData.featuresLabel} />
      <ProjectLinks url={project.url} github={project.github} />
    </article>
  );
}