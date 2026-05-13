import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Truck, MessageCircle, MapPin, Coins, Package } from "lucide-react";
import { useStore } from "@/lib/store";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString("es-AR") + suffix);

  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return ctrl.stop;
    }
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const items = [
  { icon: Truck, title: "Envíos a Argentina", text: "Mandamos a cualquier provincia. Coordinamos por WhatsApp." },
  { icon: MessageCircle, title: "Trato personalizado", text: "Te asesoramos desde la consulta hasta la entrega." },
  { icon: MapPin, title: "GBA Oeste", text: "Ituzaingó, Buenos Aires. Emprendimiento familiar real." },
  { icon: Coins, title: "Medios de pago", text: "Efectivo, billetera virtual y criptomoneda." },
  { icon: Package, title: "Por mayor", text: "Precios especiales para compras en cantidad." },
];

export function Stats() {
  const { t } = useStore();
  return (
    <section className="relative py-28 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-electric mb-3">— Cifras</div>
        <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl">
          {t.stats.title}
        </h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 2400, s: "+", l: "Pedidos enviados" },
            { n: 5, s: "★", l: "Calificación media" },
            { n: 24, s: "h", l: "Respuesta WhatsApp" },
            { n: 100, s: "%", l: "Réplicas premium" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl glass p-6"
            >
              <div className="font-display text-5xl font-semibold tracking-tight">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl p-6 border border-border hover:border-electric/40 transition overflow-hidden"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-electric/0 to-electric/0 group-hover:from-electric/10 group-hover:to-transparent transition opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-electric/10 text-electric mb-4 group-hover:bg-electric group-hover:text-background transition">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{it.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
