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
    // The 75px base gap is meant for the Desktop row layout (space between
    // `.left` and `.right` side by side); once stacked into a column at
    // Tablet it read as excess vertical space above the accordion. Bounded
    // (not plain TABLET_QUERY) so it can't race with MOBILE_QUERY's own gap
    // below over the same property.
    "@media (min-width: 601px) and (max-width: 1000px)": {
      gap: "40px",
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
    // Roughly half the Desktop gap between the intro text and the CTA
    // block — bounded so it can't race with MOBILE_QUERY's own gap below.
    "@media (min-width: 601px) and (max-width: 1000px)": {
      gap: "53px",
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
    // Bounded (not a plain max-width:1100px) so it can never overlap/race
    // with MOBILE_QUERY below over the same fontSize property — Griffel
    // doesn't guarantee source order between overlapping media-query
    // buckets. Only fontSize changes here; weight/lineHeight/color stay put.
    "@media (min-width: 601px) and (max-width: 1100px)": {
      fontSize: "26px",
    },
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
      // Divider removed at this breakpoint down. paddingTop still provides
      // the space between the CTA block and the accordion (now combined
      // with `root`'s own reduced gap above) — trimmed from 48px since,
      // together with that gap, it read as excess empty space.
      width: "100%",
      paddingTop: "24px",
    },
    [MOBILE_QUERY]: {
      // The 35px gap between blocks (see `root`) already replaces the
      // divider as the visual separator on mobile.
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
    // At Tablet the bottom gap (this paddingBottom) reads noticeably
    // tighter than the top gap (the header's own paddingBottom, 18px,
    // since this element has no paddingTop of its own) — bumped to match
    // so the accordion content sits visually centered between header and
    // divider. Bounded to 601-1000px only: Desktop keeps its current 12px,
    // and this can't race with MOBILE_QUERY's own paddingBottom below since
    // the ranges never overlap.
    "@media (min-width: 601px) and (max-width: 1000px)": {
      paddingBottom: "18px",
    },
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
            href="/CV%20-%20Lucia%20Quispe.pdf"
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
