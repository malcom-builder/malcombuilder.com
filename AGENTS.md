# AGENTS.md — malcom.builder / portfolio

> Contexto local del proyecto. El global está en ~/.agents/GLOBAL.md.
> No repetir lo que ya está allá. Solo lo específico de este proyecto.

---

## Proyecto

- **Qué es:** Portfolio web de malcom.builder
- **URL destino:** malcombuilder.com
- **Stack:** Next.js 15 · React 19 · Tailwind CSS v4 · TypeScript · Framer Motion 11 · next-themes · next-intl · Vercel
- **Estado:** En construcción — build pasa, SEO listo, proyectos individuales con métricas reales

---

## Objetivo del sitio

Convertir visitas en clientes. No es un portfolio de diseñador —
es la vitrina de un studio técnico. Comunicar en 5 segundos:
quién soy, qué construyo, por qué contratarme a mí y no a una agencia.

---

## Stack exacto

| Package         | Versión | Nota                                                  |
| --------------- | ------- | ----------------------------------------------------- |
| `next`          | 15.x    | App Router + RSC                                      |
| `react`         | 19.x    |                                                       |
| `tailwindcss`   | 4.x     | Config via `@theme {}` en CSS — NO tailwind.config.ts |
| `framer-motion` | 11.x    | v11, no v12 — evita conflictos con React 19           |
| `next-themes`   | ^0.4    | Dark/Light                                            |
| `next-intl`     | ^3.x    | i18n ES/EN                                            |
| `lucide-react`  | latest  | Iconos                                                |

---

## Design tokens (globals.css)

```css
@theme {
  --color-bg: #0e0e14; /* Void */
  --color-surface: #18181f; /* Surface */
  --color-fg: #f0eff8; /* Chalk */
  --color-muted: #888896; /* Mist */
  --color-accent: #7b61ff; /* Indigo — token global de marca */
  --color-accent-hover: #6246ff;
  --color-emerald: #10b981; /* Emerald — detalles tech/AI */
  --color-emerald-hover: #0d9668;
  --color-border: #242428;
}

.light {
  --color-bg:           #e8e7f2; /* Chalk oscurecido */
  --color-surface:      #f0eff8; /* Chalk original como surface */
  --color-fg:           #0e0e14; /* Void como texto */
  --color-accent:       #7b61ff; /* Indigo — mismo token */
  --color-accent-hover: #6246ff;
  --color-muted:        #6b6a7a; /* Mist más oscuro para contraste */
  --color-border:       #cccbd8;
  --color-card:         #f0eff8;
  --color-glass-bg:     rgba(232, 231, 242, 0.6);
  --color-emerald:      #0d9668;
  --color-emerald-hover: #10b981;
}
```

---

## Estructura de archivos

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── globals.css
├── components/
│   ├── providers/ThemeProvider.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Method.tsx
│   │   └── About.tsx
│   └── ui/
│       ├── FadeIn.tsx
│       ├── Marquee.tsx
│       ├── ThemeToggle.tsx
│       └── LangToggle.tsx
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── lib/
│   └── constants.ts
└── middleware.ts
messages/
├── es.json
└── en.json
```

---

## Secciones

### Navbar

- 100% opaco — `background: var(--color-bg)` (sin blur, decisión de desarrollo)
- `box-shadow` + `border-bottom` al scrollear para separarse del fondo
- Logo: `malcom.builder` en monospace a la izquierda
- Links: Services / Projects / Method / About (siempre en inglés)
- Derecha: LangToggle (ES/EN) + ThemeToggle
- CTA: `Construyamos` — ancho fijo `width: 130px` para evitar saltos de layout ES/EN
- Botones de ícono con `transform: scale(0.9)` en `:active`

### Hero

- Headline: `Construyo productos digitales. Solo.` / `I build digital products. Solo.`
- Subheadline ES: _Más rápido que una agencia. Más criterio que un freelancer._
- Subheadline EN: _Faster than an agency. Sharper than a freelancer._
- CTA: `Ver proyectos` (primario)
- `marginTop: "-10vh"` en el contenedor para que el CTA quede above the fold
- Entrada staggered con Framer Motion

### Services — grid 2×2

Basado en el framework ASÍ CONSTRUYO de CLAUDE.md:

1. **Strategy** — Tesis · posicionamiento · modelo de negocio
2. **Architecture** — Identidad · sistema visual · marca completa
3. **Product** — Web · e-commerce · plataforma · app
4. **Growth** — Contenido AI · pauta · automatizaciones

### Projects — lista numerada

Datos en `lib/constants.ts`:

```ts
{ id: '01', category: 'Portal Médico',     title: 'Zolfo Medicina Estética', metric: '100 Lighthouse', url: 'https://zolfoestetica.com.ar' },
{ id: '02', category: 'Web Institucional', title: 'NurEstética',             metric: 'Real Score 100', url: 'https://nurestetica.com.ar' },
{ id: '03', category: 'IAM System',        title: 'AuthMotion',              metric: 'Open Source',    url: 'https://github.com/malcom-builder/AuthMotion' },
{ id: '04', category: 'Fintech',           title: 'SmartWallet',             metric: 'Double-Entry',   url: 'https://github.com/malcom-builder/SmartWallet' },
{ id: '05', category: 'Portfolio',          title: 'malcombuilder.com',       metric: 'AI-native',      url: 'https://malcombuilder.com' },
{ id: '06', category: 'Monitoring',         title: 'Pulse',                   metric: '24/7 Uptime',    url: 'https://pulse.malcombuilder.com' },
```

### Stack — grid de logos

Next.js · React · TypeScript · C# · .NET · Docker · SQL Server · Azure · Vercel · Tailwind · Framer Motion · Supabase · GitHub
Hover: grayscale → color (acento indigo)

### About — La tesis + profile

**Texto ES:** _Construyo sistemas solo. Desde el modelo de negocio hasta el código. Desde la marca hasta cada pieza de contenido. Sin inventario. Una persona. Full-stack. Con criterio._
**Texto EN:** _I build systems alone. From the business model to the code. From the brand to every piece of content. No inventory. One person. Full-stack. With conviction._

Dos columnas: foto (4:5, glow índigo) + filas de datos (QUIEN / QUÉ HACE / CÓMO).

### CTA final

- Marquee: `LET'S TALK — LET'S COLLABORATE — SAY HELLO — WANNA BE STARTING SOMETHING?`
- Hover del marquee: color emerald `#10B981`
- Botón ES: `Hablemos` / EN: `Let's Build`
- Email: contact@malcombuilder.com

### Footer — estilo monzalab

- Col izq: `© 2026 malcom.builder`
- Col der: Instagram + LinkedIn
- Barra inferior: `Rosario, Argentina · Next.js & AI`

---

## Animaciones

- Scroll fade-in: `opacity 0→1`, `y 40→0`, `duration 0.7s`, `once: true`
- Stagger: `0.1s` por ítem en grids
- Marquee: CSS `@keyframes`, `20s linear infinite`
- Hover cards: `scale(1.02)`, `border-color: var(--accent)`, `transition: 0.2s`
- Espaciado entre secciones: `10rem` mobile / `16rem` desktop (whitespace intencional)
- Títulos de sección: clase `.heading` para cohesión tipográfica

---

## Tipografía

- UI / Headings: IBM Plex Sans 400 / 500 / 600 / 700
- Código / Accents: JetBrains Mono 400 / 600
- Headline size: `clamp(2.5rem, 8vw, 7rem)`
- Letter-spacing: `-0.02em` en headings

---

## SEO

```ts
// robots.ts
rules: { userAgent: '*', allow: '/' }
sitemap: 'https://malcombuilder.com/sitemap.xml'

// sitemap.ts
{ url: 'https://malcombuilder.com/es', lastModified: new Date() }
{ url: 'https://malcombuilder.com/en', lastModified: new Date() }

// metadata
title: 'malcom.builder — AI-native system builder'
```

---

## Orden de ejecución

```
1. Setup
   └── Instalar dependencias del stack
   └── Configurar next-intl: routing.ts, middleware.ts, request.ts
   └── Crear globals.css con @theme {} y tokens
   └── Configurar ThemeProvider

2. Estructura base
   └── app/[locale]/layout.tsx con fuentes + metadata
   └── app/[locale]/page.tsx ensamblando secciones
   └── messages/es.json + en.json con todas las keys

3. Componentes UI
   └── FadeIn.tsx · Marquee.tsx · ThemeToggle.tsx · LangToggle.tsx

4. Layout
   └── Navbar.tsx · Footer.tsx

5. Secciones (orden)
   └── Hero → Services → Projects → Stack → About → CTA

6. Data
   └── lib/constants.ts con todos los arrays tipados

7. SEO
   └── robots.ts · sitemap.ts · generateMetadata

8. ## Checklist post-build

- [ ] `pnpm run build` sin errores TypeScript ni ESLint
- [ ] `localhost:3000` redirige a `/es`
- [ ] Toggle dark/light funciona correctamente
- [ ] Toggle ES/EN cambia todos los strings
- [ ] Marquee corre infinitamente sin saltos
- [ ] Todos los textos en i18n cubiertos (sin hardcodeo)
- [ ] Responsive: 375px / 768px / 1280px
- [ ] Lighthouse 95+ en todas las categorías
- [ ] robots.txt y sitemap.xml accesibles

---

## Decisiones del proyecto

> Esta sección la actualiza el agente con /update-memory al final de cada sesión.
> No editar manualmente salvo corrección.

### Decisiones UI/UX tomadas durante desarrollo

- **Navbar blur:** Abandonado — problemas de renderizado. Navbar 100% opaco con `box-shadow` + `border-bottom` al scroll.
- **Microinteracciones:** ThemeToggle y LangToggle ahora son ghost buttons (sin fondo, sin borde) — solo el ícono visible. Color muted en reposo → fg al hover.
- **Hero layout:** `marginTop: "-10vh"` para que el CTA quede above the fold sin scroll.
- **Copywriting ES:** Traducciones naturales, no literales. "Solo" se mantiene igual en ambos idiomas — es firma de marca.
- **Color accent:** `#7B61FF` (Indigo) + hover `#6246FF` — alineado con token global de marca.
- **Emerald:** Token `--color-emerald: #10B981` para detalles puntuales (números en project cards, hover del marquee CTA, section badges, spotlight en headings).
- **Navbar CTA:** Pill outline ghost — fondo transparent en reposo, borde indigo 0.3 opacity. Al hover: borde intenso + background sutil + box-shadow triple (exterior + difuso + inner glow) + texto a fg. Sin motion values — CSS transitions puras.
- **Tipografía:** Body font DM Sans → Sora (más distintivo). Clase `.heading` + text-shadow en títulos de sección. Espaciado entre secciones: `10rem` mobile / `16rem` desktop.
- **Rediseño Premium /brief:** Formulario de prospección con animaciones de deslizamiento direccionales (de izquierda a derecha o viceversa según el paso) mediante Framer Motion.
- **SpotlightButton text-only:** CTAs convertidos de pills a texto plano con inner wrapper pattern. Overlay usa `background-clip: text` para iluminar solo texto.
- **CTA final como heading:** Heading "listo?" (ES) / "ready?" (EN) es el CTA link a /brief. textShadow igual al de `.heading` — `rgba(158,80,247,0.35)` a 40px y 80px.
- **Spotlight gradient preciso:** Falloff `transparent 50%`. Spotlight ilumina con cursor-tracking.
- **SpotlightHeading default glow:** Índigo `rgb(123,97,255)` para alinear con `--color-accent`.
- **Copy CTAs:** Navbar "Construir" / "Build". CTA final heading "listo?" (ES) / "ready?" (EN).
- **Spotlight Snapping con `.jump()`:** Implementado cursor-snapping instantáneo en `onMouseEnter` para cards (proyectos y servicios), títulos y textos destacados del Hero ("Solo") y CTA final ("Listo?") para evitar el deslizamiento indeseado desde la posición inicial por defecto `(50, 0)` / `(50, 50)`.
- **Salida limpia de Spotlight:** Removido el reinicio de coordenadas en `onMouseLeave` para evitar que el destello viaje bruscamente al centro o arriba al salir del elemento; ahora simplemente se desvanece de forma estática en su última posición.
- **Suavizado de transición en títulos:** Se aumentó la duración del fade de `0.3s` a `0.6s` en los títulos para que el spotlight aparezca de manera más gradual y orgánica.
- **SpotlightHeading container display:** Cambiado de `block` a `table` para que el contenedor del título se ajuste exactamente al ancho del texto. Esto soluciona la asimetría de hover al aproximarse al título por la derecha, logrando consistencia en ambos lados.
- **Footer wordmark color hover:** Reemplazado el efecto de cursor-tracking spotlight del footer wordmark por una transición de color lenta (`0.6s ease`) al hacer hover por palabra (`malcom` a índigo, `.builder` a emerald).

### Componentes creados

- **SpotlightHeading:** Componente client-side que envuelve cualquier heading y agrega un overlay con `background-clip: text` + gradiente radial que sigue al cursor (efecto spotlight esmeralda). Respeta `prefers-reduced-motion`.
- **AmbientOrb:** Orb flotante animado de fondo (índigo translúcido) que se mueve lentamente con `useMotionValue` + `useSpring`, visible solo en desktop.
- **FadeIn:** Soporta prop `rotate` para animación de entrada con tilt (usado en Services cards).
- **ScrollIndicator:** Flecha animada al final del Hero que pulsa e invita a scrollear.
- **SpotlightButton:** Componente client-side que envuelve un Link con overlay spotlight text-only (`background-clip: text` + gradiente radial cursor-following + drop-shadow). Inner wrapper pattern para compatibilidad con iconos SVG. Gradiente apretado (transparent 20%) para spotlight preciso.
- **WordmarkWord:** Componente client-side simple para el footer que maneja la transición de color lenta al hover.
- **About:** Sección completa a 2 columnas con grid responsive. Foto de perfil con aspecto 4:5, `object-fit: cover`, bordes con glow índigo y badges flotantes con efecto glassmorphism.
- **Method:** Sección con track de `Marquee` animado infinitamente y componentes SVG personalizados (`StackSVGs`). Tarjetas transparentes para revelar el resplandor de fondo (orb índigo).
- **BriefForm:** Asistente interactivo multi-paso con lógica de caminos condicionales y campos optimizados para captación de prospectos.
- **Route /api/brief:** Endpoint de Next.js que calcula el plazo estimado de respuesta, valida honeypot, aplica rate limit y despacha correos a través de Resend.

### Efectos visuales globales

- **Noise texture:** `body::after` con SVG `data:image/svg+xml` base64 como `background-image` para textura grano sutil en todo el sitio.
- **Ambient orb:** `AmbientOrb.tsx` renderizado en `app/[locale]/layout.tsx` como fondo decorativo (solo desktop).
- **Section transitions:** Secciones pares tienen un gradiente glow en `::before` en el borde superior para separación visual.
- **Footer wordmark transition:** Cada palabra resplandece en su color de hover (`malcom` → índigo, `.builder` → emerald) con una transición lenta y suave de `0.6s`.

### Problemas resueltos

- **Hydration React 19:** Mitigación del warning por inyección de `<script>` de `next-themes` usando un patch local en modo desarrollo dentro de `ThemeProvider.tsx`.
- **Alineación About:** Se logró igualar perfectamente la altura de la imagen con el contenido de texto removiendo la elongación nativa del grid (`align-items: stretch` descartado). En su lugar se definió un alto fijo usando `aspect-ratio: 4/5` en la foto, y flexbox (`justify-content: space-between`) para distribuir el texto.
- **Textos superpuestos:** Se resolvieron conflictos de padding al reemplazar el uso de `style` dinámico (ignorado por Framer Motion en `FadeIn`) con clases atómicas de Tailwind (`!pt-0`, `!pb-0`).
- **Simulación vs Envíos reales:** Implementado comportamiento alternativo si la clave `RESEND_API_KEY` no está provista para desarrollo y validación visual.
- **Iconos SVG en SpotlightButton:** Overlay con `background-clip: text` y `color: transparent` invisibilizaba SVG por herencia `currentColor`. Resuelto con inner wrapper: overlay and base comparten wrapper, área no-texto transparente deja ver capa base.
- **Spotlight en texto grande:** Gradiente `transparent 50%` iluminaba toda la palabra en headings. Resuelto: falloff apretado a 20% + drop-shadow reducido de 24px a 12px para spotlight localizado en el cursor.
- **Deslizamiento de spotlight corregido:** Solucionado el molesto movimiento del spotlight desde su coordenada por defecto en todos los elementos interactivos del sitio (Proyectos, Servicios, Títulos, Hero "Solo", CTA final "Listo?").
- **Mockups de NurEstética e imágenes optimizadas:** Reemplazados los nombres antiguos de imágenes del proyecto NurEstética por sus nombres descriptivos finales y se actualizó la card spotlight para usar `nur-card-spotlight.jpg`. Se optimizó la card de Zolfo con la imagen `zolfo-card-spotlight.webp` de menor peso (reducción de 62%).
- **Asimetría de hover en títulos resuelta:** Se corrigió el problema por el cual el hover del spotlight del título se activaba antes al acercarse desde la derecha que por la izquierda cambiando el contenedor a `display: "table"`.

### Pendientes próxima sesión

- **Auditoría final:** Testing manual, validación Lighthouse y testeo de responsive en 375px/768px/1280px.
- **CI/CD:** Configurar deploy automático a Vercel desde main.

---

## Listo para construir

Tenés todo lo que necesitás. Arrancá por el paso 1.
Cuando termines, mostrá el resultado de `pnpm run build`.
