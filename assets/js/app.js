/* =============================================================
   CALA IMPORTS — Interfaz
   Header, menú, buscador, carrito lateral, vista rápida,
   barra inferior móvil, avisos y animaciones.
   ============================================================= */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var LINKS = [
    ['index.html', 'Inicio'], ['productos.html', 'Productos'], ['pormayor.html', 'Por Mayor'],
    ['novedades.html', 'Novedades'], ['contacto.html', 'Contacto']
  ];

  /* ==================== estructura común ==================== */
  function montar() {
    if ($('#cala-ui')) return;
    var wrap = document.createElement('div');
    wrap.id = 'cala-ui';
    wrap.innerHTML =
      '<div class="overlay" data-cerrar></div>' +
      '<aside class="drawer" id="drawer" aria-label="Carrito" aria-hidden="true">' +
        '<div class="drawer-head"><h3>Tu carrito <span class="muted small" id="drawerUnidades"></span></h3>' +
        '<button class="icon-btn plain" data-cerrar aria-label="Cerrar carrito">' + icon('close') + '</button></div>' +
        '<div class="drawer-body" id="drawerBody"></div>' +
        '<div class="drawer-foot" id="drawerFoot"></div>' +
      '</aside>' +
      '<div class="modal" id="vista" aria-hidden="true"><div class="overlay open" data-cerrar-modal></div>' +
        '<div class="modal-card" role="dialog" aria-modal="true" id="vistaCard"></div></div>' +
      '<div class="toasts" id="toasts" aria-live="polite"></div>' +
      '<a class="wa-float" id="waFloat" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">' + icon('waSolid') + '</a>' +
      '<div class="bottom-bar">' +
        '<a class="btn" href="productos.html">Ver productos</a>' +
        '<a class="icon-btn" id="waBar" target="_blank" rel="noopener" aria-label="WhatsApp">' + icon('waSolid') + '</a>' +
        '<button class="icon-btn" data-abrir-carrito aria-label="Abrir carrito">' + icon('cart') +
          '<span class="cart-count">0</span></button>' +
      '</div>';
    document.body.appendChild(wrap);
    $('#waFloat').href = Cala.waGeneral();
    $('#waBar').href = Cala.waGeneral();

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cerrar]')) cerrar();
      if (e.target.closest('[data-cerrar-modal]')) cerrarModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { cerrar(); cerrarModal(); }
    });
  }

  function abrirCarrito() {
    pintarDrawer();
    $('#drawer').classList.add('open');
    $('#drawer').setAttribute('aria-hidden', 'false');
    $('#cala-ui .overlay').classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function cerrar() {
    var d = $('#drawer');
    if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); }
    var o = $('#cala-ui .overlay'); if (o) o.classList.remove('open');
    var m = $('#mobileNav'); if (m) m.classList.remove('open');
    var b = $('#burger'); if (b) { b.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
    if (!$('#vista') || !$('#vista').classList.contains('open')) document.body.classList.remove('no-scroll');
  }
  function cerrarModal() {
    var m = $('#vista');
    if (m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); }
    document.body.classList.remove('no-scroll');
  }

  /* ==================== avisos ==================== */
  function aviso(msg, ic) {
    montar();
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = icon(ic || 'check') + '<span>' + esc(msg) + '</span>';
    $('#toasts').appendChild(el);
    setTimeout(function () {
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 320);
    }, 2600);
  }

  /* ==================== escala mayorista ==================== */
  function tablaEscala(p, compacta) {
    if (!Cala.tieneMayorista(p)) return '';
    var filas = Cala.escala(p).filter(function (t) { return t.tipo !== 'menor'; });
    if (compacta) filas = filas.filter(function (t) { return t.tipo === 'mayor'; }).slice(0, 4);
    return '<div class="tiers">' + filas.map(function (t) {
      return '<div class="tier' + (t.tipo === 'promo' ? ' promo' : '') + '">' +
        '<span>' + (t.tipo === 'promo' ? 'Llevando 2' : 'Desde ' + t.min + ' u.') + '</span>' +
        '<b>' + Cala.precio(t.precio) + '</b></div>';
    }).join('') + '</div>';
  }

  /* ==================== tarjeta de producto ==================== */
  function tarjeta(p, d, mayor) {
    var tint = 't-' + Cala.colorCategoria(p.categoria);
    if (mayor && Cala.tieneMayorista(p)) return tarjetaMayor(p, d, tint);
    return '' +
      '<article class="card reveal"' + (d ? ' data-d="' + d + '"' : '') + '>' +
        '<button class="card-media" data-ver="' + p.id + '" aria-label="Ver ' + esc(p.nombre) + '">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '" loading="lazy">' +
          (p.precio2 > 0 ? '<div class="badges"><span class="badge t-durazno">Promo 2x</span></div>' : '') +
        '</button>' +
        '<div class="card-body">' +
          '<span class="card-cat ' + tint + '">' + esc(Cala.nombreCategoria(p.categoria)) + '</span>' +
          '<h3 class="card-title">' + esc(p.nombre) + '</h3>' +
          '<p class="card-desc">' + esc(p.desc) + '</p>' +
          (p.precio2 > 0
            ? '<div class="card-promo t-durazno">' + icon('fire') + 'Llevá 2 y pagás ' + Cala.precio(p.precio2) + ' c/u</div>'
            : '') +
          '<div class="price-row"><span class="price">' + Cala.precio(p.precio) + ' <small>ARS</small></span></div>' +
          (Cala.tieneMayorista(p)
            ? '<div class="card-mayor">Por mayor desde <b>' + Cala.precio(Cala.precioMinimo(p)) + '</b> c/u</div>'
            : '') +
          (p.nota ? '<div class="card-nota">' + icon('info') + '<span>' + esc(p.nota) + '</span></div>' : '') +
          '<div class="card-actions">' +
            '<button class="btn btn-sm" data-agregar="' + p.id + '">Agregar</button>' +
            '<a class="btn btn-sm btn-wa" href="' + Cala.waProducto(p) + '" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp">' + icon('whatsapp') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* tarjeta en modo mayorista: muestra la escala completa */
  function tarjetaMayor(p, d, tint) {
    return '' +
      '<article class="card card-wide reveal"' + (d ? ' data-d="' + d + '"' : '') + '>' +
        '<button class="card-media" data-ver="' + p.id + '" aria-label="Ver ' + esc(p.nombre) + '">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '" loading="lazy">' +
        '</button>' +
        '<div class="card-body">' +
          '<span class="card-cat ' + tint + '">' + esc(Cala.nombreCategoria(p.categoria)) + '</span>' +
          '<h3 class="card-title">' + esc(p.nombre) + '</h3>' +
          '<p class="card-desc">' + esc(p.desc) + '</p>' +
          tablaEscala(p) +
          '<p class="tiny muted" style="margin-top:4px">Por unidad suelta: ' + Cala.precio(p.precio) + '</p>' +
          '<div class="card-actions">' +
            '<button class="btn btn-sm" data-ver="' + p.id + '">Elegir cantidad</button>' +
            '<a class="btn btn-sm btn-wa" href="' + Cala.waProducto(p) + '" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp">' + icon('whatsapp') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function pintarProductos(el, lista, mayor) {
    if (!el) return;
    el.classList.toggle('modo-mayor', !!mayor);
    if (!lista.length) {
      el.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="ico">' + icon('search') + '</div>' +
        '<h3 class="h3">No encontramos nada</h3><p class="muted small">Probá con otra búsqueda o categoría.</p></div>';
      return;
    }
    el.innerHTML = lista.map(function (p, i) { return tarjeta(p, (i % 4) + 1, mayor); }).join('');
    revelar(el);
  }

  /* ==================== vista rápida ==================== */
  function verProducto(id) {
    var p = Cala.porId(id);
    if (!p) return;
    montar();
    var tint = 't-' + Cala.colorCategoria(p.categoria);
    $('#vistaCard').innerHTML =
      '<div class="modal-head"><span class="card-cat ' + tint + '">' + esc(Cala.nombreCategoria(p.categoria)) + '</span>' +
        '<button class="icon-btn plain" data-cerrar-modal aria-label="Cerrar">' + icon('close') + '</button></div>' +
      '<div class="modal-body"><div class="modal-grid">' +
        '<div class="modal-foto">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '">' +
        '</div>' +
        '<div class="stack">' +
          '<h3 class="h3">' + esc(p.nombre) + '</h3>' +
          '<p class="muted small" style="line-height:1.65">' + esc(p.desc) + '</p>' +
          (p.detalle ? '<p class="tiny muted">' + esc(p.detalle) + '</p>' : '') +
          '<div class="price-row" style="margin-top:4px"><span class="price" style="font-size:1.8rem" id="vPrecio">' +
            Cala.precio(p.precio) + '</span><span class="tiny muted">por unidad</span></div>' +
          (Cala.tieneMayorista(p)
            ? '<div class="tiers tiers-click" id="vEscala">' + Cala.escala(p).map(function (t) {
                return '<button class="tier" data-tramo="' + t.min + '">' +
                  '<span>' + (t.min === 1 ? '1 unidad' : (t.tipo === 'promo' ? 'Llevando 2' : 'Desde ' + t.min + ' u.')) + '</span>' +
                  '<b>' + Cala.precio(t.precio) + '</b></button>';
              }).join('') + '</div>'
            : (p.precio2 > 0 ? '<div class="card-promo t-durazno">' + icon('fire') + 'Llevá 2 y pagás ' + Cala.precio(p.precio2) + ' cada uno</div>' : '')) +
          (p.nota ? '<div class="note">' + icon('info') + '<span>' + esc(p.nota) + '</span></div>' : '') +
          '<p class="tiny muted">Pedí la cantidad que quieras: te confirmamos disponibilidad y plazo por WhatsApp.</p>' +
          '<p class="tiny muted">' + esc(Cala.cfg.aviso) + '</p>' +
        '</div>' +
      '</div>' +
      /* barra de compra siempre a la vista */
      '<div class="modal-acciones">' +
        '<div class="qty"><button data-menos aria-label="Menos">' + icon('minus') + '</button>' +
          '<input id="vCant" type="number" min="1" step="1" value="1" aria-label="Cantidad">' +
          '<button data-mas aria-label="Más">' + icon('plus') + '</button></div>' +
        '<button class="btn" data-v-agregar>Agregar · <span id="vTotal">' + Cala.precio(p.precio) + '</span></button>' +
        '<a class="btn btn-wa2" href="' + Cala.waProducto(p) + '" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp">' +
          icon('waSolid') + '</a>' +
      '</div></div>';

    var m = $('#vista');
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    var cant = 1, out = $('#vCant');
    var refrescar = function (escribir) {
      if (escribir !== false) out.value = cant;
      var t = Cala.tramo(p, cant);
      $('#vPrecio').textContent = Cala.precio(t.precio);
      $('#vTotal').textContent = Cala.precio(t.precio * cant);
      $$('#vEscala .tier').forEach(function (b) {
        b.classList.toggle('activo', parseInt(b.getAttribute('data-tramo'), 10) === t.min);
      });
    };
    $('[data-menos]').onclick = function () { cant = Math.max(1, cant - 1); refrescar(); };
    $('[data-mas]').onclick = function () { cant = cant + 1; refrescar(); };
    /* se puede escribir la cantidad a mano: no hay tope */
    out.addEventListener('input', function () {
      var v = parseInt(out.value, 10);
      cant = (isNaN(v) || v < 1) ? 1 : v;
      refrescar(false);
    });
    out.addEventListener('blur', function () { refrescar(); });
    $$('#vEscala .tier').forEach(function (b) {
      b.onclick = function () {
        cant = parseInt(b.getAttribute('data-tramo'), 10);
        refrescar();
      };
    });
    $('[data-v-agregar]').onclick = function () { Cala.agregar(p.id, cant); cerrarModal(); abrirCarrito(); };
    refrescar();
  }

  /* ==================== carrito lateral ==================== */
  function barraPromo(t) {
    if (t.sugerencia) {
      var s = t.sugerencia;
      return '<div class="promo-bar t-durazno">' + icon('fire') +
        '<p>Sumá ' + s.faltan + (s.faltan === 1 ? ' unidad más' : ' unidades más') + ' de ' + esc(s.producto.nombre) +
        ' y cada una te queda a ' + Cala.precio(s.precio) + '.</p></div>';
    }
    if (t.ahorro > 0) {
      return '<div class="promo-bar t-menta">' + icon('check') +
        '<p>¡Genial! Estás ahorrando ' + Cala.precio(t.ahorro) + ' con los precios por cantidad.</p></div>';
    }
    return '';
  }

  function lineaHTML(l) {
    return '<div class="citem">' +
      '<img src="' + esc(l.producto.img) + '" alt="' + esc(l.producto.nombre) + '" loading="lazy">' +
      '<div class="citem-main">' +
        '<div class="citem-title">' + esc(l.producto.nombre) + '</div>' +
        '<div class="citem-meta">' + Cala.precio(l.unitario) + ' c/u' +
          (l.mayorActivo ? ' · <b>por mayor</b>' : (l.promoActiva ? ' · <b>promo 2x</b>' : '')) + '</div>' +
        '<div class="citem-bottom">' +
          '<div class="qty"><button data-menos-id="' + l.id + '" aria-label="Menos">' + icon('minus') + '</button>' +
          '<span>' + l.cant + '</span><button data-mas-id="' + l.id + '" aria-label="Más">' + icon('plus') + '</button></div>' +
          '<span class="citem-price">' + Cala.precio(l.total) + '</span>' +
        '</div>' +
        '<button class="citem-remove" data-quitar="' + l.id + '">Quitar</button>' +
      '</div></div>';
  }

  function pintarDrawer() {
    var body = $('#drawerBody'), foot = $('#drawerFoot');
    if (!body) return;
    var t = Cala.totales();
    $('#drawerUnidades').textContent = t.unidades ? '(' + t.unidades + ')' : '';
    if (!t.lineas.length) {
      body.innerHTML = '<div class="empty"><div class="ico">' + icon('cart') + '</div>' +
        '<h3 class="h3">Tu carrito está vacío</h3>' +
        '<p class="muted small">Mirá los productos y sumá lo que te guste.</p>' +
        '<a class="btn" href="productos.html">Ver productos</a></div>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = barraPromo(t) + t.lineas.map(lineaHTML).join('');
    foot.innerHTML =
      '<div class="sum-row"><span>Subtotal (' + t.unidades + ')</span><span>' + Cala.precio(t.subtotal) + '</span></div>' +
      (t.ahorro > 0 ? '<div class="sum-row"><span>Ahorro por promo</span><span class="ok">− ' + Cala.precio(t.ahorro) + '</span></div>' : '') +
      '<div class="sum-row"><span>Envío</span><span>A coordinar</span></div>' +
      '<div class="sum-row total"><span>Total</span><span>' + Cala.precio(t.total) + '</span></div>' +
      '<a class="btn btn-block btn-lg" href="checkout.html" style="margin-top:14px">Finalizar pedido</a>' +
      '<a class="btn btn-ghost btn-block" href="carrito.html" style="margin-top:9px">Ver el carrito</a>';
  }

  function contador() {
    var t = Cala.totales();
    $$('.cart-count').forEach(function (el) {
      el.textContent = t.unidades;
      el.classList.toggle('show', t.unidades > 0);
      el.classList.remove('bump');
      void el.offsetWidth;
      if (t.unidades > 0) el.classList.add('bump');
    });
  }

  /* ==================== buscador ==================== */
  function buscador(input, caja) {
    if (!input || !caja) return;
    var correr = function () {
      var q = input.value.trim();
      if (!q) { caja.classList.remove('open'); caja.innerHTML = ''; return; }
      var res = Cala.buscar(q).slice(0, 6);
      caja.innerHTML = res.length
        ? res.map(function (p) {
            return '<button class="suggest-item" data-ver="' + p.id + '">' +
              '<img src="' + esc(p.img) + '" alt=""><span><span class="n">' + esc(p.nombre) + '</span>' +
              '<span class="tiny muted" style="display:block">' + Cala.precio(p.precio) + '</span></span></button>';
          }).join('') +
          '<a class="suggest-item" href="productos.html?q=' + encodeURIComponent(q) + '"><span class="n">Ver todo lo de “' + esc(q) + '”</span></a>'
        : '<div class="suggest-empty">Sin resultados para “' + esc(q) + '”</div>';
      caja.classList.add('open');
    };
    input.addEventListener('input', correr);
    input.addEventListener('focus', correr);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && input.value.trim()) {
        location.href = 'productos.html?q=' + encodeURIComponent(input.value.trim());
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search')) caja.classList.remove('open');
    });
    var limpiar = input.parentNode.querySelector('.clear');
    if (limpiar) limpiar.addEventListener('click', function () { input.value = ''; correr(); input.focus(); });
  }

  /* ==================== menú móvil ==================== */
  function menuMovil() {
    if ($('#mobileNav')) return;
    var aqui = location.pathname.split('/').pop() || 'index.html';
    var nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.id = 'mobileNav';
    nav.innerHTML =
      '<div class="search" style="margin-bottom:16px">' + icon('search') +
        '<input type="search" id="mSearch" placeholder="Buscar productos..." aria-label="Buscar productos">' +
        '<button class="clear" aria-label="Limpiar">' + icon('close') + '</button>' +
        '<div class="suggest" id="mSuggest"></div></div>' +
      LINKS.map(function (l) {
        return '<a class="m-link" href="' + l[0] + '"' + (l[0] === aqui ? ' aria-current="page"' : '') + '>' +
          l[1] + icon('chevron') + '</a>';
      }).join('') +
      '<a class="btn btn-block btn-lg" id="mWa" target="_blank" rel="noopener" style="margin-top:16px">' +
        icon('whatsapp') + ' Escribinos por WhatsApp</a>';
    document.body.appendChild(nav);
    $('#mWa').href = Cala.waGeneral();
    buscador($('#mSearch'), $('#mSuggest'));
  }

  /* ==================== aparición al scrollear ==================== */
  var io = null;
  function revelar(root) {
    var els = $$('.reveal:not(.in)', root || document);
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -5% 0px', threshold: 0.04 });
    }
    els.forEach(function (e) { io.observe(e); });
  }

  /* ==================== acordeón ==================== */
  function acordeones() {
    $$('.acc-item').forEach(function (item) {
      var q = $('.acc-q', item), a = $('.acc-a', item);
      if (!q || !a || q.dataset.listo) return;
      q.dataset.listo = '1';
      q.addEventListener('click', function () {
        var abierto = item.classList.contains('open');
        $$('.acc-item.open', item.parentNode).forEach(function (o) {
          o.classList.remove('open');
          $('.acc-a', o).style.maxHeight = null;
          $('.acc-q', o).setAttribute('aria-expanded', 'false');
        });
        if (!abierto) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==================== arranque ==================== */
  function arrancar() {
    montar();
    menuMovil();

    var header = $('.header');
    if (header) {
      var scroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
      scroll();
      window.addEventListener('scroll', scroll, { passive: true });
    }

    var burger = $('#burger');
    if (burger) burger.addEventListener('click', function () {
      var abierto = burger.classList.toggle('open');
      burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      $('#mobileNav').classList.toggle('open', abierto);
      document.body.classList.toggle('no-scroll', abierto);
    });

    buscador($('#hSearch'), $('#hSuggest'));

    /* enlaces y textos dinámicos */
    $$('[data-wa]').forEach(function (a) { a.href = Cala.waGeneral(); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-wa-mayorista]').forEach(function (a) { a.href = Cala.waMayorista(); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-ig]').forEach(function (a) { a.href = Cala.cfg.instagram; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-tt]').forEach(function (a) { a.href = Cala.cfg.tiktok; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-usuario]').forEach(function (e) { e.textContent = Cala.cfg.usuario; });
    $$('[data-aviso]').forEach(function (e) { e.textContent = Cala.cfg.aviso; });
    $$('[data-ubicacion]').forEach(function (e) { e.textContent = Cala.cfg.ubicacion; });
    $$('[data-anio]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

    /* clicks globales */
    document.addEventListener('click', function (e) {
      var el;
      if ((el = e.target.closest('[data-agregar]'))) {
        Cala.agregar(el.getAttribute('data-agregar'), 1);
      } else if ((el = e.target.closest('[data-ver]'))) {
        e.preventDefault(); verProducto(el.getAttribute('data-ver'));
      } else if ((el = e.target.closest('[data-abrir-carrito]'))) {
        e.preventDefault(); abrirCarrito();
      } else if ((el = e.target.closest('[data-mas-id]'))) {
        Cala.agregar(el.getAttribute('data-mas-id'), 1);
      } else if ((el = e.target.closest('[data-menos-id]'))) {
        var id = el.getAttribute('data-menos-id');
        var linea = Cala.carrito.filter(function (l) { return l.id === id; })[0];
        Cala.definirCantidad(id, (linea ? linea.cant : 1) - 1);
      } else if ((el = e.target.closest('[data-quitar]'))) {
        Cala.quitar(el.getAttribute('data-quitar'));
      }
    });

    Cala.on('agregado', function (d) { aviso(d.cant + ' × ' + d.producto.nombre + ' al carrito'); });
    Cala.on('aviso', function (o) { aviso(o.msg, o.ic); });
    Cala.on('carrito', function () {
      contador();
      pintarDrawer();
      if (window.Pagina && window.Pagina.alCambiarCarrito) window.Pagina.alCambiarCarrito();
    });

    contador();
    acordeones();
    revelar();
  }

  window.UI = {
    $: $, $$: $$, esc: esc,
    tarjeta: tarjeta, pintarProductos: pintarProductos, tablaEscala: tablaEscala,
    aviso: aviso, abrirCarrito: abrirCarrito, verProducto: verProducto,
    barraPromo: barraPromo, lineaHTML: lineaHTML,
    revelar: revelar, acordeones: acordeones
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
