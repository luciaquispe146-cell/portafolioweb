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
    detail: {
      description:
        "Atria es un proyecto residencial desarrollado por Vidarq en colaboración con Atom. Su plataforma presenta información sobre el proyecto, sus características, la ubicación y el proceso de adquisición para potenciales compradores.",
      // Figma (13212:17076) doesn't bold any word in this description — an
      // empty string keeps the whole paragraph in the base weight (the
      // highlight span renders empty and contributes nothing).
      descriptionHighlight: "",
      detailTags: ["UX/UI DESIGN", "INTERACTION DESIGN"],
      meta: {
        designedIn: "Staff Digital",
        client: "Vidarq Inmobiliaria",
        type: "Landing Page",
        role: "Diseñadora UX/UI",
        year: "2025",
      },
      externalUrl: "https://atriamiraflores.pe/",
      bannerImage: "/images/projects/atria/Banner-Atria.jpg",
      // Figma (13212:17140) defines exactly 5 images for this project's
      // gallery — the last asymmetric pair simply doesn't exist here.
      gallery: [
        "/images/projects/atria/Imagen-galeria-1.jpg",
        "/images/projects/atria/Imagen-galeria-2.jpg",
        "/images/projects/atria/Imagen-galeria-3.jpg",
        "/images/projects/atria/Imagen-galeria-4.jpg",
        "/images/projects/atria/Imagen-galeria-5.jpg",
      ],
      challenge:
        "El principal reto consistía en crear una landing page que posicionara a Atria como un proyecto con identidad propia y funcionara como un canal de captación de clientes. La experiencia debía comunicar los atributos del proyecto y acompañarlos a lo largo de un recorrido intuitivo hasta la conversión.",
      proposal:
        "La propuesta de diseño consistió en crear una landing page que presentara Atria mediante un recorrido progresivo, combinando contenido, recursos visuales y llamados a la acción para acompañar a los usuarios desde el descubrimiento del proyecto hasta la cotización.",
      result:
        "El proyecto culminó con una landing page diseñada para posicionar a Atria como un proyecto residencial con identidad propia dentro de la estrategia digital de Vidarq y Atom. El resultado consolida una presencia digital exclusiva para el proyecto y establece un canal orientado a la captación de potenciales compradores.",
    },
  },
  {
    slug: "pestalozzi",
    title: "Pestalozzi",
    coverImage: "/images/projects/pestalozzi/Portada-Pestalozzi.jpg",
    tags: ["Website", "UX/UI Design", "Educación"],
    detail: {
      description:
        "El Colegio Pestalozzi es una institución educativa peruano-suiza que ofrece una propuesta de formación integral. Su plataforma reúne información sobre el proyecto educativo, la vida escolar, el proceso de admisión y los servicios que ofrece a los padres interesados.",
      // Figma (13251:17681) doesn't bold any word in this description —
      // same pattern as Atria.
      descriptionHighlight: "",
      detailTags: ["UX/UI DESIGN", "INTERACTION DESIGN"],
      meta: {
        designedIn: "Staff Digital",
        client: "Pestalozzi",
        type: "Website",
        role: "Diseñadora UX/UI",
        year: "2025",
      },
      externalUrl: "https://www.pestalozzi.edu.pe/",
      bannerImage: "/images/projects/pestalozzi/Banner-Pestalozzi.jpg",
      gallery: [
        "/images/projects/pestalozzi/Imagen-galeria-1.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-2.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-3.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-4.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-5.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-6.jpg",
        "/images/projects/pestalozzi/Imagen-galeria-7.jpg",
      ],
      challenge:
        "El desafío consistía en acompañar la renovación de la identidad de marca del Colegio Pestalozzi con un sitio web que comunicara su propuesta educativa de forma más clara. La plataforma existente ya no respondía a la imagen de la institución y dificultaba que las familias encontraran la información necesaria para el proceso de admisión.",
      proposal:
        "La propuesta de diseño se centró en trasladar la nueva identidad visual del Colegio Pestalozzi a una experiencia digital moderna y consistente. Se redefinieron la arquitectura de información, la jerarquía visual y la navegación para construir un recorrido más intuitivo que acompañara a las familias durante el proceso de admisión.",
      result:
        "El proyecto culminó con un sitio web completamente renovado que trasladó la nueva identidad del Colegio Pestalozzi al entorno digital. El resultado consolidó una presencia digital coherente con la evolución de la institución y fortaleció la comunicación de su propuesta educativa, ofreciendo a las familias una experiencia alineada con sus necesidades.",
    },
  },
  {
    slug: "endomed",
    title: "Endomed",
    coverImage: "/images/projects/endomed/Portada-Endomed.jpg",
    tags: ["Website", "UX/UI Design", "Salud"],
    detail: {
      description:
        "Endomed Technologies S.A.C. es una empresa peruana dedicada a la importación y distribución de dispositivos y equipos médicos especializados. Su web presenta sus productos, servicios y marcas representadas para instituciones y profesionales del sector salud.",
      // Figma (13301:1531) doesn't bold any word in this description —
      // same pattern as Atria/Pestalozzi.
      descriptionHighlight: "",
      detailTags: ["UX/UI DESIGN", "INTERACTION DESIGN"],
      meta: {
        designedIn: "Staff Digital",
        client: "Endomed",
        type: "Website",
        role: "Diseñadora UX/UI",
        year: "2025",
      },
      externalUrl: "https://www.endomed.com.pe/",
      bannerImage: "/images/projects/endomed/Banner-Endomed.jpg",
      gallery: [
        "/images/projects/endomed/Imagen-galeria-1.jpg",
        "/images/projects/endomed/Imagen-galeria-2.jpg",
        "/images/projects/endomed/Imagen-galeria-3.jpg",
        "/images/projects/endomed/Imagen-galeria-4.jpg",
        "/images/projects/endomed/Imagen-galeria-5.jpg",
        "/images/projects/endomed/Imagen-galeria-6.jpg",
        "/images/projects/endomed/Imagen-galeria-7.jpg",
      ],
      challenge:
        "El desafío consistía en rediseñar un sitio web desactualizado que ya no representaba la evolución de Endomed Technologies ni la amplitud de su gama de productos. Además, la presentación de sus productos dificultaba comunicar el valor de las soluciones que la empresa ofrece al sector salud.",
      proposal:
        "La propuesta de diseño se centró en construir una experiencia digital alineada con la evolución de Endomed Technologies. Se priorizó la organización del portafolio, la jerarquía del contenido y la navegación para facilitar el acceso a la información de productos, marcas y servicios.",
      result:
        "El proyecto culminó con un sitio web diseñado para consolidar la presencia digital de Endomed Technologies y respaldar la comunicación de su portafolio de productos. La plataforma fortalece la visibilidad de la empresa y facilita la presentación de sus soluciones para hospitales, clínicas y profesionales del sector salud.",
    },
  },
  {
    slug: "euroderma",
    title: "Euroderma",
    coverImage: "/images/projects/euroderma/Portada-Euroderma.jpg",
    tags: ["Ecommerce", "UX/UI Design", "Belleza y Bienestar"],
    detail: {
      description:
        "Euroderma es una empresa peruana especializada en la comercialización de productos dermatológicos y dermocosméticos. Su catálogo reúne marcas reconocidas y soluciones para el cuidado de la piel, ofreciendo a sus clientes acceso a una amplia variedad de productos.",
      // Figma (13340:3787) doesn't bold any word in this description — same
      // pattern as the other projects.
      descriptionHighlight: "",
      detailTags: ["UX/UI DESIGN", "INTERACTION DESIGN"],
      meta: {
        designedIn: "Staff Digital",
        client: "Euroderma",
        type: "Ecommerce",
        role: "Diseñadora UI",
        year: "2025",
      },
      externalUrl: "https://euroderma.pe/",
      bannerImage: "/images/projects/euroderma/Banner-Euroderma.jpg",
      gallery: [
        "/images/projects/euroderma/Imagen-galeria-1.jpg",
        "/images/projects/euroderma/Imagen-galeria-2.jpg",
        "/images/projects/euroderma/Imagen-galeria-3.jpg",
        "/images/projects/euroderma/Imagen-galeria-4.jpg",
        "/images/projects/euroderma/Imagen-galeria-5.jpg",
        "/images/projects/euroderma/Imagen-galeria-6.jpg",
        "/images/projects/euroderma/Imagen-galeria-7.jpg",
      ],
      challenge:
        "El principal desafío era aumentar la conversión del sitio web de Euroderma. La plataforma contaba con una apariencia desactualizada que limitaba la percepción de la marca y la presentación de su catálogo de productos.",
      proposal:
        "La propuesta de diseño se centró en renovar la identidad visual del sitio web mediante una interfaz más moderna y orientada a la conversión. Se priorizó la presentación del catálogo, la jerarquía de los productos y los elementos de confianza para reforzar la experiencia de compra.",
      result:
        "El proyecto culminó con un sitio web que consolida la presencia digital de Euroderma y respalda su estrategia comercial en el canal online. El resultado fortalece la imagen de la marca y establece una plataforma orientada al crecimiento de las ventas digitales.",
    },
  },
];

export function projectHref(slug: string) {
  return `/projects/${slug}`;
}
