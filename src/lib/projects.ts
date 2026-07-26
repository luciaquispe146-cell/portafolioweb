import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "pamer",
    title: "Pamer Colegio",
    coverImage: "/images/projects/pamer/Portada-Pamer.jpg",
    tags: ["Website", "UX/UI Design", "Educación"],
  },
  {
    slug: "atria",
    title: "Proyecto Atria",
    coverImage: "/images/projects/atria/Portada-Atria.png",
    tags: ["Landing Page", "UX/UI Design", "Inmobiliaria"],
  },
  {
    slug: "pestalozzi",
    title: "Pestalozzi",
    coverImage: "/images/projects/pestalozzi/Portada-Pestalozzi.jpg",
    tags: ["Website", "UX/UI Design", "Educación"],
  },
  {
    slug: "endomed",
    title: "Endomed",
    coverImage: "/images/projects/endomed/Portada-Endomed.jpg",
    tags: ["Website", "UX/UI Design", "Salud"],
  },
  {
    slug: "euroderma",
    title: "Euroderma",
    coverImage: "/images/projects/euroderma/Portada-Euroderma.jpg",
    tags: ["Ecommerce", "UX/UI Design", "Belleza y Bienestar"],
  },
];

export function projectHref(slug: string) {
  return `/projects/${slug}`;
}
