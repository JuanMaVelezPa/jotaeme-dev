# jotaeme.dev — sitio listo para desplegar

Todo lo que se publica está en `public/`. Es HTML/CSS/JS estático: no necesita build ni dependencias.

```
public/
├── index.html            ← el home (diseño del lienzo, ya convertido)
├── assets/loader.css     ← pantalla de carga jm|
├── favicon.ico / favicon.svg / apple-touch-icon.png
├── android-chrome-192.png / android-chrome-512.png / site.webmanifest
└── og.png                ← imagen para compartir (LinkedIn, WhatsApp, Slack)
```

## Antes de subir: 2 cosas que vienen de tu sitio actual

1. **CVs** — el home enlaza a `/cv/JuanManuel_Velez_CV_EN.pdf` y `/cv/JuanManuel_Velez_CV_ES.pdf`.
   Copia tus PDFs actuales a `public/cv/` con esos nombres.
2. **Versión en español** — el botón EN / ES apunta a `/es/`. Deja tu página en español actual en `public/es/`
   hasta que hagamos la nueva, o quita ese botón.

## Probarlo en tu computador

```bash
cd public
python3 -m http.server 8080
# abre http://localhost:8080
```

## Desplegar (elige uno)

- **Donde está hoy jotaeme.dev:** reemplaza los archivos actuales por el contenido de `public/`.
- **Vercel / Netlify / Cloudflare Pages:** crea un proyecto nuevo, sube la carpeta `public/`
  (o conecta el repo con "output directory" = `public`) y apunta tu dominio.
- **GitHub Pages:** sube el contenido de `public/` a la rama `gh-pages` y configura el dominio personalizado.

## Después de desplegar

- Comprueba la imagen para compartir en https://www.linkedin.com/post-inspector/ (pega tu URL).
- Si cambias `og.png` más adelante, LinkedIn la guarda en caché: usa el mismo inspector para refrescarla.

## Notas

- Fuentes: se cargan de Google Fonts (Inter Tight + JetBrains Mono).
- Animaciones: respetan `prefers-reduced-motion`. El globo 3D se inclina con el mouse solo en escritorio.
- El brand kit completo (logos, subdominios, guía) está en `jotaeme-brand.zip`.
