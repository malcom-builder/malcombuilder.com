// Translation dictionary for BriefForm
const dict = {
  es: {
    steps: {
      time: "⏱ 3 minutos de duración",
      confidential: "Tu información es confidencial y no se comparte con terceros.",
      comenzar: "Empezar",
      siguiente: "Siguiente",
      atras: "Atrás",
      enviar: "Enviar brief",
      enviando: "Enviando...",
      successTitle: "✅ Recibí tu brief",
      successDesc: "Te respondo en menos de 24 horas hábiles con una propuesta personalizada para ",
      successTalkBefore: "¿Querés hablar antes? Escribíme directo:",
      whatsappText: "Escribir por WhatsApp",
      step: "PASO",
      de: "DE",
      completado: "COMPLETADO",
      required: "Campo obligatorio",
      emailInvalid: "Ingresá un email válido.",
      limitChars: "Máximo {limit} caracteres.",
      objectiveAtLeastOne: "Elegí al menos un objetivo.",
      paymentAtLeastOne: "Elegí al menos un método de pago.",
      manageAtLeastOne: "Elegí al menos un elemento.",
      automateAtLeastOne: "Elegí al menos un proceso.",
      chooseOption: "Por favor, elegí una opción."
    },
    step1: {
      title: "Sobre tu negocio",
      qActivity: "¿A qué se dedica tu negocio? *",
      placeholderActivity: "Ej: Clínica de medicina estética",
      descActivity: "Sé lo más descriptivo posible.",
      qRubro: "¿En qué rubro estás? *",
      rubros: [
        "Salud y medicina",
        "Estética y bienestar",
        "Servicios profesionales (abogados, contadores, consultoras)",
        "Gastronomía y hotelería",
        "Comercio y retail",
        "Educación y capacitación",
        "Fitness y deporte",
        "Tecnología y startups",
        "Emprendimiento / producto propio",
        "Otro"
      ],
      qUbicacion: "¿Dónde operás? *",
      ubicaciones: [
        "Local (mi ciudad / zona de influencia)",
        "Nacional (varias ciudades)",
        "Regional (Latinoamérica / continente)",
        "Internacional / Global",
        "100% online — sin ubicación física"
      ]
    },
    step2: {
      title: "Tu proyecto",
      qBuild: "¿Qué necesitás construir? *",
      descBuild: "Seleccioná la opción principal para estructurar el resto del brief.",
      options: [
        {
          label: "Presencia digital (web, landing page)",
          desc: "Landing pages optimizadas, sitios corporativos y portfolios de alto impacto."
        },
        {
          label: "Tienda online (e-commerce)",
          desc: "Catálogo de productos, carrito de compras, envíos y pasarelas de pago."
        },
        {
          label: "Sistema con panel de gestión (admin, dashboard)",
          desc: "Paneles personalizados, gestión de clientes, reservas o bases de datos."
        },
        {
          label: "Automatización o agente de IA",
          desc: "Flujos de WhatsApp automáticos, recordatorios automáticos o soporte inteligente."
        },
        {
          label: "API o backend para mi aplicación",
          desc: "Servicios robustos, integraciones de software y bases de datos escalables."
        },
        {
          label: "MVP de producto digital",
          desc: "La versión beta de tu idea para lanzar rápido y validar con usuarios reales."
        },
        {
          label: "No tengo claro — necesito orientación",
          desc: "Contame tu problema general y te ayudo a diseñar la arquitectura ideal."
        }
      ]
    },
    caminoA: {
      q1: "¿Cuál es tu situación digital actual? *",
      q1Options: [
        "No tengo nada — arranco desde cero",
        "Tengo Linktree o enlace de Instagram",
        "Tengo web pero está desactualizada",
        "Tengo web pero no genera consultas",
        "Tengo web en WordPress y quiero mejorarla"
      ],
      q2: "¿Qué querés lograr con tu presencia digital? (Elegí hasta 3) *",
      q2Options: [
        "Aparecer en Google cuando me buscan",
        "Recibir más consultas por WhatsApp",
        "Mostrar mis servicios profesionalmente",
        "Reemplazar el Linktree o enlace genérico",
        "Diferenciarme de la competencia",
        "Tener algo que mostrar cuando me piden referencias",
        "Gestionar el contenido yo mismo sin depender de un developer"
      ],
      q3: "¿Necesitás panel de administración propio? *",
      q3Options: [
        "Sí — quiero poder actualizar el contenido sin depender de nadie",
        "No — el contenido no cambia seguido",
        "No sé — no entiendo bien qué es eso"
      ],
      q4: "¿Tenés identidad visual definida? *",
      q4Options: [
        "Sí — tengo logo, colores y tipografía",
        "Parcialmente — tengo logo pero no sistema visual completo",
        "No — arrancamos desde cero con el diseño"
      ]
    },
    caminoB: {
      q1: "¿Qué vas a vender? *",
      q1Options: [
        "Productos físicos con envío",
        "Productos digitales (cursos, ebooks, archivos)",
        "Servicios (turnos, sesiones, consultas)",
        "Combinación de productos y servicios"
      ],
      q2: "¿Cuántos productos tenés aproximadamente? *",
      q2Options: [
        "Menos de 20",
        "Entre 20 y 100",
        "Más de 100",
        "No tengo claro todavía"
      ],
      q3: "¿Necesitás gestión de inventario? *",
      q3Options: [
        "Sí — necesito controlar stock",
        "No — son servicios o digitales sin stock",
        "No sé"
      ],
      q4: "¿Cómo querés recibir los pagos? *",
      q4Options: [
        "Mercado Pago",
        "Tarjeta de crédito / débito internacional",
        "Transferencia bancaria",
        "Cripto",
        "No tengo claro"
      ]
    },
    caminoC: {
      q1: "¿Qué necesitás gestionar? (Elegí hasta 3) *",
      q1Options: [
        "Clientes o pacientes",
        "Turnos y reservas",
        "Galería de trabajos o casos",
        "Reseñas y testimonios",
        "Productos o catálogo",
        "Campañas y promociones",
        "Métricas y reportes",
        "Facturación o pagos",
        "Otro"
      ],
      q2: "¿Ya tenés una web o arrancamos todo desde cero? *",
      q2Options: [
        "Arrancamos desde cero — necesito web y panel",
        "Tengo web — solo necesito el sistema de gestión",
        "Tengo web y quiero reemplazarla junto al panel"
      ],
      q3: "¿Cuántas personas van a usar el sistema? *",
      q3Options: [
        "Solo yo",
        "2 a 5 personas",
        "Más de 5 personas"
      ]
    },
    caminoD: {
      q1: "¿Qué proceso querés automatizar? (Elegí hasta 3) *",
      q1Options: [
        "Respuesta a consultas por WhatsApp",
        "Seguimiento de leads que no respondieron",
        "Recordatorio de turnos",
        "Encuesta post-servicio",
        "Generación de reportes",
        "Publicación de contenido en redes",
        "Monitoreo de reseñas de Google",
        "Otro"
      ],
      q2: "¿Tenés algún sistema digital actualmente? *",
      q2Options: [
        "Sí — tengo web, CRM o herramientas activas",
        "No — arranco desde cero",
        "Parcialmente — tengo algo pero es básico"
      ],
      q3: "¿Usás WhatsApp Business actualmente? *",
      q3Options: [
        "Sí — es mi canal principal de atención",
        "No — uso WhatsApp personal",
        "No uso WhatsApp para el negocio"
      ]
    },
    caminoE: {
      q1: "¿Para qué es la API o backend? *",
      q1Options: [
        "Para una app móvil que estoy desarrollando",
        "Para conectar con una web existente",
        "Para integrar dos sistemas que no se hablan",
        "Para construir un sistema desde cero",
        "No tengo claro — necesito orientación"
      ],
      q2: "¿Tenés documentación o requerimientos definidos? *",
      q2Options: [
        "Sí — tengo todo documentado",
        "Tengo una idea general pero no está documentado",
        "No — necesito ayuda para definirlo"
      ],
      q3: "¿Cuál es tu stack tecnológico actual? (Opcional)"
    },
    caminoF: {
      q1: "¿En qué etapa está tu idea? *",
      q1Options: [
        "Solo tengo la idea — nada más",
        "Tengo el modelo de negocio definido",
        "Tengo wireframes o diseño",
        "Tengo usuarios reales esperando el producto",
        "Tengo una versión anterior que quiero mejorar"
      ],
      q2: "¿Cuál es el problema central que resuelve tu producto? *",
      q3: "¿Tenés financiamiento para el proyecto? *",
      q3Options: [
        "Sí — tengo presupuesto propio",
        "Tengo inversores interesados",
        "Estoy buscando financiamiento",
        "Lo financio de mi bolsillo"
      ]
    },
    caminoG: {
      q1: "Contame en tus palabras qué problema querés resolver con tecnología: *"
    },
    step4: {
      qTime: "¿Cuándo necesitás tenerlo listo? *",
      timeOptions: [
        "Urgente — antes de 2 semanas",
        "En 1 mes",
        "En 2 a 3 meses",
        "En 6 meses o más",
        "Sin fecha definida"
      ],
      qBudget: "¿Cuál es tu presupuesto aproximado? *",
      budgetOptions: [
        "Menos de $800 USD",
        "$800 — $2.000 USD",
        "$2.000 — $5.000 USD",
        "$5.000 — $10.000 USD",
        "Más de $10.000 USD",
        "No tengo claro — necesito orientación"
      ],
      budgetWarningLabel: "Este rango está por debajo de nuestro mínimo de proyecto. Igualmente completá el formulario y lo evaluamos.",
      budgetWarningBanner: "Este presupuesto está por debajo de nuestro mínimo de proyecto ($800 USD). Igualmente envianos el brief — a veces hay soluciones que no contemplaste.",
      qPublicidad: "¿Estás invirtiendo en publicidad digital? (Opcional)",
      publicidadOptions: [
        "Sí — Meta Ads (Facebook/Instagram)",
        "Sí — Google Ads",
        "Sí — ambas",
        "No por ahora",
        "Quiero empezar pero no sé cómo"
      ]
    },
    step5: {
      title: "Datos de contacto",
      name: "Nombre completo *",
      placeholderName: "Tu nombre completo",
      email: "Email *",
      placeholderEmail: "nombre@empresa.com",
      whatsapp: "WhatsApp *",
      placeholderWhatsapp: "+54 9 341 XXXXXXX",
      qOrigin: "¿Cómo llegaste a malcom.builder? (Opcional)",
      originOptions: ["Instagram (@malcombuilder)", "LinkedIn", "Me recomendaron", "Google", "Otro"],
      qNotes: "¿Algo más que quieras contarnos? (Opcional)",
      placeholderNotes: "Contexto adicional, referencias visuales, urgencias especiales..."
    }
  },
  en: {
    steps: {
      time: "⏱ 3 minutes duration",
      confidential: "Your information is confidential and is not shared with third parties.",
      comenzar: "Start",
      siguiente: "Next",
      atras: "Back",
      enviar: "Send brief",
      enviando: "Sending...",
      successTitle: "✅ We received your brief",
      successDesc: "We will reply in less than 24 business hours with a personalized proposal for ",
      successTalkBefore: "Want to talk first? Contact us directly:",
      whatsappText: "Chat on WhatsApp",
      step: "STEP",
      de: "OF",
      completado: "COMPLETED",
      required: "Required field",
      emailInvalid: "Please enter a valid email address.",
      limitChars: "Maximum {limit} characters.",
      objectiveAtLeastOne: "Please choose at least one objective.",
      paymentAtLeastOne: "Please choose at least one payment method.",
      manageAtLeastOne: "Please choose at least one element.",
      automateAtLeastOne: "Please choose at least one process.",
      chooseOption: "Please select an option."
    },
    step1: {
      title: "About your business",
      qActivity: "What does your business do? *",
      placeholderActivity: "e.g., Medical aesthetics clinic",
      descActivity: "Be as descriptive as possible.",
      qRubro: "What sector are you in? *",
      rubros: [
        "Health & Medicine",
        "Aesthetics & Wellness",
        "Professional Services (lawyers, accountants, consulting)",
        "Gastronomy & Hospitality",
        "Commerce & Retail",
        "Education & Training",
        "Fitness & Sports",
        "Technology & Startups",
        "Entrepreneurship / Own Product",
        "Other"
      ],
      qUbicacion: "Where do you operate? *",
      ubicaciones: [
        "Local (my city / area of influence)",
        "National (multiple cities)",
        "Regional (Latin America / continent)",
        "International / Global",
        "100% online — no physical location"
      ]
    },
    step2: {
      title: "Your project",
      qBuild: "What do you need to build? *",
      descBuild: "Select the main option to structure the rest of the brief.",
      options: [
        {
          label: "Presencia digital (web, landing page)",
          desc: "Optimized landing pages, corporate websites, and high-impact portfolios."
        },
        {
          label: "Tienda online (e-commerce)",
          desc: "Product catalog, shopping cart, shipping, and payment gateways."
        },
        {
          label: "Sistema con panel de gestión (admin, dashboard)",
          desc: "Custom dashboards, client management, reservations, or databases."
        },
        {
          label: "Automatización o agente de IA",
          desc: "Automated WhatsApp flows, automated reminders, or smart support."
        },
        {
          label: "API o backend para mi aplicación",
          desc: "Robust services, software integrations, and scalable databases."
        },
        {
          label: "MVP de producto digital",
          desc: "The beta version of your idea to launch fast and validate with real users."
        },
        {
          label: "No tengo claro — necesito orientación",
          desc: "Tell us your general problem and we'll help you design the ideal architecture."
        }
      ]
    },
    caminoA: {
      q1: "What is your current digital situation? *",
      q1Options: [
        "I have nothing — starting from scratch",
        "I have a Linktree or Instagram link",
        "I have a website but it is outdated",
        "I have a website but it doesn't generate inquiries",
        "I have a WordPress site and want to improve it"
      ],
      q2: "What do you want to achieve with your digital presence? (Choose up to 3) *",
      q2Options: [
        "Show up on Google when searched",
        "Receive more inquiries via WhatsApp",
        "Display my services professionally",
        "Replace Linktree or generic link",
        "Stand out from the competition",
        "Have something to show when asked for references",
        "Manage content myself without depending on a developer"
      ],
      q3: "Do you need a custom administration panel? *",
      q3Options: [
        "Yes — I want to update content without depending on anyone",
        "No — content doesn't change often",
        "Don't know — I don't really understand what that is"
      ],
      q4: "Do you have a defined visual identity? *",
      q4Options: [
        "Yes — I have a logo, colors, and typography",
        "Partially — I have a logo but not a full visual system",
        "No — we start from scratch with design"
      ]
    },
    caminoB: {
      q1: "What are you selling? *",
      q1Options: [
        "Physical products with shipping",
        "Digital products (courses, ebooks, files)",
        "Services (appointments, sessions, consultations)",
        "Combination of products and services"
      ],
      q2: "Approximately how many products do you have? *",
      q2Options: [
        "Less than 20",
        "Between 20 and 100",
        "More than 100",
        "Not clear yet"
      ],
      q3: "Do you need inventory management? *",
      q3Options: [
        "Yes — I need to control stock",
        "No — these are services or digital without stock",
        "Don't know"
      ],
      q4: "How do you want to receive payments? *",
      q4Options: [
        "Mercado Pago",
        "International credit / debit card",
        "Bank transfer",
        "Crypto",
        "Not sure"
      ]
    },
    caminoC: {
      q1: "What do you need to manage? (Choose up to 3) *",
      q1Options: [
        "Clients or patients",
        "Appointments and reservations",
        "Work or case gallery",
        "Reviews and testimonials",
        "Products or catalog",
        "Campaigns and promotions",
        "Metrics and reports",
        "Billing or payments",
        "Other"
      ],
      q2: "Do you already have a website or do we start from scratch? *",
      q2Options: [
        "Start from scratch — I need web and panel",
        "I have a website — I only need the management system",
        "I have a website and want to replace it along with the panel"
      ],
      q3: "How many people will use the system? *",
      q3Options: [
        "Only me",
        "2 to 5 people",
        "More than 5 people"
      ]
    },
    caminoD: {
      q1: "What process do you want to automate? (Choose up to 3) *",
      q1Options: [
        "Responding to inquiries via WhatsApp",
        "Following up on leads who haven't responded",
        "Appointment reminders",
        "Post-service survey",
        "Report generation",
        "Social media content publishing",
        "Google review monitoring",
        "Other"
      ],
      q2: "Do you currently have any digital system? *",
      q2Options: [
        "Yes — I have active web, CRM, or tools",
        "No — starting from scratch",
        "Partially — I have something but it's basic"
      ],
      q3: "Do you currently use WhatsApp Business? *",
      q3Options: [
        "Yes — it is my main support channel",
        "No — I use personal WhatsApp",
        "I don't use WhatsApp for business"
      ]
    },
    caminoE: {
      q1: "What is the API or backend for? *",
      q1Options: [
        "For a mobile app I'm developing",
        "To connect with an existing website",
        "To integrate two systems that don't talk to each other",
        "To build a system from scratch",
        "Not sure — I need guidance"
      ],
      q2: "Do you have documentation or defined requirements? *",
      q2Options: [
        "Yes — I have everything documented",
        "I have a general idea but it's not documented",
        "No — I need help defining it"
      ],
      q3: "What is your current tech stack? (Optional)"
    },
    caminoF: {
      q1: "What stage is your idea in? *",
      q1Options: [
        "I only have the idea — nothing else",
        "I have the business model defined",
        "I have wireframes or design",
        "I have real users waiting for the product",
        "I have a previous version I want to improve"
      ],
      q2: "What is the core problem your product solves? *",
      q3: "Do you have funding for the project? *",
      q3Options: [
        "Yes — I have my own budget",
        "I have interested investors",
        "I am looking for funding",
        "I fund it out of my pocket"
      ]
    },
    caminoG: {
      q1: "Tell us in your own words what problem you want to solve with technology: *"
    },
    step4: {
      qTime: "When do you need it ready? *",
      timeOptions: [
        "Urgent — before 2 weeks",
        "In 1 month",
        "In 2 to 3 months",
        "In 6 months or more",
        "No defined date"
      ],
      qBudget: "What is your approximate budget? *",
      budgetOptions: [
        "Less than $800 USD",
        "$800 — $2.000 USD",
        "$2.000 — $5.000 USD",
        "$5.000 — $10.000 USD",
        "More than $10.000 USD",
        "Not sure — I need guidance"
      ],
      budgetWarningLabel: "This range is below our project minimum. Complete the form anyway and we'll evaluate it.",
      budgetWarningBanner: "This budget is below our project minimum ($800 USD). Send us the brief anyway — sometimes there are solutions you didn't consider.",
      qPublicidad: "Are you investing in digital advertising? (Optional)",
      publicidadOptions: [
        "Yes — Meta Ads (Facebook/Instagram)",
        "Yes — Google Ads",
        "Yes — both",
        "Not for now",
        "I want to start but don't know how"
      ]
    },
    step5: {
      title: "Contact information",
      name: "Full name *",
      placeholderName: "Your full name",
      email: "Email *",
      placeholderEmail: "name@company.com",
      whatsapp: "WhatsApp *",
      placeholderWhatsapp: "+54 9 341 XXXXXXX",
      qOrigin: "How did you reach malcom.builder? (Optional)",
      originOptions: ["Instagram (@malcombuilder)", "LinkedIn", "Recommended", "Google", "Other"],
      qNotes: "Anything else you want to tell us? (Optional)",
      placeholderNotes: "Additional context, visual references, special urgency..."
    }
  }
} as const;

export default dict;
