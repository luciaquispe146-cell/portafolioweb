import { webDarkTheme, webLightTheme, type Theme } from "@fluentui/react-components";

const fontFamilyBase = "var(--font-geist-sans), 'Segoe UI', system-ui, sans-serif";

// Brand color from Figma (Portafolio Web Lucia, node 9026:430 "Button"):
// Global.Color.Navy.Primary / Shade40 / Shade50, NavyForeground2, NavyStrokeActive.
const brandOverrides = {
  colorBrandBackground: "#2a4dff",
  colorBrandBackgroundHover: "#182c91",
  colorBrandBackgroundPressed: "#12216d",
  colorBrandBackgroundSelected: "#0c1648",
  colorBrandStroke1: "#2a4dff",
};

// Colors used in Figma that don't map to an existing Fluent semantic token.
// Kept here (not hardcoded in components) so this file stays the single
// source of truth for every color in the project.
export const customTokenDefinitions = {
  colorGrey12: "#1f1f1f", // Global.Color.Grey.12 — Home headings/body text
  colorGrey92: "#ebebeb", // Global.Color.Grey.92 — project card tag pills
  colorPureBlack: "#000000", // Global.Color.Black — availability/location badges
  colorAvailabilityDot: "#19d279", // status dot on "Disponible para trabajar"
  colorHairlineDivider: "rgba(0, 0, 0, 0.05)", // subtle 1px separators (e.g. header bottom border)
  colorFooterBackground: "#0f0f0f", // sampled from Figma footer screenshot
  colorFooterMuted: "rgba(255, 255, 255, 0.6)", // secondary text on the dark footer
  colorHeaderBackground: "rgba(255, 255, 255, 0.7)", // sticky header glass background
};

export type CustomTokenName = keyof typeof customTokenDefinitions;

// Mirrors Fluent's own `tokens` object: each value is a ready-to-use
// `var(--name)` reference instead of the raw hex.
export const customTokens = Object.fromEntries(
  Object.keys(customTokenDefinitions).map((name) => [name, `var(--${name})`]),
) as Record<CustomTokenName, string>;

export const lightTheme: Theme = {
  ...webLightTheme,
  fontFamilyBase,
  ...brandOverrides,
  ...customTokenDefinitions,
};

export const darkTheme: Theme = {
  ...webDarkTheme,
  fontFamilyBase,
  ...brandOverrides,
  ...customTokenDefinitions,
};
