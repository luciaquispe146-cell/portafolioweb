import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectDetailSections } from "@/components/project-detail/project-detail-sections";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { projects } from "@/lib/projects";

type PageParams = { slug: string };

export function generateStaticParams() {
  return projects.filter((project) => project.detail).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project?.detail) return {};

  return {
    title: project.title,
    description: project.detail.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project || !project.detail) {
    notFound();
  }

  const relatedProjects = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <ProjectHero project={project} />
        <PageContainer>
          <ProjectDetailSections project={project} relatedProjects={relatedProjects} />
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
