import type { Metadata } from "next";

import { HeroSection } from "@/components/home/hero-section";
import { IntroPanel } from "@/components/home/intro-panel";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageContainer } from "@/components/layout/page-container";
import { HomeContent } from "@/components/home/home-content";
import { HomeSections } from "@/components/home/home-sections";

export const metadata: Metadata = {
  title: { absolute: "Lucia Quispe — UX/UI Designer" },
  description:
    "Portafolio de Lucia Quispe, diseñadora de interfaces UX/UI. Conoce sus proyectos de diseño digital.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HomeContent>
        <PageContainer>
          <HomeSections>
            <HeroSection />
            <IntroPanel />
            <ProjectsSection />
            <SkillsSection />
          </HomeSections>
        </PageContainer>
      </HomeContent>
      <SiteFooter />
    </>
  );
}
