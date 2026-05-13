import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatARS, lineTotal, unitFor } from "@/lib/products";

const sources = ["TikTok", "Instagram", "Amigos / Recomendación", "Google", "Otro"];
const paymentMethods = ["Billetera Virtual", "Efectivo", "Criptomoneda"];

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeFromCart, setQty, cartTotal, t } = useStore();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", source: "", payment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Requerido";
    if (!form.lastName.trim()) e.lastName = "Requerido";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) e.phone = "Teléfono inválido";
    if (!form.source) e.source = "Elegí una opción";
    if (!form.payment) e.payment = "Elegí un método de pago";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMsg = () => {
    const lines = cart.map((c) => {
      const unit = unitFor(c.product, c.qty);
      const note = c.product.bulk && c.qty >= c.product.bulk.qty ? " (promo)" : "";
      return `• ${c.qty} × ${c.product.name} — ${formatARS(unit)} c/u${note} = ${formatARS(lineTotal(c.product, c.qty))}`;
    }).join("\n");

    return encodeURIComponent(
      `¡Hola Cala! Quiero hacer un pedido.\n\n` +
      `👤 *Datos*\n` +
      `Nombre: ${form.firstName} ${form.lastName}\n` +
      `Teléfono: ${form.phone}\n` +
      `Cómo nos conociste: ${form.source}\n` +
      `Método de pago: ${form.payment}\n\n` +
      `🛍️ *Pedido*\n${lines}\n\n` +
      `💰 *Total: ${formatARS(cartTotal)}*`,
    );
  };

  const handleCheckout = () => {
    if (!validate()) return;
    const url = `https://wa.me/541128520849?text=${buildMsg()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const close = () => { setCartOpen(false); setTimeout(() => setStep("cart"), 300); };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-md"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[91] w-full max-w-md glass border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-electric" />
                <h3 className="font-display text-lg font-semibold">
                  {step === "cart" ? t.cart.title : "Tus datos"}
                </h3>
              </div>
              <button onClick={close} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>

            {step === "cart" ? (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {cart.length === 0 ? (
                    <div className="h-full grid place-items-center text-center">
                      <div>
                        <div className="mx-auto h-16 w-16 rounded-full bg-secondary grid place-items-center mb-4">
                          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">{t.cart.empty}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((c) => {
                        const unit = unitFor(c.product, c.qty);
                        const promoActive = c.product.bulk && c.qty >= c.product.bulk.qty;
                        return (
                          <motion.div
                            key={c.product.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex gap-3 p-3 rounded-xl bg-surface-2"
                          >
                            <div className="h-16 w-16 shrink-0 rounded-lg bg-background grid place-items-center overflow-hidden">
                              <img src={c.product.image} alt={c.product.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-medium text-sm truncate">{c.product.name}</div>
                                <button onClick={() => removeFromCart(c.product.id)} className="text-muted-foreground hover:text-destructive">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatARS(unit)} c/u {promoActive && <span className="text-electric ml-1">● promo</span>}
                              </div>
                              {c.product.bulk && !promoActive && (
                                <div className="text-[10px] text-electric mt-0.5">
                                  Sumá {c.product.bulk.qty - c.qty} más y pagás {formatARS(c.product.bulk.unitPrice)} c/u
                                </div>
                              )}
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-1 rounded-full bg-background border border-border">
                                  <button onClick={() => setQty(c.product.id, c.qty - 1)} className="h-7 w-7 grid place-items-center hover:text-electric">
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-xs">{c.qty}</span>
                                  <button onClick={() => setQty(c.product.id, c.qty + 1)} className="h-7 w-7 grid place-items-center hover:text-electric">
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="text-sm font-semibold">{formatARS(lineTotal(c.product, c.qty))}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-5 border-t border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.cart.total}</span>
                      <span className="font-display text-2xl font-semibold">{formatARS(cartTotal)}</span>
                    </div>
                    <button
                      onClick={() => setStep("checkout")}
                      className="w-full h-12 rounded-full bg-electric text-background font-semibold text-sm inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Completá tus datos y te llevamos al WhatsApp para confirmar el pedido.
                  </p>
                  <Field label="Nombre" error={errors.firstName}>
                    <input
                      maxLength={50}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm outline-none focus:border-electric transition"
                      placeholder="Tu nombre"
                    />
                  </Field>
                  <Field label="Apellido" error={errors.lastName}>
                    <input
                      maxLength={50}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm outline-none focus:border-electric transition"
                      placeholder="Tu apellido"
                    />
                  </Field>
                  <Field label="Número de teléfono" error={errors.phone}>
                    <input
                      maxLength={20}
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm outline-none focus:border-electric transition"
                      placeholder="+54 11 ..."
                    />
                  </Field>
                  <Field label="¿Cómo nos conociste?" error={errors.source}>
                    <select
                      value={form.source}
                      onChange={(e) => setForm({ ...form, source: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm outline-none focus:border-electric transition"
                    >
                      <option value="">Elegí una opción</option>
                      {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Método de pago" error={errors.payment}>
                    <div className="grid grid-cols-3 gap-2">
                      {paymentMethods.map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setForm({ ...form, payment: m })}
                          className={`h-11 px-2 rounded-xl text-[11px] sm:text-xs font-medium border transition text-center ${
                            form.payment === m
                              ? "bg-electric text-background border-electric"
                              : "bg-surface-2 border-border text-muted-foreground hover:text-foreground hover:border-electric"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="rounded-xl bg-surface-2 p-4 text-xs text-muted-foreground">
                    <div className="font-medium text-foreground mb-2">Resumen</div>
                    {cart.map((c) => (
                      <div key={c.product.id} className="flex justify-between">
                        <span>{c.qty} × {c.product.name}</span>
                        <span>{formatARS(lineTotal(c.product, c.qty))}</span>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-border flex justify-between text-foreground font-semibold">
                      <span>Total</span><span>{formatARS(cartTotal)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-border flex gap-2">
                  <button
                    onClick={() => setStep("cart")}
                    className="h-12 px-5 rounded-full glass text-sm font-medium hover:border-electric transition"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 h-12 rounded-full bg-electric text-background font-semibold text-sm inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                  >
                    <MessageCircle className="h-4 w-4" /> Pagar por WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      {children}
      {error && <span className="text-[11px] text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
