"use client";

import { makeStyles } from "@fluentui/react-components";
import type { ReactNode } from "react";

// Same breakpoint used elsewhere (IntroPanel, ProjectsSection, SkillsSection).
const MOBILE_QUERY = "@media (max-width: 600px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    [MOBILE_QUERY]: {
      gap: "30px",
    },
  },
});

export function HomeSections({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
}
