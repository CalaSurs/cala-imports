// ===== CALA IMPORTS — SHARED JS =====

const WA = "5491155135537";
const IG = "https://www.instagram.com/cala.imports/";

const PRODUCTS = [
  { id:1, name:"AirPods Pro 2", category:"Apple", price:0, priceLabel:"PRECIO A DEFINIR",
    desc:"Cancelación de ruido activa de última generación, chip H2, hasta 30 hs de batería con estuche, resistencia al agua IPX4.",
    img:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509650_sd.jpg" },
  { id:2, name:"AirPods Max", category:"Apple", price:0, priceLabel:"PRECIO A DEFINIR",
    desc:"Over-ear con audio de alta fidelidad, cancelación activa de ruido, chip H1 dual y 20 hs de batería.",
    img:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6373/6373587_sd.jpg" },
  { id:3, name:"JBL Go 4 Pro", category:"JBL", price:0, priceLabel:"PRECIO A DEFINIR",
    desc:"Speaker portátil compacto con sonido potente, resistente al agua IP67, hasta 7 hs de batería.",
    img:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6578/6578525_sd.jpg" },
  { id:4, name:"JBL Flip 6", category:"JBL", price:0, priceLabel:"PRECIO A DEFINIR",
    desc:"Potente speaker bluetooth con graves profundos, protección IP67, 12 hs de reproducción.",
    img:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501933_sd.jpg" }
];

// ---- CART ----
let cart = JSON.parse(localStorage.getItem('cala_cart') || '[]');

function saveCart() {
  localStorage.setItem('cala_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty) {
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; }
  else { const p = PRODUCTS.find(p => p.id === productId); cart.push({ id: p.id, name: p.name, price: p.price, priceLabel: p.priceLabel, img: p.img, qty }); }
  saveCart();
  openCart();
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

function getTotalItems() { return cart.reduce((s, i) => s + i.qty, 0); }

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
    container.innerHTML = '<div class="cart-empty"><span style="font-size:36px;opacity:0.3">🛒</span><p>Tu carrito está vacío</p></div>';
    document.getElementById('cart-total-price').textContent = '—';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#333';this.removeAttribute('src')" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.priceLabel}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>`).join('');
  const hasPrice = cart.some(i => i.price > 0);
  if (hasPrice) {
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('cart-total-price').textContent = '$' + total.toLocaleString('es-AR');
  } else {
    document.getElementById('cart-total-price').textContent = 'A consultar';
  }
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function checkoutCart() {
  if (cart.length === 0) return;
  const items = cart.map(i => `• ${i.name} x${i.qty} — ${i.priceLabel}`).join('\n');
  const msg = `🛍️ *PEDIDO — CALA IMPORTS*\n\n📦 *Productos:*\n${items}\n\n💳 *Formas de pago:* Efectivo, Transferencia, Mercado Pago, Naranja X\n\n✅ Quiero confirmar mi pedido y coordinar el envío. ¡Gracias!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function contactarWA() {
  const msg = `Hola Cala Imports! 👋 Tengo una consulta sobre sus productos.\n\nMe gustaría saber más sobre disponibilidad, precios y envíos a Argentina. ¡Gracias!`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }

// ---- ICONS ----
function waIcon(w,h) {
  return `<svg width="${w||17}" height="${h||17}" viewBox="0 0 24 24" fill="currentColor" class="wa-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
}
function igIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" class="ig-icon"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
}

// Init on page load
window.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  // Set active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
