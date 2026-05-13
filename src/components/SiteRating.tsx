import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const KEY = "cala_site_rating";

export function SiteRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        setRating(Number(saved));
        setSubmitted(true);
      }
    } catch {/* ignore */}
  }, []);

  const submit = (n: number) => {
    setRating(n);
    setSubmitted(true);
    try { localStorage.setItem(KEY, String(n)); } catch {/* ignore */}
  };

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-3xl glass p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-electric/20 blur-[100px]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-electric mb-3">— Tu opinión cuenta</div>
            <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">
              {submitted ? "¡Gracias por tu valoración!" : "¿Qué te pareció el sitio?"}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {submitted ? `Valoraste con ${rating} ${rating === 1 ? "estrella" : "estrellas"}.` : "Es opcional, pero nos ayuda muchísimo."}
            </p>
            <div className="mt-7 flex items-center justify-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = (hover || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => !submitted && setHover(n)}
                    onMouseLeave={() => !submitted && setHover(0)}
                    onClick={() => !submitted && submit(n)}
                    aria-label={`${n} estrellas`}
                    disabled={submitted}
                    className="p-1.5 sm:p-2 transition disabled:cursor-default"
                  >
                    <Star
                      className={`h-7 w-7 sm:h-9 sm:w-9 transition-all ${
                        active
                          ? "fill-electric text-electric scale-110"
                          : "text-muted-foreground/40 hover:text-electric"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
