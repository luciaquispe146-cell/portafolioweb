"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

import { customTokens } from "@/lib/fluent/theme";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "100px",
    borderTop: `0.5px solid ${customTokens.colorPureBlack}`,
    borderRight: `0.5px solid ${customTokens.colorPureBlack}`,
    borderBottom: `0.5px solid ${customTokens.colorPureBlack}`,
    borderLeft: `0.5px solid ${customTokens.colorPureBlack}`,
    color: customTokens.colorPureBlack,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    paddingTop: "4px",
    paddingBottom: "6px",
    paddingLeft: "14px",
    paddingRight: "14px",
    whiteSpace: "nowrap",
  },
});

export function OutlineBadge({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return <span className={styles.root}>{children}</span>;
}
