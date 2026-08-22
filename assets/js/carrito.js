/* =============================================================
   CALA IMPORTS — Página del carrito
   ============================================================= */
(function () {
  var $ = UI.$;

  function pintar() {
    var t = Cala.totales();
    var items = $('#items'), resumen = $('#resumen');

    $('#bajada').textContent = t.unidades
      ? t.unidades + (t.unidades === 1 ? ' producto' : ' productos') + ' en tu carrito.'
      : 'Por ahora tu carrito está vacío.';

    if (!t.lineas.length) {
      items.innerHTML = '<div class="panel"><div class="empty"><div class="ico">' + icon('cart') + '</div>' +
        '<h3 class="h3">Tu carrito está vacío</h3>' +
        '<p class="muted small">Mirá los productos y sumá lo que te guste.</p>' +
        '<a class="btn" href="productos.html">Ver productos</a></div></div>';
      resumen.innerHTML = '<h3 class="h4" style="margin-bottom:8px">Resumen</h3>' +
        '<p class="small muted">Agregá productos para ver el total.</p>';
      return;
    }

    items.innerHTML = UI.barraEstado(t) + t.lineas.map(UI.lineaHTML).join('');
    UI.activarCantidades(items);

    resumen.innerHTML =
      '<h3 class="h4" style="margin-bottom:14px">Resumen del pedido</h3>' +
      t.lineas.map(function (l) {
        return '<div class="sum-row"><span style="max-width:64%">' + l.cant + ' × ' + UI.esc(l.producto.nombre) + '</span>' +
          '<span>' + Cala.precio(l.total) + '</span></div>';
      }).join('') +
      '<hr style="border:none;border-top:1.5px solid var(--line);margin:12px 0">' +
      '<div class="sum-row"><span>Subtotal (' + t.unidades + ')</span><span>' + Cala.precio(t.subtotal) + '</span></div>' +
      (t.ahorro > 0 ? '<div class="sum-row"><span>Ahorro por cantidad</span><span class="ok">− ' + Cala.precio(t.ahorro) + '</span></div>' : '') +
      '<div class="sum-row"><span>Envío</span><span' + (t.envioGratis ? ' class="ok">Gratis' : '>A coordinar') + '</span></div>' +
      '<div class="sum-row total"><span>Total</span><span>' + Cala.precio(t.total) + '</span></div>' +
      (t.alcanzaMinimo
        ? '<a class="btn btn-block btn-lg" href="checkout.html" style="margin-top:18px">Finalizar pedido</a>' +
          '<a class="btn btn-ghost btn-block" id="waPedido" style="margin-top:9px">' + icon('whatsapp') + ' Pedir directo por WhatsApp</a>'
        : '<button class="btn btn-block btn-lg" disabled style="margin-top:18px">Pedido mínimo ' + Cala.precio(t.minimo) + '</button>' +
          '<p class="tiny muted center" style="margin-top:10px">Te faltan ' + Cala.precio(t.faltaMinimo) + ' para poder confirmar el pedido.</p>');

    var wa = $('#waPedido');
    if (wa) { wa.href = Cala.wa(Cala.mensajeCarrito()); wa.target = '_blank'; wa.rel = 'noopener'; }
  }

  function sugeridos() {
    var enCarrito = Cala.carrito.map(function (l) { return l.id; });
    var lista = Cala.productos().filter(function (p) {
      return enCarrito.indexOf(p.id) === -1;
    }).slice(0, 4);
    if (!lista.length) lista = Cala.productos().slice(0, 4);
    UI.pintarProductos($('#sugeridos'), lista);
  }

  window.Pagina = { alCambiarCarrito: function () { pintar(); sugeridos(); } };

  function arrancar() {
    pintar();
    sugeridos();
    $('#vaciar').addEventListener('click', function () {
      if (!Cala.carrito.length) return;
      Cala.vaciar();
      UI.aviso('Carrito vaciado', 'trash');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
