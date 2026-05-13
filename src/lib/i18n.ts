export type Lang = "es" | "en" | "pt" | "it";

type Dict = {
  nav: { products: string; about: string; contact: string };
  hero: { eyebrow: string; title1: string; title2: string; sub: string; cta1: string; cta2: string };
  products: { title: string; subtitle: string; all: string; add: string; out: string; quick: string };
  stats: { title: string };
  testimonials: { title: string };
  cart: { title: string; empty: string; total: string; checkout: string };
  footer: { rights: string; news: string; subscribe: string };
};

export const dict: Record<Lang, Dict> = {
  es: {
    nav: { products: "Catálogo", about: "Nosotros", contact: "Contacto" },
    hero: {
      eyebrow: "Réplicas premium · Argentina",
      title1: "Calidad réplica,",
      title2: "experiencia original.",
      sub: "Vendemos réplicas de alta gama de tus productos favoritos. Nada original — sí mucha calidad. Más de 50 clientes felices nos avalan.",
      cta1: "Explorar productos",
      cta2: "Hablar por WhatsApp",
    },
    products: {
      title: "Catálogo",
      subtitle: "Curado, premium, disponible.",
      all: "Todos",
      add: "Agregar",
      out: "Sin stock",
      quick: "Vista rápida",
    },
    stats: { title: "Confianza que se mide" },
    testimonials: { title: "Lo que dicen quienes ya eligieron Cala" },
    cart: { title: "Tu carrito", empty: "Tu carrito está vacío", total: "Total", checkout: "Confirmar por WhatsApp" },
    footer: { rights: "Todos los derechos reservados.", news: "Novedades en tu inbox", subscribe: "Suscribirme" },
  },
  en: {
    nav: { products: "Catalog", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Premium replicas · Argentina",
      title1: "Replica quality,",
      title2: "original experience.",
      sub: "We sell high-end replicas of your favorite products. Nothing original — just real quality. Over 50 happy clients back us up.",
      cta1: "Explore products",
      cta2: "Chat on WhatsApp",
    },
    products: { title: "Catalog", subtitle: "Curated. Premium. In stock.", all: "All", add: "Add", out: "Sold out", quick: "Quick view" },
    stats: { title: "Trust, measured" },
    testimonials: { title: "What customers say about Cala" },
    cart: { title: "Your cart", empty: "Your cart is empty", total: "Total", checkout: "Checkout via WhatsApp" },
    footer: { rights: "All rights reserved.", news: "News in your inbox", subscribe: "Subscribe" },
  },
  pt: {
    nav: { products: "Catálogo", about: "Sobre", contact: "Contato" },
    hero: {
      eyebrow: "Réplicas premium · Argentina",
      title1: "Qualidade réplica,",
      title2: "experiência original.",
      sub: "Vendemos réplicas de alta qualidade dos seus produtos favoritos. Nada original — só muita qualidade. Mais de 50 clientes felizes.",
      cta1: "Ver produtos",
      cta2: "Falar no WhatsApp",
    },
    products: { title: "Catálogo", subtitle: "Curado. Premium. Disponível.", all: "Todos", add: "Adicionar", out: "Esgotado", quick: "Visualizar" },
    stats: { title: "Confiança que se mede" },
    testimonials: { title: "O que dizem nossos clientes" },
    cart: { title: "Seu carrinho", empty: "Seu carrinho está vazio", total: "Total", checkout: "Finalizar no WhatsApp" },
    footer: { rights: "Todos os direitos reservados.", news: "Novidades no seu e-mail", subscribe: "Inscrever" },
  },
  it: {
    nav: { products: "Catalogo", about: "Chi siamo", contact: "Contatti" },
    hero: {
      eyebrow: "Repliche premium · Argentina",
      title1: "Qualità replica,",
      title2: "esperienza originale.",
      sub: "Vendiamo repliche di alta gamma dei tuoi prodotti preferiti. Niente di originale — solo tanta qualità. Oltre 50 clienti felici.",
      cta1: "Esplora prodotti",
      cta2: "Scrivici su WhatsApp",
    },
    products: { title: "Catalogo", subtitle: "Curato. Premium. Disponibile.", all: "Tutti", add: "Aggiungi", out: "Esaurito", quick: "Anteprima" },
    stats: { title: "Fiducia, misurata" },
    testimonials: { title: "Cosa dicono i nostri clienti" },
    cart: { title: "Il tuo carrello", empty: "Il carrello è vuoto", total: "Totale", checkout: "Concludi su WhatsApp" },
    footer: { rights: "Tutti i diritti riservati.", news: "Novità nella tua mail", subscribe: "Iscriviti" },
  },
};

export const langLabels: Record<Lang, string> = {
  es: "ES", en: "EN", pt: "PT", it: "IT",
};
