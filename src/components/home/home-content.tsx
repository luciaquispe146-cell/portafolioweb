"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

// Same breakpoint used elsewhere (IntroPanel, ProjectsSection, SkillsSection).
const MOBILE_QUERY = "@media (max-width: 600px)";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    paddingTop: "83px",
    paddingBottom: "86px",
    [MOBILE_QUERY]: {
      paddingTop: "30px",
    },
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
