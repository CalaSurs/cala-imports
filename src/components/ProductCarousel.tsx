import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { products, formatARS } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCarousel() {
  const { addToCart } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const list = products.filter((p) => p.inStock);

  const scrollBy = (dir: 1 | -1) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-electric mb-3"
            >
              — En stock ahora
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl"
            >
              Lo más buscado, <span className="gradient-text">listo para enviar</span>.
            </motion.h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scrollBy(-1)} className="h-10 w-10 grid place-items-center rounded-full glass hover:border-electric transition" aria-label="Anterior">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scrollBy(1)} className="h-10 w-10 grid place-items-center rounded-full glass hover:border-electric transition" aria-label="Siguiente">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {list.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[32%] xl:w-[28%] rounded-2xl glass overflow-hidden group"
            >
              <div className="relative aspect-square bg-surface-2 overflow-hidden">
                <img
                  src={p.image} alt={p.name} loading="lazy"
                  className="absolute inset-0 m-auto max-h-[78%] max-w-[78%] object-contain transition-transform duration-700 group-hover:scale-110"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-electric text-background">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{p.brand}</div>
                <h3 className="font-display text-lg font-semibold tracking-tight line-clamp-1">{p.name}</h3>
                {p.promo && <p className="mt-1 text-xs text-electric">● {p.promo}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-display text-xl font-semibold">{formatARS(p.price)}</div>
                  <button
                    onClick={() => addToCart(p)}
                    className="h-9 px-3 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-electric transition"
                  >
                    <Plus className="h-3.5 w-3.5" /> Agregar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/catalog"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full glass hover:border-electric transition text-sm font-medium"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
