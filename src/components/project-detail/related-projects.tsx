"use client";

import { makeStyles, tokens } from "@fluentui/react-components";

import { ProjectCard } from "@/components/home/project-card";
import { customTokens } from "@/lib/fluent/theme";
import type { Project } from "@/types/project";

// Same breakpoints used across the site.
const MOBILE_QUERY = "@media (max-width: 600px)";
// Exclusive tablet-only range: the grid's gap gets a DIFFERENT value at
// MOBILE_QUERY, and Griffel doesn't guarantee which of two overlapping
// max-width buckets wins the cascade — bounding this avoids that race.
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 900px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "58px",
    width: "100%",
    [MOBILE_QUERY]: {
      gap: "40px",
    },
  },
  divider: {
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "58px",
    width: "100%",
    [MOBILE_QUERY]: {
      gap: "30px",
    },
  },
  heading: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "40px",
    lineHeight: "56px",
    color: customTokens.colorGrey12,
    textAlign: "center",
    [MOBILE_QUERY]: {
      fontSize: "32px",
      lineHeight: "40px",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "47px",
    width: "100%",
    [TABLET_ONLY_QUERY]: {
      gap: "24px",
    },
    [MOBILE_QUERY]: {
      gridTemplateColumns: "1fr",
      gap: "32px",
    },
  },
});

// Related-projects grid is designed for exactly two cards side by side
// (Figma: "Frame 168", a fixed 2-up row) — takes the first two other
// projects rather than every remaining one.
export function RelatedProjects({ projects }: { projects: Project[] }) {
  const styles = useStyles();
  const related = projects.slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className={styles.root}>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.heading}>Más proyectos que te pueden interesar</h2>
        <div className={styles.grid}>
          {related.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
