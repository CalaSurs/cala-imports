import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon, Globe } from "lucide-react";
import { useStore } from "@/lib/store";
import { langLabels, type Lang } from "@/lib/i18n";
import logo from "@/assets/logo.png";

export function Navbar() {
  const { t, theme, toggleTheme, lang, setLang, cartCount, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: t.nav.products },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={`flex items-center justify-between gap-4 px-4 sm:px-6 h-14 rounded-2xl transition-all duration-500 ${
              scrolled ? "glass shadow-elevated" : "bg-transparent border border-transparent"
            }`}
          >
            <Link to="/" className="flex items-center gap-2 group" aria-label="Cala Imports">
              <img src={logo} alt="Cala Imports" className="h-9 sm:h-10 w-auto object-contain dark:invert-0 invert transition group-hover:opacity-80" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="relative px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {l.label}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-electric scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {langLabels[lang]}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-28 glass rounded-xl p-1 shadow-elevated"
                    >
                      {(Object.keys(langLabels) as Lang[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                            lang === l ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {langLabels[l]} · {l.toUpperCase()}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-9 w-9 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative h-9 w-9 grid place-items-center rounded-lg text-foreground hover:bg-secondary transition"
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-electric text-[10px] font-bold text-background grid place-items-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setOpen(true)}
                className="md:hidden h-9 w-9 grid place-items-center rounded-lg text-foreground hover:bg-secondary transition"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <img src={logo} alt="Cala Imports" className="h-9 w-auto object-contain dark:invert-0 invert" />
              <button onClick={() => setOpen(false)} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col items-start px-8 pt-12 gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="font-display text-4xl font-semibold tracking-tight hover:text-electric transition"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
