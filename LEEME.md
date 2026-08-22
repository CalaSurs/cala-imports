# Cala Imports

Tienda online estática, sin dependencias: se abre haciendo doble clic en `index.html`.
Los productos, precios, promos e info salen de calaimports.shop.

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Inicio: hero animado, productos, beneficios, cómo comprar, por mayor y preguntas |
| `productos.html` | Catálogo con filtros por categoría, buscador y orden |
| `pormayor.html` | Compras en cantidad: beneficios y proceso |
| `novedades.html` | Promos, productos nuevos y estado de stock |
| `contacto.html` | Canales de contacto y formulario que abre WhatsApp |
| `carrito.html` | Carrito completo con resumen |
| `checkout.html` | Datos → arma el pedido y lo abre en WhatsApp |
| `privacidad.html` / `terminos.html` | Textos legales (réplicas, sin garantía, sin cambios) |

## Lo que vas a querer cambiar

### 1. Datos del negocio
En `assets/js/config.js`:

```js
whatsapp: '5491155135537',  // formato internacional, solo números
instagram: 'https://www.instagram.com/cala.imports/',
ubicacion: 'Ituzaingó, Buenos Aires',
pagos: ['Efectivo', 'Billetera virtual', 'Criptomoneda'],
aviso: 'Réplicas · Sin garantía de fábrica · Sin cambios ni devoluciones',
minimoPromo: 2,             // unidades para que se active la promo 2x
compraMinima: 50000,        // no se puede confirmar un pedido por debajo de esto
envioGratisDesde: 200000    // a partir de acá el envío es gratis
```

El `aviso` aparece automáticamente en el inicio, el catálogo, el carrito, el checkout y los términos.
Lo mismo pasa con `compraMinima` y `envioGratisDesde`: se leen solos en la marquesina, el
carrito, el checkout y las preguntas frecuentes — cambiás el número acá una sola vez.

Mientras el pedido no llega al mínimo, el botón de "Finalizar pedido" queda deshabilitado
en el carrito lateral, en `carrito.html` y en `checkout.html`, con un aviso de cuánto falta.

### 2. Productos y escala de precios
Todo el catálogo está en `assets/js/data.js`:

```js
{
  id: 'jbl-go-4-pro', nombre: 'JBL Go 4 Pro', categoria: 'jbl',
  precio: 20000,        // 1 unidad (minorista)
  precio2: 17500,       // por unidad llevando 2
  stock: 4, destacado: true,
  mayor: [              // escala mayorista: desde X unidades, cada una sale Y
    { min: 5, precio: 17000 }, { min: 10, precio: 16000 },
    { min: 20, precio: 15000 }, { min: 50, precio: 14000 }
  ],
  img: 'assets/img/productos/jbl-go-4.png',
  desc: 'Descripción corta que se ve en la tarjeta.',
  detalle: 'Texto extra que aparece solo en la ficha del producto.'
}
```

- `mayor`: la escala se aplica **sola** en el carrito según las unidades. No hace falta código ni cotización.
- `precio2`: precio por unidad al llevar 2. Poné `0` si el producto no tiene promo.
- **No hay control de stock**: se puede pedir cualquier cantidad de cada producto, sin máximo. La disponibilidad la confirmás vos por WhatsApp. (El pedido mínimo de `compraMinima` es sobre el total del carrito, no por producto.)
- `nota`: texto opcional bajo el precio (ej: "Indicá modelo y color").
- `categoria`: tiene que coincidir con un `id` de la lista `categorias` (apple, jbl, otros).

> 📄 Los costos de proveedor y el margen de cada tramo están en `PRIVADO-costos-y-margenes.md`.
> **Ese archivo no va al hosting**: borralo antes de subir la carpeta.

En el mismo archivo están las **categorías**, los **beneficios** del inicio, las **novedades** y las **preguntas frecuentes**.

### 3. Imágenes
Están en `assets/img/productos/` (las mismas que usa calaimports.shop, ya descargadas).
Para cambiar una, copiá tu archivo ahí y actualizá el `img:` del producto. Lo ideal: fondo transparente o claro, cuadrada.

## Cómo funciona el pedido

No hay pagos online. El checkout pide solo cuatro cosas:

1. Nombre y apellido
2. Dirección (todo en un renglón)
3. Método de pago: Efectivo · Billetera · Cripto
4. Opcionales: cómo nos conoció y una calificación del sitio con estrellas

Al confirmar se abre WhatsApp con el pedido completo escrito: productos, cantidades,
precios aplicados (promo 2x o por mayor), total, cómo te conoció y las estrellas.
Los pedidos que superan `envioGratisDesde` van con envío gratis; por debajo, el costo
se coordina en el chat. El pedido mínimo (`compraMinima`) se valida antes de dejar
confirmar: si no se llega, el botón queda desactivado con el monto que falta.

## Logo

- `assets/img/logo-oscuro.png` → header (fondo claro)
- `assets/img/logo-transparente.png` → footer (fondo oscuro)
- `assets/img/favicon.png` → pestaña del navegador y ícono al guardar en el celular

Si cambiás el logo, reemplazá esos tres archivos manteniendo los nombres.

## Colores

Definidos arriba de `assets/css/style.css`:
- Base clara `#F6F5F2` + blanco
- Acento violeta `--brand: #6A4CF0`
- Verde WhatsApp `--wa: #25D366`
- Tintes suaves para íconos y etiquetas: lila, cielo, menta, durazno, manteca y rosa

## Subirlo a internet

Son archivos estáticos: funciona en GitHub Pages, Netlify, Vercel o cualquier hosting.
Subís la carpeta entera tal cual está.
