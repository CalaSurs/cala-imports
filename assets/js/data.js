/* =============================================================
   CALA IMPORTS — Catálogo minorista y mayorista

   precio   -> precio por 1 unidad (minorista)
   precio2  -> precio por unidad llevando 2 (promo minorista)
   mayor    -> escala mayorista: desde X unidades, cada una sale Y

   No hay control de stock: se puede pedir cualquier cantidad y la
   disponibilidad se confirma por WhatsApp.
   ============================================================= */
window.CALA_DATA = {

  categorias: [
    { id: 'apple', nombre: 'Apple', color: 'lila' },
    { id: 'jbl',   nombre: 'JBL',   color: 'cielo' },
    { id: 'otros', nombre: 'Otros', color: 'menta' }
  ],

  productos: [
    {
      id: 'airpods-pro-2', nombre: 'AirPods Pro 2', categoria: 'apple',
      precio: 25000, precio2: 20000, destacado: true,
      mayor: [
        { min: 3, precio: 19000 }, { min: 5, precio: 18000 }, { min: 10, precio: 16500 },
        { min: 20, precio: 15500 }, { min: 50, precio: 14500 }, { min: 100, precio: 13500 }
      ],
      img: 'assets/img/productos/airpods-pro-2.gif',
      desc: 'Calidad AAA con cancelación de ruido activa, chip H2, pop-up en pantalla y hasta 30 hs de batería con el estuche.',
      detalle: 'Se sincronizan y vinculan al iPhone igual que los originales. Incluye cable, almohadillas, estuche de carga y manual.'
    },
    {
      id: 'jbl-go-4-pro', nombre: 'JBL Go 4 Pro', categoria: 'jbl',
      precio: 20000, precio2: 17500, destacado: true,
      mayor: [
        { min: 5, precio: 17000 }, { min: 10, precio: 16000 }, { min: 20, precio: 15000 },
        { min: 50, precio: 14000 }, { min: 100, precio: 13500 }
      ],
      img: 'assets/img/productos/jbl-go-4.png',
      desc: 'Speaker portátil compacto con sonido potente, resistente al agua IP67, hasta 7 hs de batería.',
      detalle: 'Versión Premium. Ideal para reventa: rota rápido y entra en cualquier bolsillo.'
    },
    {
      id: 'cargador-apple', nombre: 'Cargador Apple Lightning + USB-C', categoria: 'apple',
      precio: 15000, precio2: 10000, destacado: true,
      mayor: [
        { min: 5, precio: 9000 }, { min: 10, precio: 8000 }, { min: 20, precio: 7500 },
        { min: 30, precio: 7000 }, { min: 50, precio: 6500 }, { min: 100, precio: 5500 }
      ],
      img: 'assets/img/productos/cargador-apple.png',
      desc: 'Cable + cabezal USB-C a Lightning. Carga rápida de 25W, compatible con iPhone, iPad y más.',
      detalle: 'El combo completo: cabezal y cable. Uno de los productos con mejor margen para revender.'
    },
    {
      id: 'fundas-apple', nombre: 'Fundas iPhone Silicone Case', categoria: 'apple',
      precio: 7000, precio2: 5000, destacado: true,
      nota: 'Indicá modelo y color al confirmar el pedido',
      mayor: [
        { min: 10, precio: 4500 }, { min: 20, precio: 4200 }, { min: 50, precio: 3700 },
        { min: 100, precio: 3200 }, { min: 200, precio: 2900 }, { min: 500, precio: 2500 }
      ],
      img: 'assets/img/productos/fundas-apple.png',
      desc: 'Modelos del iPhone 11 al 17 Pro Max. Silicona suave al tacto, variedad de colores y diseños.',
      detalle: 'Calidad top, suaves al tacto y se venden solas. Para pedidos grandes podés combinar modelos y colores.'
    },
    {
      id: 'battery-pack', nombre: 'Battery Pack Magnético', categoria: 'apple',
      precio: 20000, precio2: 17000, destacado: true,
      mayor: [
        { min: 5, precio: 16000 }, { min: 10, precio: 15000 }, { min: 25, precio: 14000 },
        { min: 50, precio: 13000 }, { min: 75, precio: 12000 }, { min: 100, precio: 11000 }
      ],
      img: 'assets/img/productos/battery-pack.png',
      desc: 'Carga portátil que se pega solo al iPhone por imán. Compacto, liviano y sin cables: ideal para viajes, laburo o clases.',
      detalle: 'Margen alto y rotación rápida. Uno de los favoritos de los revendedores.'
    },
    {
      id: 'airpods-max', nombre: 'AirPods Max', categoria: 'apple',
      precio: 35000, precio2: 0, destacado: false,
      mayor: [
        { min: 3, precio: 30000 }, { min: 5, precio: 28000 }, { min: 10, precio: 26000 },
        { min: 20, precio: 25000 }, { min: 40, precio: 24000 }, { min: 60, precio: 23000 }
      ],
      img: 'assets/img/productos/airpods-max.gif',
      desc: 'Calidad AAA+. Over-ear con audio de alta fidelidad, cancelación activa de ruido y 20 hs de batería.',
      detalle: 'Consultanos por WhatsApp el plazo de entrega según la cantidad que necesites.'
    },
    {
      id: 'jbl-flip-6', nombre: 'JBL Flip 6', categoria: 'jbl',
      precio: 45000, precio2: 0, destacado: false,
      img: 'assets/img/productos/jbl-flip-6.png',
      desc: 'Potente speaker bluetooth con graves profundos, protección IP67, 12 hs de reproducción.'
    },
    {
      id: 'apple-watch-s10', nombre: 'Apple Watch S10', categoria: 'apple',
      precio: 45000, precio2: 0, destacado: false,
      img: 'assets/img/productos/apple-watch-s10.png',
      desc: 'Pantalla OLED más grande y brillante, chip S10, diseño más delgado y liviano, sensores de salud avanzados.'
    },
    {
      id: 'alaxe', nombre: 'Alaxe', categoria: 'otros',
      precio: 35000, precio2: 0, destacado: false,
      img: 'assets/img/productos/alaxe.png',
      desc: 'Altavoz inteligente con control por voz, audio mejorado con graves más profundos, conectividad Wi-Fi/Bluetooth.'
    }
  ],

  beneficios: [
    { icono: 'chat',  color: 'lila',   titulo: 'Trato personalizado', texto: 'Te asesoramos desde la consulta hasta la entrega. Respuesta rápida por WhatsApp.' },
    { icono: 'truck', color: 'cielo',  titulo: 'Envíos a todo el país', texto: 'Mandamos a cualquier provincia de Argentina. Coordinamos el envío por WhatsApp.' },
    { icono: 'map',   color: 'menta',  titulo: 'Somos de GBA Oeste', texto: 'Ituzaingó, Buenos Aires. Un emprendimiento familiar con raíces reales.' },
    { icono: 'card',  color: 'durazno', titulo: 'Medios de pago', texto: 'Efectivo, billetera virtual y criptomoneda. Sin tarjetas de crédito ni débito.' },
    { icono: 'box',   color: 'manteca', titulo: 'Precios por mayor', texto: 'Escala de precios publicada: cuanto más llevás, menos pagás por unidad.' },
    { icono: 'spark', color: 'rosa',    titulo: 'Promos 2x', texto: 'Varios productos bajan de precio llevando dos unidades. Se aplica solo en el carrito.' }
  ],

  novedades: [
    {
      etiqueta: 'Nuevo', fecha: 'Agosto 2026', color: 'menta',
      titulo: 'Lista mayorista publicada',
      texto: 'Ya podés ver la escala de precios por cantidad de cada producto directamente en la web. El precio se aplica solo en el carrito según las unidades que lleves.',
      pie: 'Mirala en la sección Por Mayor.'
    },
    {
      etiqueta: 'Nuevo', fecha: 'Agosto 2026', color: 'lila',
      titulo: 'Sumamos el Battery Pack',
      texto: 'Carga portátil compacta y liviana, ideal para viajes, laburo o clases. Margen alto y rotación rápida para quienes revenden.',
      pie: 'Disponible a pedido.'
    },
    {
      etiqueta: 'Promo', fecha: 'Julio 2026', color: 'durazno',
      titulo: '2x AirPods Pro 2 a $20.000 c/u',
      texto: 'Llevate 2 AirPods Pro 2 a $20.000 cada uno. Precio exclusivo al llevar los dos juntos.',
      pie: 'Disponible en la sección Productos.'
    }
  ],

  preguntas: [
    { q: '¿Los productos son originales?',
      a: 'No. Todos nuestros productos son réplicas de alta calidad y no tienen garantía de fábrica. Lo aclaramos siempre antes de vender, así comprás sabiendo exactamente lo que llevás.' },
    { q: '¿Hacen cambios o devoluciones?',
      a: 'No realizamos cambios ni devoluciones. Por eso te respondemos todas las dudas antes de la compra: preguntanos lo que necesites por WhatsApp y te mostramos fotos o videos reales del producto.' },
    { q: '¿Puedo pedir cualquier cantidad?',
      a: 'Sí. Trabajamos a pedido, así que podés cargar en el carrito las unidades que quieras, sin mínimo ni máximo. Al confirmar te avisamos por WhatsApp la disponibilidad y el plazo de entrega de esa cantidad.' },
    { q: '¿Cómo funciona el precio por mayor?',
      a: 'Cada producto tiene una escala publicada: desde cierta cantidad, el precio por unidad baja. No hay que pedir código ni cotización: agregás las unidades al carrito y el precio se ajusta solo.' },
    { q: '¿Puedo combinar productos distintos para el precio mayorista?',
      a: 'La escala se aplica por producto, según las unidades de ese producto. Si armás un pedido grande mezclando artículos, escribinos por WhatsApp y te armamos una cotización a medida.' },
    { q: '¿Cómo compro?',
      a: 'Agregás los productos al carrito, tocás "Confirmar por WhatsApp" y se abre el chat con tu pedido ya escrito. Ahí coordinamos el pago y el envío.' },
    { q: '¿Qué medios de pago aceptan?',
      a: 'Efectivo, billetera virtual y criptomoneda. No aceptamos tarjetas de crédito ni débito.' },
    { q: '¿Hacen envíos a todo el país?',
      a: 'Sí, enviamos a cualquier provincia de Argentina. El costo del envío lo coordinamos por WhatsApp según tu dirección. Si sos de la zona de Ituzaingó también podés retirar en persona.' }
  ]
};
