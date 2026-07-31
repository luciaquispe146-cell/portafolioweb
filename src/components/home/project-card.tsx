"use client";

import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { ArrowRight24Regular } from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { customTokens } from "@/lib/fluent/theme";
import { fontPrata } from "@/lib/fonts";
import { projectHref } from "@/lib/projects";
import type { Project } from "@/types/project";

// Stable, non-hashed hooks so the card's :hover / :focus-visible rules can
// reach into the image, overlay and link regardless of Griffel's atomic
// class names.
const IMAGE_HOOK = "project-card-image";
const OVERLAY_HOOK = "project-card-overlay";
const LINK_HOOK = "project-card-link";
const LINK_ICON_HOOK = "project-card-link-icon";

// Desktop Hover overlay arrow (Figma node 13068:566/"Vector"): a stroke
// arrow, not a Fluent icon glyph — reproduced at its exact path (scaled to
// a 20x20 box, matching the 20px glyph inside the 110px circle).
function ProjectCardHoverIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 20V0H0M20 0L0 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "Ver Proyecto" link icon: stroke arrow, not a Fluent icon glyph. Stroke
// uses currentColor (instead of the literal #1E1E1E from the source asset)
// so it keeps inheriting viewProjectLink's text color and the existing
// Desktop hover-to-navy transition on LINK_ICON_HOOK unchanged.
function ViewProjectIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.83334 14.1666L14.1667 5.83325M14.1667 14.1666V5.83325H5.83334"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

// Used only by the `mobileFromTablet` variant (Project Detail's "Proyectos
// relacionados"): the exact same Mobile/Desktop compositions above, just
// with the switchover raised from 600/901 to 1000/1001 so there's no
// Tablet-classic middle state — Tablet gets the Mobile card instead. Home's
// ProjectsSection never passes this prop, so its own MOBILE_QUERY/
// DESKTOP_ONLY_QUERY breakpoints (and the Tablet-classic look) are
// untouched.
const RELATED_MOBILE_QUERY = "@media (max-width: 1000px)";
const RELATED_DESKTOP_QUERY = "@media (min-width: 1001px)";

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
    // Figma Hover (nodes 13068:548 / 464409:2769): "Ver Proyecto"'s
    // underline AND icon turn brand navy on hover — the text itself stays
    // black. Tablet keeps the current static black border/icon (untouched),
    // only true Desktop gets this.
    [DESKTOP_ONLY_QUERY]: {
      [`:hover .${LINK_HOOK}`]: {
        borderBottomColor: tokens.colorBrandStroke1,
      },
      [`:focus-visible .${LINK_HOOK}`]: {
        borderBottomColor: tokens.colorBrandStroke1,
      },
      [`:hover .${LINK_ICON_HOOK}`]: {
        color: tokens.colorBrandStroke1,
      },
      [`:focus-visible .${LINK_ICON_HOOK}`]: {
        color: tokens.colorBrandStroke1,
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
  // Base (Tablet, 601-900px): unchanged 64px navy circle + white icon.
  // True Desktop (901px+) gets Figma's updated Hover: a larger 110px white
  // circle with a black stroke-arrow icon instead.
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
    [DESKTOP_ONLY_QUERY]: {
      width: "110px",
      height: "110px",
      backgroundColor: tokens.colorNeutralBackground1,
      color: customTokens.colorPureBlack,
    },
  },
  // Tablet shows the old Fluent glyph, Desktop shows the new stroke arrow
  // — same element swap technique used elsewhere (mobileViewProjectButton,
  // dividerMobile) to switch what renders per breakpoint via pure CSS.
  overlayIconTablet: {
    display: "inline-flex",
    [DESKTOP_ONLY_QUERY]: {
      display: "none",
    },
  },
  overlayIconDesktop: {
    display: "none",
    [DESKTOP_ONLY_QUERY]: {
      display: "inline-flex",
    },
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
      transitionProperty: "border-bottom-color",
      transitionDuration: tokens.durationNormal,
      [`& .${LINK_ICON_HOOK}`]: {
        transitionProperty: "color",
        transitionDuration: tokens.durationNormal,
      },
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

// `mobileFromTablet` variant: identical values to useStyles above, just
// keyed to RELATED_MOBILE_QUERY/RELATED_DESKTOP_QUERY instead of
// MOBILE_QUERY/DESKTOP_QUERY/DESKTOP_ONLY_QUERY, so the "Mobile" card
// composition takes over at 1000px instead of 600px, with no Tablet-classic
// state in between. A separate hook (not extra media buckets merged into
// useStyles) so Home's cards — which always use useStyles — can never be
// affected by this; Griffel classes are shared by shape, not by caller.
const useRelatedCardStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    [RELATED_MOBILE_QUERY]: {
      gap: "14px",
    },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "27px",
    width: "100%",
    [RELATED_MOBILE_QUERY]: {
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
    [RELATED_DESKTOP_QUERY]: {
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
      [`:hover .${LINK_HOOK}`]: {
        borderBottomColor: tokens.colorBrandStroke1,
      },
      [`:focus-visible .${LINK_HOOK}`]: {
        borderBottomColor: tokens.colorBrandStroke1,
      },
      [`:hover .${LINK_ICON_HOOK}`]: {
        color: tokens.colorBrandStroke1,
      },
      [`:focus-visible .${LINK_ICON_HOOK}`]: {
        color: tokens.colorBrandStroke1,
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
    [RELATED_DESKTOP_QUERY]: {
      width: "110px",
      height: "110px",
      backgroundColor: tokens.colorNeutralBackground1,
      color: customTokens.colorPureBlack,
    },
  },
  overlayIconTablet: {
    display: "inline-flex",
    [RELATED_DESKTOP_QUERY]: {
      display: "none",
    },
  },
  overlayIconDesktop: {
    display: "none",
    [RELATED_DESKTOP_QUERY]: {
      display: "inline-flex",
    },
  },
  content: {
    display: "block",
    [RELATED_MOBILE_QUERY]: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    [RELATED_DESKTOP_QUERY]: {
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
    [RELATED_MOBILE_QUERY]: {
      fontSize: "24px",
      lineHeight: "32px",
      height: "32px",
    },
    [RELATED_DESKTOP_QUERY]: {
      height: "52px",
    },
  },
  // Always visible in this variant — the only state that hid it
  // ("Tablet-classic") doesn't exist here; both the Mobile (<=1000) and
  // Desktop (>=1001) states show this standalone divider.
  divider: {
    display: "block",
    width: "100%",
    height: 0,
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  },
  metaRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    width: "100%",
    paddingTop: "24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    [RELATED_MOBILE_QUERY]: {
      paddingTop: 0,
      borderTop: "none",
    },
    [RELATED_DESKTOP_QUERY]: {
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
    [RELATED_MOBILE_QUERY]: {
      gap: "6px",
    },
  },
  tagPill: {
    display: "inline-flex",
    [RELATED_MOBILE_QUERY]: {
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
    [RELATED_MOBILE_QUERY]: {
      display: "none",
    },
    [RELATED_DESKTOP_QUERY]: {
      textDecoration: "none",
      borderBottom: `1px solid ${customTokens.colorPureBlack}`,
      transitionProperty: "border-bottom-color",
      transitionDuration: tokens.durationNormal,
      [`& .${LINK_ICON_HOOK}`]: {
        transitionProperty: "color",
        transitionDuration: tokens.durationNormal,
      },
    },
  },
  mobileViewProjectButton: {
    display: "none",
    [RELATED_MOBILE_QUERY]: {
      display: "flex",
      width: "100%",
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
  },
});

// mobileFromTablet (used only by RelatedProjects, Project Detail): keeps
// the card's own Mobile composition unchanged, just raises the width where
// it takes over from 600px to 1000px, so Tablet gets the Mobile card
// instead of the Tablet-classic look Home still uses at that width.
export function ProjectCard({
  project,
  mobileFromTablet = false,
}: {
  project: Project;
  mobileFromTablet?: boolean;
}) {
  const homeStyles = useStyles();
  const relatedStyles = useRelatedCardStyles();
  const styles = mobileFromTablet ? relatedStyles : homeStyles;
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
            <ArrowRight24Regular className={styles.overlayIconTablet} />
            <ProjectCardHoverIcon className={styles.overlayIconDesktop} />
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
            <span className={mergeClasses(styles.viewProjectLink, LINK_HOOK)}>
              Ver Proyecto
              <ViewProjectIcon className={LINK_ICON_HOOK} />
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
