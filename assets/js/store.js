/* =============================================================
   CALA IMPORTS — Motor de la tienda
   Carrito, promos 2x y armado del pedido para WhatsApp.
   ============================================================= */
(function () {
  var CFG = window.CALA_CONFIG;
  var D = window.CALA_DATA;
  var KEY = 'cala:carrito';

  /* almacenamiento seguro (funciona aunque el navegador lo bloquee) */
  var mem = {};
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  function leer(k, fb) { try { var v = JSON.parse(get(k)); return v == null ? fb : v; } catch (e) { return fb; } }
  function guardar(k, v) { set(k, JSON.stringify(v)); }

  var carrito = leer(KEY, []);

  /* ---------- utilidades ---------- */
  function precio(n) {
    return '$' + Math.round(Number(n) || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 });
  }

  function productos() { return D.productos; }
  function categorias() { return D.categorias; }

  function porId(id) {
    for (var i = 0; i < D.productos.length; i++) if (D.productos[i].id === id) return D.productos[i];
    return null;
  }
  function nombreCategoria(id) {
    for (var i = 0; i < D.categorias.length; i++) if (D.categorias[i].id === id) return D.categorias[i].nombre;
    return '';
  }
  function colorCategoria(id) {
    for (var i = 0; i < D.categorias.length; i++) if (D.categorias[i].id === id) return D.categorias[i].color;
    return 'lila';
  }
  function cantidadEn(catId) {
    return D.productos.filter(function (p) { return p.categoria === catId; }).length;
  }
  /* Trabajamos a pedido: no hay tope de cantidad ni productos agotados.
     La disponibilidad se confirma por WhatsApp. */

  /* ---------- escala de precios ----------
     Devuelve todos los tramos ordenados: 1 unidad, promo 2x y mayorista. */
  function escala(p) {
    var t = [{ min: 1, precio: p.precio, tipo: 'menor' }];
    if (p.precio2 > 0) t.push({ min: CFG.minimoPromo, precio: p.precio2, tipo: 'promo' });
    (p.mayor || []).forEach(function (m) {
      t.push({ min: m.min, precio: m.precio, tipo: 'mayor' });
    });
    return t.sort(function (a, b) { return a.min - b.min; });
  }

  /* El precio baja solo según la cantidad que lleve el cliente */
  function tramo(p, cant) {
    if (!p) return null;
    var t = escala(p), elegido = t[0];
    t.forEach(function (x) { if (cant >= x.min) elegido = x; });
    return elegido;
  }

  function proximoTramo(p, cant) {
    if (!p) return null;
    var t = escala(p), sig = null;
    for (var i = 0; i < t.length; i++) {
      if (t[i].min > cant) { sig = t[i]; break; }
    }
    return sig;
  }

  /* Precio por unidad más bajo publicado (para mostrar "por mayor desde") */
  function precioMinimo(p) {
    var t = escala(p);
    return t[t.length - 1].precio;
  }
  function tieneMayorista(p) { return !!(p.mayor && p.mayor.length); }

  function precioUnitario(p, cant) {
    if (!p) return 0;
    var t = tramo(p, cant);
    return t ? t.precio : p.precio;
  }

  function buscar(q, lista) {
    lista = lista || D.productos;
    q = (q || '').trim().toLowerCase();
    if (!q) return lista;
    var partes = q.split(/\s+/);
    return lista.filter(function (p) {
      var texto = (p.nombre + ' ' + p.desc + ' ' + nombreCategoria(p.categoria)).toLowerCase();
      return partes.every(function (t) { return texto.indexOf(t) > -1; });
    });
  }

  /* ---------- eventos ---------- */
  var oyentes = {};
  function on(ev, fn) { (oyentes[ev] = oyentes[ev] || []).push(fn); }
  function emitir(ev, dato) { (oyentes[ev] || []).forEach(function (fn) { fn(dato); }); }

  /* ---------- carrito ---------- */
  function guardarCarrito() { guardar(KEY, carrito); emitir('carrito'); }

  function lineas() {
    var out = [];
    carrito.forEach(function (l) {
      var p = porId(l.id);
      if (!p) return;
      var t = tramo(p, l.cant);
      var u = t.precio;
      out.push({
        id: p.id, producto: p, cant: l.cant, unitario: u, tramo: t,
        promoActiva: t.tipo === 'promo',
        mayorActivo: t.tipo === 'mayor',
        ahorro: (p.precio - u) * l.cant,
        total: u * l.cant
      });
    });
    return out;
  }

  function totales() {
    var ls = lineas();
    var subtotal = ls.reduce(function (a, l) { return a + l.total; }, 0);

    /* ¿algún producto está cerca del próximo tramo de precio? */
    var sugerencia = null;
    for (var i = 0; i < ls.length; i++) {
      var l = ls[i];
      var sig = proximoTramo(l.producto, l.cant);
      if (!sig) continue;
      var faltan = sig.min - l.cant;
      /* solo sugerimos saltos cortos, para no empujar de más */
      if (faltan > 0 && faltan <= 5) {
        sugerencia = { producto: l.producto, faltan: faltan, precio: sig.precio, tipo: sig.tipo };
        break;
      }
    }

    var faltaMinimo = Math.max(0, CFG.compraMinima - subtotal);
    var faltaEnvio = Math.max(0, CFG.envioGratisDesde - subtotal);

    return {
      lineas: ls,
      unidades: ls.reduce(function (a, l) { return a + l.cant; }, 0),
      subtotal: subtotal,
      ahorro: ls.reduce(function (a, l) { return a + l.ahorro; }, 0),
      sugerencia: sugerencia,
      total: subtotal,
      /* reglas de compra */
      minimo: CFG.compraMinima,
      alcanzaMinimo: subtotal === 0 || subtotal >= CFG.compraMinima,
      faltaMinimo: faltaMinimo,
      envioGratisDesde: CFG.envioGratisDesde,
      envioGratis: subtotal >= CFG.envioGratisDesde,
      faltaEnvio: faltaEnvio,
      progresoEnvio: Math.min(100, (subtotal / CFG.envioGratisDesde) * 100)
    };
  }

  function agregar(id, cant) {
    cant = Math.max(1, parseInt(cant, 10) || 1);
    var p = porId(id);
    if (!p) return;
    var linea = null;
    for (var i = 0; i < carrito.length; i++) if (carrito[i].id === id) linea = carrito[i];
    if (linea) linea.cant += cant; else carrito.push({ id: id, cant: cant });
    guardarCarrito();
    emitir('agregado', { producto: p, cant: cant });
  }

  function definirCantidad(id, cant) {
    cant = Math.max(0, parseInt(cant, 10) || 0);
    carrito = carrito.filter(function (l) {
      if (l.id !== id) return true;
      l.cant = cant;
      return cant > 0;
    });
    guardarCarrito();
  }

  function quitar(id) {
    carrito = carrito.filter(function (l) { return l.id !== id; });
    guardarCarrito();
  }

  function vaciar() { carrito = []; guardarCarrito(); }

  /* ---------- WhatsApp ---------- */
  function wa(texto) {
    return 'https://wa.me/' + String(CFG.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(texto);
  }
  function waGeneral() { return wa(CFG.mensajes.general); }
  function waMayorista() { return wa(CFG.mensajes.mayorista); }
  function waProducto(p) {
    return wa('¡Hola Cala Imports! Me interesa *' + p.nombre + '* (' + precio(p.precio) + '). ¿Está disponible?');
  }

  function idPedido() {
    var d = new Date(), z = function (n) { return String(n).padStart(2, '0'); };
    return 'CI-' + String(d.getFullYear()).slice(2) + z(d.getMonth() + 1) + z(d.getDate()) +
      '-' + String(Math.floor(Math.random() * 900) + 100);
  }

  function mensajePedido(datos) {
    var t = totales();
    var L = [];
    L.push('*NUEVO PEDIDO — CALA IMPORTS*');
    L.push('Pedido: ' + datos.id);
    L.push('');
    L.push('*Mis datos*');
    L.push('Nombre: ' + datos.nombre);
    L.push('Dirección: ' + datos.direccion);
    L.push('Pago: ' + datos.pago);
    L.push('');
    L.push('*Mi pedido*');
    t.lineas.forEach(function (l) {
      L.push('• ' + l.cant + ' x ' + l.producto.nombre + ' — ' + precio(l.unitario) + ' c/u' +
        (l.mayorActivo ? ' (por mayor)' : (l.promoActiva ? ' (promo 2x)' : '')) +
        ' = ' + precio(l.total));
    });
    L.push('');
    L.push('*TOTAL: ' + precio(t.total) + '*');
    if (t.ahorro > 0) L.push('(Ahorro por cantidad: ' + precio(t.ahorro) + ')');
    L.push('Envío: ' + (t.envioGratis ? 'GRATIS 🎉' : 'a coordinar'));
    if (datos.conociste) { L.push(''); L.push('Nos conoció por: ' + datos.conociste); }
    if (datos.estrellas > 0) {
      L.push('Calificación del sitio: ' + '⭐'.repeat(datos.estrellas) + ' (' + datos.estrellas + '/5)');
    }
    return L.join('\n');
  }

  function mensajeCarrito() {
    var t = totales();
    if (!t.lineas.length) return CFG.mensajes.general;
    return '¡Hola Cala Imports! Quiero hacer este pedido:\n' +
      t.lineas.map(function (l) { return '• ' + l.cant + ' x ' + l.producto.nombre; }).join('\n') +
      '\nTotal: ' + precio(t.total);
  }

  /* ---------- API pública ---------- */
  window.Cala = {
    cfg: CFG,
    data: D,
    get carrito() { return carrito; },
    precio: precio,
    productos: productos, categorias: categorias,
    porId: porId, nombreCategoria: nombreCategoria, colorCategoria: colorCategoria,
    cantidadEn: cantidadEn,
    precioUnitario: precioUnitario, buscar: buscar,
    escala: escala, tramo: tramo, proximoTramo: proximoTramo,
    precioMinimo: precioMinimo, tieneMayorista: tieneMayorista,
    lineas: lineas, totales: totales,
    agregar: agregar, definirCantidad: definirCantidad, quitar: quitar, vaciar: vaciar,
    wa: wa, waGeneral: waGeneral, waMayorista: waMayorista, waProducto: waProducto,
    idPedido: idPedido, mensajePedido: mensajePedido, mensajeCarrito: mensajeCarrito,
    on: on, emitir: emitir
  };
})();
