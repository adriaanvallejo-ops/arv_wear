# ARV Wear — Guía de lanzamiento en EE. UU. (tema de desarrollo)

Este documento acompaña a los cambios del tema. El código prepara la experiencia de EE. UU. (inglés americano + USD) y mantiene la de España en español. Lo que depende de Shopify Admin, de Markets o de una app **no se ha simulado en el código**: está en esta lista.

> Estado de la tienda cuando se hizo el trabajo (consultado en modo solo lectura):
> - Idioma: solo español (principal, publicado). El inglés **no está añadido**.
> - Markets: solo "España" (EUR). **No existe un mercado de EE. UU.**
> - Envío a EE. UU.: zona "Internacional", tarifa "Estándar" a 0 € (gratis).
> - Descuentos automáticos: "2 + 1 GRATIS" (≥3 uds, −34,90 € fijos) y "3 + 2 GRATIS" (≥5 uds, −69,80 € fijos), sin fecha de fin.
> - Reseñas: 25 en Judge.me (media 4,72), importadas de AliExpress con "Judge.me Importer".

---

## 1. Shopify Admin — configuración obligatoria

### 1.1 Idioma inglés
1. **Settings → Languages → Add language → English**. Publícalo cuando las traducciones estén listas.
2. Mantén **Spanish** como idioma por defecto de España.

### 1.2 Mercado de Estados Unidos
1. **Settings → Markets → Add market → "United States"** (país: United States).
2. En el mercado US:
   - **Currency:** USD. Recomendado: *Manage → Products and pricing* → precios fijos en USD (no solo por tipo de cambio), para que 1 unidad tenga un precio redondo y los packs se calculen exactos.
   - **Languages:** English como idioma por defecto del mercado US.
   - **Domain:** subcarpeta (p. ej. `arvwear.com/en-us`) o el dominio que prefieras.
3. En el mercado España: moneda EUR, idioma por defecto español.

### 1.3 Descuentos de los packs (IMPORTANTE)
El tema muestra el precio de cada pack como **(cantidad − unidades gratis) × precio unitario** en la moneda del visitante. Hoy los descuentos son **importes fijos en EUR**: en USD, Shopify los convierte con el tipo de cambio y **el precio del carrito no coincidiría con el mostrado**.

**Discounts → Create discount → Buy X get Y** (automático), sustituyendo a los dos actuales:

| Descuento | Customer buys | Customer gets | Otros ajustes |
|---|---|---|---|
| Buy 2 Get 1 Free | Minimum quantity **2** — Products: ARV CoreTech® | Quantity **1** — ARV CoreTech® — **Free** | Maximum uses per order: 1 |
| Buy 3 Get 2 Free | Minimum quantity **3** — ARV CoreTech® | Quantity **2** — ARV CoreTech® — **Free** | Maximum uses per order: 1 |

- Con los dos activos, Shopify aplica el mejor para el cliente (3 uds → 1 gratis, 5 uds → 2 gratis).
- **Títulos:** el nombre del descuento aparece en el carrito y en el checkout, y no se traduce solo. Usa títulos neutros (p. ej. "Buy 2 Get 1 Free · 2+1 gratis").
- Si la oferta tiene fin, pon la **misma fecha de fin** aquí y en *Theme settings → ARV Wear — Offer & shipping*.
- Comprueba en el checkout (ES y US) que 3 y 5 unidades dan exactamente el total mostrado en la ficha.

### 1.4 Envío a EE. UU.
- **Settings → Shipping and delivery:** EE. UU. tiene hoy envío "Estándar" gratis. El tema muestra "Free standard shipping" mientras *Theme settings → ARV Wear → Standard shipping is free* esté activado. **Desactívalo si cambias la tarifa.**
- Traduce el nombre del método "Estándar" → "Standard" (Translate & Adapt → Shipping).
- Cuando tengas el plazo real a EE. UU., escríbelo en inglés en *Theme settings → ARV Wear → Shipping note for the United States*. Hoy está vacío a propósito.

### 1.5 Impuestos, pagos y checkout
- **Settings → Taxes and duties → United States:** revisa con tu asesor la recaudación del sales tax.
- **Settings → Payments:** Shopify Payments con USD; activa Shop Pay, Apple Pay y Google Pay (salen como pago exprés en el checkout).
- **Settings → Checkout:** el checkout en inglés sale del idioma English. En el tema se han corregido dos textos engañosos del checkout en inglés (ver informe).

### 1.6 Producto ARV CoreTech® (Products → ARV CoreTech®)
- [ ] **Vendor:** "Mi tienda" → **ARV Wear**.
- [ ] **Description:** está vacía. Pega la versión en español (abajo) y añade la inglesa en Translate & Adapt.
- [ ] **SEO (Search engine listing):** título y meta descripción (abajo).
- [ ] **Media:**
  - la primera imagen es una imagen generada con IA (Gemini): pon primero una foto real del producto;
  - hay **6 imágenes duplicadas** (las 6 de variante subidas dos veces, con sufijo `_xxxxxxxx`): elimina los duplicados;
  - añade texto alternativo (alt) a todas.
- [ ] **Opción de talla:** renombra el valor `XXXL` → `3XL` (el tema ya lo *muestra* como 3XL). Comprueba antes en DSers que el mapeo de variantes no se rompe.
- [ ] **Compare-at price** (49,90 € tachado frente a 34,90 €): en EE. UU. un precio "antes" que no ha sido real es publicidad engañosa. Quítalo o asegúrate de que fue un precio de venta real. El tema ya **no** lo usa en el selector de packs (el ahorro se calcula contra el precio normal), pero la ficha y el carrito sí lo muestran.
- [ ] **Inventario:** el stock es de dropshipping, con "seguir vendiendo" y cantidades negativas. No lo uses para mensajes de stock (el aviso de "pocas unidades" se ha quitado del tema).

### 1.7 Políticas
- La **política de reembolso** dice "no podemos aceptar devoluciones de artículos en oferta". Los packs son una oferta y la web promete "30-day return window". **Revísalo con tu asesor y alinéalo.**
- Crea versiones en inglés de las 6 políticas (Translate & Adapt → Policies) y revísalas legalmente.

### 1.8 Tema publicado (no se ha tocado)
- El tema **publicado** ("copia-de-shrine-pro-v1-0-4") y los otros temas Shrine siguen cargando `https://shopify.jsdeliver.cloud/...`. Este repositorio lo elimina **solo** en el tema de desarrollo. Hasta publicar el tema limpio, el script sigue activo en la tienda en vivo.
- **Licencia:** el tema lleva una licencia de Shrine de otras tiendas, caducada. Consigue una licencia oficial (shrinetheme.com) o migra a un tema oficial. Consecuencias técnicas actuales:
  - el código de licencia desactiva el refresco del carrito al cambiar cantidades o eliminar artículos (fecha interna 2023-11-28), por lo que la ficha sigue yendo **directa al checkout**;
  - `shrine.null.js` llama en cada visita a `dashboard.shrinetheme.com` y `whatsmycountry.com`, que pueden reemplazar el contenido de la página.

---

## 2. Translate & Adapt — qué traducir (Español → English)

**Apps → Translate & Adapt → English**:

| Área en Translate & Adapt | Qué traducir |
|---|---|
| **Products → ARV CoreTech®** | Title (sin cambios), Description (texto EN abajo), SEO title/description, **Option names:** Color → Color, Talla → Size. **Option values:** Negro azul → Black/Blue · Blanco azul → White/Blue · Gris azul → Gray/Blue · Negro → Black · Blanco → White · Gris → Gray · XXXL → 3XL |
| **Navigation → Menú principal** | Inicio → Home · ARV CoreTech® → ARV CoreTech® · ¿Dónde está mi pedido? → Track My Order · Contacto → Contact |
| **Navigation → Menú de pie de página** | Términos y Servicios → Terms of Service · Política de Envío → Shipping Policy · Política de Reembolso → Refund Policy · Política de Privacidad → Privacy Policy · Aviso Legal → Legal Notice · Información de Contacto → Contact Information |
| **Online Store → Theme → Section groups** | Footer: "Políticas de Arv Wear®" → "ARV Wear Policies". Header: "Menú" → "Menu" |
| **Online Store → Theme → Templates** | Contacto: "¡Ey! Escríbenos tu duda" → "Questions? Send us a message". Cart / 404 / Search / Collection / Page / Blog / Article / List collections / Password: "Suscríbete a nuestros emails" → "Subscribe to our emails"; "Únete a nuestra lista de correo…" → "Join our email list for exclusive offers and the latest news."; "También te puede gustar" → "You may also like"; "Suscribirme" → "Sign up"; "Descubre más de nuestros favoritos" → "Discover more of our favorites"; "Colecciones" → "Collections"; "Compartir" → "Share"; "Próximamente" → "Opening soon"; "Sé el primero en enterarte del lanzamiento." → "Be the first to know when we launch." |
| **Online Store → Theme → Templates → product / index** | Nada que traducir en los textos ARV: salen de los archivos de idioma. Las reseñas de "ARV photo reviews" ya llevan su traducción al inglés en cada bloque |
| **Shipping** | Método "Estándar" → "Standard" |
| **Policies** | Las 6 políticas |
| **Pages** | "Contacto" (título) → "Contact" |

**No hace falta traducir** (ya están en inglés en `locales/en.default.json` y en español en `locales/es.json`): barra de promoción, hero, beneficios, packs, guía de tallas, detalles, cuidados, envío, devoluciones, FAQ, CTA, textos del carrito lateral y botón "Buy Now". Se pueden editar en *Online Store → Themes → … → Edit default theme content → "arv"*.

### Apps
- **Judge.me:** *Judge.me → Settings → Widget/Language*: activa los textos del widget en inglés para el idioma English (hoy se ve "25 reseñas"). Si tu plan lo incluye, activa la traducción de reseñas; si no, el widget completo mostrará los textos originales en español (la sección "ARV photo reviews" ya los muestra traducidos).
- **Shopify Inbox:** mensaje de bienvenida en inglés.
- **Track123:** textos de la página de seguimiento en inglés.

---

## 3. Descripción del producto (lista para pegar)

### English (Translate & Adapt → Products → ARV CoreTech® → Description)
```html
<p><strong>ARV CoreTech® Compression Undershirt</strong></p>
<p>A discreet compression undershirt designed for men who want a cleaner fit under their clothes. The snug, stretchy fit stays low-profile under T-shirts, button-downs and sweaters for a smoother, more streamlined look.</p>
<ul>
  <li>Discreet compression with a fitted feel</li>
  <li>Designed for a smoother look under everyday clothing</li>
  <li>Made to be worn as an everyday base layer</li>
  <li>Material: 92% polyester, 8% spandex</li>
  <li>Sizes S–5XL — see the size guide for garment measurements in inches and centimeters</li>
</ul>
<p><strong>Care:</strong> Place the garment in water below 30 °C (86 °F), add detergent and let it soak for 30 minutes.</p>
```

### Español (Products → ARV CoreTech® → Description)
```html
<p><strong>Camiseta interior de compresión ARV CoreTech®</strong></p>
<p>Una camiseta interior de compresión discreta, diseñada para hombres que buscan un fit más limpio bajo la ropa. Su ajuste ceñido y elástico no se nota bajo camisetas, camisas o jerséis y ayuda a conseguir un aspecto más liso y estilizado.</p>
<ul>
  <li>Compresión discreta con ajuste ceñido</li>
  <li>Diseñada para un aspecto más liso bajo la ropa de diario</li>
  <li>Pensada para llevarse como capa base en el día a día</li>
  <li>Material: 92 % poliéster, 8 % elastano</li>
  <li>Tallas S–5XL: consulta la guía de tallas con las medidas de la prenda en centímetros y pulgadas</li>
</ul>
<p><strong>Cuidados:</strong> pon la prenda en agua a menos de 30 °C, añade detergente y déjala en remojo durante 30 minutos.</p>
```

### SEO
| | English | Español |
|---|---|---|
| Title | ARV CoreTech® Compression Undershirt for Men \| ARV Wear | Camiseta de compresión ARV CoreTech® para hombre \| ARV Wear |
| Meta description | Discreet compression undershirt for a smoother, more streamlined look under everyday clothes. 92% polyester, 8% spandex. Sizes S–5XL. | Camiseta interior de compresión discreta para un aspecto más liso bajo la ropa. 92 % poliéster, 8 % elastano. Tallas S–5XL. |

### Alt text sugerido (imágenes de variante)
Black/Blue: "ARV CoreTech® compression undershirt in black and blue" · White/Blue: "… in white and blue" · Gray/Blue: "… in gray and blue" · Black: "… in black" · White: "… in white" · Gray: "… in gray".

---

## 4. Reseñas

- **Origen:** Judge.me (metacampos `judgeme.*` y `reviews.rating` / `reviews.rating_count`). Las 25 reseñas tienen la marca de Judge.me `review_collected_from_another_provider` y fotos alojadas en `aliexpress-media.com`: se importaron de AliExpress. Son valoraciones de compradores de esta prenda en AliExpress, **no de clientes de arvwear.com**.
- **En el tema:** la sección "ARV photo reviews" reproduce 23 reseñas con contenido, con autor, estrellas, texto original y 22 fotos, más una traducción fiel al inglés. En España se ve el texto original. Se muestra siempre un aviso de transparencia sobre el origen.
- **No se incluyeron:** "Lucas" y "Jaime", porque su texto es solo "ARV CoreTech®" (relleno del importador) y no tienen fotos. Siguen en el widget de Judge.me.
- **Nombres anonimizados como "AliExpress buyer / Comprador de AliExpress":** "Alfonzo Dibbert", "Nilsa Beier" y "Vicente Stehr". Tienen apellidos típicos de generadores de nombres falsos; posiblemente los asignó el importador. Si confirmas que son los nombres reales, escríbelos en el campo "Author" del bloque.
- **Fotos:** se enlazan desde el CDN de AliExpress (las mismas URLs que usa Judge.me). Para no depender de AliExpress, súbelas a *Content → Files* y cambia las URLs en cada bloque.
