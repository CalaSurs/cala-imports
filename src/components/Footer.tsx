import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export function Footer() {
  const { t } = useStore();
  return (
    <footer id="contact" className="relative pt-28 pb-10 border-t border-border overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="rounded-3xl glass p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-electric/30 blur-[120px]" />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight">
              ¿Tenés alguna <span className="gradient-text">consulta</span>?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Escribinos y te respondemos al instante. Asesoramiento real, sin bots.
            </p>
            <a
              href="https://wa.me/541128520849" target="_blank" rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-electric text-background font-semibold text-sm hover:scale-105 transition"
            >
              <MessageCircle className="h-4 w-4" /> Escribinos ahora
            </a>
          </div>
        </motion.div>

        <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="font-display text-3xl font-semibold">Cala<span className="text-electric">.</span></span>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Tecnología premium al mejor precio. Envíos a todo Argentina.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              WhatsApp: <a href="https://wa.me/541128520849" className="text-foreground hover:text-electric transition">11 2852-0849</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/catalog" className="hover:text-electric transition">Productos</a></li>
              <li><a href="/#about" className="hover:text-electric transition">Nosotros</a></li>
              <li><a href="/#faq" className="hover:text-electric transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Social</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.instagram.com/cala.imports" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-electric transition">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@cala.imports" target="_blank" rel="noreferrer" className="hover:text-electric transition">TikTok</a>
              </li>
              <li>
                <a href="https://wa.me/541128520849" target="_blank" rel="noreferrer" className="hover:text-electric transition">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Cala Imports. {t.footer.rights}</div>
          <div>
            Diseñado por{" "}
            <a
              href="https://calaxweb.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-electric hover:underline underline-offset-4"
            >
              CalAX
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
