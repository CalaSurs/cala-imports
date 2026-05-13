import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "¿Hacen envíos a todo el país?", a: "Sí, despachamos a toda Argentina por correo o moto en CABA/GBA. Generalmente en 24 hs hábiles." },
  { q: "¿Los productos son originales?", a: "Sí. Trabajamos solo con productos originales de marcas reconocidas como Apple y JBL, con garantía." },
  { q: "¿Cómo puedo pagar?", a: "Aceptamos transferencia, efectivo y criptomonedas. Coordinamos cada compra por WhatsApp." },
  { q: "¿Tienen promo por cantidad?", a: "Sí. Por ejemplo: 2 AirPods Pro 2 a $20.000 c/u, o 2 cargadores Apple a $10.000 c/u. Aplican automáticamente al carrito." },
  { q: "¿Puedo retirar en persona?", a: "Sí, coordinamos punto de encuentro en CABA sin cargo adicional." },
  { q: "¿Venden por mayor?", a: "Sí, contamos con precios especiales para revendedores. Consultanos por WhatsApp." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-electric mb-3">— Preguntas frecuentes</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Respondemos <span className="gradient-text">todo</span>.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}
                className="rounded-2xl glass overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-secondary/40 transition"
                >
                  <span className="font-display font-semibold text-base sm:text-lg">{f.q}</span>
                  <span className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-electric/15 text-electric">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
