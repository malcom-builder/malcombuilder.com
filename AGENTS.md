# AGENTS.md — malcom.builder / portfolio

> Contexto local del proyecto. El global está en ~/.gemini/CLAUDE.md.
> No repetir lo que ya está allá. Solo lo específico de este proyecto.

---

## Proyecto

- **Qué es:** Portfolio web de malcom.builder
- **URL destino:** malcombuilder.com
- **Stack:** Next.js 15 · React 19 · Tailwind CSS v4 · TypeScript · Framer Motion 11 · next-themes · next-intl · Vercel
- **Estado:** En construcción

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
  --color-bg:           #0a0a0a;
  --color-fg:           #fafafa;
  --color-accent:       #4b4058ff;  
  --color-accent-hover: #9e00ffff;  
  --color-muted:        #888888;
  --color-border:       #222222;
}

.light {
  --color-bg:           #fafafa;
  --color-fg:           #0a0a0a;
  --color-accent:       #4a395cff;
  --color-accent-hover: #7700ffff;
  --color-muted:        #666666;
  --color-border:       #e5e5e5;
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
- Sticky, `backdrop-blur-md`, `bg-[var(--bg)]/80`
- Logo: `malcom.builder` en monospace a la izquierda
- Links: Services / Projects / Method / About (siempre en ingles)
- Derecha: LangToggle (ES/EN) + ThemeToggle
- CTA: `Construyamos` (primario)

### Hero
- Headline: `AI-native system builder. Alone.`
- Subheadline ES: *Construyo sistemas complejos desde cero potenciados con IA.*
- Subheadline EN: *I build complex systems from the ground up AI powered.*
- CTAs: `Ver proyectos` (primario)
- Entrada staggered con Framer Motion

### Services — grid 2×2
1. **Services Building** — De la idea al producto con IA en el núcleo
2. **AI Integration** — Automatización e inteligencia en procesos existentes
3. **Technical Strategy** — Arquitectura y stack para escalar desde el día uno
4. **MVP Development** — Producto funcional en semanas, no meses

### Projects — lista numerada 
Datos en `lib/constants.ts`:
```ts
{ id: '01', category: 'Portal Médico',      title: 'Zolfo Medicina Estética', metric: '100 Lighthouse', url: 'https://zolfoestetica.com.ar' },
{ id: '02', category: 'Web Institucional',  title: 'NurEstética',             metric: 'Real Score 100', url: 'https://nurestetica.com.ar' },
{ id: '03', category: 'IAM System',         title: 'AuthMotion',              metric: 'Open Source',    url: 'https://github.com/malcom-builder/AuthMotion' },
{ id: '04', category: 'Fintech',            title: 'SmartWallet',             metric: 'Double-Entry',   url: 'https://github.com/malcom-builder/SmartWallet' },
```

### Stack — grid de logos
Next.js · React · TypeScript · C# · .NET · Docker · SQL Server · Azure · Vercel · Tailwind · Framer Motion · Supabase · GitHub 
Hover: grayscale → color (acento indigo)

### About — bio + stat counters
| Número | ES                   | EN                    |
| ------ | -------------------- | --------------------- |
| `3+`   | Años construyendo    | Years building        |
| `4+`   | Proyectos entregados | Projects shipped      |
| `100%` | Stack AI-native      | AI-native stack       |
| `24/7` | Monitoreo activo     | Active monitoring     |

### CTA
- Marquee: `LET’S TALK — LET’S COLLABORATE — SAY HELLO — WANNA BE STARTING SOMETHING?`
- Let's Build (en)
- Hablemos (es)
- [contact@malcombuilder.com](mailto:[EMAIL_ADDRESS])


### Footer — estilo monzalab
- Col izq: `© 2026 malcom.builder`
- Col der: instagram + linkedin 
- Barra inferior: `Rosario, Argentina · Next.js & AI`

---

## Animaciones

- Scroll fade-in: `opacity 0→1`, `y 40→0`, `duration 0.7s`, `once: true`
- Stagger: `0.1s` por ítem en grids
- Marquee: CSS `@keyframes`, `20s linear infinite`
- Hover cards: `scale(1.02)`, `border-color: var(--accent)`, `transition: 0.2s`

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
   └── Crear globals.css con @theme {} y tokens indigo
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
   └── Hero → Services → Projects → Stack → About → Contact

6. Data
   └── lib/constants.ts con todos los arrays tipados

7. SEO
   └── robots.ts · sitemap.ts · generateMetadata

8. Verificación
   └── pnpm run build sin errores
   └── Recorrer checklist completo
```

---

## Reglas durante el build

- **No interrumpir** para preguntas de estilo o copy — usar los valores de este documento
- **Sí preguntar** antes de instalar dependencias no listadas
- **Sí preguntar** antes de agregar secciones no especificadas
- **No inventar** URLs, emails ni números — usar placeholders definidos
- **Reportar** al final de cada etapa, no durante

---

## Checklist post-build

- [ ] `pnpm run build` sin errores TypeScript ni ESLint
- [ ] `localhost:3000` redirige a `/es`
- [ ] Toggle dark/light funciona correctamente
- [ ] Toggle ES/EN cambia todos los strings
- [ ] Marquee corre infinitamente sin saltos
- [ ] Stats de About se animan al hacer scroll
- [ ] Responsive: 375px / 768px / 1280px
- [ ] Lighthouse 95+ en todas las categorías
- [ ] robots.txt y sitemap.xml accesibles

---

## Placeholders a reemplazar antes de deploy

| Campo          | Placeholder     | Reemplazar con |
| -------------- | --------------- | -------------- |
| WhatsApp       | `+54XXXXXXXXXX` | Número real    |
| URLs proyectos | `#`             | URLs reales    |

---

## Listo para construir

Tenés todo lo que necesitás. Arrancá por el paso 1.
Cuando termines, mostrá el resultado de `pnpm run build`.

---

## Decisiones UI/UX y Ajustes (Memoria Activa)
*Registro de ajustes iterativos decididos durante el desarrollo para no repetir errores:*

- **Navbar y Blur:** Se abandonó el uso de `backdrop-filter: blur()` debido a problemas de renderizado con el fondo. El Navbar ahora es **100% opaco** (`background: var(--color-bg)`), usando `box-shadow` y `border-bottom` para separarse del fondo al scrollear.
- **Microinteracciones:** Los botones de íconos (`LangToggle`, `ThemeToggle`) deben tener un efecto físico al clic: `transform: scale(0.9)` en el estado `:active`.
- **Layout del Hero:** El contenedor de texto del Hero lleva un margen negativo (`marginTop: "-10vh"`) para elevar el contenido y garantizar que el botón CTA ("Ver proyectos") quede completamente visible *above the fold* sin necesidad de hacer scroll en la mayoría de las pantallas.
- **Copywriting (ES):** Priorizar traducciones naturales y con impacto por sobre la traducción literal. Ej: En lugar de "AI-native systems builder", usar "Desarrollo sistemas con IA" y "Solo" en lugar de "Alone", para mantener un tono técnico, directo y personal.
