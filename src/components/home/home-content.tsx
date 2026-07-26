"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    paddingTop: "83px",
    paddingBottom: "86px",
  },
});

export function HomeContent({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return (
    <main id="top" className={styles.root}>
      {children}
    </main>
  );
}
