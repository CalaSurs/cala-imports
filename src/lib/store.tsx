import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./i18n";
import { dict } from "./i18n";
import type { Product } from "./products";
import { lineTotal } from "./products";

type CartItem = { product: Product; qty: number };

type StoreCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof dict.es;
  theme: "dark" | "light";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  cartCount: number;
  cartTotal: number;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const found = prev.find((c) => c.product.id === p.id);
      if (found) return prev.map((c) => (c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { product: p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id: string) =>
    setCart((p) => p.filter((c) => c.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setCart((p) => p.map((c) => (c.product.id === id ? { ...c, qty: Math.max(1, qty) } : c)));

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + lineTotal(c.product, c.qty), 0);

  return (
    <Ctx.Provider
      value={{
        lang, setLang,
        t: dict[lang],
        theme, toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        cart, addToCart, removeFromCart, setQty,
        cartOpen, setCartOpen, cartCount, cartTotal,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("StoreProvider missing");
  return ctx;
}
