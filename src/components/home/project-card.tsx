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
// Tablet (601-900px) must stay exactly as it is today — it currently
// shares Desktop's base values with no distinction of its own. Anything
// scoped to Desktop only (and not Tablet) has to use this bounded range
// instead of DESKTOP_QUERY, which also matches Tablet.
const DESKTOP_ONLY_QUERY = "@media (min-width: 901px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    [MOBILE_QUERY]: {
      gap: "14px",
    },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "27px",
    width: "100%",
    [MOBILE_QUERY]: {
      gap: "14px",
    },
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
  // Bare wrapper around title+divider+metaRow — block by default
  // (unchanged for Tablet); a gapped flex column at Mobile (14px) and at
  // true Desktop (18px, per the updated Figma spec).
  content: {
    display: "block",
    [MOBILE_QUERY]: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    [DESKTOP_ONLY_QUERY]: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
  },
  title: {
    fontFamily: fontPrata,
    fontWeight: "400",
    fontSize: "42px",
    lineHeight: "50px",
    color: customTokens.colorPureBlack,
    margin: 0,
    [MOBILE_QUERY]: {
      fontSize: "24px",
      lineHeight: "32px",
      height: "32px",
    },
    [DESKTOP_ONLY_QUERY]: {
      height: "52px",
    },
  },
  // Tablet: divider is metaRow's own border-top + paddingTop (unchanged).
  // Mobile and true Desktop both use this standalone full-width element
  // instead — Mobile so its 1px stroke doesn't eat into the padding-based
  // gap, Desktop because Figma now places the divider between the title
  // and the tags/link row rather than tying it to the link's own border.
  divider: {
    display: "none",
    [MOBILE_QUERY]: {
      display: "block",
      width: "100%",
      height: 0,
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    [DESKTOP_ONLY_QUERY]: {
      display: "block",
      width: "100%",
      height: 0,
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
  },
  metaRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    width: "100%",
    paddingTop: "24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    [MOBILE_QUERY]: {
      paddingTop: 0,
      borderTop: "none",
    },
    // Tablet keeps the current border-top + paddingTop; Desktop's divider
    // is now the standalone `.divider` element above instead, and the
    // row goes back to tags+link side by side, vertically centered.
    [DESKTOP_ONLY_QUERY]: {
      alignItems: "center",
      paddingTop: 0,
      borderTop: "none",
    },
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
    [MOBILE_QUERY]: {
      gap: "6px",
    },
  },
  tagPill: {
    display: "inline-flex",
    [MOBILE_QUERY]: {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
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
    // Desktop: swap the text-decoration underline for a real border-bottom
    // (a text-decoration's offset isn't reliably pixel-exact across
    // fonts/browsers) — shrink-to-fit, right side of the row, same as Tablet.
    [DESKTOP_ONLY_QUERY]: {
      textDecoration: "none",
      borderBottom: `1px solid ${customTokens.colorPureBlack}`,
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
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.metaRow}>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <BadgePill key={tag} className={styles.tagPill}>
                  {tag}
                </BadgePill>
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
