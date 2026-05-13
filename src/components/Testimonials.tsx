import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useStore } from "@/lib/store";

const testimonials = [
  { name: "Lucía P.", city: "Córdoba", text: "Llegó perfecto, súper rápido. Los AirPods son una locura, mejor de lo que esperaba." },
  { name: "Mateo R.", city: "Rosario", text: "Atención impecable por WhatsApp. Me ayudaron a elegir y todo bárbaro." },
  { name: "Camila S.", city: "CABA", text: "Compré por mayor para mi local. Excelente precio y calidad muy pareja." },
  { name: "Federico T.", city: "Mendoza", text: "Tercera compra con Cala. Ya son mi referencia para tecnología." },
  { name: "Agustina V.", city: "La Plata", text: "El JBL suena increíble. Llegó en 2 días, cero problemas con el envío." },
  { name: "Joaquín M.", city: "Mar del Plata", text: "Cripto fue facilísimo. Profesionales y serios." },
];

export function Testimonials() {
  const { t } = useStore();
  const row = [...testimonials, ...testimonials];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-electric mb-3">— Reseñas</div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl"
        >
          {t.testimonials.title}
        </motion.h2>
      </div>

      <div className="mt-14 marquee-mask">
        <div className="flex gap-5 animate-marquee" style={{ animationDuration: "40s" }}>
          {row.map((tes, i) => (
            <div
              key={i}
              className="shrink-0 w-[340px] rounded-2xl glass p-6"
            >
              <div className="flex gap-1 text-electric">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">{tes.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-electric to-foreground/40 grid place-items-center text-background font-semibold text-xs">
                  {tes.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{tes.name}</div>
                  <div className="text-xs text-muted-foreground">{tes.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
