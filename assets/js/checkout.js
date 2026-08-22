/* =============================================================
   CALA IMPORTS — Finalizar pedido
   Formulario mínimo: nombre, dirección y forma de pago.
   No hay pago online: el pedido se manda armado por WhatsApp.
   ============================================================= */
(function () {
  var $ = UI.$, $$ = UI.$$, esc = UI.esc;

  var BORRADOR = 'cala:datos';
  var CAMPOS = ['nombre', 'direccion', 'conociste'];
  var ICONOS = { 'Efectivo': 'billete', 'Billetera virtual': 'wallet', 'Criptomoneda': 'btc' };
  var CORTOS = { 'Efectivo': 'Efectivo', 'Billetera virtual': 'Billetera', 'Criptomoneda': 'Cripto' };
  var estrellas = 0;

  function pago() {
    var el = document.querySelector('input[name="pago"]:checked');
    return el ? el.value : Cala.cfg.pagos[0];
  }

  function pintarResumen() {
    var t = Cala.totales();
    var el = $('#resumen');
    if (!t.lineas.length) {
      el.innerHTML = '<h3 class="h4">Tu carrito está vacío</h3>' +
        '<p class="small muted" style="margin:10px 0 16px">Agregá productos antes de finalizar.</p>' +
        '<a class="btn btn-block" href="productos.html">Ver productos</a>';
      var b = $('#confirmar'); if (b) b.disabled = true;
      return;
    }
    var b2 = $('#confirmar'); if (b2) b2.disabled = !t.alcanzaMinimo;
    el.innerHTML =
      '<h3 class="h4" style="margin-bottom:14px">Tu pedido</h3>' +
      t.lineas.map(function (l) {
        return '<div class="sum-row"><span style="max-width:62%">' + l.cant + ' × ' + esc(l.producto.nombre) +
          (l.mayorActivo ? ' <span class="tiny">(por mayor)</span>'
            : (l.promoActiva ? ' <span class="tiny">(promo 2x)</span>' : '')) + '</span>' +
          '<span>' + Cala.precio(l.total) + '</span></div>';
      }).join('') +
      '<hr style="border:none;border-top:1.5px solid var(--line);margin:12px 0">' +
      '<div class="sum-row"><span>Subtotal (' + t.unidades + ')</span><span>' + Cala.precio(t.subtotal) + '</span></div>' +
      (t.ahorro > 0 ? '<div class="sum-row"><span>Ahorro por cantidad</span><span class="ok">− ' + Cala.precio(t.ahorro) + '</span></div>' : '') +
      '<div class="sum-row"><span>Envío</span><span' + (t.envioGratis ? ' class="ok">Gratis' : '>A coordinar') + '</span></div>' +
      '<div class="sum-row total"><span>Total</span><span>' + Cala.precio(t.total) + '</span></div>' +
      (t.alcanzaMinimo
        ? ''
        : '<div class="note" style="margin-top:14px;background:var(--rosa);color:var(--rosa-ink)">' + icon('info') +
          '<span>Pedido mínimo <b>' + Cala.precio(t.minimo) + '</b> — te faltan ' + Cala.precio(t.faltaMinimo) + '.</span></div>');
  }

  function validar() {
    var ok = true;
    ['nombre', 'direccion'].forEach(function (id) {
      var f = document.getElementById(id);
      var mal = f.value.trim().length < 3;
      f.closest('.field').classList.toggle('error', mal);
      if (mal && ok) { f.focus(); ok = false; }
    });
    return ok;
  }

  function guardarBorrador() {
    var d = {};
    CAMPOS.forEach(function (k) { var f = document.getElementById(k); if (f) d[k] = f.value; });
    try { localStorage.setItem(BORRADOR, JSON.stringify(d)); } catch (e) {}
  }

  function cargarBorrador() {
    try {
      var d = JSON.parse(localStorage.getItem(BORRADOR) || '{}');
      CAMPOS.forEach(function (k) { var f = document.getElementById(k); if (f && d[k]) f.value = d[k]; });
    } catch (e) {}
  }

  function pintarEstrellas() {
    $$('#estrellas button').forEach(function (b, i) {
      b.classList.toggle('on', i < estrellas);
      b.setAttribute('aria-checked', (i + 1) === estrellas ? 'true' : 'false');
    });
  }

  function arrancar() {
    /* formas de pago */
    $('#pagos').innerHTML = Cala.cfg.pagos.map(function (p, i) {
      return '<label class="radio radio-pago"><input type="radio" name="pago" value="' + esc(p) + '"' +
        (i === 0 ? ' checked' : '') + '><span>' + icon(ICONOS[p] || 'card') + esc(CORTOS[p] || p) + '</span></label>';
    }).join('');

    /* estrellas */
    $('#estrellas').innerHTML = [1, 2, 3, 4, 5].map(function (n) {
      return '<button type="button" role="radio" aria-checked="false" data-estrella="' + n + '" ' +
        'aria-label="' + n + ' de 5">' + icon('star') + '</button>';
    }).join('');
    $('#estrellas').addEventListener('click', function (e) {
      var b = e.target.closest('[data-estrella]');
      if (!b) return;
      var n = parseInt(b.getAttribute('data-estrella'), 10);
      estrellas = (estrellas === n) ? 0 : n;
      pintarEstrellas();
    });

    pintarResumen();
    cargarBorrador();

    $$('#formulario input, #formulario select').forEach(function (f) {
      f.addEventListener('input', function () {
        var campo = f.closest('.field');
        if (campo) campo.classList.remove('error');
        guardarBorrador();
      });
    });

    $('#formulario').addEventListener('submit', function (e) {
      e.preventDefault();
      var tActual = Cala.totales();
      if (!tActual.lineas.length) { UI.aviso('Tu carrito está vacío', 'info'); return; }
      if (!tActual.alcanzaMinimo) { UI.aviso('Pedido mínimo ' + Cala.precio(tActual.minimo) + ' — te faltan ' + Cala.precio(tActual.faltaMinimo), 'info'); return; }
      if (!validar()) { UI.aviso('Completá tu nombre y tu dirección', 'info'); return; }

      var datos = {
        id: Cala.idPedido(),
        nombre: $('#nombre').value.trim(),
        direccion: $('#direccion').value.trim(),
        pago: pago(),
        conociste: $('#conociste').value,
        estrellas: estrellas
      };

      var link = Cala.wa(Cala.mensajePedido(datos));
      window.open(link, '_blank', 'noopener');

      Cala.vaciar();
      try { localStorage.removeItem(BORRADOR); } catch (err) {}

      $('#pasoDatos').style.display = 'none';
      $('#pasoListo').style.display = 'block';
      $('#numeroPedido').textContent = datos.id;
      $('#abrirWa').href = link;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.Pagina = { alCambiarCarrito: pintarResumen };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
