# malcombuilder.com

Portfolio and studio website for [malcom.builder](https://malcombuilder.com) — AI-native company builder.

---

## Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Framework  | Next.js 15 (App Router)    |
| UI         | React 19                   |
| Styles     | Tailwind CSS v4            |
| Animations | Framer Motion 11           |
| i18n       | next-intl (ES / EN)        |
| Themes     | next-themes (Dark / Light) |
| Icons      | Lucide React               |
| Deploy     | Vercel                     |

---

## Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Root layout with providers and metadata
│   │   └── page.tsx         # Single-page with all sections
│   ├── robots.ts
│   ├── sitemap.ts
│   └── globals.css          # Design tokens + Tailwind v4 @theme
├── components/
│   ├── providers/           # ThemeProvider
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, Services, Projects, Stack, About, Contact
│   └── ui/                  # FadeIn, Marquee, ThemeToggle, LangToggle
├── i18n/                    # Routing + request config
├── lib/
│   └── constants.ts         # Projects, stack, and services data
└── middleware.ts
messages/
├── es.json
└── en.json
```

---

## Design System

### Color Palette

| Token   | Value     | Usage                            |
| ------- | --------- | -------------------------------- |
| Void    | `#0E0E14` | Main background                  |
| Surface | `#18181F` | Cards and surface backgrounds    |
| Chalk   | `#F0EFF8` | Primary text                     |
| Mist    | `#888896` | Secondary text                   |
| Indigo  | `#7B61FF` | Primary accent                   |
| Emerald | `#10B981` | Secondary accent / active states |
| Border  | `#242428` | Borders                          |

### Typography

- **IBM Plex Sans** — UI and headings (400 / 500 / 600 / 700)
- **JetBrains Mono** — code and accents (400 / 600)
- Headlines: `clamp(2.5rem, 8vw, 7rem)` · `letter-spacing: -0.02em`

---

## Local Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) → automatically redirects to `/es`.

---

## i18n

The site is bilingual. Routes are:

- `/es` — Spanish (default)
- `/en` — English

All strings live in `messages/es.json` and `messages/en.json`. The term `AI-native company builder` is not translated — it's part of the brand.

---

## Deploy

The site deploys automatically to [Vercel](https://vercel.com) on every push to `main`.

```
malcombuilder.com → production (branch: main)
```

---

## Pre-deploy Checklist

- [ ] Environment variables configured in Vercel
- [ ] WhatsApp, LinkedIn, Instagram updated in `lib/constants.ts`
- [ ] `npm run build` with zero errors
- [ ] Lighthouse 95+ across all categories
- [ ] Responsive layout verified at 375px / 768px / 1280px

---

_malcom.builder · Rosario, Argentina_
