"use client";

import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

import { customTokens } from "@/lib/fluent/theme";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: customTokens.colorGrey92,
    color: customTokens.colorPureBlack,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    paddingTop: "6px",
    paddingBottom: "8px",
    paddingLeft: "14px",
    paddingRight: "14px",
    whiteSpace: "nowrap",
  },
});

export function BadgePill({ children, className }: { children: ReactNode; className?: string }) {
  const styles = useStyles();
  return <span className={mergeClasses(styles.root, className)}>{children}</span>;
}
