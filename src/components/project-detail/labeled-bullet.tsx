"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

import { customTokens } from "@/lib/fluent/theme";

// Small bullet + uppercase label used by every "El Desafío / La Propuesta /
// El Resultado" row in the project detail template (Figma: Navy.Primary dot,
// same brand blue already used for colorBrandStroke1/colorBrandBackground).
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  dot: {
    flexShrink: 0,
    width: "5px",
    height: "5px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
  },
  label: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: customTokens.colorGrey12,
    whiteSpace: "nowrap",
  },
});

export function LabeledBullet({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return (
    <span className={styles.root}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </span>
  );
}
