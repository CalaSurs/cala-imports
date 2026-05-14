// ===== CALA IMPORTS — SHARED JS =====
const WA = "541128520849";
const LOGO = "https://i.ibb.co/svPn0G3J/2fc4e911-3cc0-4290-8bd4-19c9f5d3b755.png";

// ============================================================
// PRODUCTOS — para cambiar stock editá el campo "stock":
//   stock: 0          → SIN STOCK (no se puede comprar)
//   stock: 5          → muestra "5 disponibles"
//   stock: null/999   → sin límite visible (no muestra cantidad)
//
// PROMO en producto — campos opcionales:
//   promoQty: 2       → cantidad mínima para activar promo
//   promoPrice: 20000 → precio por unidad al llevar promoQty
// ============================================================
const PRODUCTS = [
  {
    id:1, name:"AirPods Pro 2", category:"Apple", price:25000, stock:94,
    promoQty:2, promoPrice:20000,
    desc:"Cancelación de ruido activa de última generación, chip H2, hasta 30 hs de batería con estuche, resistencia al agua IPX4.",
    imgs:[
      "https://www.artifactargentina.com/cdn/shop/files/AirPods_Pro_2da_gen_con_MagSafe_USB-C.gif?v=1751315054&width=2048",
      "https://i.ibb.co/r2FcvpBv/Whats-App-Image-2026-04-20-at-11-47-02-PM-removebg-preview.png",
      "https://i.ibb.co/6JDrrwzc/Whats-App-Image-2026-04-20-at-11-47-04-PM-removebg-preview.png"
    ],
    img:"https://www.artifactargentina.com/cdn/shop/files/AirPods_Pro_2da_gen_con_MagSafe_USB-C.gif?v=1751315054&width=2048"
  },
  {
    id:2, name:"AirPods Max", category:"Apple", price:35000, stock:0,
    desc:"Over-ear con audio de alta fidelidad, cancelación activa de ruido, chip H1 dual y 20 hs de batería.",
    img:"https://www.artifactargentina.com/cdn/shop/files/AirPods_Max_-_Azul_2.gif?v=1751315510&width=2048"
  },
  {
    id:3, name:"JBL Go 4 Pro", category:"JBL", price:20000, stock:4,
    promoQty:2, promoPrice:17500,
    desc:"Speaker portátil compacto con sonido potente, resistente al agua IP67, hasta 7 hs de batería.",
    imgs:[
      "https://www.comeros.com.ar/wp-content/uploads/2025/11/PARLANTE-JBL-GO-4-BLACK-48_x1.png",
      "https://i.ibb.co/8LvJ8T3q/Whats-App-Image-2026-04-20-at-11-47-00-PM-removebg-preview.png",
      "https://i.ibb.co/rRQW2nDm/Whats-App-Image-2026-04-20-at-11-47-00-PM-2-removebg-preview.png"
    ],
    img:"https://www.comeros.com.ar/wp-content/uploads/2025/11/PARLANTE-JBL-GO-4-BLACK-48_x1.png"
  },
  {
    id:4, name:"JBL Flip 6", category:"JBL", price:45000, stock:0,
    desc:"Potente speaker bluetooth con graves profundos, protección IP67, 12 hs de reproducción.",
    img:"https://corrientesmotos.com.ar/wp-content/uploads/2024/10/JBL-Flip-6-1.png"
  },
  {
    id:5, name:"Apple Watch S10", category:"Apple", price:45000, stock:0,
    desc:"Pantalla OLED más grande y brillante, chip S10, diseño más delgado y liviano, sensores de salud avanzados.",
    img:"https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121202-apple-watch-series-10.png"
  },
  {
    id:6, name:"Alaxe", category:"Otros", price:35000, stock:0,
    desc:"Altavoz inteligente con control por voz, audio mejorado con graves más profundos, conectividad Wi-Fi/Bluetooth.",
    img:"https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/D2gateway/spot_efd_dot_ring.png"
  },
  {
    id:7, name:"Cargador Apple Lightning + USB-C", category:"Apple", price:15000, stock:19,
    promoQty:2, promoPrice:10000,
    desc:"Cargador rápido compatible con iPhone, iPad y más. Incluye cabezal USB-C. Carga eficiente y segura de 25W.",
    imgs:[
      "https://i.ibb.co/5hM3VCpX/combo-cargador-20w-cable-usb-c-a-lightning-ios1-7c2c9b49fa15ffbf3a16699975725562-640-0-removebg-prev.png",
      "https://i.ibb.co/6R6F82F2/Whats-App-Image-2026-04-20-at-11-46-56-PM-removebg-preview.png",
      "https://i.ibb.co/N6KVvp8Y/Whats-App-Image-2026-04-20-at-11-46-57-PM-removebg-preview.png"
    ],
    img:"https://i.ibb.co/5hM3VCpX/combo-cargador-20w-cable-usb-c-a-lightning-ios1-7c2c9b49fa15ffbf3a16699975725562-640-0-removebg-prev.png"
  },
  {
    id:8, name:"Fundas Apple", category:"Apple", price:7000, stock:47,
    promoQty:2, promoPrice:5000,
    fundaItem:true,
    desc:"Fundas de alta calidad para modelos iPhone. Variedad de colores y diseños disponibles. Indicanos tu modelo y color al confirmar el pedido.",
    imgs:[
      "https://i.ibb.co/4wgGpdMZ/Whats-App-Image-2026-04-20-at-11-46-55-PM-removebg-preview.png",
      "https://i.ibb.co/YwKLrmd/Whats-App-Image-2026-04-20-at-11-46-54-PM-removebg-preview.png",
      "https://i.ibb.co/wFhWmYjB/Whats-App-Image-2026-04-20-at-11-46-54-PM-1-removebg-preview.png"
    ],
    img:"https://i.ibb.co/4wgGpdMZ/Whats-App-Image-2026-04-20-at-11-46-55-PM-removebg-preview.png"
  }
];

// ---- CART ----
let cart = [];
try { cart = JSON.parse(localStorage.getItem('cala_cart') || '[]'); } catch(e) { cart = []; }

function saveCart() {
  try { localStorage.setItem('cala_cart', JSON.stringify(cart)); } catch(e) {}
  updateCartUI();
}

// Compute the effective unit price for a product given quantity
function getUnitPrice(p, qty) {
  if (p.promoQty && p.promoPrice && qty >= p.promoQty) return p.promoPrice;
  return p.price;
}

function addToCart(productId, qty) {
  const p = PRODUCTS.find(p => p.id === productId);
  if (!p || p.stock === 0) return;
  const effectivePrice = getUnitPrice(p, qty);
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
    // Recompute price based on new total qty
    existing.price = getUnitPrice(p, existing.qty);
  } else {
    cart.push({ id:p.id, name:p.name, price:effectivePrice, img:p.img, qty,
      basePrice:p.price, promoQty:p.promoQty||null, promoPrice:p.promoPrice||null });
  }
  saveCart();
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
  item.qty = Math.max(1, item.qty + delta);
  // Recompute promo price if applicable
  if (item.promoQty && item.promoPrice) {
    item.price = item.qty >= item.promoQty ? item.promoPrice : item.basePrice;
  }
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
    hideCheckoutForm(); return;
  }
  container.innerHTML = cart.map(item => {
    const isPromo = item.promoQty && item.qty >= item.promoQty;
    const promoBadge = isPromo ? ' <span style="color:#ff6a2f;font-size:9px;font-weight:700;">🔥PROMO</span>' : '';
    const unitLabel = isPromo ? `${fmt(item.price)} c/u 🔥` : `${fmt(item.price)} c/u`;
    return `<div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#333';this.removeAttribute('src')"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${promoBadge}</div>
        <div class="cart-item-price">${unitLabel}</div>
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
    </div>`;
  }).join('');
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

// ---- STAR RATING ----
let selectedStars = 0;
function setStars(n) {
  selectedStars = n;
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < n);
    btn.setAttribute('aria-pressed', i < n ? 'true' : 'false');
  });
  const inp = document.getElementById('checkout-rating');
  if (inp) inp.value = n;
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

// selectPago — inline styles, works regardless of external CSS
function selectPago(btn) {
  var ids = ['pago-efectivo','pago-billetera','pago-cripto'];
  ids.forEach(function(id) {
    var b = document.getElementById(id);
    if (!b) return;
    b.style.border = '2px solid rgba(255,255,255,.15)';
    b.style.color = 'rgba(255,255,255,.6)';
    b.style.background = '#1a1a1a';
    b.style.boxShadow = 'none';
  });
  btn.style.border = '2px solid #25D366';
  btn.style.color = '#25D366';
  btn.style.background = 'rgba(37,211,102,.1)';
  btn.style.boxShadow = '0 0 0 1px #25D366 inset';
  var input = document.getElementById('checkout-pago');
  if (input) input.value = btn.dataset.val;
}

function checkoutCart() {
  if (cart.length === 0) return;
  const nombreEl  = document.getElementById('checkout-nombre');
  const dirEl     = document.getElementById('checkout-dir');
  const pagoEl    = document.getElementById('checkout-pago');
  const fuenteEl  = document.getElementById('checkout-fuente');
  const ratingEl  = document.getElementById('checkout-rating');
  if (!nombreEl || !dirEl) return;

  const nombre  = nombreEl.value.trim();
  const dir     = dirEl.value.trim();
  const pago    = pagoEl ? pagoEl.value : '';
  const fuente  = fuenteEl ? fuenteEl.value.trim() : '';
  const rating  = ratingEl ? ratingEl.value : '';
  let ok = true;

  clearFieldError('checkout-nombre');
  clearFieldError('checkout-dir');
  clearFieldError('checkout-pago');

  if (!isValidName(nombre)) {
    showFieldError('checkout-nombre', 'Ingresá tu nombre y apellido completo (solo letras).'); ok = false;
  }
  if (!isValidAddress(dir)) {
    showFieldError('checkout-dir', 'Ingresá una dirección válida (calle, número, ciudad).'); ok = false;
  }
  if (!pago) {
    showFieldError('checkout-pago', 'Seleccioná un método de pago.'); ok = false;
  }
  if (!ok) return;

  const pagoLabels = { efectivo:'💵 Efectivo', billetera:'📱 Billetera Virtual', cripto:'₿ Criptomoneda' };
  const pagoStr = pagoLabels[pago] || pago;

  // Check if any fundas in cart
  const hasFundas = cart.some(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return p && p.fundaItem;
  });

  const items = cart.map(i => {
    const isPromo = i.promoQty && i.qty >= i.promoQty;
    const p = PRODUCTS.find(x => x.id === i.id);
    const fundaNote = (p && p.fundaItem) ? '\n  ⚠️ Indicar modelo y color de cada funda' : '';
    return `• ${i.name} x${i.qty}${isPromo?' 🔥':''} — ${fmt(i.price * i.qty)}${fundaNote}`;
  }).join('\n');
  const total = fmt(getTotal());
  const starStr = rating ? `⭐ ${rating}/5` : 'No calificó';
  const fuenteStr = fuente || 'No especificó';

  let msg;
  if (hasFundas) {
    const fundaItems = cart.filter(i => { const p = PRODUCTS.find(x => x.id === i.id); return p && p.fundaItem; });
    const otherItems = cart.filter(i => { const p = PRODUCTS.find(x => x.id === i.id); return !p || !p.fundaItem; });
    const fundaLines = fundaItems.map(i => {
      const isPromo = i.promoQty && i.qty >= i.promoQty;
      return `• ${i.name} x${i.qty}${isPromo?' 🔥':''} — ${fmt(i.price * i.qty)}\n  📱 Modelo de iPhone: \n  🎨 Color/diseño: `;
    }).join('\n');
    const otherLines = otherItems.map(i => {
      const isPromo = i.promoQty && i.qty >= i.promoQty;
      return `• ${i.name} x${i.qty}${isPromo?' 🔥':''} — ${fmt(i.price * i.qty)}`;
    }).join('\n');
    const allLines = [otherLines, fundaLines].filter(Boolean).join('\n');

    msg = `🛍️ *PEDIDO — CALA IMPORTS*\n\n👤 *Cliente:* ${nombre}\n📍 *Dirección:* ${dir}\n💳 *Pago:* ${pagoStr}\n\n📦 *Productos:*\n${allLines}\n\n⚠️ *IMPORTANTE — Fundas Apple:*\nCompletá el modelo y color arriba para cada funda antes de enviar.\n\n💰 *Total: ${total}*\n\n${rating ? `⭐ *Calificación del sitio:* ${starStr}\n` : ''}${fuente ? `📢 *¿Cómo nos conoció?* ${fuenteStr}\n` : ''}\n✅ Quiero confirmar mi pedido. ¡Gracias!`;
  } else {
    msg = `🛍️ *PEDIDO — CALA IMPORTS*\n\n👤 *Cliente:* ${nombre}\n📍 *Dirección:* ${dir}\n💳 *Pago:* ${pagoStr}\n\n📦 *Productos:*\n${items}\n\n💰 *Total: ${total}*\n\n${rating ? `⭐ *Calificación del sitio:* ${starStr}\n` : ''}${fuente ? `📢 *¿Cómo nos conoció?* ${fuenteStr}\n` : ''}\n✅ Quiero confirmar mi pedido. ¡Gracias!`;
  }

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

function consultarFundaWA() {
  const msg = `Hola Cala Imports! 👋 Quisiera consultar por una *funda Apple*.\n\nModelo de iPhone: \nColor/diseño que busco: \n\n¿Tienen disponibilidad? ¡Gracias!`;
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

// ============================================================
// BANNER PUBLICITARIO — editá solo este array para cambiar
// el texto en TODAS las páginas al mismo tiempo.
// ============================================================
const BANNER_ITEMS = [
  "Envíos a todo Argentina 🇦🇷",
  "Fundas Apple desde $7.000 📱",
];

function closeBanner() {
  var b = document.getElementById('ad-banner');
  var n = document.querySelector('.nav');
  if (b) { b.style.display = 'none'; b.style.height = '0'; }
  if (n) n.classList.add('banner-hidden');
}

window.addEventListener('DOMContentLoaded', function() {
  // Logos
  document.querySelectorAll('.site-logo').forEach(function(el) { el.src = LOGO; });
  updateCartUI();
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });

  // Banner
  var banner = document.getElementById('ad-banner');
  if (banner) {
    var items = BANNER_ITEMS.concat(BANNER_ITEMS);
    var html = items.map(function(text) {
      return '<span class="ad-banner-item"><span class="ad-dot"></span>' + text + '</span><span class="ad-banner-sep">✦</span>';
    }).join('');
    banner.innerHTML =
      '<div class="ad-banner-track">' + html + '</div>' +
      '<button class="ad-banner-close" onclick="closeBanner()" title="Cerrar">✕</button>';
  }
});

// ---- PRODUCT MODAL ----
let modalImgIndex = 0;
let modalImgs = [];

function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  modalImgs = p.imgs || [p.img];
  modalImgIndex = 0;

  const modal = document.getElementById('product-modal');
  if (!modal) return;

  // Images
  renderModalImages();

  // Info
  document.getElementById('modal-category').textContent = p.category;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;

  // Stock badge
  const stockEl = document.getElementById('modal-stock');
  if (p.stock === 0) {
    stockEl.textContent = '❌ Sin stock'; stockEl.className = 'modal-stock stock-out';
  } else if (typeof p.stock === 'number' && p.stock <= 3) {
    stockEl.textContent = `⚠️ Últimos ${p.stock}`; stockEl.className = 'modal-stock stock-low';
  } else if (p.fundaItem) {
    stockEl.textContent = '✅ Disponible · Indicar modelo y color'; stockEl.className = 'modal-stock stock-in';
  } else {
    stockEl.textContent = '✅ Disponible'; stockEl.className = 'modal-stock stock-in';
  }

  // Price & actions
  const priceWrap = document.getElementById('modal-price-wrap');
  const actionsWrap = document.getElementById('modal-actions');
  const promoEl = document.getElementById('modal-promo-info');

  priceWrap.innerHTML = `<span class="modal-price">${fmt(p.price)}</span><span class="modal-currency">ARS</span>`;
  const outOfStock = p.stock === 0;
  const modalQtyId = 'modal-qty-' + p.id;
  if (promoEl) {
    if (p.promoQty && p.promoPrice) {
      promoEl.textContent = `🔥 Comprá ${p.promoQty} y pagás ${fmt(p.promoPrice)} c/u`;
      promoEl.style.display = 'block';
    } else {
      promoEl.style.display = 'none';
    }
  }
  const fundaNote = p.fundaItem ? `<p class="modal-funda-note">📱 Al confirmar el pedido por WhatsApp indicá el modelo de iPhone y el color/diseño que querés.</p>` : '';
  if (outOfStock) {
    actionsWrap.innerHTML = `<button class="modal-add-btn" disabled>Sin Stock</button>`;
  } else {
    actionsWrap.innerHTML = `
      <div class="modal-qty-row">
        <div class="modal-qty-ctrl">
          <button onclick="changeModalQty(${p.id},-1)">−</button>
          <span id="${modalQtyId}">1</span>
          <button onclick="changeModalQty(${p.id},1)">+</button>
        </div>
        <button class="modal-add-btn" id="modal-add-btn-${p.id}" onclick="addFromModal(${p.id})">
          AGREGAR AL CARRITO
        </button>
      </div>
      ${fundaNote}`;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalImages() {
  const track = document.getElementById('modal-img-track');
  const dots = document.getElementById('modal-img-dots');
  const counter = document.getElementById('modal-img-counter');
  const prev = document.getElementById('modal-prev');
  const next = document.getElementById('modal-next');
  if (!track) return;

  const multi = modalImgs.length > 1;

  // Build sliding track — lazy load all except active
  track.innerHTML = modalImgs.map((src, i) => {
    const loading = i === modalImgIndex ? 'eager' : 'lazy';
    return '<img src="' + src + '" alt="Imagen ' + (i+1) + '" class="modal-slide"'
      + ' loading="' + loading + '" decoding="async"'
      + ' onerror="this.src=\'\';this.style.background=\'#252525\'" />';
  }).join('');

  // Slide to active image instantly (no animation on initial render)
  track.style.transition = 'none';
  track.style.transform = 'translateX(-' + (modalImgIndex * 100) + '%)';
  // Re-enable animation after paint
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      track.style.transition = 'transform .3s cubic-bezier(.25,.46,.45,.94)';
    });
  });

  // Dots
  if (dots) {
    dots.innerHTML = multi
      ? modalImgs.map(function(_, i) {
          return '<button class="modal-dot' + (i === modalImgIndex ? ' active' : '') + '" onclick="setModalImg(' + i + ')"></button>';
        }).join('')
      : '';
  }

  // Counter badge (e.g. "2 / 3")
  if (counter) {
    if (multi) {
      counter.textContent = (modalImgIndex + 1) + ' / ' + modalImgs.length;
      counter.style.display = 'block';
    } else {
      counter.style.display = 'none';
    }
  }

  if (prev) prev.style.display = multi ? 'flex' : 'none';
  if (next) next.style.display = multi ? 'flex' : 'none';
}

function updateModalSlide() {
  var track = document.getElementById('modal-img-track');
  var dots = document.getElementById('modal-img-dots');
  var counter = document.getElementById('modal-img-counter');
  if (track) {
    track.style.transform = 'translateX(-' + (modalImgIndex * 100) + '%)';
  }
  if (dots) {
    Array.from(dots.children).forEach(function(btn, i) {
      btn.classList.toggle('active', i === modalImgIndex);
    });
  }
  if (counter) {
    counter.textContent = (modalImgIndex + 1) + ' / ' + modalImgs.length;
  }
  // Preload next image
  var imgs = track ? track.querySelectorAll('img') : [];
  var next = (modalImgIndex + 1) % modalImgs.length;
  if (imgs[next] && !imgs[next].src) imgs[next].src = modalImgs[next];
}

function setModalImg(i) {
  modalImgIndex = i;
  updateModalSlide();
}
function modalPrev() {
  modalImgIndex = (modalImgIndex - 1 + modalImgs.length) % modalImgs.length;
  updateModalSlide();
}
function modalNext() {
  modalImgIndex = (modalImgIndex + 1) % modalImgs.length;
  updateModalSlide();
}

let modalQtys = {};
function changeModalQty(id, delta) {
  modalQtys[id] = Math.max(1, (modalQtys[id] || 1) + delta);
  const el = document.getElementById('modal-qty-' + id);
  if (el) el.textContent = modalQtys[id];
  const p = PRODUCTS.find(x => x.id === id);
  if (p && p.promoQty && p.promoPrice) {
    const promoEl = document.getElementById('modal-promo-info');
    if (promoEl) {
      if (modalQtys[id] >= p.promoQty) {
        promoEl.textContent = `🔥 ¡Promo activa! Precio: ${fmt(p.promoPrice)} c/u = ${fmt(p.promoPrice * modalQtys[id])}`;
      } else {
        promoEl.textContent = `🔥 Comprá ${p.promoQty} y pagás ${fmt(p.promoPrice)} c/u`;
      }
    }
  }
}

function addFromModal(id) {
  const qty = modalQtys[id] || 1;
  addToCart(id, qty);
  modalQtys[id] = 1;
  const el = document.getElementById('modal-qty-' + id);
  if (el) el.textContent = 1;
  const btn = document.getElementById('modal-add-btn-' + id);
  if (btn) {
    btn.textContent = '✓ Agregado';
    btn.style.background = '#1a8c44';
    setTimeout(() => { btn.textContent = 'AGREGAR AL CARRITO'; btn.style.background = ''; }, 1400);
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Swipe / drag support for modal carousel
(function() {
  var startX = 0, startY = 0, startTime = 0, dragging = false, currentDx = 0;

  function isModalOpen() {
    var m = document.getElementById('product-modal');
    return m && m.classList.contains('open');
  }
  function getTrack() { return document.getElementById('modal-img-track'); }

  document.addEventListener('touchstart', function(e) {
    if (!isModalOpen()) return;
    var t = e.touches[0];
    startX = t.clientX; startY = t.clientY;
    startTime = Date.now(); dragging = true; currentDx = 0;
    var track = getTrack();
    if (track) track.style.transition = 'none';
  }, {passive:true});

  document.addEventListener('touchmove', function(e) {
    if (!dragging || !isModalOpen()) return;
    var t = e.touches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(currentDx) < 5) return; // vertical scroll
    currentDx = dx;
    var track = getTrack();
    if (track && modalImgs.length > 1) {
      var base = modalImgIndex * 100;
      var offset = (dx / track.parentElement.offsetWidth) * 100;
      track.style.transform = 'translateX(calc(-' + base + '% + ' + dx + 'px))';
    }
  }, {passive:true});

  document.addEventListener('touchend', function(e) {
    if (!dragging || !isModalOpen()) { dragging = false; return; }
    dragging = false;
    var track = getTrack();
    if (track) track.style.transition = 'transform .3s cubic-bezier(.25,.46,.45,.94)';
    var elapsed = Date.now() - startTime;
    var velocity = Math.abs(currentDx) / elapsed;
    var threshold = velocity > 0.3 ? 20 : 60; // fast flick needs less distance
    if (currentDx < -threshold) modalNext();
    else if (currentDx > threshold) modalPrev();
    else updateModalSlide(); // snap back
  }, {passive:true});
})();
