"use client";

import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { ArrowRight24Regular, ArrowUpRight16Regular } from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { customTokens } from "@/lib/fluent/theme";
import { fontPrata } from "@/lib/fonts";
import { projectHref } from "@/lib/projects";
import type { Project } from "@/types/project";

// Stable, non-hashed hooks so the card's :hover / :focus-visible rules can
// reach into the image and overlay regardless of Griffel's atomic class names.
const IMAGE_HOOK = "project-card-image";
const OVERLAY_HOOK = "project-card-overlay";

// Same breakpoint already used by ProjectsSection for its single-column
// mobile grid — the card switches to its mobile composition at the same
// width the layout itself goes single-column.
const MOBILE_QUERY = "@media (max-width: 600px)";
// Hover/focus-reveal effects (image zoom, circular arrow button) only make
// sense where hover exists — scoping them here means there is nothing to
// "turn off" on mobile, they simply never apply below the breakpoint.
const DESKTOP_QUERY = "@media (min-width: 601px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "27px",
    width: "100%",
    color: "inherit",
    textDecoration: "none",
    borderRadius: tokens.borderRadius3XLarge,
    outlineStyle: "solid",
    outlineWidth: "2px",
    outlineColor: "transparent",
    outlineOffset: "4px",
    transitionProperty: "outline-color",
    transitionDuration: tokens.durationNormal,
    ':focus-visible': {
      outlineColor: tokens.colorStrokeFocus2,
    },
    [DESKTOP_QUERY]: {
      [`:hover .${IMAGE_HOOK}`]: {
        transform: "scale(1.06)",
      },
      [`:focus-visible .${IMAGE_HOOK}`]: {
        transform: "scale(1.06)",
      },
      [`:hover .${OVERLAY_HOOK}`]: {
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
      },
      [`:focus-visible .${OVERLAY_HOOK}`]: {
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
      },
    },
    "@media (prefers-reduced-motion: reduce)": {
      [`& .${IMAGE_HOOK}, & .${OVERLAY_HOOK}`]: {
        transitionDuration: "0.01ms",
      },
    },
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "614 / 469",
    borderRadius: tokens.borderRadius3XLarge,
    overflow: "hidden",
  },
  image: {
    objectFit: "cover",
    transform: "scale(1)",
    transformOrigin: "center",
    transitionProperty: "transform",
    transitionDuration: "0.5s",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  overlayButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.85)",
    transitionProperty: "opacity, transform",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
    pointerEvents: "none",
  },
  title: {
    fontFamily: fontPrata,
    fontWeight: "400",
    fontSize: "42px",
    lineHeight: "50px",
    color: customTokens.colorPureBlack,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    width: "100%",
    paddingTop: "24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
  },
  viewProjectLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorPureBlack,
    textDecoration: "underline",
    paddingBottom: "4px",
    [MOBILE_QUERY]: {
      display: "none",
    },
  },
  // Explicit CTA replacing the hover-driven affordance on mobile, where
  // there's no hover state to rely on.
  mobileViewProjectButton: {
    display: "none",
    [MOBILE_QUERY]: {
      display: "flex",
      width: "100%",
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
  },
});

export function ProjectCard({ project }: { project: Project }) {
  const styles = useStyles();
  const href = projectHref(project.slug);

  return (
    <div className={styles.root}>
      <Link href={href} className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={project.coverImage}
            alt={`Portada del proyecto ${project.title}`}
            fill
            sizes="(min-width: 1024px) 614px, 100vw"
            className={mergeClasses(styles.image, IMAGE_HOOK)}
          />
          <span className={mergeClasses(styles.overlayButton, OVERLAY_HOOK)} aria-hidden="true">
            <ArrowRight24Regular />
          </span>
        </div>
        <div>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.metaRow}>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <BadgePill key={tag}>{tag}</BadgePill>
              ))}
            </div>
            <span className={styles.viewProjectLink}>
              Ver Proyecto
              <ArrowUpRight16Regular />
            </span>
          </div>
        </div>
      </Link>
      <Button as="a" href={href} appearance="outline" className={styles.mobileViewProjectButton}>
        Ver Proyecto
      </Button>
    </div>
  );
}
