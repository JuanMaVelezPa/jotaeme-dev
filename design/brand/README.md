# jotaeme.dev — Brand kit v1.0

Paquete de marca de **Juan Manuel Vélez Parra**. Todo lo necesario para el portafolio, los subdominios, LinkedIn y el correo.

```
design/brand/
├── logo/          Logo jm| en SVG (letras en trazos) + PNG @2x/@4x, y lockups horizontales
├── icons/         Íconos de app A2 (oscuro) y A6 (ámbar) en SVG + PNG 192/512/1024 + maskable
├── favicon/       Todo lo que va en la raíz de jotaeme.dev (favicon.ico, .svg, apple-touch, manifest)
├── subdomains/    apps · free · lab — mismo kit de favicon/íconos/logo con su color
├── og/            Imágenes para compartir 1200×630 (portafolio + 3 subdominios)
├── social/        Banner de LinkedIn 1584×396 (+ @2x)
├── loader/        loader.css + loader.html (demo con el código listo para pegar) + preview
├── tokens/        tokens.css — colores, tipografía, radios y tiempos como variables CSS
├── email/         firma-gmail.html — instrucciones adentro
├── fonts/         JetBrains Mono + Inter Tight (licencia OFL, uso libre)
└── guidelines/    guia-de-marca.pdf + brand-kit.pdf/.png
```

---

## 1. Favicon y metadatos — jotaeme.dev

Sube **todo el contenido de `favicon/`** a la raíz del sitio, y `og/og-portfolio.png` como `/og.png`.
Luego, en el `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0A0B0D">

<meta property="og:type" content="website">
<meta property="og:url" content="https://jotaeme.dev/">
<meta property="og:title" content="Juan Manuel Vélez Parra — Java Backend Engineer">
<meta property="og:description" content="Java backend engineer building critical, high-volume systems for Colombia's financial sector.">
<meta property="og:image" content="https://jotaeme.dev/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

> `favicon-16.svg` es solo la fuente del PNG de 16 px; no hace falta subirlo.

## 2. Subdominios — apps · free · lab

Para cada uno, sube el contenido de `subdomains/<nombre>/` a la raíz de ese sitio y `og/og-<nombre>.png` como `/og.png`.
Usa el mismo bloque de `<head>` cambiando `og:url`, `og:title` y `og:description`:

| Sitio | Color | og:title |
|---|---|---|
| apps.jotaeme.dev | `#8AB4F8` | jm\|apps — Products |
| free.jotaeme.dev | `#7AD1A0` | jm\|free — Open apps |
| lab.jotaeme.dev | `#B9A3FF` | jm\|lab — Lab |

Y en el CSS de ese sitio: `:root { --jm-accent: var(--jm-apps); }` (o `--jm-free` / `--jm-lab`).

## 3. Fuentes

Opción rápida (Google Fonts):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;800&display=swap">
```

Opción sin dependencias externas: usa los `.ttf` de `fonts/` con `@font-face` (idealmente conviértelos a `.woff2`).

## 4. Tokens

Importa `tokens/tokens.css` una vez y usa las variables (`var(--jm-accent)`, `var(--jm-font-mono)`…).
Así un cambio de color se hace en un solo lugar.

## 5. Loader

1. Enlaza `loader/loader.css`.
2. Copia el bloque `<div class="jm-loader">…</div>` justo después de `<body>`.
3. Copia el `<script>` antes de `</body>` (oculta el loader al cargar, mínimo 900 ms).

Abre `loader/loader.html` en el navegador para verlo funcionando. En subdominios cambia `--jm-accent`.

## 6. LinkedIn

Perfil → ícono de lápiz del banner → sube `social/linkedin-banner.png`.
Usa `icons/png/icon-amber-512.png` o `icon-dark-512.png` si quieres el logo como foto de una página o proyecto.

## 7. Gmail

Abre `email/firma-gmail.html` en el navegador y sigue las instrucciones de la parte superior.

## 8. Reglas rápidas (detalle en `guidelines/guia-de-marca.pdf`)

- El logo siempre en minúscula, JetBrains Mono 800, con el cursor. Nunca estirado, rotado, con sombra ni en otra fuente.
- Mínimo 24 px de alto; por debajo de 20 px usa el favicon "j|".
- Ámbar `#E8A55B` solo en cursor, CTAs, etiquetas y un dato clave. Sobre fondo claro usa `#9E5414`.
- Cada subdominio usa su color solo dentro de su sitio. Un color de acento por pantalla.
