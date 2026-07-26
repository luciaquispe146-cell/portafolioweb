"use client";

import { makeStyles, tokens } from "@fluentui/react-components";

import { ProjectCard } from "@/components/home/project-card";
import { customTokens } from "@/lib/fluent/theme";
import { projects } from "@/lib/projects";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    width: "100%",
  },
  heading: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "40px",
    lineHeight: "56px",
    color: customTokens.colorGrey12,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "48px",
    rowGap: "48px",
    // Tablet: keep the 2-column layout but tighten the gap progressively.
    "@media (max-width: 900px)": {
      columnGap: "24px",
      rowGap: "40px",
    },
    // Mobile: stack into a single column.
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      rowGap: "32px",
    },
  },
});

export function ProjectsSection() {
  const styles = useStyles();

  return (
    <section id="proyectos" className={styles.root} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={styles.heading}>
        Conoce mis proyectos
      </h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
