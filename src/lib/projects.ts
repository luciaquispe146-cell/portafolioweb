import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "pamer",
    title: "Pamer Colegio",
    coverImage: "/images/projects/pamer/Portada-Pamer.jpg",
    tags: ["Website", "UX/UI Design", "Educación"],
    detail: {
      description:
        "Colegios Pamer es una institución educativa peruana que promueve el seguimiento académico de sus estudiantes mediante un modelo de acompañamiento personalizado, facilitando el monitoreo del progreso académico de sus estudiantes.",
      descriptionHighlight: "Pamer",
      detailTags: ["UX/UI DESIGN", "INTERACTION DESIGN"],
      meta: {
        designedIn: "Staff Digital",
        client: "Pamer",
        type: "Website",
        role: "Diseñadora UX/UI",
        year: "2025",
      },
      externalUrl: "https://pamer.edu.pe/colegios/",
      bannerImage: "/images/projects/pamer/Banner-Pamer.jpg",
      gallery: [
        "/images/projects/pamer/Imagen-galeria-1.jpg",
        "/images/projects/pamer/Imagen-galeria-2.jpg",
        "/images/projects/pamer/Imagen-galeria-3.jpg",
        "/images/projects/pamer/Imagen-galeria-4.jpg",
        "/images/projects/pamer/Imagen-galeria-5.jpg",
        "/images/projects/pamer/Imagen-galeria-6.jpg",
        "/images/projects/pamer/Imagen-galeria-7.jpg",
      ],
      challenge:
        "La web de Colegios Pamer presentaba inconsistencias visuales y de interfaz que afectaban la navegación y la percepción de la marca. El reto consistía en rediseñar la experiencia digital para unificar su identidad visual, facilitar el acceso a la información y comunicar con claridad su propuesta educativa, favoreciendo un proceso de inscripción más intuitivo.",
      proposal:
        "El resultado fue un sitio web rediseñado que transformó la experiencia de navegación en un recorrido más claro e intuitivo. La nueva interfaz comunica mejor la propuesta educativa de Colegios Pamer y facilita el acceso a la información y al proceso de inscripción.",
      result:
        "El proyecto culminó con un sitio web completamente renovado que unificó la identidad digital de Colegios Pamer y mejoró la experiencia de navegación. La nueva interfaz organiza la información de forma más clara, comunica mejor la propuesta educativa y acompaña a las familias durante el proceso de inscripción mediante un recorrido más intuitivo.",
    },
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
