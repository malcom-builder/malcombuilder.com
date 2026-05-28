# Propuesta de Mejoras UI/UX con Métricas Reales (Zolfo Estética)

Este documento detalla el plan para inyectar las métricas de negocio reales obtenidas del Google Analytics de Zolfo Medicina Estética, estructurar un componente de visualización de datos (`ProjectMetrics`) y optimizar la experiencia visual de las landing pages para que se sientan como un producto premium de nivel Stripe/Linear.

---

## 📊 Métricas Reales de Zolfo (Periodo: 30 Abr - 27 May 2026)

Analizando el archivo de Google Analytics, los datos de conversión y engagement son excepcionales:
- **Usuarios activos en 30 días:** **765** (con 731 viniendo de Argentina, 19 de US, 5 de Francia, etc.).
- **Vistas totales de páginas:** **5,456**.
- **Sesiones iniciadas:** **944**.
- **Contactos generados (Conversiones directas/leads):** **444** (Evento `generate_lead` / clicks para reservar/WhatsApp).
- **Tasa de conversión de sesión:** **47.03%** (444 leads / 944 sesiones) — ¡Una conversión bestial!
- **Tratamientos más vistos:**
  - Home: **2271 vistas**
  - Tratamientos generales: **1323 vistas**
  - Ácido Hialurónico: **383 vistas**
  - Toxina Botulínica (Bótox): **188 vistas**
  - Bioestimuladores: **102 vistas**
- **Procedencia del tráfico (Sesiones):**
  - Referral (Recomendación): **332 sesiones**
  - Organic Social (Redes / Instagram): **256 sesiones**
  - Direct (Directo): **239 sesiones**
  - Organic Search (SEO / Google): **99 sesiones**

---

## 📐 Mejoras de UI/UX Planificadas

### 1. Creación de un Componente `ProjectMetrics.tsx`
Diseñaremos una sección interactiva de analíticas para Zolfo que representará estos datos con estética de dashboard técnico (similar a Vercel/Linear):
- **Tarjetas de métricas gigantes** con el resplandor difuminado índigo de marca.
- **Micro-gráficos de barra interactivos** que muestren la distribución de canales de tráfico y tratamientos más vistos usando CSS nativo y animaciones fluidas de 150-300ms.
- **Inyección de color esmeralda (`--color-emerald`)** para representar la tasa de conversión positiva (+47%) y el volumen de leads (444).

### 2. Mockup de Navegador Web (`ProjectMockup.tsx`)
Para evitar el "AI slop" de capturas de pantalla flotantes sin contexto, crearemos un contenedor de ventana de navegador premium macOS style:
- Cabecera con botones de control (rojo, amarillo, verde).
- Barra de dirección con la URL real (ej: `https://zolfoestetica.com.ar`).
- **Glow Halo** interactivo detrás del mockup que se adapta al color primario de cada proyecto (ej. Violeta para Zolfo, Esmeralda para Pulse).
- **Placeholders visuales interactivos**: Si no contamos con las imágenes finales, en vez de un bloque gris sin gracia, renderizaremos un plano interactivo (ej. un mockup simulado de dashboard, un editor de código animado para AuthMotion, etc.) y le solicitaremos al usuario las capturas finales de forma clara.

### 3. Internacionalización del 100% de los Textos (i18n)
Moveremos todos los textos y etiquetas al sistema de traducción de `next-intl` (modificando `es.json` y `en.json`) para que las landing pages de proyectos cambien perfectamente de idioma de manera fluida y mantengan consistencia de diseño en ES y EN.

---

## 📸 Solicitud de Imágenes Reales (Screenshots)

Para que el diseño sea perfecto, solicitaremos al usuario las siguientes capturas para colocarlas dentro del mockup de navegador en la carpeta `public/images/projects/`:
1. `zolfo-screenshot.webp` (Zolfo Medicina Estética - ej: Home o Tratamientos)
2. `nurestetica-screenshot.webp` (NurEstética)
3. `authmotion-screenshot.webp` (AuthMotion - ej: Pantalla de login o dashboard de gestión)
4. `smartwallet-screenshot.webp` (SmartWallet - ej: Panel de transacciones de doble entrada)
5. `portfolio-screenshot.webp` (malcombuilder.com)
6. `pulse-screenshot.webp` (Pulse - ej: Vista de sitios activos y uptime)

---

## 🛠️ Archivos a Crear y Modificar

### Crear
- `src/components/project/ProjectMetrics.tsx`
- `src/components/project/ProjectMockup.tsx`

### Modificar
- `src/app/[locale]/projects/[slug]/page.tsx` (Ensamblar los dos nuevos componentes)
- `messages/es.json` (Traducciones y textos de métricas en ES)
- `messages/en.json` (Traducciones y textos de métricas en EN)
