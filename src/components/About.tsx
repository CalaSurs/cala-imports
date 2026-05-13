import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Headphones, Sparkles } from "lucide-react";

const features = [
  { icon: MapPin, title: "Puntos de encuentro", desc: "Te entregamos en mano por Ituzaingó y Castelar — coordinamos por WhatsApp." },
  { icon: ShieldCheck, title: "Calidad garantizada", desc: "Réplicas premium probadas una a una. Si no estás conforme, lo solucionamos." },
  { icon: Headphones, title: "Asesoramiento humano", desc: "Hablás con personas reales por WhatsApp, no con bots." },
  { icon: Sparkles, title: "Curaduría premium", desc: "Solo tecnología que recomendaríamos a un amigo." },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-electric mb-3">— Nosotros</div>
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight">
              Réplicas <span className="gradient-text">premium</span>, sin vueltas.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Somos <span className="text-foreground font-medium">Cala Imports</span>, un proyecto argentino
              dedicado a traer réplicas de alta gama de los productos de audio y accesorios más buscados.
              <span className="text-foreground"> No vendemos productos originales</span> — vendemos calidad real
              al precio justo, con atención directa y puntos de encuentro por <span className="text-foreground font-medium">Ituzaingó y Castelar</span>.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Más de <span className="text-foreground font-medium">50 clientes satisfechos</span> y una comunidad
              creciente en redes nos avalan. Cada producto es probado uno por uno.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl glass p-6 hover:border-electric transition group"
              >
                <div className="h-11 w-11 rounded-xl bg-electric/15 grid place-items-center mb-4 group-hover:bg-electric group-hover:text-background transition">
                  <f.icon className="h-5 w-5 text-electric group-hover:text-background transition" />
                </div>
                <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
