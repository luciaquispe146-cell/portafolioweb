"use client";

import { makeStyles } from "@fluentui/react-components";

import { ProjectCaseStudy } from "@/components/project-detail/project-case-study";
import { ProjectGallery } from "@/components/project-detail/project-gallery";
import { ProjectResult } from "@/components/project-detail/project-result";
import { RelatedProjects } from "@/components/project-detail/related-projects";
import type { Project } from "@/types/project";

// Same breakpoints used across the site. No Tablet frame exists in Figma
// for this page — the 100px Desktop section gap is interpolated down
// toward the Figma-confirmed 32px Mobile gap at TABLET_ONLY_QUERY.
// TABLET_ONLY_QUERY is bounded (not just max-width) so it can never overlap
// with MOBILE_QUERY below — Griffel doesn't guarantee source order between
// separate media-query buckets when their ranges overlap, so an unbounded
// tablet max-width here could win the cascade at mobile widths too.
const MOBILE_QUERY = "@media (max-width: 600px)";
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 900px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "100px",
    width: "100%",
    paddingTop: "100px",
    paddingBottom: "120px",
    [TABLET_ONLY_QUERY]: {
      gap: "60px",
      paddingTop: "60px",
      paddingBottom: "80px",
    },
    [MOBILE_QUERY]: {
      gap: "32px",
      paddingTop: "32px",
      paddingBottom: "56px",
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
