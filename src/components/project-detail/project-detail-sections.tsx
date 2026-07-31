"use client";

import { makeStyles } from "@fluentui/react-components";

import { ProjectCaseStudy } from "@/components/project-detail/project-case-study";
import { ProjectGallery } from "@/components/project-detail/project-gallery";
import { ProjectResult } from "@/components/project-detail/project-result";
import { RelatedProjects } from "@/components/project-detail/related-projects";
import type { Project } from "@/types/project";

// Same breakpoints used across the site (Figma 464444:2260 for Tablet,
// 13400:7295 for Mobile). TABLET_ONLY_QUERY is bounded (not just max-width)
// so it can never overlap with MOBILE_QUERY below — Griffel doesn't
// guarantee source order between separate media-query buckets when their
// ranges overlap, so an unbounded tablet max-width here could win the
// cascade at mobile widths too.
const MOBILE_QUERY = "@media (max-width: 600px)";
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 1000px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "100px",
    width: "100%",
    paddingTop: "100px",
    paddingBottom: "120px",
    [TABLET_ONLY_QUERY]: {
      gap: "42px",
      paddingTop: "42px",
      paddingBottom: "42px",
    },
    [MOBILE_QUERY]: {
      gap: "32px",
      paddingTop: "32px",
      paddingBottom: "48px",
    },
  },
});

export function ProjectDetailSections({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const styles = useStyles();
  const detail = project.detail;
  if (!detail) return null;

  return (
    <div className={styles.root}>
      <ProjectCaseStudy detail={detail} />
      <ProjectGallery gallery={detail.gallery} projectTitle={project.title} />
      <ProjectResult result={detail.result} />
      <RelatedProjects projects={relatedProjects} />
    </div>
  );
}
