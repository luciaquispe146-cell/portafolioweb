export type Project = {
  slug: string;
  title: string;
  coverImage: string;
  tags: [string, string, string];
  detail?: ProjectDetail;
};

// Data for the reusable project detail page template. Every field here is
// project-specific content — the section labels themselves ("Caso de
// estudio", "EL DESAFÍO", etc.) are fixed template UI text and live in the
// detail components, not in this data shape.
export type ProjectDetail = {
  description: string;
  descriptionHighlight: string; // word/phrase inside `description` rendered semibold (e.g. client name)
  detailTags: [string, string];
  meta: {
    designedIn: string;
    client: string;
    type: string;
    role: string;
    year: string;
  };
  externalUrl: string;
  bannerImage: string;
  // Up to 7 images, in the order the gallery grid expects them (positions
  // 0-1 a side-by-side pair, 2 full-width, 3-4 and 5-6 asymmetric pairs).
  // 5 or 7 images are the two lengths confirmed in Figma so far — 5 renders
  // the first 3 rows only, 7 renders all 4.
  gallery: string[];
  challenge: string;
  proposal: string;
  result: string;
};
