"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import { Button } from "@/components/ui/button";
import { customTokens } from "@/lib/fluent/theme";

// This section needs more room than the rest of the page before its two
// columns get cramped, so it stacks earlier (1000px) than the site-wide
// tablet breakpoint used elsewhere (900px in IntroPanel/SiteHeader).
const TABLET_QUERY = "@media (max-width: 1000px)";
const MOBILE_QUERY = "@media (max-width: 600px)";
// Tablet/Mobile must stay exactly as they are — anything scoped to real
// Desktop only (above this section's own 1000px tablet threshold) needs
// this bounded query instead of relying on the absence of TABLET_QUERY.
const DESKTOP_ONLY_QUERY = "@media (min-width: 1001px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "75px",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius3XLarge,
    padding: "84px",
    [TABLET_QUERY]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [MOBILE_QUERY]: {
      padding: "24px",
      gap: "35px",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "106px",
    maxWidth: "599px",
    [TABLET_QUERY]: {
      maxWidth: "100%",
    },
    [MOBILE_QUERY]: {
      gap: "35px",
    },
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: customTokens.colorGrey12,
  },
  eyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: "14px",
    lineHeight: "20px",
    margin: 0,
  },
  description: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "300",
    fontSize: "32px",
    lineHeight: "40px",
    margin: 0,
    [MOBILE_QUERY]: {
      fontSize: tokens.fontSizeBase600,
      lineHeight: tokens.lineHeightBase600,
    },
  },
  ctaBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
  },
  ctaText: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    lineHeight: "28px",
    color: customTokens.colorGrey12,
    margin: 0,
  },
  // Outline button, brand-blue border — matches the Design System's Button
  // (Style=Outline, node 9026:585: NavyStrokeActive border) with the
  // project's brand color, same treatment already used for the mobile
  // "Ver Proyecto" CTA on Project Cards. Was previously only applied at
  // Mobile — Desktop fell back to Fluent's default grey outline border,
  // which didn't match the Figma component. Tablet is left as-is.
  ctaButton: {
    display: "inline-flex",
    transitionProperty: "border-color",
    transitionDuration: tokens.durationNormal,
    [MOBILE_QUERY]: {
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
    [DESKTOP_ONLY_QUERY]: {
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
    // Hover (Figma node 9026:573, Style=Outline/State=Hover): border goes
    // from NavyStrokeActive (#2a4dff) to the darker NavyForeground2
    // (#182c91) — already in the theme as colorBrandBackgroundHover.
    // Background and text color don't change between Rest/Hover in Figma.
    // Applies everywhere the button renders (Desktop, Tablet, Mobile).
    ':hover': {
      borderTopColor: tokens.colorBrandBackgroundHover,
      borderRightColor: tokens.colorBrandBackgroundHover,
      borderBottomColor: tokens.colorBrandBackgroundHover,
      borderLeftColor: tokens.colorBrandBackgroundHover,
    },
  },
  right: {
    width: "434px",
    flexShrink: 0,
    // `root` vertically centers its row children — fine while the
    // accordion is tall (an item open), but with every item collapsed the
    // block is short and visibly floats mid-row instead of top-aligning
    // with `.left`. Pin it to the top at Desktop only.
    [DESKTOP_ONLY_QUERY]: {
      alignSelf: "flex-start",
    },
    [TABLET_QUERY]: {
      width: "100%",
      borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
      paddingTop: "48px",
    },
    [MOBILE_QUERY]: {
      // The 35px gap between blocks (see `root`) replaces the divider as
      // the visual separator on mobile.
      borderTop: "none",
      paddingTop: 0,
    },
  },
  accordionItem: {
    ":not(:last-child)": {
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
  },
  accordionHeader: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "28px",
    lineHeight: "36px",
    color: tokens.colorNeutralForeground1,
    paddingTop: "18px",
    paddingBottom: "18px",
    [MOBILE_QUERY]: {
      fontSize: "20px",
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  panelColumns: {
    display: "flex",
    gap: "28px",
    paddingBottom: "12px",
    [MOBILE_QUERY]: {
      flexDirection: "column",
      // Match the list's own item gap so the two stacked lists read as one
      // continuous column instead of leaving the row-layout column gap.
      gap: "8px",
      paddingBottom: "24px",
    },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "203px",
    margin: 0,
    paddingLeft: "24px",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: customTokens.colorGrey12,
    [MOBILE_QUERY]: {
      width: "100%",
    },
  },
});

const knowledgeColumns: [string[], string[]] = [
  ["User Research", "User Flow y Site Map", "Design Systems", "Wireframing & Mockups"],
  ["Diseño Responsive", "Prototipado interactivo", "QA de interfaces", "Pruebas de usabilidad"],
];

const softSkillsColumns: [string[]] = [
  ["Comunicación con clientes", "Liderazgo de equipos", "Generación de recursos IA"],
];

const toolsColumns: [string[], string[]] = [
  ["Figma / Sketch", "Illustrator / Photoshop", "Notion / Trello / Slack", "FigJam / Miro"],
  ["Maze", "Microsoft 365", "Figma Slides / Canva"],
];

export function SkillsSection() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>MIS HABILIDADES</p>
          <p className={styles.description}>
            Diseñadora de interfaces digitales, dedicada a la aplicación de metodologías de
            diseño y la construcción de soluciones centradas en el usuario.
          </p>
        </div>
        <div className={styles.ctaBlock}>
          <p className={styles.ctaText}>¿Te interesa saber más sobre mí?</p>
          <Button
            as="a"
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            appearance="outline"
            className={styles.ctaButton}
          >
            Dale un vistazo a mi CV
          </Button>
        </div>
      </div>
      <div className={styles.right}>
        <Accordion collapsible defaultOpenItems={["conocimientos"]}>
          <AccordionItem className={styles.accordionItem} value="conocimientos">
            <AccordionHeader expandIconPosition="end" button={{ className: styles.accordionHeader }}>Conocimientos UX/UI</AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelColumns}>
                {knowledgeColumns.map((column, index) => (
                  <ul className={styles.list} key={index}>
                    {column.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className={styles.accordionItem} value="blandas">
            <AccordionHeader expandIconPosition="end" button={{ className: styles.accordionHeader }}>Habilidades Blandas</AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelColumns}>
                {softSkillsColumns.map((column, index) => (
                  <ul className={styles.list} key={index}>
                    {column.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className={styles.accordionItem} value="herramientas">
            <AccordionHeader expandIconPosition="end" button={{ className: styles.accordionHeader }}>Herramientas</AccordionHeader>
            <AccordionPanel>
              <div className={styles.panelColumns}>
                {toolsColumns.map((column, index) => (
                  <ul className={styles.list} key={index}>
                    {column.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
