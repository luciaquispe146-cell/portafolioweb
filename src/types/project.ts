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
  // Exactly 7 images, in the order the gallery grid expects them.
  gallery: [string, string, string, string, string, string, string];
  challenge: string;
  proposal: string;
  result: string;
};
