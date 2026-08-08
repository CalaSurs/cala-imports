/* =============================================================
   CALA IMPORTS — Catálogo: categorías, búsqueda y orden
   ============================================================= */
(function () {
  var $ = UI.$, esc = UI.esc;
  var estado = { cat: 'todas', q: '', orden: 'destacados', modo: 'menor' };

  function leerURL() {
    var p = new URLSearchParams(location.search);
    if (p.get('cat')) estado.cat = p.get('cat');
    if (p.get('q')) estado.q = p.get('q');
    if (p.get('modo') === 'mayor') estado.modo = 'mayor';
  }

  function actualizarURL() {
    var p = new URLSearchParams();
    if (estado.cat !== 'todas') p.set('cat', estado.cat);
    if (estado.q) p.set('q', estado.q);
    if (estado.modo === 'mayor') p.set('modo', 'mayor');
    var qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  function filtrar() {
    var lista = Cala.productos().slice();
    if (estado.modo === 'mayor') lista = lista.filter(function (p) { return Cala.tieneMayorista(p); });
    if (estado.cat !== 'todas') lista = lista.filter(function (p) { return p.categoria === estado.cat; });
    lista = Cala.buscar(estado.q, lista);

    switch (estado.orden) {
      case 'precio-asc': lista.sort(function (a, b) { return Cala.precioMinimo(a) - Cala.precioMinimo(b); }); break;
      case 'precio-desc': lista.sort(function (a, b) { return Cala.precioMinimo(b) - Cala.precioMinimo(a); }); break;
      case 'nombre': lista.sort(function (a, b) { return a.nombre.localeCompare(b.nombre); }); break;
      default: lista.sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); });
    }
    return lista;
  }

  function pintarPills() {
    var total = Cala.productos().length;
    $('#pills').innerHTML =
      '<button class="chip' + (estado.cat === 'todas' ? ' active' : '') + '" data-cat="todas">Todos <span class="n">' + total + '</span></button>' +
      Cala.categorias().map(function (c) {
        return '<button class="chip' + (estado.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' +
          esc(c.nombre) + ' <span class="n">' + Cala.cantidadEn(c.id) + '</span></button>';
      }).join('');
  }

  function pintar() {
    pintarPills();
    var mayor = estado.modo === 'mayor';
    var nombre = estado.cat === 'todas'
      ? (mayor ? 'Lista mayorista' : 'Nuestros productos')
      : Cala.nombreCategoria(estado.cat);
    $('#titulo').textContent = estado.q ? 'Resultados de “' + estado.q + '”' : nombre;
    $('#bajada').textContent = mayor
      ? 'Cuantas más unidades llevás, menos pagás por cada una. El precio se aplica solo en el carrito.'
      : 'Elegí la cantidad y el precio se ajusta solo.';
    $('#miga').textContent = estado.cat === 'todas' ? 'Productos' : Cala.nombreCategoria(estado.cat);
    document.title = (estado.cat === 'todas' ? (mayor ? 'Por mayor' : 'Productos') : nombre) + ' — Cala Imports';

    UI.$$('#modo button').forEach(function (b) {
      var on = b.getAttribute('data-modo') === estado.modo;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    var lista = filtrar();
    $('#conteo').textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
    UI.pintarProductos($('#grid'), lista, mayor);

    if (!lista.length) {
      var caja = $('#grid .empty');
      if (caja) {
        var btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = 'Ver todo';
        btn.addEventListener('click', reiniciar);
        caja.appendChild(btn);
      }
    }
  }

  function reiniciar() {
    estado = { cat: 'todas', q: '', orden: $('#orden').value, modo: estado.modo };
    $('#buscar').value = '';
    actualizarURL(); pintar();
  }

  function arrancar() {
    leerURL();
    $('#buscar').value = estado.q;
    pintar();

    $('#modo').addEventListener('click', function (e) {
      var el = e.target.closest('[data-modo]');
      if (!el) return;
      estado.modo = el.getAttribute('data-modo');
      actualizarURL(); pintar();
    });

    $('#pills').addEventListener('click', function (e) {
      var el = e.target.closest('[data-cat]');
      if (!el) return;
      estado.cat = el.getAttribute('data-cat');
      actualizarURL(); pintar();
    });

    var t;
    $('#buscar').addEventListener('input', function (e) {
      clearTimeout(t);
      var v = e.target.value;
      t = setTimeout(function () { estado.q = v.trim(); actualizarURL(); pintar(); }, 140);
    });
    var limpiar = $('#buscar').parentNode.querySelector('.clear');
    if (limpiar) limpiar.addEventListener('click', function () {
      $('#buscar').value = ''; estado.q = ''; actualizarURL(); pintar();
    });

    $('#orden').addEventListener('change', function (e) { estado.orden = e.target.value; pintar(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
