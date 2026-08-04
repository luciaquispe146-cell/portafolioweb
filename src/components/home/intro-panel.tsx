"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import Image from "next/image";

import { OutlineBadge } from "@/components/ui/outline-badge";
import { customTokens } from "@/lib/fluent/theme";

// Same breakpoints already used elsewhere in the project: 900px is where
// SiteHeader swaps nav for the hamburger menu, 600px is where
// ProjectsSection collapses to a single column.
const TABLET_QUERY = "@media (max-width: 900px)";
const MOBILE_QUERY = "@media (max-width: 600px)";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    overflow: "hidden",
    paddingTop: "56px",
    paddingBottom: 0,
    paddingLeft: "62px",
    paddingRight: "62px",
    // Hiding the portfolio image + its divider (see horizontalDivider /
    // portfolioImageWrapper below) also removed the bottom spacing they
    // used to provide. Restore it as bottom padding instead, bounded to
    // 601-1000px so it can't race with MOBILE_QUERY's own paddingBottom
    // below over the same property.
    "@media (min-width: 601px) and (max-width: 1000px)": {
      paddingBottom: "50px",
    },
    [MOBILE_QUERY]: {
      // The portfolio image (the only thing that needed a flush bottom
      // edge) is removed at this breakpoint, so top/left/right padding is
      // symmetric again; bottom restores the 50px lost with the divider.
      paddingTop: "24px",
      paddingBottom: "50px",
      paddingLeft: "24px",
      paddingRight: "24px",
    },
  },
  innerFrame: {
    display: "flex",
    alignItems: "flex-end",
    gap: "50px",
    width: "100%",
    [TABLET_QUERY]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [MOBILE_QUERY]: {
      gap: "24px",
    },
  },
  innerContent: {
    display: "flex",
    alignItems: "flex-end",
    gap: "110px",
    height: "200px",
    [TABLET_QUERY]: {
      flexDirection: "column",
      alignItems: "flex-start",
      height: "auto",
    },
    // Bounded (not just max-width) so it can never overlap/race with
    // MOBILE_QUERY's gap below — Griffel doesn't guarantee source order
    // between separate media-query buckets when their ranges overlap.
    "@media (min-width: 601px) and (max-width: 900px)": {
      gap: "16px",
    },
    [MOBILE_QUERY]: {
      gap: "24px",
    },
  },
  iconArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    width: "112px",
    height: "200px",
    justifyContent: "flex-end",
    [TABLET_QUERY]: {
      height: "auto",
    },
  },
  iconRule: {
    width: "112px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  paragraph: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorGrey12,
    maxWidth: "394px",
    [TABLET_QUERY]: {
      maxWidth: "100%",
    },
  },
  verticalDivider: {
    alignSelf: "stretch",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    [TABLET_QUERY]: {
      display: "none",
    },
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
    marginLeft: "auto",
    [TABLET_QUERY]: {
      // Badges stretch to fill the width; OutlineBadge already centers its
      // own content, so no change needed there.
      alignItems: "stretch",
      marginLeft: 0,
    },
  },
  horizontalDivider: {
    width: "100%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    // Separated the portfolio image from the content above it — hidden
    // alongside that image from the same 1000px breakpoint down, since it
    // no longer has anything to separate below it.
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  portfolioImageWrapper: {
    position: "relative",
    width: "100%",
    height: "107px",
    // Was clipping instead of reflowing below Desktop widths — hidden
    // entirely from the Tablet breakpoint down (600px, already inside this
    // range, no longer needs its own separate query).
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
});

export function IntroPanel() {
  const styles = useStyles();

  return (
    <div className={styles.card}>
      <div className={styles.innerFrame}>
        <div className={styles.innerContent}>
          <div className={styles.iconArea}>
            <div className={styles.iconRule} aria-hidden="true" />
            <Image
              src="/images/home/Texto-UX-UI.jpg"
              alt="UX/UI &amp; Web Design"
              width={112}
              height={96}
            />
          </div>
          <p className={styles.paragraph}>
            Soy diseñadora de interfaces enfocada en productos digitales. Conecto los objetivos de
            negocio con interfaces escalables a través de la creación de sistemas de diseño
            eficientes.
          </p>
        </div>
        <div className={styles.verticalDivider} aria-hidden="true" />
        <div className={styles.profileSection}>
          <OutlineBadge>
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: customTokens.colorAvailabilityDot,
                display: "inline-block",
              }}
            />
            DISPONIBLE PARA TRABAJAR
          </OutlineBadge>
          <OutlineBadge>MADRID, ESPAÑA</OutlineBadge>
        </div>
      </div>
      <div className={styles.horizontalDivider} aria-hidden="true" />
      <div className={styles.portfolioImageWrapper}>
        <Image
          src="/images/home/Texto-portafolio.png"
          alt="Portafolio"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
