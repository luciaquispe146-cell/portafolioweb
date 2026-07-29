"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import { ArrowLeft16Regular, ArrowUpRight16Regular, Sparkle16Filled } from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { OutlineBadge } from "@/components/ui/outline-badge";
import { customTokens } from "@/lib/fluent/theme";
import { fontPrata } from "@/lib/fonts";
import type { Project } from "@/types/project";

// Same breakpoints already used across Home (IntroPanel, ProjectsSection,
// SkillsSection). No Tablet frame exists in Figma for this page — the meta
// bar/CTA switch to their stacked Mobile composition starting at
// TABLET_QUERY, since that's the point the single-line meta row no longer
// fits (interpolated, per explicit sign-off).
const TABLET_QUERY = "@media (max-width: 900px)";
const MOBILE_QUERY = "@media (max-width: 600px)";
// Exclusive tablet-only range for properties that also get a DIFFERENT
// (not just inherited) override at MOBILE_QUERY — Griffel doesn't guarantee
// which of two overlapping max-width buckets wins the cascade, so any
// property set by both TABLET_QUERY and MOBILE_QUERY must use this instead
// of the plain (inclusive) TABLET_QUERY for the tablet-only value.
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 900px)";

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
  },
  breadcrumb: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: customTokens.colorGrey12,
    textDecoration: "none",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  title: {
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
    [MOBILE_QUERY]: {
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
    gap: "18px",
    width: "100%",
    [TABLET_QUERY]: {
      display: "none",
    },
  },
  metaCard: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "37px",
    paddingRight: "37px",
  },
  metaItemsRow: {
    display: "flex",
    alignItems: "center",
    gap: "45px",
    width: "100%",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
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
  ctaDesktop: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    width: "217px",
    height: "92px",
    paddingLeft: "21px",
    paddingRight: "21px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    color: customTokens.colorPureBlack,
    textDecoration: "none",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  // --- Stacked meta card + CTA (Tablet + Mobile) ---
  metaCtaStack: {
    display: "none",
    [TABLET_QUERY]: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
    },
  },
  metaCardStacked: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  metaStackRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    width: "100%",
  },
  metaHDivider: {
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
  bannerImage: {
    objectFit: "cover",
  },
});

function MetaItem({ label, value }: { label: string; value: string }) {
  const styles = useStyles();
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaIcon}>
        <Sparkle16Filled />
      </span>
      <div className={styles.metaTextCol}>
        <span className={styles.metaLabel}>{label}</span>
        <span className={styles.metaValue}>{value}</span>
      </div>
    </div>
  );
}

export function ProjectHero({ project }: { project: Project }) {
  const styles = useStyles();
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
            <h1 className={styles.title}>{project.title}</h1>
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
              Ver Sitio Web
              <ArrowUpRight16Regular />
            </a>
          </div>

          {/* Tablet + Mobile: stacked meta card + full-width CTA button */}
          <div className={styles.metaCtaStack}>
            <div className={styles.metaCardStacked}>
              <div className={styles.metaStackRow}>
                <MetaItem label="DISEÑADO EN" value={meta.designedIn} />
                <MetaItem label="CLIENTE" value={meta.client} />
              </div>
              <div className={styles.metaHDivider} aria-hidden="true" />
              <div className={styles.metaStackRow}>
                <MetaItem label="TIPO" value={meta.type} />
                <MetaItem label="ROL" value={meta.role} />
              </div>
              <div className={styles.metaHDivider} aria-hidden="true" />
              <div className={styles.metaStackRow}>
                <MetaItem label="AÑO" value={meta.year} />
              </div>
            </div>
            <Button
              as="a"
              href={detail.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              appearance="secondary"
              icon={<ArrowUpRight16Regular />}
              iconPosition="after"
              className={styles.ctaStackedButton}
            >
              Ver Sitio
            </Button>
          </div>

          <div className={styles.banner}>
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
      </PageContainer>
    </div>
  );
}
