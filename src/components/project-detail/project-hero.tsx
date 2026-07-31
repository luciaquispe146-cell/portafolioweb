"use client";

import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { ArrowLeft16Regular } from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { OutlineBadge } from "@/components/ui/outline-badge";
import { customTokens } from "@/lib/fluent/theme";
import { fontPrata } from "@/lib/fonts";
import type { Project } from "@/types/project";

// Project Metadata icon (Figma node 13203:12654, "Union"): a sparkle glyph,
// not a Fluent icon — reproduced at its exact path. fill uses currentColor
// (instead of the literal #34D889 baked into the source asset) so it keeps
// inheriting metaIcon's color, which is already set from the same value via
// customTokens.colorSparkle — the single source of truth for that color.
function MetaSparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 0C9.30909 4.66134e-06 9.21212 4.06061 8.90909 6C8.92003 6.00478 8.89399 6.00961 8.90483 6.01456C10.0921 4.40956 12.5545 1.60428 13.4616 2.51136C14.3785 3.42822 11.6381 6.06418 10.0451 7.23864H10C12.0239 6.95081 16 6.73992 16 8C16 9.24563 12.0432 9.17574 10 8.90909C11.6679 10.1913 14.6963 12.9542 13.8253 13.8253C12.9467 14.7038 10.0223 11.7334 8.73757 10.0732C9.03602 12.0395 9.29288 16 8 16C6.75427 16 6.8242 12.1003 7.09091 10.0732C5.80586 11.7221 3.01876 14.6963 2.14773 13.8253C1.28264 12.9602 4.22664 10.2438 5.8821 8.95099C3.79656 9.1917 -5.25966e-08 9.20327 0 8C1.57331e-05 6.75482 3.83836 6.78191 5.8821 7.0483C4.24902 5.80004 1.64128 3.38145 2.51136 2.51136C3.42821 1.59452 6.06452 4.36101 7.23899 5.95455C7.24748 5.95139 7.25602 5.94837 7.26456 5.94531C6.96493 3.9854 6.70308 0 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Desktop CTA icon (Figma node 13203:12701, "Arrow up-right" instance): a
// 20x20 stroke arrow, not the 16px filled Fluent glyph previously used here
// — same glyph/geometry as ProjectCard's "Ver Proyecto" icon.
function ExternalLinkIcon({ className }: { className?: string }) {
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

// Same breakpoints already used across Home (IntroPanel, ProjectsSection,
// SkillsSection). Tablet (Figma 464444:2260) and Mobile (Figma 13400:7295)
// each have their own dedicated composition for the title/CTA/metadata
// block below — they are NOT the same "stacked" layout.
const TABLET_QUERY = "@media (max-width: 1000px)";
const MOBILE_QUERY = "@media (max-width: 600px)";
// Exclusive tablet-only range for properties that also get a DIFFERENT
// (not just inherited) override at MOBILE_QUERY — Griffel doesn't guarantee
// which of two overlapping max-width buckets wins the cascade, so any
// property set by both TABLET_QUERY and MOBILE_QUERY must use this instead
// of the plain (inclusive) TABLET_QUERY for the tablet-only value.
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 1000px)";

// Stable, non-hashed hook so ctaDesktop's :hover / :focus-visible rule can
// reach the icon regardless of Griffel's atomic class names (same pattern
// as LINK_ICON_HOOK/CV_ICON_HOOK elsewhere in this codebase) — needed
// because the icon already carries its own explicit `color`, so plain CSS
// inheritance from the parent link wouldn't reach it.
const CTA_ICON_HOOK = "project-hero-cta-icon";

// Banner parallax tuning. The inner layer is oversized by PARALLAX_OVERSIZE
// on both the top and bottom edge so a translateY offset — clamped to that
// same buffer — can never reveal empty space inside the banner's mask.
// PARALLAX_FACTOR converts viewport-distance to an offset; the mobile
// variant is smaller per the "adjust intensity on small screens" spec.
const PARALLAX_OVERSIZE = 0.08;
const PARALLAX_FACTOR = 0.06;
const PARALLAX_FACTOR_MOBILE = 0.03;

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
  },
  // Decorative background layer only — sized to roughly 70% of the Hero's
  // total height (per Figma reference) so the banner's lower portion sits
  // on the page's white background, not inside the grey card. Kept as an
  // absolutely positioned layer behind the content (rather than a
  // flow-wrapping div) specifically so its height doesn't have to equal
  // 100% of the content it sits behind — content padding/gaps are
  // untouched, only decoupled from this background.
  grey: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "875px",
    backgroundColor: customTokens.colorGrey96,
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px",
    [TABLET_ONLY_QUERY]: {
      height: "930px",
    },
    [MOBILE_QUERY]: {
      height: "690px",
    },
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    width: "100%",
    paddingTop: "54px",
    paddingBottom: "48px",
    [MOBILE_QUERY]: {
      gap: "32px",
      paddingTop: "24px",
      paddingBottom: "24px",
    },
  },
  breadcrumbBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    [TABLET_ONLY_QUERY]: {
      gap: "10px",
    },
    [MOBILE_QUERY]: {
      gap: "14px",
    },
  },
  // Hover (Figma ref 464436:2261): text + icon (inherited via currentColor,
  // no competing native rule here so plain inheritance is enough) shift to
  // the same brand navy used for the "Ver Sitio Web" CTA hover below.
  breadcrumb: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: customTokens.colorGrey12,
    textDecoration: "none",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      color: tokens.colorBrandStroke1,
    },
    ":focus-visible": {
      color: tokens.colorBrandStroke1,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
  // Figma (464444:2260): Tablet is the only breakpoint where the external
  // link sits inline with the title (a small pill button, top-right of the
  // row) instead of down in the metadata block. Transparent/block at
  // Desktop and Mobile so the title renders exactly as before there.
  titleRow: {
    display: "block",
    width: "100%",
    [TABLET_ONLY_QUERY]: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
    },
  },
  // Figma (node 464444:2700, "Button"): rest state has no border at all
  // (Fluent's stock "secondary" appearance always shows one) and a tighter
  // 8px/16px padding + 6px icon gap than the default Button gives. Only the
  // rest-state properties are overridden here (no ":hover" of our own is
  // added or removed) so Fluent's native hover feedback stays exactly as
  // it already was.
  ctaTabletInline: {
    display: "none",
    flexShrink: 0,
    [TABLET_ONLY_QUERY]: {
      display: "inline-flex",
      columnGap: "6px",
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "16px",
      paddingRight: "16px",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
    },
  },
  // flex/minWidth only take effect when a flex parent applies them (the
  // Tablet titleRow above) — harmless no-ops for Desktop/Mobile's plain
  // block parent. Lets the title shrink/wrap instead of pushing the inline
  // CTA button past the row's edge on narrower Tablet widths.
  title: {
    flex: "1 1 auto",
    minWidth: 0,
    fontFamily: fontPrata,
    fontWeight: "400",
    fontSize: "68px",
    lineHeight: "92px",
    color: customTokens.colorGrey12,
    margin: 0,
    [TABLET_ONLY_QUERY]: {
      fontSize: "48px",
      lineHeight: "60px",
    },
    [MOBILE_QUERY]: {
      fontSize: "40px",
      lineHeight: "56px",
    },
  },
  descRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "24px",
    width: "100%",
    [TABLET_QUERY]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    [TABLET_ONLY_QUERY]: {
      gap: "16px",
    },
    [MOBILE_QUERY]: {
      gap: "18px",
    },
  },
  description: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorGrey12,
    maxWidth: "695px",
    marginLeft: "110px",
    [TABLET_QUERY]: {
      maxWidth: "100%",
      marginLeft: 0,
    },
    [MOBILE_QUERY]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  descriptionHighlight: {
    fontWeight: tokens.fontWeightSemibold,
  },
  tags: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    [TABLET_QUERY]: {
      gap: "8px",
    },
  },
  divider: {
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // --- Desktop meta bar + CTA (single row, vertical dividers) ---
  metaCtaRowDesktop: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 1.5vw, 18px)",
    width: "100%",
    minWidth: 0,
    [TABLET_QUERY]: {
      display: "none",
    },
  },
  metaCard: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto",
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "clamp(20px, 3vw, 37px)",
    paddingRight: "clamp(20px, 3vw, 37px)",
  },
  // gap uses clamp() (not the Figma-exact 45px) and wraps to a second line
  // as a safety net — 5 nowrap label/value pairs + a fixed-width CTA card
  // otherwise overflow at narrower Desktop/Laptop widths (1001-1300px),
  // since none of them could shrink below their own text's natural width.
  metaItemsRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "clamp(8px, 2vw, 45px)",
    width: "100%",
  },
  // Figma (node 13203:12652): the icon sits at the top of the item, aligned
  // with the label's line, not centered against the full two-line block.
  // flexShrink:0 keeps each item at its natural size so metaItemsRow wraps
  // whole items instead of squeezing text into an unreadable sliver.
  metaItem: {
    display: "flex",
    flexShrink: 0,
    alignItems: "flex-start",
    gap: "8px",
  },
  metaIcon: {
    display: "flex",
    flexShrink: 0,
    color: customTokens.colorSparkle,
  },
  metaVDivider: {
    alignSelf: "stretch",
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    flexShrink: 0,
  },
  metaTextCol: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  metaLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: customTokens.colorGrey12,
    whiteSpace: "nowrap",
  },
  metaValue: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorGrey12,
    whiteSpace: "nowrap",
  },
  // Figma (node 13203:12703, "ButtonExterno"): not a centered icon+text row —
  // the label sits bottom-left and the arrow sits top-right of a fixed
  // 217x92 card, each inset by the component's own padding (21/13/14).
  // Hover (Figma ref 13203:12722, "Variant2"): a 1px colorBrandStroke1
  // border appears and the icon turns the same navy; text/background stay
  // untouched. Border uses the 4 longhand *-Color properties (never the
  // borderColor/border shorthand) — a documented Griffel quirk in this
  // project where shorthand border overrides don't apply reliably.
  // Default keeps a transparent 1px border (box-sizing: border-box) so the
  // hover border never shifts the button's 217x92 box.
  ctaDesktop: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: "217px",
    height: "92px",
    boxSizing: "border-box",
    borderTop: "1px solid transparent",
    borderRight: "1px solid transparent",
    borderBottom: "1px solid transparent",
    borderLeft: "1px solid transparent",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    textDecoration: "none",
    transitionProperty: "border-color",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
    ":focus-visible": {
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
    [`:hover .${CTA_ICON_HOOK}`]: {
      color: tokens.colorBrandStroke1,
    },
    [`:focus-visible .${CTA_ICON_HOOK}`]: {
      color: tokens.colorBrandStroke1,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
      [`& .${CTA_ICON_HOOK}`]: {
        transitionDuration: "0.01ms",
      },
    },
  },
  ctaDesktopIcon: {
    position: "absolute",
    top: "13px",
    right: "21px",
    display: "flex",
    color: customTokens.colorPureBlack,
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
  },
  ctaDesktopText: {
    position: "absolute",
    left: "21px",
    bottom: "14px",
    color: customTokens.colorPureBlack,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    whiteSpace: "nowrap",
  },
  // --- Tablet-only metadata grid (Figma 464444:2769): 3 columns on row 1,
  // 2 on row 2 (aligned under columns 1-2, column 3 left empty) — no CTA
  // attached here, since Tablet's "Ver Sitio" lives inline with the title.
  metaCardTablet: {
    display: "none",
    [TABLET_ONLY_QUERY]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      width: "100%",
      minWidth: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderRadius: tokens.borderRadius3XLarge,
      paddingTop: "22px",
      paddingBottom: "22px",
      paddingLeft: "clamp(16px, 3vw, 26px)",
      paddingRight: "clamp(16px, 3vw, 24px)",
    },
  },
  // CSS Grid with minmax(0, 1fr) columns instead of a flex row with a fixed
  // 145px/105px gap — a fixed gap plus 3 nowrap label/value columns
  // overflowed the card at narrower Tablet widths (~601-750px), since
  // neither the gap nor the columns could shrink. Each column now shares
  // the row's actual width, so it can never exceed the container.
  metaGridRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "center",
    width: "100%",
  },
  metaGridRow1: {
    columnGap: "clamp(16px, 4vw, 145px)",
  },
  metaGridRow2: {
    columnGap: "clamp(16px, 3vw, 105px)",
  },
  metaGridDivider: {
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // --- Stacked meta card + CTA (Mobile only, Figma 13400:7316) ---
  metaCtaStack: {
    display: "none",
    [MOBILE_QUERY]: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
    },
  },
  // A single CSS Grid spanning all 5 items + both dividers (not 3
  // independent 2-column rows) — that's what guarantees CLIENTE and ROL
  // share the exact same column width and starting x, since every row
  // resolves its "1fr" against the same shared column tracks. Collapses to
  // a single column only below 360px, as a safety net for "Mobile pequeño"
  // so a long nowrap value (e.g. "Diseñadora UX/UI") can't overflow a
  // column that's narrower than its own text.
  metaCardStacked: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "18px",
    rowGap: "10px",
    alignItems: "start",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "@media (max-width: 360px)": {
      gridTemplateColumns: "1fr",
    },
  },
  metaHDivider: {
    gridColumn: "1 / -1",
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  ctaStackedButton: {
    width: "100%",
  },
  banner: {
    position: "relative",
    width: "100%",
    aspectRatio: "1276 / 650",
    borderRadius: "16px",
    overflow: "hidden",
    [TABLET_QUERY]: {
      aspectRatio: "343 / 238",
      borderRadius: "12px",
    },
  },
  // Oversized by PARALLAX_OVERSIZE on top+bottom so the translateY applied
  // in the scroll effect (clamped to that same fraction) always keeps the
  // image fully covering the mask above — the banner's own overflow:hidden
  // crops the buffer until it's needed.
  bannerParallaxLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: `-${PARALLAX_OVERSIZE * 100}%`,
    height: `${(1 + PARALLAX_OVERSIZE * 2) * 100}%`,
    willChange: "transform",
  },
  bannerImage: {
    objectFit: "cover",
  },
});

function MetaItem({ label, value }: { label: string; value: string }) {
  const styles = useStyles();
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaIcon}>
        <MetaSparkleIcon />
      </span>
      <div className={styles.metaTextCol}>
        <span className={styles.metaLabel}>{label}</span>
        <span className={styles.metaValue}>{value}</span>
      </div>
    </div>
  );
}

// Smooth scroll parallax for the banner: shifts the (oversized) image layer
// by a small translateY tied to the banner's position in the viewport, so
// it appears to move at a slightly different speed than the page scroll.
// Pauses via IntersectionObserver when the banner isn't visible, and reads
// layout (getBoundingClientRect) only inside a requestAnimationFrame tick so
// scrolling never triggers more than one read+write pair per frame.
function useBannerParallax(
  containerRef: RefObject<HTMLDivElement | null>,
  layerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let listening = false;

    const applyOffset = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = window.innerHeight / 2 - elementCenter;
      const factor = window.innerWidth <= 600 ? PARALLAX_FACTOR_MOBILE : PARALLAX_FACTOR;
      const maxOffset = rect.height * PARALLAX_OVERSIZE;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, distance * factor));
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyOffset);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", requestTick, { passive: true });
          window.addEventListener("resize", requestTick);
          requestTick();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", requestTick);
          window.removeEventListener("resize", requestTick);
        }
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [containerRef, layerRef]);
}

export function ProjectHero({ project }: { project: Project }) {
  const styles = useStyles();
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerParallaxLayerRef = useRef<HTMLDivElement>(null);
  useBannerParallax(bannerRef, bannerParallaxLayerRef);
  const detail = project.detail;
  if (!detail) return null;

  const { meta } = detail;
  const highlightIndex = detail.description.indexOf(detail.descriptionHighlight);
  const before = highlightIndex >= 0 ? detail.description.slice(0, highlightIndex) : detail.description;
  const after =
    highlightIndex >= 0
      ? detail.description.slice(highlightIndex + detail.descriptionHighlight.length)
      : "";

  return (
    <div className={styles.root}>
      <div className={styles.grey} aria-hidden="true" />
      <PageContainer>
        <div className={styles.content}>
          <div className={styles.breadcrumbBlock}>
            <Link href="/#proyectos" className={styles.breadcrumb}>
              <ArrowLeft16Regular />
              VOLVER A PROYECTOS
            </Link>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{project.title}</h1>
              <Button
                as="a"
                href={detail.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                appearance="secondary"
                icon={<ExternalLinkIcon />}
                iconPosition="after"
                className={styles.ctaTabletInline}
              >
                Ver Sitio Web
              </Button>
            </div>
          </div>

          <div className={styles.descRow}>
            <p className={styles.description}>
              {before}
              {highlightIndex >= 0 && (
                <span className={styles.descriptionHighlight}>{detail.descriptionHighlight}</span>
              )}
              {after}
            </p>
            <div className={styles.tags}>
              {detail.detailTags.map((tag) => (
                <OutlineBadge key={tag}>{tag}</OutlineBadge>
              ))}
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          {/* Desktop: single-row meta bar + card-styled external link */}
          <div className={styles.metaCtaRowDesktop}>
            <div className={styles.metaCard}>
              <div className={styles.metaItemsRow}>
                <MetaItem label="DISEÑADO EN" value={meta.designedIn} />
                <div className={styles.metaVDivider} aria-hidden="true" />
                <MetaItem label="CLIENTE" value={meta.client} />
                <div className={styles.metaVDivider} aria-hidden="true" />
                <MetaItem label="TIPO" value={meta.type} />
                <div className={styles.metaVDivider} aria-hidden="true" />
                <MetaItem label="ROL" value={meta.role} />
                <div className={styles.metaVDivider} aria-hidden="true" />
                <MetaItem label="AÑO" value={meta.year} />
              </div>
            </div>
            <a
              className={styles.ctaDesktop}
              href={detail.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.ctaDesktopText}>Ver Sitio Web</span>
              <ExternalLinkIcon className={mergeClasses(styles.ctaDesktopIcon, CTA_ICON_HOOK)} />
            </a>
          </div>

          {/* Tablet only: 3+2 metadata grid, no CTA (it's inline with the title above) */}
          <div className={styles.metaCardTablet}>
            <div className={mergeClasses(styles.metaGridRow, styles.metaGridRow1)}>
              <MetaItem label="DISEÑADO EN" value={meta.designedIn} />
              <MetaItem label="TIPO" value={meta.type} />
              <MetaItem label="CLIENTE" value={meta.client} />
            </div>
            <div className={styles.metaGridDivider} aria-hidden="true" />
            <div className={mergeClasses(styles.metaGridRow, styles.metaGridRow2)}>
              <MetaItem label="ROL" value={meta.role} />
              <MetaItem label="AÑO" value={meta.year} />
            </div>
          </div>

          {/* Mobile only: stacked meta card + full-width CTA button */}
          <div className={styles.metaCtaStack}>
            <div className={styles.metaCardStacked}>
              <MetaItem label="DISEÑADO EN" value={meta.designedIn} />
              <MetaItem label="CLIENTE" value={meta.client} />
              <div className={styles.metaHDivider} aria-hidden="true" />
              <MetaItem label="TIPO" value={meta.type} />
              <MetaItem label="ROL" value={meta.role} />
              <div className={styles.metaHDivider} aria-hidden="true" />
              <MetaItem label="AÑO" value={meta.year} />
            </div>
            <Button
              as="a"
              href={detail.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              appearance="secondary"
              icon={<ExternalLinkIcon />}
              iconPosition="after"
              className={styles.ctaStackedButton}
            >
              Ver Sitio Web
            </Button>
          </div>

          <div className={styles.banner} ref={bannerRef}>
            <div className={styles.bannerParallaxLayer} ref={bannerParallaxLayerRef}>
              <Image
                src={detail.bannerImage}
                alt={`Vista previa del proyecto ${project.title}`}
                fill
                sizes="(min-width: 901px) 1276px, 100vw"
                priority
                className={styles.bannerImage}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
