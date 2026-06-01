"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  Calendar,
  DollarSign,
  MessageSquare,
  AlertCircle,
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Cpu,
  Server,
  Sparkles,
  HelpCircle,
  Sparkle
} from "lucide-react";

// Project type paths
type PathType = "A" | "B" | "C" | "D" | "E" | "F" | "G";

interface FormState {
  negocio_actividad: string;
  negocio_rubro: string;
  negocio_ubicacion: string;
  proyecto_tipo: string;

  a1_situacion: string;
  a2_objetivos: string[];
  a3_panel: string;
  a4_identidad: string;

  b1_venta: string;
  b2_cantidad: string;
  b3_inventario: string;
  b4_pagos: string[];

  c1_gestionar: string[];
  c2_inicio: string;
  c3_usuarios: string;

  d1_automatizar: string[];
  d2_sistema_actual: string;
  d3_whatsapp_business: string;

  e1_proposito: string;
  e2_documentacion: string;
  e3_stack: string;

  f1_etapa: string;
  f2_problema: string;
  f3_financiamiento: string;

  g1_problema: string;

  tiempos_urgencia: string;
  tiempos_presupuesto: string;
  tiempos_publicidad: string;

  contacto_nombre: string;
  contacto_email: string;
  contacto_whatsapp: string;
  contacto_origen: string;
  contacto_notas: string;
  
  honeypot: string;
}

const initialFormState: FormState = {
  negocio_actividad: "",
  negocio_rubro: "",
  negocio_ubicacion: "",
  proyecto_tipo: "",

  a1_situacion: "",
  a2_objetivos: [],
  a3_panel: "",
  a4_identidad: "",

  b1_venta: "",
  b2_cantidad: "",
  b3_inventario: "",
  b4_pagos: [],

  c1_gestionar: [],
  c2_inicio: "",
  c3_usuarios: "",

  d1_automatizar: [],
  d2_sistema_actual: "",
  d3_whatsapp_business: "",

  e1_proposito: "",
  e2_documentacion: "",
  e3_stack: "",

  f1_etapa: "",
  f2_problema: "",
  f3_financiamiento: "",

  g1_problema: "",

  tiempos_urgencia: "",
  tiempos_presupuesto: "",
  tiempos_publicidad: "",

  contacto_nombre: "",
  contacto_email: "",
  contacto_whatsapp: "",
  contacto_origen: "",
  contacto_notas: "",
  honeypot: "",
};

// Translation dictionary
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
      successTitle: "✅ Recibimos tu brief",
      successDesc: "Te respondemos en menos de 24 horas hábiles con una propuesta personalizada para ",
      successTalkBefore: "¿Querés hablar antes? Escribinos directo:",
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
          desc: "Contanos tu problema general y te ayudamos a diseñar la arquitectura ideal."
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
      q1: "Contanos en tus palabras qué problema querés resolver con tecnología: *"
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
};

const buildOptionIcons = [
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Cpu,
  Server,
  Sparkles,
  HelpCircle
];

export function BriefForm() {
  const locale = useLocale();
  const t = dict[locale === "en" ? "en" : "es"];

  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current && step > 0) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  const getPath = (): PathType => {
    switch (formData.proyecto_tipo) {
      case "Presencia digital (web, landing page)":
        return "A";
      case "Tienda online (e-commerce)":
        return "B";
      case "Sistema con panel de gestión (admin, dashboard)":
        return "C";
      case "Automatización o agente de IA":
        return "D";
      case "API o backend para mi aplicación":
        return "E";
      case "MVP de producto digital":
        return "F";
      default:
        return "G";
    }
  };

  const TOTAL_STEPS = 5;

  const getProgressPercent = () => {
    return Math.min(100, Math.round((step / TOTAL_STEPS) * 100));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectSingle = (name: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectMultiple = (name: keyof FormState, value: string, maxSelection?: number) => {
    const currentValues = (formData[name] as string[]) || [];
    let newValues: string[];

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      if (maxSelection && currentValues.length >= maxSelection) {
        newValues = [...currentValues.slice(1), value];
      } else {
        newValues = [...currentValues, value];
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValues }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.negocio_actividad.trim()) {
        newErrors.negocio_actividad = t.steps.required;
      } else if (formData.negocio_actividad.length > 200) {
        newErrors.negocio_actividad = t.steps.limitChars.replace("{limit}", "200");
      }
      if (!formData.negocio_rubro) {
        newErrors.negocio_rubro = t.steps.chooseOption;
      }
      if (!formData.negocio_ubicacion) {
        newErrors.negocio_ubicacion = t.steps.chooseOption;
      }
    }

    if (step === 2) {
      if (!formData.proyecto_tipo) {
        newErrors.proyecto_tipo = t.steps.chooseOption;
      }
    }

    if (step === 3) {
      const path = getPath();
      if (path === "A") {
        if (!formData.a1_situacion) newErrors.a1_situacion = t.steps.chooseOption;
        if (formData.a2_objetivos.length === 0) newErrors.a2_objetivos = t.steps.objectiveAtLeastOne;
        if (!formData.a3_panel) newErrors.a3_panel = t.steps.chooseOption;
        if (!formData.a4_identidad) newErrors.a4_identidad = t.steps.chooseOption;
      } else if (path === "B") {
        if (!formData.b1_venta) newErrors.b1_venta = t.steps.chooseOption;
        if (!formData.b2_cantidad) newErrors.b2_cantidad = t.steps.chooseOption;
        if (!formData.b3_inventario) newErrors.b3_inventario = t.steps.chooseOption;
        if (formData.b4_pagos.length === 0) newErrors.b4_pagos = t.steps.paymentAtLeastOne;
      } else if (path === "C") {
        if (formData.c1_gestionar.length === 0) newErrors.c1_gestionar = t.steps.manageAtLeastOne;
        if (!formData.c2_inicio) newErrors.c2_inicio = t.steps.chooseOption;
        if (!formData.c3_usuarios) newErrors.c3_usuarios = t.steps.chooseOption;
      } else if (path === "D") {
        if (formData.d1_automatizar.length === 0) newErrors.d1_automatizar = t.steps.automateAtLeastOne;
        if (!formData.d2_sistema_actual) newErrors.d2_sistema_actual = t.steps.chooseOption;
        if (!formData.d3_whatsapp_business) newErrors.d3_whatsapp_business = t.steps.chooseOption;
      } else if (path === "E") {
        if (!formData.e1_proposito) newErrors.e1_proposito = t.steps.chooseOption;
        if (!formData.e2_documentacion) newErrors.e2_documentacion = t.steps.chooseOption;
      } else if (path === "F") {
        if (!formData.f1_etapa) newErrors.f1_etapa = t.steps.chooseOption;
        if (!formData.f2_problema.trim()) {
          newErrors.f2_problema = t.steps.required;
        } else if (formData.f2_problema.length > 300) {
          newErrors.f2_problema = t.steps.limitChars.replace("{limit}", "300");
        }
        if (!formData.f3_financiamiento) newErrors.f3_financiamiento = t.steps.chooseOption;
      } else if (path === "G") {
        if (!formData.g1_problema.trim()) {
          newErrors.g1_problema = t.steps.required;
        } else if (formData.g1_problema.length > 500) {
          newErrors.g1_problema = t.steps.limitChars.replace("{limit}", "500");
        }
      }
    }

    if (step === 4) {
      if (!formData.tiempos_urgencia) newErrors.tiempos_urgencia = t.steps.chooseOption;
      if (!formData.tiempos_presupuesto) newErrors.tiempos_presupuesto = t.steps.chooseOption;
    }

    if (step === 5) {
      if (!formData.contacto_nombre.trim()) newErrors.contacto_nombre = t.steps.required;
      if (!formData.contacto_email.trim()) {
        newErrors.contacto_email = t.steps.required;
      } else if (!/\S+@\S+\.\S+/.test(formData.contacto_email)) {
        newErrors.contacto_email = t.steps.emailInvalid;
      }
      if (!formData.contacto_whatsapp.trim()) newErrors.contacto_whatsapp = t.steps.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    const path = getPath();
    let proyecto_respuestas: Record<string, any> = {};

    if (path === "A") {
      proyecto_respuestas = {
        "Situación digital actual": formData.a1_situacion,
        "Objetivos de presencia digital": formData.a2_objetivos,
        "Necesita panel propio": formData.a3_panel,
        "Identidad visual definida": formData.a4_identidad,
      };
    } else if (path === "B") {
      proyecto_respuestas = {
        "Qué va a vender": formData.b1_venta,
        "Cantidad aproximada": formData.b2_cantidad,
        "Gestión de inventario": formData.b3_inventario,
        "Medios de pago": formData.b4_pagos,
      };
    } else if (path === "C") {
      proyecto_respuestas = {
        "Qué necesita gestionar": formData.c1_gestionar,
        "Web actual": formData.c2_inicio,
        "Cantidad de usuarios": formData.c3_usuarios,
      };
    } else if (path === "D") {
      proyecto_respuestas = {
        "Proceso a automatizar": formData.d1_automatizar,
        "Sistema digital actual": formData.d2_sistema_actual,
        "WhatsApp Business": formData.d3_whatsapp_business,
      };
    } else if (path === "E") {
      proyecto_respuestas = {
        "Propósito de API/Backend": formData.e1_proposito,
        "Documentación definida": formData.e2_documentacion,
        "Stack tecnológico": formData.e3_stack,
      };
    } else if (path === "F") {
      proyecto_respuestas = {
        "Etapa del MVP": formData.f1_etapa,
        "Problema central": formData.f2_problema,
        "Financiamiento": formData.f3_financiamiento,
      };
    } else {
      proyecto_respuestas = {
        "Problema a resolver": formData.g1_problema,
      };
    }

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          negocio_nombre: formData.negocio_actividad,
          rubro: formData.negocio_rubro,
          ubicacion: formData.negocio_ubicacion,
          proyecto_tipo: formData.proyecto_tipo,
          proyecto_respuestas,
          tiempos_urgencia: formData.tiempos_urgencia,
          tiempos_presupuesto: formData.tiempos_presupuesto,
          tiempos_publicidad: formData.tiempos_publicidad,
          contacto_nombre: formData.contacto_nombre,
          contacto_email: formData.contacto_email,
          contacto_whatsapp: formData.contacto_whatsapp,
          contacto_origen: formData.contacto_origen,
          contacto_notas: formData.contacto_notas,
          honeypot: formData.honeypot,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setStep(6);
      } else {
        const errData = await response.json();
        setErrors({ submit: errData.error || "Ocurrió un error al enviar. Intentá de nuevo." });
      }
    } catch (err) {
      setErrors({ submit: "Error de red. Verificá tu conexión." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  return (
    <div ref={topRef} className="w-full max-w-2xl mx-auto px-4 py-6 text-[var(--color-fg)]">
      {/* Progress Bar */}
      {step > 0 && step < 6 && (
        <div className="mb-10 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-[var(--color-muted)]">
            <span className="text-[var(--color-accent)] font-semibold">{t.steps.step} {step} {t.steps.de} {TOTAL_STEPS}</span>
            <span>{getProgressPercent()}% {t.steps.completado}</span>
          </div>
          <div className="w-full h-1.5 bg-[#1F1F26] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(123,97,255,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercent()}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {/* STEP 0: Welcome / Header */}
        {step === 0 && (
          <motion.div
            key="step0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-center space-y-8 flex flex-col justify-center min-h-[75vh]"
          >
            <div className="space-y-4 relative">
              <div className="absolute inset-0 bg-radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 60%) pointer-events-none -top-12" />
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-[var(--color-emerald)] border border-[rgba(16,185,129,0.25)] rounded-full bg-[rgba(16,185,129,0.04)]">
                <Sparkle className="w-3.5 h-3.5 animate-pulse" />
                {t.steps.time}
              </div>
              <h1 className="heading text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {locale === "en" ? "Tell us about your project" : "Contanos sobre tu proyecto"}
              </h1>
              <p className="text-base md:text-lg text-[var(--color-muted)] max-w-lg mx-auto leading-relaxed">
                {locale === "en" 
                  ? "Complete this form and we'll get back to you with a proposal in less than 24 hours. No commitments."
                  : "Completá este formulario y te respondemos con una propuesta en menos de 24 horas. Sin compromisos."}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setDirection(1);
                  setStep(1);
                }}
                className="w-full md:w-auto px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-md transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[rgba(123,97,255,0.25)] focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[#0E0E14] outline-none"
              >
                {t.steps.comenzar}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-muted)] pt-8">
              {t.steps.confidential}
            </p>
          </motion.div>
        )}

        {/* STEP 1: Tu Negocio */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">{t.steps.step} 1 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.step1.title}</h2>
            </div>

            <div className="space-y-6">
              {/* Q1.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step1.qActivity}</label>
                <textarea
                  name="negocio_actividad"
                  value={formData.negocio_actividad}
                  onChange={handleTextChange}
                  placeholder={t.step1.placeholderActivity}
                  maxLength={200}
                  className="w-full p-4 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 h-24 resize-none text-sm text-[var(--color-fg)]"
                />
                <div className="flex justify-between items-center text-xs">
                  <span>
                    {errors.negocio_actividad ? (
                      <span className="text-red-400 font-medium">{errors.negocio_actividad}</span>
                    ) : (
                      <span className="text-[var(--color-muted)]">{t.step1.descActivity}</span>
                    )}
                  </span>
                  <span className={formData.negocio_actividad.length >= 180 ? "text-red-400 font-semibold" : "text-[var(--color-muted)]"}>
                    {formData.negocio_actividad.length}/200
                  </span>
                </div>
              </div>

              {/* Q1.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step1.qRubro}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.step1.rubros.map((rubro) => (
                    <button
                      key={rubro}
                      type="button"
                      onClick={() => handleSelectSingle("negocio_rubro", rubro)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                        formData.negocio_rubro === rubro
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {rubro}
                    </button>
                  ))}
                </div>
                {errors.negocio_rubro && <p className="text-xs text-red-400 font-medium">{errors.negocio_rubro}</p>}
              </div>

              {/* Q1.3: Dónde operás */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step1.qUbicacion}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.step1.ubicaciones.map((loc, idx) => {
                    // Match selection regardless of language by using Spanish reference for state consistency
                    const valueRef = dict.es.step1.ubicaciones[idx];
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleSelectSingle("negocio_ubicacion", valueRef)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.negocio_ubicacion === valueRef
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
                {errors.negocio_ubicacion && <p className="text-xs text-red-400 font-medium">{errors.negocio_ubicacion}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[#242428]">
              <button
                onClick={handleBack}
                className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.steps.atras}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                {t.steps.siguiente}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Tu Proyecto */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">{t.steps.step} 2 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.step2.title}</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step2.qBuild}</label>
                <p className="text-xs text-[var(--color-muted)]">{t.step2.descBuild}</p>
                <div className="grid grid-cols-1 gap-3">
                  {t.step2.options.map((opt, idx) => {
                    const IconComponent = buildOptionIcons[idx] || HelpCircle;
                    const valueRef = dict.es.step2.options[idx].label;
                    const isSelected = formData.proyecto_tipo === valueRef;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelectSingle("proyecto_tipo", valueRef)}
                        className={`p-4 text-left rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? "bg-[rgba(123,97,255,0.08)] border-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(123,97,255,0.08)]"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700"
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-md shrink-0 transition-colors ${
                            isSelected ? "bg-[var(--color-accent)] text-white" : "bg-[#1f1f26] text-[var(--color-muted)] group-hover:text-white"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className={`text-sm font-bold transition-colors ${isSelected ? "text-white" : "text-[var(--color-fg)]"}`}>
                            {opt.label}
                          </h3>
                          <p className="text-xs text-[var(--color-muted)] leading-relaxed">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.proyecto_tipo && <p className="text-xs text-red-400 font-medium">{errors.proyecto_tipo}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[#242428]">
              <button
                onClick={handleBack}
                className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.steps.atras}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                {t.steps.siguiente}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Camino Condicional */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">{t.steps.step} 3 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.steps.required}</h2>
            </div>

            {/* CAMINO A: Presencia digital */}
            {getPath() === "A" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoA.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoA.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoA.q1Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("a1_situacion", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.a1_situacion === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.a1_situacion && <p className="text-xs text-red-400 font-medium">{errors.a1_situacion}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoA.q2}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoA.q2Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoA.q2Options[idx];
                      const isSelected = formData.a2_objetivos.includes(valueRef);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("a2_objetivos", valueRef, 3)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.a2_objetivos && <p className="text-xs text-red-400 font-medium">{errors.a2_objetivos}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoA.q3}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoA.q3Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoA.q3Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("a3_panel", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.a3_panel === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.a3_panel && <p className="text-xs text-red-400 font-medium">{errors.a3_panel}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoA.q4}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoA.q4Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoA.q4Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("a4_identidad", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.a4_identidad === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.a4_identidad && <p className="text-xs text-red-400 font-medium">{errors.a4_identidad}</p>}
                </div>
              </div>
            )}

            {/* CAMINO B: E-commerce */}
            {getPath() === "B" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoB.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoB.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoB.q1Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("b1_venta", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.b1_venta === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.b1_venta && <p className="text-xs text-red-400 font-medium">{errors.b1_venta}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoB.q2}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoB.q2Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoB.q2Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("b2_cantidad", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.b2_cantidad === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.b2_cantidad && <p className="text-xs text-red-400 font-medium">{errors.b2_cantidad}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoB.q3}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoB.q3Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoB.q3Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("b3_inventario", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.b3_inventario === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.b3_inventario && <p className="text-xs text-red-400 font-medium">{errors.b3_inventario}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoB.q4}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoB.q4Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoB.q4Options[idx];
                      const isSelected = formData.b4_pagos.includes(valueRef);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("b4_pagos", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.b4_pagos && <p className="text-xs text-red-400 font-medium">{errors.b4_pagos}</p>}
                </div>
              </div>
            )}

            {/* CAMINO C: Sistema con panel de gestión */}
            {getPath() === "C" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoC.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoC.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoC.q1Options[idx];
                      const isSelected = formData.c1_gestionar.includes(valueRef);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("c1_gestionar", valueRef, 3)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.c1_gestionar && <p className="text-xs text-red-400 font-medium">{errors.c1_gestionar}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoC.q2}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoC.q2Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoC.q2Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("c2_inicio", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.c2_inicio === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.c2_inicio && <p className="text-xs text-red-400 font-medium">{errors.c2_inicio}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoC.q3}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoC.q3Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoC.q3Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("c3_usuarios", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.c3_usuarios === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.c3_usuarios && <p className="text-xs text-red-400 font-medium">{errors.c3_usuarios}</p>}
                </div>
              </div>
            )}

            {/* CAMINO D: Automatización o Agente de IA */}
            {getPath() === "D" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoD.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoD.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoD.q1Options[idx];
                      const isSelected = formData.d1_automatizar.includes(valueRef);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("d1_automatizar", valueRef, 3)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.d1_automatizar && <p className="text-xs text-red-400 font-medium">{errors.d1_automatizar}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoD.q2}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoD.q2Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoD.q2Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("d2_sistema_actual", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.d2_sistema_actual === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.d2_sistema_actual && <p className="text-xs text-red-400 font-medium">{errors.d2_sistema_actual}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoD.q3}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoD.q3Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoD.q3Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("d3_whatsapp_business", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.d3_whatsapp_business === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.d3_whatsapp_business && <p className="text-xs text-red-400 font-medium">{errors.d3_whatsapp_business}</p>}
                </div>
              </div>
            )}

            {/* CAMINO E: API o Backend */}
            {getPath() === "E" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoE.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoE.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoE.q1Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("e1_proposito", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.e1_proposito === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.e1_proposito && <p className="text-xs text-red-400 font-medium">{errors.e1_proposito}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoE.q2}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoE.q2Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoE.q2Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("e2_documentacion", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.e2_documentacion === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.e2_documentacion && <p className="text-xs text-red-400 font-medium">{errors.e2_documentacion}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoE.q3}</label>
                  <input
                    type="text"
                    name="e3_stack"
                    value={formData.e3_stack}
                    onChange={handleTextChange}
                    placeholder="e.g. React Native, Node, .NET"
                    className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-colors text-sm text-[var(--color-fg)]"
                  />
                </div>
              </div>
            )}

            {/* CAMINO F: MVP de producto digital */}
            {getPath() === "F" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoF.q1}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoF.q1Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoF.q1Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("f1_etapa", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.f1_etapa === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.f1_etapa && <p className="text-xs text-red-400 font-medium">{errors.f1_etapa}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoF.q2}</label>
                  <textarea
                    name="f2_problema"
                    value={formData.f2_problema}
                    onChange={handleTextChange}
                    placeholder="..."
                    maxLength={300}
                    className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-colors h-24 resize-none text-sm text-[var(--color-fg)]"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span>{errors.f2_problema && <span className="text-red-400 font-medium">{errors.f2_problema}</span>}</span>
                    <span className="text-[var(--color-muted)]">{formData.f2_problema.length}/300</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoF.q3}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {t.caminoF.q3Options.map((opt, idx) => {
                      const valueRef = dict.es.caminoF.q3Options[idx];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectSingle("f3_financiamiento", valueRef)}
                          className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                            formData.f3_financiamiento === valueRef
                              ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                              : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.f3_financiamiento && <p className="text-xs text-red-400 font-medium">{errors.f3_financiamiento}</p>}
                </div>
              </div>
            )}

            {/* CAMINO G: No tengo claro */}
            {getPath() === "G" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">{t.caminoG.q1}</label>
                  <textarea
                    name="g1_problema"
                    value={formData.g1_problema}
                    onChange={handleTextChange}
                    placeholder="..."
                    maxLength={500}
                    className="w-full p-4 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-colors h-36 resize-none text-sm text-[var(--color-fg)]"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span>{errors.g1_problema && <span className="text-red-400 font-medium">{errors.g1_problema}</span>}</span>
                    <span className="text-[var(--color-muted)]">{formData.g1_problema.length}/500</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[#242428]">
              <button
                onClick={handleBack}
                className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.steps.atras}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                {t.steps.siguiente}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Tiempos y Presupuesto */}
        {step === 4 && (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">{t.steps.step} 4 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.step4.qTime}</h2>
            </div>

            <div className="space-y-6">
              {/* Q3.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2 text-[#F0EFF8]">
                  <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                  {t.step4.qTime}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.step4.timeOptions.map((opt, idx) => {
                    const valueRef = dict.es.step4.timeOptions[idx];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("tiempos_urgencia", valueRef)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.tiempos_urgencia === valueRef
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {errors.tiempos_urgencia && <p className="text-xs text-red-400 font-medium">{errors.tiempos_urgencia}</p>}
              </div>

              {/* Q3.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2 text-[#F0EFF8]">
                  <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
                  {t.step4.qBudget}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {t.step4.budgetOptions.map((opt, idx) => {
                    const valueRef = dict.es.step4.budgetOptions[idx];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("tiempos_presupuesto", valueRef)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex flex-col items-start ${
                          formData.tiempos_presupuesto === valueRef
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        <span>{opt}</span>
                        {valueRef === "Menos de $800 USD" && (
                          <span className="block text-[11px] text-[var(--color-muted)] font-normal mt-0.5 leading-tight">
                            {t.step4.budgetWarningLabel}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {formData.tiempos_presupuesto === "Menos de $800 USD" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.25)] rounded text-xs text-amber-300 flex gap-2 items-start"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{t.step4.budgetWarningBanner}</span>
                  </motion.div>
                )}
                {errors.tiempos_presupuesto && <p className="text-xs text-red-400 font-medium">{errors.tiempos_presupuesto}</p>}
              </div>

              {/* Q3.3 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step4.qPublicidad}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.step4.publicidadOptions.map((opt, idx) => {
                    const valueRef = dict.es.step4.publicidadOptions[idx];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("tiempos_publicidad", valueRef)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.tiempos_publicidad === valueRef
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[#242428]">
              <button
                onClick={handleBack}
                className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.steps.atras}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                {t.steps.siguiente}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Tu Contacto */}
        {step === 5 && (
          <motion.div
            key="step5"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">{t.steps.step} 5 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.step5.title}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="absolute opacity-0 -z-50 pointer-events-none w-0 h-0 overflow-hidden">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleTextChange}
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="Do not fill this if you are human"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step5.name}</label>
                <input
                  type="text"
                  name="contacto_nombre"
                  value={formData.contacto_nombre}
                  onChange={handleTextChange}
                  placeholder={t.step5.placeholderName}
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_nombre && <p className="text-xs text-red-400 font-medium">{errors.contacto_nombre}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step5.email}</label>
                <input
                  type="email"
                  name="contacto_email"
                  value={formData.contacto_email}
                  onChange={handleTextChange}
                  placeholder={t.step5.placeholderEmail}
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_email && <p className="text-xs text-red-400 font-medium">{errors.contacto_email}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step5.whatsapp}</label>
                <input
                  type="tel"
                  name="contacto_whatsapp"
                  value={formData.contacto_whatsapp}
                  onChange={handleTextChange}
                  placeholder={t.step5.placeholderWhatsapp}
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_whatsapp && <p className="text-xs text-red-400 font-medium">{errors.contacto_whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step5.qOrigin}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.step5.originOptions.map((opt, idx) => {
                    const valueRef = dict.es.step5.originOptions[idx];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("contacto_origen", valueRef)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.contacto_origen === valueRef
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">{t.step5.qNotes}</label>
                <textarea
                  name="contacto_notas"
                  value={formData.contacto_notas}
                  onChange={handleTextChange}
                  placeholder={t.step5.placeholderNotes}
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 h-24 resize-none text-sm text-[var(--color-fg)]"
                />
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-900/20 border border-red-700/55 rounded text-xs text-red-400">
                  {errors.submit}
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-[#242428]">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.steps.atras}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    t.steps.enviando
                  ) : (
                    <>
                      {t.steps.enviar}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 6: Confirmation success message */}
        {step === 6 && isSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="text-center py-12 px-6 bg-[#18181F] border border-[#242428] rounded-lg space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%) pointer-events-none" />
            
            <div className="flex justify-center">
              <div className="p-3 bg-[rgba(16,185,129,0.1)] rounded-full border border-[rgba(16,185,129,0.2)]">
                <CheckCircle className="w-12 h-12 text-[var(--color-emerald)]" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{t.steps.successTitle}</h2>
              <p className="text-[var(--color-fg)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                {t.steps.successDesc}
                <span className="font-bold text-[var(--color-accent)]">{formData.negocio_actividad}</span>.
              </p>
            </div>

            <div className="pt-8 border-t border-[#242428] space-y-4 max-w-sm mx-auto">
              <p className="text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider">{t.steps.successTalkBefore}</p>
              
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://wa.me/543412282853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 bg-[#10b981]/8 hover:bg-[#10b981]/12 border border-[#10b981]/25 hover:border-[#10b981]/40 rounded text-sm text-[var(--color-emerald)] transition-all duration-200 font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.steps.whatsappText}
                </a>
                <a
                  href="mailto:contact@malcombuilder.com"
                  className="flex items-center justify-center gap-2 p-3.5 bg-[#1f1f26] hover:bg-gray-800 border border-[#242428] rounded text-sm text-[var(--color-fg)] transition-all duration-200 font-semibold"
                >
                  contact@malcombuilder.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
