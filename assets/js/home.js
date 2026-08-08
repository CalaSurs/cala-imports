/* =============================================================
   CALA IMPORTS — Inicio
   ============================================================= */
(function () {
  var $ = UI.$, esc = UI.esc;

  var PASOS = [
    ['1', 'Elegís tus productos', 'Agregás al carrito lo que te guste. Si llevás 2 unidades, la promo se aplica sola.', 'lila'],
    ['2', 'Confirmás por WhatsApp', 'Se abre el chat con tu pedido ya escrito. Ahí coordinamos pago y envío.', 'cielo'],
    ['3', 'Lo recibís', 'Enviamos a todo el país o lo retirás en Ituzaingó. Te avisamos cuando sale.', 'menta']
  ];

  function heroSlides() {
    var stage = $('#hcStage');
    if (!stage) return;
    var tintes = ['t-lila', 't-cielo', 't-menta', 't-durazno'];
    var lista = Cala.productos().filter(function (p) { return p.destacado; }).slice(0, 4);
    stage.innerHTML = lista.map(function (p, i) {
      return '<div class="hc-slide">' +
        '<div class="ph ' + tintes[i % 4] + '"><img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '"' +
          (i === 0 ? '' : ' loading="lazy"') + '></div>' +
        '<div class="nm">' + esc(p.nombre) + '</div>' +
        '<div class="pr"><b>' + Cala.precio(p.precio) + '</b>' +
          (p.precio2 > 0 ? '<span class="t-durazno">2x ' + Cala.precio(p.precio2) + '</span>' : '') + '</div>' +
        '</div>';
    }).join('');
  }

  function pintar() {
    heroSlides();

    /* filtros rápidos de categoría */
    $('#pills').innerHTML = '<a class="chip active" href="productos.html">Todos <span class="n">' +
      Cala.productos().length + '</span></a>' +
      Cala.categorias().map(function (c) {
        return '<a class="chip" href="productos.html?cat=' + c.id + '">' + esc(c.nombre) +
          ' <span class="n">' + Cala.cantidadEn(c.id) + '</span></a>';
      }).join('');

    /* productos destacados: primero los que tienen stock */
    var lista = Cala.productos().slice().sort(function (a, b) {
      return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    });
    UI.pintarProductos($('#gridDestacados'), lista);

    /* beneficios */
    $('#gridBeneficios').innerHTML = Cala.data.beneficios.map(function (b, i) {
      return '<div class="feature reveal" data-d="' + ((i % 3) + 1) + '">' +
        '<span class="ico t-' + b.color + '">' + icon(b.icono) + '</span>' +
        '<h3>' + esc(b.titulo) + '</h3><p>' + esc(b.texto) + '</p></div>';
    }).join('');

    /* pasos */
    $('#gridPasos').innerHTML = PASOS.map(function (s, i) {
      return '<div class="step reveal" data-d="' + ((i % 3) + 1) + '">' +
        '<span class="num t-' + s[3] + '">' + s[0] + '</span>' +
        '<div><h3>' + s[1] + '</h3><p>' + s[2] + '</p></div></div>';
    }).join('');

    /* preguntas */
    $('#listaPreguntas').innerHTML = Cala.data.preguntas.map(function (f) {
      return '<div class="acc-item"><button class="acc-q" aria-expanded="false"><span>' + esc(f.q) + '</span>' +
        '<span class="ic">' + icon('plus') + '</span></button>' +
        '<div class="acc-a"><p>' + esc(f.a) + '</p></div></div>';
    }).join('');

    UI.acordeones();
    UI.revelar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pintar);
  else pintar();
})();
