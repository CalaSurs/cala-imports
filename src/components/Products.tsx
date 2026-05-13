import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Eye, X, Search } from "lucide-react";
import { products, formatARS, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const brands = ["Todos", "Apple", "JBL", "Otros"] as const;

export function Products() {
  const { t, addToCart } = useStore();
  const [filter, setFilter] = useState<(typeof brands)[number]>("Todos");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<Product | null>(null);

  const list = useMemo(() => {
    let arr = filter === "Todos" ? products : products.filter((p) => p.brand === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    arr = [...arr].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    return arr;
  }, [filter, sort, query]);

  return (
    <section id="products" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-electric mb-3"
            >
              — {t.products.title}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-2xl"
            >
              {t.products.subtitle}
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`relative h-9 px-4 rounded-full text-xs font-medium transition ${
                  filter === b
                    ? "bg-foreground text-background"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {b === "Todos" ? t.products.all : b}
              </button>
            ))}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "asc" | "desc")}
              className="h-9 px-3 rounded-full glass text-xs text-muted-foreground bg-transparent outline-none cursor-pointer"
            >
              <option value="asc">$ ↑</option>
              <option value="desc">$ ↓</option>
            </select>
          </div>
        </div>

        <div className="mb-8 relative max-w-xl">
          <Search className="h-4 w-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 80))}
            placeholder="Buscar productos..."
            className="w-full h-12 pl-11 pr-4 rounded-full glass text-sm bg-transparent outline-none focus:border-electric transition"
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard
                key={p.id} p={p} i={i}
                onAdd={() => addToCart(p)}
                onQuick={() => setQuick(p)}
                addLabel={t.products.add}
                outLabel={t.products.out}
                quickLabel={t.products.quick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {quick && (
          <QuickView product={quick} onClose={() => setQuick(null)} onAdd={() => { addToCart(quick); setQuick(null); }} addLabel={t.products.add} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductCard({
  p, i, onAdd, onQuick, addLabel, outLabel, quickLabel,
}: { p: Product; i: number; onAdd: () => void; onQuick: () => void; addLabel: string; outLabel: string; quickLabel: string }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl glass overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/0 via-electric/0 to-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <motion.img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 m-auto max-h-[78%] max-w-[78%] object-contain transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-electric text-background">
              {p.badge}
            </span>
          )}
          {!p.inStock && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-destructive/90 text-destructive-foreground">
              {outLabel}
            </span>
          )}
        </div>
        <button
          onClick={onQuick}
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-electric hover:text-background"
          aria-label={quickLabel}
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 sm:p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">{p.brand}</span>
          {p.promo && p.inStock && (
            <span className="text-[9px] sm:text-[10px] text-electric">● Promo</span>
          )}
        </div>
        <h3 className="font-display text-sm sm:text-lg font-semibold tracking-tight line-clamp-1">{p.name}</h3>
        <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground line-clamp-2 hidden sm:block">{p.description}</p>

        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <div className="font-display text-sm sm:text-xl font-semibold truncate">{formatARS(p.price)}</div>
          <button
            disabled={!p.inStock}
            onClick={onAdd}
            aria-label={addLabel}
            className="group/btn relative h-8 w-8 sm:h-9 sm:w-auto sm:px-3 shrink-0 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center justify-center gap-1.5 overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed transition hover:scale-105"
          >
            <span className="absolute inset-0 bg-electric translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <Plus className="relative z-10 h-3.5 w-3.5" />
            <span className="relative z-10 hidden sm:inline">{addLabel}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function QuickView({ product, onClose, onAdd, addLabel }: { product: Product; onClose: () => void; onAdd: () => void; addLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-xl grid place-items-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl glass overflow-hidden grid md:grid-cols-2"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center rounded-full glass hover:bg-secondary transition">
          <X className="h-4 w-4" />
        </button>
        <div className="aspect-square bg-surface-2 grid place-items-center p-10">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-[0_30px_60px_rgba(80,120,255,0.3)]" />
        </div>
        <div className="p-8 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-electric">{product.brand}</span>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>
          {product.promo && <p className="mt-3 text-sm text-electric">🔥 {product.promo}</p>}
          <div className="mt-auto pt-8 flex items-center justify-between">
            <div className="font-display text-3xl font-semibold">{formatARS(product.price)}</div>
            <button
              disabled={!product.inStock}
              onClick={onAdd}
              className="h-11 px-5 rounded-full bg-electric text-background text-sm font-semibold hover:scale-105 transition disabled:opacity-40"
            >
              {addLabel}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
