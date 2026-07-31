"use client";

import { makeStyles, tokens } from "@fluentui/react-components";

import { LabeledBullet } from "@/components/project-detail/labeled-bullet";
import { customTokens } from "@/lib/fluent/theme";

const TABLET_QUERY = "@media (max-width: 1000px)";
const MOBILE_QUERY = "@media (max-width: 600px)";

const useStyles = makeStyles({
  row: {
    display: "flex",
    gap: "45px",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    [TABLET_QUERY]: {
      flexDirection: "column",
      gap: "12px",
      justifyContent: "flex-start",
    },
  },
  text: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    lineHeight: "28px",
    color: customTokens.colorGrey12,
    maxWidth: "905px",
    [MOBILE_QUERY]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
      maxWidth: "100%",
    },
  },
});

export function ProjectResult({ result }: { result: string }) {
  const styles = useStyles();

  return (
    <div className={styles.row}>
      <LabeledBullet>EL RESULTADO</LabeledBullet>
      <p className={styles.text}>{result}</p>
    </div>
  );
}
