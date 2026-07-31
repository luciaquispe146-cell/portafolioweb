"use client";

import { makeStyles, tokens } from "@fluentui/react-components";

import { LabeledBullet } from "@/components/project-detail/labeled-bullet";
import { customTokens } from "@/lib/fluent/theme";
import type { ProjectDetail } from "@/types/project";

// Same breakpoints used across the site. Tablet and Mobile both stack the
// heading above the challenge/proposal content (vs. Desktop's side-by-side
// row) — that part of the composition is shared at TABLET_QUERY. Typography
// and the "LA SOLUCIÓN" label swap only kick in at MOBILE_QUERY.
const TABLET_QUERY = "@media (max-width: 1000px)";
const MOBILE_QUERY = "@media (max-width: 600px)";
// Exclusive tablet-only range: root's gap differs from Mobile's (Figma
// 464444:2794 vs 13400:7354) even though both share the TABLET_QUERY column
// layout above — bounded so it can't race MOBILE_QUERY in the cascade.
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 1000px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "60px",
    width: "100%",
    [TABLET_ONLY_QUERY]: {
      gap: "24px",
    },
    [MOBILE_QUERY]: {
      gap: "32px",
    },
  },
  challengeRow: {
    display: "flex",
    gap: "139px",
    alignItems: "flex-start",
    width: "100%",
    [TABLET_QUERY]: {
      flexDirection: "column",
      gap: "32px",
    },
  },
  // width:270px used to force a wrap the Figma reference doesn't have —
  // auto + nowrap lets the heading take exactly the width its single line
  // needs, at every breakpoint (Mobile already used width:auto below).
  heading: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "40px",
    lineHeight: "56px",
    color: customTokens.colorGrey12,
    flexShrink: 0,
    width: "auto",
    whiteSpace: "nowrap",
    [MOBILE_QUERY]: {
      fontSize: "32px",
      lineHeight: "40px",
      width: "auto",
    },
  },
  challengeContent: {
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
    flex: "1 1 auto",
    [TABLET_QUERY]: {
      flexDirection: "column",
      gap: "12px",
    },
  },
  proposalRow: {
    display: "flex",
    gap: "42px",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    [TABLET_QUERY]: {
      flexDirection: "column",
      gap: "12px",
      justifyContent: "flex-start",
    },
  },
  divider: {
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  bodyText: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorGrey12,
    maxWidth: "740px",
    [MOBILE_QUERY]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
      maxWidth: "100%",
    },
  },
  proposalText: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    lineHeight: "28px",
    color: customTokens.colorGrey12,
    maxWidth: "937px",
    [MOBILE_QUERY]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
      maxWidth: "100%",
    },
  },
  // Section label differs by breakpoint ("LA PROPUESTA DE DISEÑO" on
  // Desktop/Tablet vs "LA SOLUCIÓN" on Mobile per Figma) — both render,
  // toggled purely via CSS so there's no hydration-dependent text swap.
  labelDesktop: {
    display: "block",
    [MOBILE_QUERY]: {
      display: "none",
    },
  },
  labelMobile: {
    display: "none",
    [MOBILE_QUERY]: {
      display: "block",
    },
  },
});

export function ProjectCaseStudy({ detail }: { detail: ProjectDetail }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.challengeRow}>
        <h2 className={styles.heading}>Caso de estudio</h2>
        <div className={styles.challengeContent}>
          <LabeledBullet>EL DESAFÍO</LabeledBullet>
          <p className={styles.bodyText}>{detail.challenge}</p>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.proposalRow}>
        <span className={styles.labelDesktop}>
          <LabeledBullet>LA PROPUESTA DE DISEÑO</LabeledBullet>
        </span>
        <span className={styles.labelMobile}>
          <LabeledBullet>LA SOLUCIÓN</LabeledBullet>
        </span>
        <p className={styles.proposalText}>{detail.proposal}</p>
      </div>
    </div>
  );
}
