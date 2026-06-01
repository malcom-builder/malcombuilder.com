"use client";

import React, { useState, useEffect, useRef } from "react";
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
  // Step 1: Tu Negocio
  negocio_actividad: string;
  negocio_rubro: string;
  negocio_ubicacion: string;

  // Step 2: Tu Proyecto
  proyecto_tipo: string;

  // Step 3 (Conditional paths answers)
  // Camino A
  a1_situacion: string;
  a2_objetivos: string[];
  a3_panel: string;
  a4_identidad: string;

  // Camino B
  b1_venta: string;
  b2_cantidad: string;
  b3_inventario: string;
  b4_pagos: string[];

  // Camino C
  c1_gestionar: string[];
  c2_inicio: string;
  c3_usuarios: string;

  // Camino D
  d1_automatizar: string[];
  d2_sistema_actual: string;
  d3_whatsapp_business: string;

  // Camino E
  e1_proposito: string;
  e2_documentacion: string;
  e3_stack: string;

  // Camino F
  f1_etapa: string;
  f2_problema: string;
  f3_financiamiento: string;

  // Camino G
  g1_problema: string;

  // Step 4: Tiempos y Presupuesto
  tiempos_urgencia: string;
  tiempos_presupuesto: string;
  tiempos_publicidad: string;

  // Step 5: Tu Contacto
  contacto_nombre: string;
  contacto_email: string;
  contacto_whatsapp: string;
  contacto_origen: string;
  contacto_notas: string;
  
  // Honeypot bot protection
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

// Map build choices to aesthetic visual icons
const buildOptions = [
  {
    label: "Presencia digital (web, landing page)",
    desc: "Landing pages optimizadas, sitios corporativos y portfolios de alto impacto.",
    icon: Globe,
  },
  {
    label: "Tienda online (e-commerce)",
    desc: "Catálogo de productos, carrito de compras, envíos y pasarelas de pago.",
    icon: ShoppingBag,
  },
  {
    label: "Sistema con panel de gestión (admin, dashboard)",
    desc: "Paneles personalizados, gestión de clientes, reservas o bases de datos.",
    icon: LayoutDashboard,
  },
  {
    label: "Automatización o agente de IA",
    desc: "Flujos de WhatsApp automáticos, recordatorios automáticos o soporte inteligente.",
    icon: Cpu,
  },
  {
    label: "API o backend para mi aplicación",
    desc: "Servicios robustos, integraciones de software y bases de datos escalables.",
    icon: Server,
  },
  {
    label: "MVP de producto digital",
    desc: "La versión beta de tu idea para lanzar rápido y validar con usuarios reales.",
    icon: Sparkles,
  },
  {
    label: "No tengo claro — necesito orientación",
    desc: "Contanos tu problema general y te ayudamos a diseñar la arquitectura ideal.",
    icon: HelpCircle,
  },
];

export function BriefForm() {
  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = back
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top on step changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  // Determine path from Step 2 answer
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
        newErrors.negocio_actividad = "Contanos brevemente sobre la actividad de tu negocio.";
      } else if (formData.negocio_actividad.length > 200) {
        newErrors.negocio_actividad = "El texto no puede superar los 200 caracteres.";
      }
      if (!formData.negocio_rubro) {
        newErrors.negocio_rubro = "Por favor, elegí un rubro.";
      }
      if (!formData.negocio_ubicacion) {
        newErrors.negocio_ubicacion = "Por favor, elegí una opción de ubicación.";
      }
    }

    if (step === 2) {
      if (!formData.proyecto_tipo) {
        newErrors.proyecto_tipo = "Seleccioná qué tipo de proyecto querés construir.";
      }
    }

    if (step === 3) {
      const path = getPath();
      if (path === "A") {
        if (!formData.a1_situacion) newErrors.a1_situacion = "Por favor, elegí una opción.";
        if (formData.a2_objetivos.length === 0) newErrors.a2_objetivos = "Elegí al menos un objetivo.";
        if (!formData.a3_panel) newErrors.a3_panel = "Por favor, elegí una opción.";
        if (!formData.a4_identidad) newErrors.a4_identidad = "Por favor, elegí una opción.";
      } else if (path === "B") {
        if (!formData.b1_venta) newErrors.b1_venta = "Por favor, elegí una opción.";
        if (!formData.b2_cantidad) newErrors.b2_cantidad = "Por favor, elegí una opción.";
        if (!formData.b3_inventario) newErrors.b3_inventario = "Por favor, elegí una opción.";
        if (formData.b4_pagos.length === 0) newErrors.b4_pagos = "Elegí al menos un método de pago.";
      } else if (path === "C") {
        if (formData.c1_gestionar.length === 0) newErrors.c1_gestionar = "Elegí al menos un elemento.";
        if (!formData.c2_inicio) newErrors.c2_inicio = "Por favor, elegí una opción.";
        if (!formData.c3_usuarios) newErrors.c3_usuarios = "Por favor, elegí una opción.";
      } else if (path === "D") {
        if (formData.d1_automatizar.length === 0) newErrors.d1_automatizar = "Elegí al menos un proceso.";
        if (!formData.d2_sistema_actual) newErrors.d2_sistema_actual = "Por favor, elegí una opción.";
        if (!formData.d3_whatsapp_business) newErrors.d3_whatsapp_business = "Por favor, elegí una opción.";
      } else if (path === "E") {
        if (!formData.e1_proposito) newErrors.e1_proposito = "Por favor, elegí una opción.";
        if (!formData.e2_documentacion) newErrors.e2_documentacion = "Por favor, elegí una opción.";
      } else if (path === "F") {
        if (!formData.f1_etapa) newErrors.f1_etapa = "Por favor, elegí una opción.";
        if (!formData.f2_problema.trim()) {
          newErrors.f2_problema = "Este campo es obligatorio.";
        } else if (formData.f2_problema.length > 300) {
          newErrors.f2_problema = "Máximo 300 caracteres.";
        }
        if (!formData.f3_financiamiento) newErrors.f3_financiamiento = "Por favor, elegí una opción.";
      } else if (path === "G") {
        if (!formData.g1_problema.trim()) {
          newErrors.g1_problema = "Este campo es obligatorio.";
        } else if (formData.g1_problema.length > 500) {
          newErrors.g1_problema = "Máximo 500 caracteres.";
        }
      }
    }

    if (step === 4) {
      if (!formData.tiempos_urgencia) newErrors.tiempos_urgencia = "Por favor, elegí una opción.";
      if (!formData.tiempos_presupuesto) newErrors.tiempos_presupuesto = "Por favor, elegí una opción.";
    }

    if (step === 5) {
      if (!formData.contacto_nombre.trim()) newErrors.contacto_nombre = "Ingresá tu nombre completo.";
      if (!formData.contacto_email.trim()) {
        newErrors.contacto_email = "Ingresá tu correo electrónico.";
      } else if (!/\S+@\S+\.\S+/.test(formData.contacto_email)) {
        newErrors.contacto_email = "Ingresá un email válido.";
      }
      if (!formData.contacto_whatsapp.trim()) newErrors.contacto_whatsapp = "Ingresá tu número de WhatsApp.";
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

  // Slide transition setup for wizard
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
      {/* Progress Bar & Badges */}
      {step > 0 && step < 6 && (
        <div className="mb-10 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-[var(--color-muted)]">
            <span className="text-[var(--color-accent)] font-semibold">PASO {step} DE {TOTAL_STEPS}</span>
            <span>{getProgressPercent()}% COMPLETADO</span>
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
            className="text-center space-y-8"
          >
            <div className="space-y-4 relative">
              <div className="absolute inset-0 bg-radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 60%) pointer-events-none -top-12" />
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-[var(--color-emerald)] border border-[rgba(16,185,129,0.25)] rounded-full bg-[rgba(16,185,129,0.04)]">
                <Sparkle className="w-3.5 h-3.5 animate-pulse" />
                ⏱ 3 minutos de duración
              </div>
              <h1 className="heading text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Contanos sobre tu proyecto
              </h1>
              <p className="text-base md:text-lg text-[var(--color-muted)] max-w-lg mx-auto leading-relaxed">
                Completá este formulario y te respondemos con una propuesta en menos de 24 horas. Sin compromisos.
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
                Comenzar brief
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-muted)] pt-8">
              Tu información es confidencial y no se comparte con terceros.
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
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 1 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Sobre tu negocio</h2>
            </div>

            <div className="space-y-6">
              {/* Q1.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿A qué se dedica tu negocio? *</label>
                <textarea
                  name="negocio_actividad"
                  value={formData.negocio_actividad}
                  onChange={handleTextChange}
                  placeholder="Ej: Clínica de medicina estética en Rosario"
                  maxLength={200}
                  className="w-full p-4 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 h-24 resize-none text-sm text-[var(--color-fg)]"
                />
                <div className="flex justify-between items-center text-xs">
                  <span>
                    {errors.negocio_actividad ? (
                      <span className="text-red-400 font-medium">{errors.negocio_actividad}</span>
                    ) : (
                      <span className="text-[var(--color-muted)]">Sé lo más descriptivo posible.</span>
                    )}
                  </span>
                  <span className={formData.negocio_actividad.length >= 180 ? "text-red-400 font-semibold" : "text-[var(--color-muted)]"}>
                    {formData.negocio_actividad.length}/200
                  </span>
                </div>
              </div>

              {/* Q1.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿En qué rubro estás? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Salud y medicina",
                    "Estética y bienestar",
                    "Servicios profesionales (abogados, contadores, consultoras)",
                    "Gastronomía y hotelería",
                    "Comercio y retail",
                    "Educación y capacitación",
                    "Fitness y deporte",
                    "Tecnología y startups",
                    "Emprendimiento / producto propio",
                    "Otro",
                  ].map((rubro) => (
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

              {/* Q1.3 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿Dónde operás? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Solo en Rosario",
                    "En Argentina (varias ciudades)",
                    "Latinoamérica",
                    "Internacional",
                    "100% online — sin ubicación fija",
                  ].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleSelectSingle("negocio_ubicacion", loc)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                        formData.negocio_ubicacion === loc
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
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
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Tu Proyecto (Redesigned with custom icons) */}
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
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 2 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Tu proyecto</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿Qué necesitás construir? *</label>
                <p className="text-xs text-[var(--color-muted)]">Seleccioná la opción principal para estructurar el resto del brief.</p>
                <div className="grid grid-cols-1 gap-3">
                  {buildOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = formData.proyecto_tipo === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelectSingle("proyecto_tipo", opt.label)}
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
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
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
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 3 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Especificaciones del proyecto</h2>
            </div>

            {/* CAMINO A: Presencia digital */}
            {getPath() === "A" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cuál es tu situación digital actual? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "No tengo nada — arranco desde cero",
                      "Tengo Linktree o enlace de Instagram",
                      "Tengo web pero está desactualizada",
                      "Tengo web pero no genera consultas",
                      "Tengo web en WordPress y quiero mejorarla",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("a1_situacion", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.a1_situacion === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a1_situacion && <p className="text-xs text-red-400 font-medium">{errors.a1_situacion}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Qué querés lograr con tu presencia digital? (Elegí hasta 3) *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Aparecer en Google cuando me buscan",
                      "Recibir más consultas por WhatsApp",
                      "Mostrar mis servicios profesionalmente",
                      "Reemplazar el Linktree o enlace genérico",
                      "Diferenciarme de la competencia",
                      "Tener algo que mostrar cuando me piden referencias",
                      "Gestionar el contenido yo mismo sin depender de un developer",
                    ].map((opt) => {
                      const isSelected = formData.a2_objetivos.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("a2_objetivos", opt, 3)}
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
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Necesitás panel de administración propio? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — quiero poder actualizar el contenido sin depender de nadie",
                      "No — el contenido no cambia seguido",
                      "No sé — no entiendo bien qué es eso",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("a3_panel", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.a3_panel === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a3_panel && <p className="text-xs text-red-400 font-medium">{errors.a3_panel}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Tenés identidad visual definida? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — tengo logo, colores y tipografía",
                      "Parcialmente — tengo logo pero no sistema visual completo",
                      "No — arrancamos desde cero con el diseño",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("a4_identidad", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.a4_identidad === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a4_identidad && <p className="text-xs text-red-400 font-medium">{errors.a4_identidad}</p>}
                </div>
              </div>
            )}

            {/* CAMINO B: E-commerce */}
            {getPath() === "B" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Qué vas a vender? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Productos físicos con envío",
                      "Productos digitales (cursos, ebooks, archivos)",
                      "Servicios (turnos, sesiones, consultas)",
                      "Combinación de productos y servicios",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("b1_venta", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.b1_venta === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b1_venta && <p className="text-xs text-red-400 font-medium">{errors.b1_venta}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cuántos productos tenés aproximadamente? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Menos de 20", "Entre 20 y 100", "Más de 100", "No tengo claro todavía"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("b2_cantidad", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.b2_cantidad === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b2_cantidad && <p className="text-xs text-red-400 font-medium">{errors.b2_cantidad}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Necesitás gestión de inventario? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Sí — necesito controlar stock", "No — son servicios o digitales sin stock", "No sé"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("b3_inventario", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.b3_inventario === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b3_inventario && <p className="text-xs text-red-400 font-medium">{errors.b3_inventario}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cómo querés recibir los pagos? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Mercado Pago",
                      "Tarjeta de crédito / débito internacional",
                      "Transferencia bancaria",
                      "Cripto",
                      "No tengo claro",
                    ].map((opt) => {
                      const isSelected = formData.b4_pagos.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("b4_pagos", opt)}
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
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Qué necesitás gestionar? (Elegí hasta 3) *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Clientes o pacientes",
                      "Turnos y reservas",
                      "Galería de trabajos o casos",
                      "Reseñas y testimonios",
                      "Productos o catálogo",
                      "Campañas y promociones",
                      "Métricas y reportes",
                      "Facturación o pagos",
                      "Otro",
                    ].map((opt) => {
                      const isSelected = formData.c1_gestionar.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("c1_gestionar", opt, 3)}
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
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Ya tenés una web o arrancamos todo desde cero? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Arrancamos desde cero — necesito web y panel",
                      "Tengo web — solo necesito el sistema de gestión",
                      "Tengo web y quiero reemplazarla junto al panel",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("c2_inicio", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.c2_inicio === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.c2_inicio && <p className="text-xs text-red-400 font-medium">{errors.c2_inicio}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cuántas personas van a usar el sistema? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Solo yo", "2 a 5 personas", "Más de 5 personas"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("c3_usuarios", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.c3_usuarios === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.c3_usuarios && <p className="text-xs text-red-400 font-medium">{errors.c3_usuarios}</p>}
                </div>
              </div>
            )}

            {/* CAMINO D: Automatización o Agente de IA */}
            {getPath() === "D" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Qué proceso querés automatizar? (Elegí hasta 3) *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Respuesta a consultas por WhatsApp",
                      "Seguimiento de leads que no respondieron",
                      "Recordatorio de turnos",
                      "Encuesta post-servicio",
                      "Generación de reportes",
                      "Publicación de contenido en redes",
                      "Monitoreo de reseñas de Google",
                      "Otro",
                    ].map((opt) => {
                      const isSelected = formData.d1_automatizar.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectMultiple("d1_automatizar", opt, 3)}
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
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Tenés algún sistema digital actualmente? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — tengo web, CRM o herramientas activas",
                      "No — arranco desde cero",
                      "Parcialmente — tengo algo pero es básico",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("d2_sistema_actual", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.d2_sistema_actual === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.d2_sistema_actual && <p className="text-xs text-red-400 font-medium">{errors.d2_sistema_actual}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Usás WhatsApp Business actualmente? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — es mi canal principal de atención",
                      "No — uso WhatsApp personal",
                      "No uso WhatsApp para el negocio",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("d3_whatsapp_business", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.d3_whatsapp_business === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.d3_whatsapp_business && <p className="text-xs text-red-400 font-medium">{errors.d3_whatsapp_business}</p>}
                </div>
              </div>
            )}

            {/* CAMINO E: API o Backend */}
            {getPath() === "E" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Para qué es la API o backend? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Para una app móvil que estoy desarrollando",
                      "Para conectar con una web existente",
                      "Para integrar dos sistemas que no se hablan",
                      "Para construir un sistema desde cero",
                      "No tengo claro — necesito orientación",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("e1_proposito", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.e1_proposito === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.e1_proposito && <p className="text-xs text-red-400 font-medium">{errors.e1_proposito}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Tenés documentación o requerimientos definidos? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — tengo todo documentado",
                      "Tengo una idea general pero no está documentado",
                      "No — necesito ayuda para definirlo",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("e2_documentacion", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.e2_documentacion === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.e2_documentacion && <p className="text-xs text-red-400 font-medium">{errors.e2_documentacion}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cuál es tu stack tecnológico actual? (Opcional)</label>
                  <input
                    type="text"
                    name="e3_stack"
                    value={formData.e3_stack}
                    onChange={handleTextChange}
                    placeholder="Ej: React Native para mobile, necesito backend en Node o .NET"
                    className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-colors text-sm text-[var(--color-fg)]"
                  />
                </div>
              </div>
            )}

            {/* CAMINO F: MVP de producto digital */}
            {getPath() === "F" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿En qué etapa está tu idea? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Solo tengo la idea — nada más",
                      "Tengo el modelo de negocio definido",
                      "Tengo wireframes o diseño",
                      "Tengo usuarios reales esperando el producto",
                      "Tengo una versión anterior que quiero mejorar",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("f1_etapa", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.f1_etapa === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.f1_etapa && <p className="text-xs text-red-400 font-medium">{errors.f1_etapa}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cuál es el problema central que resuelve tu producto? *</label>
                  <textarea
                    name="f2_problema"
                    value={formData.f2_problema}
                    onChange={handleTextChange}
                    placeholder="Ej: Los gimnasios pierden clientes porque no tienen sistema de seguimiento de rutinas simple"
                    maxLength={300}
                    className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-colors h-24 resize-none text-sm text-[var(--color-fg)]"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span>{errors.f2_problema && <span className="text-red-400 font-medium">{errors.f2_problema}</span>}</span>
                    <span className="text-[var(--color-muted)]">{formData.f2_problema.length}/300</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">¿Tenés financiamiento para el proyecto? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Sí — tengo presupuesto propio",
                      "Tengo inversores interesados",
                      "Estoy buscando financiamiento",
                      "Lo financio de mi bolsillo",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("f3_financiamiento", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                          formData.f3_financiamiento === opt
                            ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                            : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.f3_financiamiento && <p className="text-xs text-red-400 font-medium">{errors.f3_financiamiento}</p>}
                </div>
              </div>
            )}

            {/* CAMINO G: No tengo claro */}
            {getPath() === "G" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#F0EFF8]">Contanos en tus palabras qué problema querés resolver con tecnología: *</label>
                  <textarea
                    name="g1_problema"
                    value={formData.g1_problema}
                    onChange={handleTextChange}
                    placeholder="Ej: Tengo una clínica y mis pacientes no me encuentran en Google. Además no puedo actualizar la información de mi web solo."
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
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
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
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 4 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Tiempos y presupuesto</h2>
            </div>

            <div className="space-y-6">
              {/* Q3.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2 text-[#F0EFF8]">
                  <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                  ¿Cuándo necesitás tenerlo listo? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Urgente — antes de 2 semanas", "En 1 mes", "En 2 a 3 meses", "En 6 meses o más", "Sin fecha definida"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("tiempos_urgencia", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                        formData.tiempos_urgencia === opt
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.tiempos_urgencia && <p className="text-xs text-red-400 font-medium">{errors.tiempos_urgencia}</p>}
              </div>

              {/* Q3.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2 text-[#F0EFF8]">
                  <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
                  ¿Cuál es tu presupuesto aproximado? *
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Menos de $800 USD",
                    "$800 — $2.000 USD",
                    "$2.000 — $5.000 USD",
                    "$5.000 — $10.000 USD",
                    "Más de $10.000 USD",
                    "No tengo claro — necesito orientación",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("tiempos_presupuesto", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer flex flex-col items-start ${
                        formData.tiempos_presupuesto === opt
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      <span>{opt}</span>
                      {opt === "Menos de $800 USD" && (
                        <span className="block text-[11px] text-[var(--color-muted)] font-normal mt-0.5 leading-tight">
                          Este rango está por debajo de nuestro mínimo de proyecto. Igualmente completá el formulario y lo evaluamos.
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Business rule: budget alert for < 800 USD */}
                {formData.tiempos_presupuesto === "Menos de $800 USD" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.25)] rounded text-xs text-amber-300 flex gap-2 items-start"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Este presupuesto está por debajo de nuestro mínimo de proyecto ($800 USD). Igualmente envianos el brief — a veces hay soluciones que no contemplaste.
                    </span>
                  </motion.div>
                )}
                {errors.tiempos_presupuesto && <p className="text-xs text-red-400 font-medium">{errors.tiempos_presupuesto}</p>}
              </div>

              {/* Q3.3 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿Estás invirtiendo en publicidad digital? (Opcional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Sí — Meta Ads (Facebook/Instagram)",
                    "Sí — Google Ads",
                    "Sí — ambas",
                    "No por ahora",
                    "Quiero empezar pero no sé cómo",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("tiempos_publicidad", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                        formData.tiempos_publicidad === opt
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
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
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
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
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 5 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Datos de contacto</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field (hidden for spam prevention) */}
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

              {/* Q4.1 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">Nombre completo *</label>
                <input
                  type="text"
                  name="contacto_nombre"
                  value={formData.contacto_nombre}
                  onChange={handleTextChange}
                  placeholder="Tu nombre completo"
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_nombre && <p className="text-xs text-red-400 font-medium">{errors.contacto_nombre}</p>}
              </div>

              {/* Q4.2 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">Email *</label>
                <input
                  type="email"
                  name="contacto_email"
                  value={formData.contacto_email}
                  onChange={handleTextChange}
                  placeholder="nombre@empresa.com"
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_email && <p className="text-xs text-red-400 font-medium">{errors.contacto_email}</p>}
              </div>

              {/* Q4.3 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">WhatsApp *</label>
                <input
                  type="tel"
                  name="contacto_whatsapp"
                  value={formData.contacto_whatsapp}
                  onChange={handleTextChange}
                  placeholder="+54 9 341 XXXXXXX"
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 text-sm text-[var(--color-fg)]"
                />
                {errors.contacto_whatsapp && <p className="text-xs text-red-400 font-medium">{errors.contacto_whatsapp}</p>}
              </div>

              {/* Q4.4 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿Cómo llegaste a malcom.builder? (Opcional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Instagram (@malcombuilder)", "LinkedIn", "Me recomendaron", "Google", "Otro"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("contacto_origen", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all duration-200 cursor-pointer ${
                        formData.contacto_origen === opt
                          ? "bg-[rgba(123,97,255,0.1)] border-[var(--color-accent)] text-white font-medium"
                          : "bg-[#18181F]/60 border-[#242428] hover:border-gray-700 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4.5 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#F0EFF8]">¿Algo más que quieras contarnos? (Opcional)</label>
                <textarea
                  name="contacto_notas"
                  value={formData.contacto_notas}
                  onChange={handleTextChange}
                  placeholder="Contexto adicional, referencias visuales, urgencias especiales..."
                  className="w-full p-3 bg-[#18181F]/80 border border-[#242428] rounded-md focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(123,97,255,0.15)] outline-none transition-all duration-200 h-24 resize-none text-sm text-[var(--color-fg)]"
                />
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-900/20 border border-red-700/55 rounded text-xs text-red-400">
                  {errors.submit}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-[#242428]">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 border border-[#242428] rounded hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer text-[var(--color-muted)]"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all duration-200 flex items-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar brief
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 6: Confirmation success message (Inline) */}
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
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">✅ Recibimos tu brief</h2>
              <p className="text-[var(--color-fg)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Te respondemos en menos de 24 horas hábiles con una propuesta personalizada para{" "}
                <span className="font-bold text-[var(--color-accent)]">{formData.negocio_actividad}</span>.
              </p>
            </div>

            <div className="pt-8 border-t border-[#242428] space-y-4 max-w-sm mx-auto">
              <p className="text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider">¿Querés hablar antes? Escribinos directo:</p>
              
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://wa.me/543412282853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 bg-[#10b981]/8 hover:bg-[#10b981]/12 border border-[#10b981]/25 hover:border-[#10b981]/40 rounded text-sm text-[var(--color-emerald)] transition-all duration-200 font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  Escribir por WhatsApp
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
