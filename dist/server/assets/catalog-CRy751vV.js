import { r as reactExports, V as jsxRuntimeExports } from "./server-CmsbrLPY.js";
import { c as createLucideIcon, u as useStore, p as products, m as motion, A as AnimatePresence, f as formatARS, P as Plus, X, S as StoreProvider, a as ScrollProgress, N as Navbar, F as Footer, C as CartDrawer, b as PurchaseToasts } from "./PurchaseToasts-ISioQiuy.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-BCvgNs3a.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const brands = ["Todos", "Apple", "JBL", "Otros"];
function Products() {
  const { t, addToCart } = useStore();
  const [filter, setFilter] = reactExports.useState("Todos");
  const [sort, setSort] = reactExports.useState("asc");
  const [query, setQuery] = reactExports.useState("");
  const [quick, setQuick] = reactExports.useState(null);
  const list = reactExports.useMemo(() => {
    let arr = filter === "Todos" ? products : products.filter((p) => p.brand === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    arr = [...arr].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
    return arr;
  }, [filter, sort, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "products", className: "relative py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-xs uppercase tracking-[0.3em] text-electric mb-3",
              children: [
                "— ",
                t.products.title
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.7 },
              className: "font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-2xl",
              children: t.products.subtitle
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          brands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setFilter(b),
              className: `relative h-9 px-4 rounded-full text-xs font-medium transition ${filter === b ? "bg-foreground text-background" : "glass text-muted-foreground hover:text-foreground"}`,
              children: b === "Todos" ? t.products.all : b
            },
            b
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: sort,
              onChange: (e) => setSort(e.target.value),
              className: "h-9 px-3 rounded-full glass text-xs text-muted-foreground bg-transparent outline-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "asc", children: "$ ↑" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "desc", children: "$ ↓" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 relative max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            value: query,
            onChange: (e) => setQuery(e.target.value.slice(0, 80)),
            placeholder: "Buscar productos...",
            className: "w-full h-12 pl-11 pr-4 rounded-full glass text-sm bg-transparent outline-none focus:border-electric transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          layout: true,
          className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: list.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              p,
              i,
              onAdd: () => addToCart(p),
              onQuick: () => setQuick(p),
              addLabel: t.products.add,
              outLabel: t.products.out,
              quickLabel: t.products.quick
            },
            p.id
          )) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: quick && /* @__PURE__ */ jsxRuntimeExports.jsx(QuickView, { product: quick, onClose: () => setQuick(null), onAdd: () => {
      addToCart(quick);
      setQuick(null);
    }, addLabel: t.products.add }) })
  ] });
}
function ProductCard({
  p,
  i,
  onAdd,
  onQuick,
  addLabel,
  outLabel,
  quickLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      layout: true,
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.6, delay: i % 4 * 0.06, ease: [0.22, 1, 0.36, 1] },
      whileHover: { y: -6 },
      className: "group relative rounded-2xl glass overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-surface-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-electric/0 via-electric/0 to-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: p.image,
              alt: p.name,
              loading: "lazy",
              className: "absolute inset-0 m-auto max-h-[78%] max-w-[78%] object-contain transition-transform duration-700 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1.5", children: [
            p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-electric text-background", children: p.badge }),
            !p.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-destructive/90 text-destructive-foreground", children: outLabel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onQuick,
              className: "absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-electric hover:text-background",
              "aria-label": quickLabel,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground", children: p.brand }),
            p.promo && p.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] sm:text-[10px] text-electric", children: "● Promo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm sm:text-lg font-semibold tracking-tight line-clamp-1", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] sm:text-xs text-muted-foreground line-clamp-2 hidden sm:block", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 sm:mt-4 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm sm:text-xl font-semibold truncate", children: formatARS(p.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                disabled: !p.inStock,
                onClick: onAdd,
                "aria-label": addLabel,
                className: "group/btn relative h-8 w-8 sm:h-9 sm:w-auto sm:px-3 shrink-0 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center justify-center gap-1.5 overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed transition hover:scale-105",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-electric translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "relative z-10 h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 hidden sm:inline", children: addLabel })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function QuickView({ product, onClose, onAdd, addLabel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      className: "fixed inset-0 z-[80] bg-background/80 backdrop-blur-xl grid place-items-center p-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0, y: 30 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.9, opacity: 0, y: 30 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          onClick: (e) => e.stopPropagation(),
          className: "relative w-full max-w-3xl rounded-3xl glass overflow-hidden grid md:grid-cols-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center rounded-full glass hover:bg-secondary transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-surface-2 grid place-items-center p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, className: "max-h-full max-w-full object-contain drop-shadow-[0_30px_60px_rgba(80,120,255,0.3)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-electric", children: product.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-3xl font-semibold tracking-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: product.description }),
              product.promo && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-electric", children: [
                "🔥 ",
                product.promo
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-8 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-semibold", children: formatARS(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    disabled: !product.inStock,
                    onClick: onAdd,
                    className: "h-11 px-5 rounded-full bg-electric text-background text-sm font-semibold hover:scale-105 transition disabled:opacity-40",
                    children: addLabel
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function CatalogPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StoreProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Products, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PurchaseToasts, {})
    ] })
  ] });
}
export {
  CatalogPage as component
};
