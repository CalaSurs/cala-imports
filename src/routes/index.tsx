import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { SiteRating } from "@/components/SiteRating";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollProgress, Cursor } from "@/components/Effects";
import { PurchaseToasts } from "@/components/PurchaseToasts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cala Imports — Tecnología premium con envíos a Argentina" },
      { name: "description", content: "Audio, accesorios y dispositivos premium. AirPods, JBL, fundas Apple y más. Envíos a todo el país, asesoramiento real por WhatsApp." },
      { property: "og:title", content: "Cala Imports — Tecnología premium" },
      { property: "og:description", content: "Tecnología premium al mejor precio. Envíos a todo Argentina." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <StoreProvider>
      <ScrollProgress />
      <Cursor />
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProductCarousel />
          <Testimonials />
          <FAQ />
          <SiteRating />
        </main>
        <Footer />
        <CartDrawer />
        <PurchaseToasts />
      </div>
    </StoreProvider>
  );
}
