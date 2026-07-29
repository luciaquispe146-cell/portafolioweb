"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import Image from "next/image";

import { customTokens } from "@/lib/fluent/theme";
import { fontPrata } from "@/lib/fonts";

// Same breakpoint and mobile side-padding already used elsewhere
// (IntroPanel, ProjectsSection, SkillsSection).
const MOBILE_QUERY = "@media (max-width: 600px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    paddingLeft: "62px",
    paddingRight: "62px",
    color: customTokens.colorGrey12,
    [MOBILE_QUERY]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  eyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: "14px",
    lineHeight: "20px",
    width: "100%",
  },
  introduction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  greetingRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "16px",
    maxWidth: "100%",
  },
  greeting: {
    fontFamily: fontPrata,
    fontWeight: "400",
    fontSize: "clamp(40px, 6vw, 80px)",
    lineHeight: "1.2",
  },
  flourish: {
    flexShrink: 0,
    [MOBILE_QUERY]: {
      display: "none",
    },
  },
  showcase: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "clamp(32px, 5.5vw, 70px)",
    lineHeight: "1.03",
    maxWidth: "100%",
  },
});

export function HeroSection() {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-labelledby="hero-heading">
      <p className={styles.eyebrow}>UX/UI DESIGNER</p>
      <div className={styles.introduction}>
        <h1 id="hero-heading" className={styles.greetingRow}>
          <span className={styles.greeting}>¡Hola! soy Lucia,</span>
          <Image
            src="/images/home/hero-flourish.png"
            alt=""
            width={35}
            height={36}
            className={styles.flourish}
          />
        </h1>
        <p className={styles.showcase}>déjame mostrarte mis proyectos</p>
      </div>
    </section>
  );
}
