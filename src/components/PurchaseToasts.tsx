import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { products, formatARS, lineTotal, type Product } from "@/lib/products";

const names = [
  "Luis Miguel", "Sofía A.", "Martín G.", "Camila R.", "Joaquín P.",
  "Valentina L.", "Tomás F.", "Agustina M.", "Bruno C.", "Lucía S.",
  "Federico D.", "Mía V.", "Gonzalo H.", "Julieta N.", "Iván B.",
];

const locations = [
  "Ituzaingó", "Castelar", "Morón", "Hurlingham", "Ramos Mejía",
  "San Antonio de Padua", "Haedo", "Merlo", "Caseros", "CABA",
];

type Notif = {
  id: number;
  name: string;
  location: string;
  product: Product;
  qty: number;
  total: number;
};

function makeNotif(): Notif {
  const inStock = products.filter((p) => p.inStock);
  const product = inStock[Math.floor(Math.random() * inStock.length)];
  const qty = Math.random() < 0.25 && product.bulk ? product.bulk.qty : 1;
  return {
    id: Date.now() + Math.random(),
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    product,
    qty,
    total: lineTotal(product, qty),
  };
}

export function PurchaseToasts() {
  const [current, setCurrent] = useState<Notif | null>(null);

  useEffect(() => {
    let mounted = true;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      if (!mounted) return;
      setCurrent(makeNotif());
      hideTimer = setTimeout(() => {
        if (!mounted) return;
        setCurrent(null);
        nextTimer = setTimeout(cycle, 12000 + Math.random() * 10000);
      }, 5500);
    };

    const initial = setTimeout(cycle, 6000);
    return () => {
      mounted = false;
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  return (
    <div className="fixed left-3 bottom-3 sm:left-5 sm:bottom-5 z-[70] pointer-events-none">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-3 max-w-xs sm:max-w-sm rounded-2xl glass shadow-elevated p-3 pr-4"
          >
            <div className="h-12 w-12 shrink-0 rounded-xl bg-surface-2 grid place-items-center overflow-hidden">
              <img src={current.product.image} alt="" className="max-h-[80%] max-w-[80%] object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-electric">
                <ShoppingBag className="h-3 w-3" /> Compra reciente
              </div>
              <div className="mt-0.5 text-sm font-medium truncate">
                {current.name} <span className="text-muted-foreground font-normal">· {current.location}</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {current.qty} × {current.product.name}
                <span className="text-foreground font-semibold ml-1">{formatARS(current.total)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
