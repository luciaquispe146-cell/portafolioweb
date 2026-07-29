"use client";

import { makeStyles, mergeClasses } from "@fluentui/react-components";
import Image from "next/image";

// Same breakpoints used across the site. Desktop keeps Figma's asymmetric
// pairing per row (image width ratios below match the Figma slot sizes
// exactly); Mobile collapses every row to a single column, each image kept
// at its own natural aspect ratio (Figma's Mobile gallery instead uses
// bespoke per-image "device mockup" framing that only exists as one-off
// Figma artwork for this specific screenshot set — reproducing it would
// hard-code crop/shadow values per image and break the "swap images only"
// reusability this template is built for, so it's simplified to a plain
// stack here).
const MOBILE_QUERY = "@media (max-width: 600px)";
// Exclusive tablet-only range: gap gets a DIFFERENT value at MOBILE_QUERY
// (not just an inherited one), and Griffel doesn't guarantee which of two
// overlapping max-width buckets wins the cascade — bounding this avoids the
// race entirely instead of relying on stylesheet insertion order.
const TABLET_ONLY_QUERY = "@media (min-width: 601px) and (max-width: 900px)";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    width: "100%",
    [TABLET_ONLY_QUERY]: {
      gap: "16px",
    },
    [MOBILE_QUERY]: {
      gap: "14px",
    },
  },
  row: {
    display: "grid",
    gap: "22px",
    width: "100%",
    [TABLET_ONLY_QUERY]: {
      gap: "16px",
    },
    [MOBILE_QUERY]: {
      gap: "14px",
    },
  },
  rowEqual: {
    gridTemplateColumns: "1fr 1fr",
    [MOBILE_QUERY]: {
      gridTemplateColumns: "1fr",
    },
  },
  rowFull: {
    gridTemplateColumns: "1fr",
  },
  rowWide: {
    gridTemplateColumns: "433fr 821fr",
    [MOBILE_QUERY]: {
      gridTemplateColumns: "1fr",
    },
  },
  rowNarrow: {
    gridTemplateColumns: "806fr 448fr",
    [MOBILE_QUERY]: {
      gridTemplateColumns: "1fr",
    },
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    borderRadius: "16px",
    overflow: "hidden",
  },
  image: {
    objectFit: "cover",
  },
});

const GALLERY_RATIOS = [
  "627 / 394",
  "627 / 394",
  "1276 / 675",
  "433 / 513",
  "821 / 513",
  "806 / 448",
  "448 / 448",
] as const;

function GalleryImage({ src, ratio, alt }: { src: string; ratio: string; alt: string }) {
  const styles = useStyles();
  return (
    <div className={styles.imageWrapper} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes="(min-width: 601px) 50vw, 100vw" className={styles.image} />
    </div>
  );
}

export function ProjectGallery({
  gallery,
  projectTitle,
}: {
  gallery: [string, string, string, string, string, string, string];
  projectTitle: string;
}) {
  const styles = useStyles();

  function altFor(index: number) {
    return `Detalle visual ${index + 1} del proyecto ${projectTitle}`;
  }

  return (
    <div className={styles.root}>
      <div className={mergeClasses(styles.row, styles.rowEqual)}>
        <GalleryImage src={gallery[0]} ratio={GALLERY_RATIOS[0]} alt={altFor(0)} />
        <GalleryImage src={gallery[1]} ratio={GALLERY_RATIOS[1]} alt={altFor(1)} />
      </div>
      <div className={mergeClasses(styles.row, styles.rowFull)}>
        <GalleryImage src={gallery[2]} ratio={GALLERY_RATIOS[2]} alt={altFor(2)} />
      </div>
      <div className={mergeClasses(styles.row, styles.rowWide)}>
        <GalleryImage src={gallery[3]} ratio={GALLERY_RATIOS[3]} alt={altFor(3)} />
        <GalleryImage src={gallery[4]} ratio={GALLERY_RATIOS[4]} alt={altFor(4)} />
      </div>
      <div className={mergeClasses(styles.row, styles.rowNarrow)}>
        <GalleryImage src={gallery[5]} ratio={GALLERY_RATIOS[5]} alt={altFor(5)} />
        <GalleryImage src={gallery[6]} ratio={GALLERY_RATIOS[6]} alt={altFor(6)} />
      </div>
    </div>
  );
}
