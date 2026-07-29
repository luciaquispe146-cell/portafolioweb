"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import { ArrowUpRight24Regular } from "@fluentui/react-icons";
import Image from "next/image";

import { PageContainer } from "@/components/layout/page-container";
import { customTokens } from "@/lib/fluent/theme";

const tickerItems = [
  "Research & Synthesis",
  "Design Systems",
  "Mockups",
  "Wireframing",
  "Prototyping",
];

// A marquee loop only stays gap-free if a single lap of content is wider
// than the widest real viewport — otherwise translateX(-50%) exposes empty
// space once the content is narrower than the screen. Repeating the base
// list guarantees that regardless of how many items `tickerItems` has.
const REPEATS_PER_HALF = 4;
// Seconds it should take to scroll exactly one lap of the base list, at a
// constant (viewport-independent) speed. The full half is REPEATS_PER_HALF
// laps, so its duration scales with it — this keeps the perceived speed
// identical no matter how many times the list is repeated internally.
const SECONDS_PER_LAP = 18;

const socialLinks = [
  { label: "Email", href: "mailto:luciaquispe146@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/34612296292" },
  { label: "LinkedIn", href: "#" },
];

const useStyles = makeStyles({
  root: {
    backgroundColor: customTokens.colorFooterBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "64px",
    paddingBottom: "56px",
    paddingLeft: "62px",
    paddingRight: "62px",
  },
  eyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForegroundInverted,
    margin: 0,
  },
  question: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "28px",
    lineHeight: "36px",
    color: tokens.colorNeutralForegroundInverted,
    margin: "12px 0 0",
  },
  bigLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    width: "fit-content",
    marginTop: "8px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralForegroundInverted}`,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "clamp(28px, 8vw, 48px)",
    lineHeight: "1.17",
    color: tokens.colorNeutralForegroundInverted,
    textDecoration: "none",
  },
  bottomRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "64px",
    gap: "24px",
    flexWrap: "wrap",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  contactLink: {
    color: tokens.colorNeutralForegroundInverted,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      color: customTokens.colorFooterMuted,
    },
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
  },
  socialNav: {
    display: "flex",
    gap: "20px",
  },
  socialLink: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: tokens.colorNeutralForegroundInverted,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      color: customTokens.colorFooterMuted,
    },
  },
  copyright: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: "12px",
    lineHeight: "16px",
    color: customTokens.colorFooterMuted,
    margin: 0,
  },
  tickerWrapper: {
    width: "100%",
    overflow: "hidden",
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  tickerTrack: {
    display: "flex",
    width: "fit-content",
    willChange: "transform",
    animationName: {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(-50%)" },
    },
    animationDuration: `${SECONDS_PER_LAP * REPEATS_PER_HALF}s`,
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    "@media (prefers-reduced-motion: reduce)": {
      animationPlayState: "paused",
    },
  },
  tickerItem: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gap: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: tokens.colorNeutralForegroundInverted,
  },
  tickerBullet: {
    flexShrink: 0,
    display: "flex",
  },
});

export function SiteFooter() {
  const styles = useStyles();
  const half = Array.from({ length: REPEATS_PER_HALF }, () => tickerItems).flat();
  const loopedItems = [...half, ...half];

  return (
    <footer id="contacto" className={styles.root}>
      <PageContainer>
        <div className={styles.content}>
          <p className={styles.eyebrow}>CONTACTO</p>
          <p className={styles.question}>¿Tienes un proyecto en mente?</p>
          <a className={styles.bigLink} href="mailto:luciaquispe146@gmail.com">
            Conversemos
            <ArrowUpRight24Regular />
          </a>
          <div className={styles.bottomRow}>
            <div className={styles.contactInfo}>
              <a className={styles.contactLink} href="mailto:luciaquispe146@gmail.com">
                luciaquispe146@gmail.com
              </a>
              <a className={styles.contactLink} href="tel:+34612296292">
                +34 612 296 292
              </a>
            </div>
            <div className={styles.meta}>
              <nav className={styles.socialNav} aria-label="Redes sociales">
                {socialLinks.map((link) => (
                  <a key={link.label} className={styles.socialLink} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>
              <p className={styles.copyright}>© 2026 Lucia Quispe · Senior Design</p>
            </div>
          </div>
        </div>
      </PageContainer>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack} aria-hidden="true">
          {loopedItems.map((item, index) => (
            <span className={styles.tickerItem} key={`${item}-${index}`}>
              <span className={styles.tickerBullet}>
                <Image src="/images/home/Forma.svg" alt="" width={16} height={16} />
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
