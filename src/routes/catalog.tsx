import { createFileRoute } from "@tanstack/react-router";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Products";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollProgress } from "@/components/Effects";
import { PurchaseToasts } from "@/components/PurchaseToasts";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catálogo — Cala Imports" },
      { name: "description", content: "Explorá todos los productos premium de Cala Imports: AirPods, JBL, fundas Apple y más." },
      { property: "og:title", content: "Catálogo — Cala Imports" },
      { property: "og:description", content: "Tecnología premium al mejor precio. Envíos a todo Argentina." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <StoreProvider>
      <ScrollProgress />
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />
        <main className="pt-20">
          <Products />
        </main>
        <Footer />
        <CartDrawer />
        <PurchaseToasts />
      </div>
    </StoreProvider>
  );
}
