export type Product = {
  id: string;
  name: string;
  brand: "Apple" | "JBL" | "Otros";
  price: number;
  oldPrice?: number;
  description: string;
  promo?: string;
  /** Bulk pricing: when buying `qty` or more units, unit price drops to `unitPrice`. */
  bulk?: { qty: number; unitPrice: number };
  image: string;
  inStock: boolean;
  badge?: string;
};

/** Compute line total honoring bulk pricing. */
export function lineTotal(p: Product, qty: number) {
  if (p.bulk && qty >= p.bulk.qty) return p.bulk.unitPrice * qty;
  return p.price * qty;
}
export function unitFor(p: Product, qty: number) {
  if (p.bulk && qty >= p.bulk.qty) return p.bulk.unitPrice;
  return p.price;
}

export const products: Product[] = [
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    price: 25000,
    oldPrice: 32000,
    description:
      "Cancelación de ruido activa de última generación, chip H2, hasta 30 hs de batería con estuche, resistencia IPX4.",
    promo: "Comprá 2 y pagás $20.000 c/u",
    bulk: { qty: 2, unitPrice: 20000 },
    image:
      "https://www.artifactargentina.com/cdn/shop/files/AirPods_Pro_2da_gen_con_MagSafe_USB-C.gif?v=1751315054&width=2048",
    inStock: true,
    badge: "Más vendido",
  },
  {
    id: "jbl-go-4-pro",
    name: "JBL Go 4 Pro",
    brand: "JBL",
    price: 20000,
    description:
      "Speaker portátil compacto con sonido potente, resistente al agua IP67, hasta 7 hs de batería.",
    promo: "Comprá 2 y pagás $17.500 c/u",
    bulk: { qty: 2, unitPrice: 17500 },
    image:
      "https://www.comeros.com.ar/wp-content/uploads/2025/11/PARLANTE-JBL-GO-4-BLACK-48_x1.png",
    inStock: true,
  },
  {
    id: "cargador-apple",
    name: "Cargador Apple 25W",
    brand: "Apple",
    price: 15000,
    description:
      "Cargador rápido compatible con iPhone, iPad y más. Incluye cabezal USB-C. Carga eficiente y segura.",
    promo: "Comprá 2 y pagás $10.000 c/u",
    bulk: { qty: 2, unitPrice: 10000 },
    image:
      "https://i.ibb.co/5hM3VCpX/combo-cargador-20w-cable-usb-c-a-lightning-ios1-7c2c9b49fa15ffbf3a16699975725562-640-0-removebg-prev.png",
    inStock: true,
  },
  {
    id: "fundas-apple",
    name: "Fundas Apple",
    brand: "Apple",
    price: 7000,
    description:
      "Fundas de alta calidad para iPhone. Variedad de colores y diseños. Indicá tu modelo y color.",
    promo: "Comprá 2 y pagás $5.000 c/u",
    bulk: { qty: 2, unitPrice: 5000 },
    image:
      "https://i.ibb.co/4wgGpdMZ/Whats-App-Image-2026-04-20-at-11-46-55-PM-removebg-preview.png",
    inStock: true,
  },
  {
    id: "jbl-flip-6",
    name: "JBL Flip 6",
    brand: "JBL",
    price: 45000,
    description:
      "Potente speaker bluetooth con graves profundos, protección IP67, 12 hs de reproducción.",
    image:
      "https://corrientesmotos.com.ar/wp-content/uploads/2024/10/JBL-Flip-6-1.png",
    inStock: false,
  },
  {
    id: "apple-watch-s10",
    name: "Apple Watch S10",
    brand: "Apple",
    price: 45000,
    description:
      "Pantalla OLED más grande y brillante, chip S10, diseño más delgado y liviano, sensores avanzados.",
    image:
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png",
    inStock: false,
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    brand: "Apple",
    price: 35000,
    description:
      "Over-ear con audio de alta fidelidad, cancelación activa de ruido, chip H1 dual y 20 hs de batería.",
    image:
      "https://www.artifactargentina.com/cdn/shop/files/AirPods_Max_-_Azul_2.gif?v=1751315510&width=2048",
    inStock: false,
  },
  {
    id: "alaxe",
    name: "Alaxe Smart Speaker",
    brand: "Otros",
    price: 35000,
    description:
      "Altavoz inteligente con control por voz, audio mejorado con graves más profundos, Wi-Fi/Bluetooth.",
    image:
      "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/D2gateway/spot_efd_dot_ring.png",
    inStock: false,
  },
];

export const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
