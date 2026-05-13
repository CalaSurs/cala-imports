import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export function Hero() {
  const { t } = useStore();

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-32 h-[36rem] w-[36rem] rounded-full bg-electric/30 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-electric/20 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8"
        >
          <Sparkles className="h-3 w-3 text-electric" />
          {t.hero.eyebrow}
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.95] font-semibold tracking-tight">
          {t.hero.title1.split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="gradient-text inline-block"
          >
            {t.hero.title2}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/catalog"
            className="group relative inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-medium text-sm overflow-hidden transition hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-electric translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10">{t.hero.cta1}</span>
            <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/541128520849"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full glass text-sm font-medium hover:border-electric transition"
          >
            <MessageCircle className="h-4 w-4 text-electric" />
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 marquee-mask overflow-hidden pb-6">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-muted-foreground/50 font-display text-xl sm:text-2xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 items-center">
              {["Apple", "JBL", "Réplicas Premium", "Argentina", "Ituzaingó", "Castelar", "Cripto", "WhatsApp"].map((w) => (
                <span key={w} className="flex items-center gap-12">
                  {w}
                  <span className="h-1 w-1 rounded-full bg-electric" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
