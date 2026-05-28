# Alineación GLOBAL.md → portfolio

## Cambios necesarios

### 1. `messages/es.json` — Services + meta + footer + about

**Services items** (alinear con framework ASÍ CONSTRUYO):
```json
"items": [
  { "title": "Estrategia",     "desc": "Tesis, posicionamiento y modelo de negocio. Defino la dirección antes de escribir una línea de código." },
  { "title": "Arquitectura",   "desc": "Identidad, sistema visual y marca completa. El diseño como ventaja competitiva." },
  { "title": "Producto",       "desc": "Web, e-commerce, plataforma o app. Construyo lo que tu negocio necesita." },
  { "title": "Crecimiento",    "desc": "Contenido con IA, pauta y automatizaciones. Hago que el producto trabaje para vos." }
]
```

**Services title**: `"Qué construyo"` → `"Así construyo"`

**Agregar about.thesis**:
```json
"thesis": {
  "text": "Construyo sistemas solo. Desde el modelo de negocio hasta el código. Desde la marca hasta cada pieza de contenido. Sin inventario. Una persona. Full-stack. Con criterio."
}
```

**Meta title**: `"malcom.builder — AI-native company builder"` → `"malcom.builder — Studio de producto digital"`

**Meta description**: → `"Construyo productos digitales potenciados con IA. Más rápido que una agencia. Con más criterio que un freelancer."`

**Footer año**: `2025` → `2026`

---

### 2. `messages/en.json` — Services + meta + footer + about

**Services items**:
```json
"items": [
  { "title": "Strategy",      "desc": "Thesis, positioning and business model. I define the direction before writing a line of code." },
  { "title": "Architecture",  "desc": "Identity, visual system and full brand. Design as a competitive advantage." },
  { "title": "Product",       "desc": "Web, e-commerce, platform or app. I build what your business needs." },
  { "title": "Growth",        "desc": "AI-powered content, ads, and automations. I make the product work for you." }
]
```

**Services title**: `"What I build"` → `"How I build"`

**Agregar about.thesis**:
```json
"thesis": {
  "text": "I build systems alone. From the business model to the code. From the brand to every piece of content. No inventory. One person. Full-stack. With conviction."
}
```

**Meta title**: `"malcom.builder — AI-native company builder"` → `"malcom.builder — Digital product studio"`

**Meta description**: → `"I build digital products powered by AI. Faster than an agency. Sharper than a freelancer."`

**Footer año**: `2025` → `2026`

---

### 3. `src/components/sections/About.tsx` — Agregar bloque "La tesis"

Insertar entre el `FadeIn` del headline y el `about-grid`:

```tsx
{/* La tesis — GLOBAL.md §04 */}
<FadeIn delay={0.15} direction="up">
  <blockquote
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
      lineHeight: 1.7,
      color: "var(--color-muted)",
      borderLeft: "3px solid var(--color-accent)",
      paddingLeft: "1.5rem",
      marginBottom: "3rem",
      fontStyle: "italic",
    }}
  >
    {t("thesis.text")}
  </blockquote>
</FadeIn>
```

---

### 4. `AGENTS.md` — Corregir Hero headline (línea 120)

```diff
- - Headline: `AI-native system builder. Alone.`
+ - Headline: `Construyo productos digitales. Solo.` / `I build digital products. Solo.`
```

Y la línea 121-122 del subheadline:
```diff
- - Subheadline ES: _Construyo sistemas complejos desde cero potenciados con IA._
- - Subheadline EN: _I build complex systems from the ground up AI powered._
+ - Subheadline ES: _Más rápido que una agencia. Más criterio que un freelancer._
+ - Subheadline EN: _Faster than an agency. Sharper than a freelancer._
```
