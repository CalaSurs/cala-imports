// ===== CALA IMPORTS — SHARED JS =====
const WA = "541128520849";
const LOGO = "https://i.ibb.co/svPn0G3J/2fc4e911-3cc0-4290-8bd4-19c9f5d3b755.png";

const PRODUCTS = [
  { id:1, name:"AirPods Pro 2", category:"Apple", price:25000,
    desc:"Cancelación de ruido activa de última generación, chip H2, hasta 30 hs de batería con estuche, resistencia al agua IPX4.",
    img:"https://www.artifactargentina.com/cdn/shop/files/AirPods_Pro_2da_gen_con_MagSafe_USB-C.gif?v=1751315054&width=2048" },
  { id:2, name:"AirPods Max", category:"Apple", price:35000,
    desc:"Over-ear con audio de alta fidelidad, cancelación activa de ruido, chip H1 dual y 20 hs de batería.",
    img:"https://www.artifactargentina.com/cdn/shop/files/AirPods_Max_-_Azul_2.gif?v=1751315510&width=2048" },
  { id:3, name:"JBL Go 4 Pro", category:"JBL", price:24000,
    desc:"Speaker portátil compacto con sonido potente, resistente al agua IP67, hasta 7 hs de batería.",
    img:"https://www.comeros.com.ar/wp-content/uploads/2025/11/PARLANTE-JBL-GO-4-BLACK-48_x1.png" },
  { id:4, name:"JBL Flip 6", category:"JBL", price:45000,
    desc:"Potente speaker bluetooth con graves profundos, protección IP67, 12 hs de reproducción.",
    img:"https://corrientesmotos.com.ar/wp-content/uploads/2024/10/JBL-Flip-6-1.png" },
  { id:5, name:"Apple Watch S10", category:"Apple", price:45000,
    desc:"Pantalla OLED más grande y brillante, chip S10, diseño más delgado y liviano, sensores de salud avanzados.",
    img:"https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png" },
  { id:6, name:"Alaxe", category:"Otros", price:35000,
    desc:"Altavoz inteligente con control por voz, audio mejorado con graves más profundos, conectividad Wi-Fi/Bluetooth.",
    img:"https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/D2gateway/spot_efd_dot_ring.png" }
];

// ---- CART ----
let cart = [];
try { cart = JSON.parse(localStorage.getItem('cala_cart') || '[]'); } catch(e) { cart = []; }

function saveCart() {
  try { localStorage.setItem('cala_cart', JSON.stringify(cart)); } catch(e) {}
  updateCartUI();
}

function addToCart(productId, qty) {
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; }
  else {
    const p = PRODUCTS.find(p => p.id === productId);
    if (!p) return;
    cart.push({ id:p.id, name:p.name, price:p.price, img:p.img, qty });
  }
  saveCart();
  // Flash feedback — no auto-open
  const btn = document.getElementById('add-btn-' + productId);
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Agregado';
    btn.style.background = '#1a8c44';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1400);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else saveCart();
}

function getTotalItems() { return cart.reduce((s,i) => s+i.qty, 0); }
function getTotal()      { return cart.reduce((s,i) => s + i.price * i.qty, 0); }
function fmt(n)          { return '$' + n.toLocaleString('es-AR'); }

function updateCartUI() {
  const count = getTotalItems();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><span style="font-size:34px;opacity:.2">🛒</span><p>Tu carrito está vacío</p></div>';
    const tp = document.getElementById('cart-total-price');
    if (tp) tp.textContent = '$0';
    hideCheckoutForm();
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#333';this.removeAttribute('src')"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)} c/u</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        <span style="font-size:12px;font-weight:700;">${fmt(item.price * item.qty)}</span>
      </div>
    </div>`).join('');
  const tp = document.getElementById('cart-total-price');
  if (tp) tp.textContent = fmt(getTotal());
  showCheckoutForm();
}

function showCheckoutForm() {
  const f = document.getElementById('checkout-form');
  if (f) f.style.display = 'flex';
}
function hideCheckoutForm() {
  const f = document.getElementById('checkout-form');
  if (f) f.style.display = 'none';
}

// ---- VALIDATION ----
function isValidName(s) {
  const c = s.trim();
  return c.length >= 5 && /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(c) && c.split(/\s+/).filter(Boolean).length >= 2;
}
function isValidAddress(s) {
  const c = s.trim();
  return c.length >= 8 && /\d/.test(c) && /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(c);
}
function showFieldError(id, msg) {
  const el = document.getElementById(id + '-err');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearFieldError(id) {
  const el = document.getElementById(id + '-err');
  if (el) el.style.display = 'none';
}

function selectPago(btn) {
  document.querySelectorAll('.pago-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const input = document.getElementById('checkout-pago');
  if (input) input.value = btn.dataset.val;
}

function checkoutCart() {
  if (cart.length === 0) return;
  const nombreEl = document.getElementById('checkout-nombre');
  const dirEl    = document.getElementById('checkout-dir');
  const pagoEl   = document.getElementById('checkout-pago');
  if (!nombreEl || !dirEl) return;

  const nombre = nombreEl.value.trim();
  const dir    = dirEl.value.trim();
  const pago   = pagoEl ? pagoEl.value : '';
  let ok = true;

  clearFieldError('checkout-nombre');
  clearFieldError('checkout-dir');
  clearFieldError('checkout-pago');

  if (!isValidName(nombre)) {
    showFieldError('checkout-nombre', 'Ingresá tu nombre y apellido completo (solo letras).');
    ok = false;
  }
  if (!isValidAddress(dir)) {
    showFieldError('checkout-dir', 'Ingresá una dirección válida (calle, número, ciudad).');
    ok = false;
  }
  if (!pago) {
    showFieldError('checkout-pago', 'Seleccioná un método de pago.');
    ok = false;
  }
  if (!ok) return;

  const pagoLabels = { efectivo:'Efectivo', billetera:'Billetera Virtual (Mercado Pago / Naranja X)', cripto:'Criptomoneda' };
  const pagoStr = pagoLabels[pago] || pago;
  const items = cart.map(i => `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join('\n');
  const total = fmt(getTotal());
  const msg = `🛍️ *PEDIDO — CALA IMPORTS*\n\n👤 *Cliente:* ${nombre}\n📍 *Dirección:* ${dir}\n💳 *Pago:* ${pagoStr}\n\n📦 *Productos:*\n${items}\n\n💰 *Total: ${total}*\n\n✅ Quiero confirmar mi pedido. ¡Gracias!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openCart() {
  const d = document.getElementById('cart-drawer');
  const o = document.getElementById('cart-overlay');
  if (d) d.classList.add('open');
  if (o) o.classList.add('open');
  renderCartItems();
}
function closeCart() {
  const d = document.getElementById('cart-drawer');
  const o = document.getElementById('cart-overlay');
  if (d) d.classList.remove('open');
  if (o) o.classList.remove('open');
}

function contactarWA() {
  const msg = `Hola Cala Imports! 👋 Tengo una consulta sobre sus productos.\n\nMe gustaría saber más sobre disponibilidad, precios y envíos. ¡Gracias!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function mayoristasWA() {
  const msg = `Hola Cala Imports! 👋 Quisiera hacer una *consulta mayorista*.\n\nEstoy interesado en comprar en cantidad. ¿Me pueden pasar precios y condiciones? ¡Gracias!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.site-logo').forEach(el => { el.src = LOGO; });
  updateCartUI();
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
});
