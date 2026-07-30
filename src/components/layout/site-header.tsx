"use client";

import { Button as FluentButton, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { Dismiss24Regular, Navigation24Regular } from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { customTokens } from "@/lib/fluent/theme";

const CV_HREF = "/CV%20-%20Lucia%20Quispe.pdf";
const WHATSAPP_HREF =
  "https://wa.me/34612296052?text=Hola%2C%20vi%20tu%20portfolio%20y%20estoy%20interesada%20en%20trabajar%20contigo";

// Stable, non-hashed hook so the "Ver CV" hover rule can reach the icon
// directly instead of racing Fluent's own same-specificity
// `.fui-Button__icon:hover` rule (whichever lands later in the generated
// stylesheet wins, and that's not guaranteed to be ours).
const CV_ICON_HOOK = "site-header-cv-icon";

// Custom arrow-up-right glyph for "Ver CV" (provided directly, not a Fluent
// icon) — stroke uses currentColor so it still picks up the Rest/Hover
// navy colors applied via CV_ICON_HOOK.
function CvIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.25 12.75L12.75 5.25M12.75 12.75V5.25H5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Same breakpoint already used elsewhere (IntroPanel, ProjectsSection) for
// switching to the tablet/mobile layout.
const TABLET_QUERY = "@media (max-width: 900px)";

// Linear-eased scroll so the motion feels constant (no ease-in/out), per
// the Figma prototype. Native `scrollIntoView({behavior:"smooth"})` doesn't
// allow controlling duration/easing, hence this small rAF-based helper.
function smoothScrollToId(id: string, duration = 600) {
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = startY + target.getBoundingClientRect().top;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: "14px",
    paddingBottom: "13px",
    paddingLeft: "26px",
    paddingRight: "26px",
    backgroundColor: customTokens.colorHeaderBackground,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: `1px solid ${customTokens.colorHairlineDivider}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1248px",
  },
  // Desktop nav (text links + CTA). Hidden below the tablet breakpoint.
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    [TABLET_QUERY]: {
      display: "none",
    },
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  // Conversemos (small) + hamburger/close toggle, grouped together like in
  // Figma. Hidden on desktop, where the full nav above is used instead.
  mobileActions: {
    display: "none",
    [TABLET_QUERY]: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
  },
  menuToggle: {
    color: customTokens.colorPureBlack,
  },
  // Full-width overlay panel anchored right below the header, per Figma —
  // not a side drawer, not content-push. Kept mounted at all times and
  // animated via opacity/transform so open/close stays smooth.
  menuPanel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: "48px",
    paddingBottom: "48px",
    paddingLeft: "24px",
    paddingRight: "24px",
    opacity: 0,
    transform: "translateY(-8px)",
    pointerEvents: "none",
    transitionProperty: "opacity, transform",
    transitionDuration: tokens.durationSlower,
    transitionTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
  menuPanelOpen: {
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto",
  },
  menuLink: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    lineHeight: "28px",
    color: customTokens.colorGrey12,
    textDecoration: "none",
    paddingTop: "16px",
    paddingBottom: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  menuDivider: {
    width: "85%",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // "Ver CV" (Figma nodes 9026:477 Rest / 9026:465 Hover): text is
  // NeutralForeground1 (#242424) while its icon is brand navy at Rest —
  // on Hover both text and icon unify to the darker navy
  // (colorBrandBackgroundHover, #182c91). Used by both the Desktop Fluent
  // Button and the Mobile menu's plain anchor; the icon is targeted via
  // CV_ICON_HOOK on the icon element itself (not `.fui-Button__icon`),
  // since that class is also targeted by Fluent's own same-specificity
  // hover rule and cascade order between the two isn't guaranteed.
  cvLink: {
    color: tokens.colorNeutralForeground1,
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
    [`& .${CV_ICON_HOOK}`]: {
      color: tokens.colorBrandStroke1,
      transitionProperty: "color",
      transitionDuration: tokens.durationNormal,
    },
    ":hover": {
      color: tokens.colorBrandBackgroundHover,
    },
    [`:hover .${CV_ICON_HOOK}`]: {
      color: tokens.colorBrandBackgroundHover,
    },
  },
  // "Mis Proyectos" — same Hover treatment as "Ver CV" (Figma node
  // 9026:465): text turns the darker navy (colorBrandBackgroundHover,
  // #182c91) on hover. No icon here, so no icon-hook is needed. Rest color
  // is left as whatever each usage already had (Button/menuLink default).
  navHoverLink: {
    transitionProperty: "color",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      color: tokens.colorBrandBackgroundHover,
    },
  },
});

export function SiteHeader() {
  const styles = useStyles();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Ir al inicio">
          <Image src="/images/brand/Logotipo.svg" alt="Lucia Quispe" width={100} height={53} priority />
        </Link>
        <nav className={styles.nav} aria-label="Navegación principal">
          <div className={styles.navLinks}>
            <Button
              as="a"
              href="#proyectos"
              appearance="transparent"
              size="large"
              className={styles.navHoverLink}
              onClick={(event) => {
                event.preventDefault();
                smoothScrollToId("proyectos");
              }}
            >
              Mis Proyectos
            </Button>
            <Button
              as="a"
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              appearance="transparent"
              size="large"
              icon={<CvIcon className={CV_ICON_HOOK} />}
              iconPosition="after"
              className={styles.cvLink}
            >
              Ver CV
            </Button>
          </div>
          <Button as="a" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            Conversemos
          </Button>
        </nav>
        <div className={styles.mobileActions}>
          <Button as="a" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" size="large">
            Conversemos
          </Button>
          <FluentButton
            className={styles.menuToggle}
            appearance="transparent"
            icon={isMobileMenuOpen ? <Dismiss24Regular /> : <Navigation24Regular />}
            aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          />
        </div>
      </div>
      <nav
        id="mobile-menu-panel"
        aria-label="Menú de navegación móvil"
        aria-hidden={!isMobileMenuOpen}
        className={mergeClasses(styles.menuPanel, isMobileMenuOpen && styles.menuPanelOpen)}
      >
        <a
          className={mergeClasses(styles.menuLink, styles.navHoverLink)}
          href="#proyectos"
          onClick={(event) => {
            event.preventDefault();
            smoothScrollToId("proyectos");
            closeMenu();
          }}
        >
          Mis Proyectos
        </a>
        <div className={styles.menuDivider} aria-hidden="true" />
        <a
          className={mergeClasses(styles.menuLink, styles.cvLink)}
          href={CV_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Ver CV
          <CvIcon className={CV_ICON_HOOK} />
        </a>
      </nav>
    </header>
  );
}
