"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, CheckCircle, Calendar, DollarSign, MessageSquare, AlertCircle } from "lucide-react";

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

export function BriefForm() {
  const [step, setStep] = useState<number>(0);
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

  // Determine total steps
  // 0: Header, 1: Tu Negocio, 2: Tu Proyecto, 3: Camino (A-G), 4: Tiempos y Presupuesto, 5: Tu Contacto
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
        // Remove first and add the new one or reject
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
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    // Prepare path data payload
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
          negocio_nombre: formData.negocio_actividad, // Activity also serving as business description
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
          honeypot: formData.honeypot, // Honeypot field
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

  return (
    <div ref={topRef} className="w-full max-w-2xl mx-auto px-4 py-8 text-[var(--color-fg)]">
      {/* ProgressBar */}
      {step > 0 && step < 6 && (
        <div className="w-full h-1.5 bg-[#242428] rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercent()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 0: Welcome / Header */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-mono text-[var(--color-emerald)] border border-[rgba(16,185,129,0.3)] rounded-full bg-[rgba(16,185,129,0.05)]">
                ⏱ 3 minutos
              </span>
              <h1 className="heading text-4xl md:text-5xl font-black">
                Contanos sobre tu proyecto
              </h1>
              <p className="text-lg text-[var(--color-muted)] max-w-lg mx-auto">
                Completá este formulario y te respondemos con una propuesta en menos de 24 horas. Sin compromisos.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setStep(1)}
                className="w-full md:w-auto px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[rgba(123,97,255,0.25)]"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 1 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Sobre tu negocio</h2>
            </div>

            <div className="space-y-6">
              {/* Q1.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿A qué se dedica tu negocio? *</label>
                <textarea
                  name="negocio_actividad"
                  value={formData.negocio_actividad}
                  onChange={handleTextChange}
                  placeholder="Ej: Clínica de medicina estética en Rosario"
                  maxLength={200}
                  className="w-full p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors h-24 resize-none"
                />
                <div className="flex justify-between items-center text-xs text-[var(--color-muted)]">
                  <span>{errors.negocio_actividad ? <span className="text-red-500">{errors.negocio_actividad}</span> : "Sé lo más descriptivo posible."}</span>
                  <span>{formData.negocio_actividad.length}/200</span>
                </div>
              </div>

              {/* Q1.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿En qué rubro estás? *</label>
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
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.negocio_rubro === rubro
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {rubro}
                    </button>
                  ))}
                </div>
                {errors.negocio_rubro && <p className="text-xs text-red-500">{errors.negocio_rubro}</p>}
              </div>

              {/* Q1.3 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿Dónde operás? *</label>
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
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.negocio_ubicacion === loc
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
                {errors.negocio_ubicacion && <p className="text-xs text-red-500">{errors.negocio_ubicacion}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Tu Proyecto */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 2 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Tu proyecto</h2>
            </div>

            <div className="space-y-6">
              {/* Q2.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿Qué necesitás construir? *</label>
                <p className="text-xs text-[var(--color-muted)] mb-4">Esta respuesta definirá el camino condicional del formulario.</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    "Presencia digital (web, landing page)",
                    "Tienda online (e-commerce)",
                    "Sistema con panel de gestión (admin, dashboard)",
                    "Automatización o agente de IA",
                    "API o backend para mi aplicación",
                    "MVP de producto digital",
                    "No tengo claro — necesito orientación",
                  ].map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => handleSelectSingle("proyecto_tipo", tipo)}
                      className={`p-4 text-left rounded border text-sm md:text-base font-semibold transition-all cursor-pointer ${
                        formData.proyecto_tipo === tipo
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white shadow-md shadow-[rgba(123,97,255,0.1)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
                {errors.proyecto_tipo && <p className="text-xs text-red-500">{errors.proyecto_tipo}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Camino Condicional (A-G) */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 3 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Especificaciones del proyecto</h2>
            </div>

            {/* CAMINO A: Presencia digital */}
            {getPath() === "A" && (
              <div className="space-y-6">
                {/* A.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cuál es tu situación digital actual? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.a1_situacion === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a1_situacion && <p className="text-xs text-red-500">{errors.a1_situacion}</p>}
                </div>

                {/* A.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Qué querés lograr con tu presencia digital? (Elegí hasta 3) *</label>
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
                          className={`p-3 text-left rounded border text-sm transition-all cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                              : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.a2_objetivos && <p className="text-xs text-red-500">{errors.a2_objetivos}</p>}
                </div>

                {/* A.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Necesitás panel de administración propio? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.a3_panel === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a3_panel && <p className="text-xs text-red-500">{errors.a3_panel}</p>}
                </div>

                {/* A.4 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Tenés identidad visual definida? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.a4_identidad === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.a4_identidad && <p className="text-xs text-red-500">{errors.a4_identidad}</p>}
                </div>
              </div>
            )}

            {/* CAMINO B: E-commerce */}
            {getPath() === "B" && (
              <div className="space-y-6">
                {/* B.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Qué vas a vender? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.b1_venta === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b1_venta && <p className="text-xs text-red-500">{errors.b1_venta}</p>}
                </div>

                {/* B.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cuántos productos tenés aproximadamente? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Menos de 20", "Entre 20 y 100", "Más de 100", "No tengo claro todavía"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("b2_cantidad", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.b2_cantidad === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b2_cantidad && <p className="text-xs text-red-500">{errors.b2_cantidad}</p>}
                </div>

                {/* B.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Necesitás gestión de inventario? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Sí — necesito controlar stock", "No — son servicios o digitales sin stock", "No sé"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("b3_inventario", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.b3_inventario === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.b3_inventario && <p className="text-xs text-red-500">{errors.b3_inventario}</p>}
                </div>

                {/* B.4 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cómo querés recibir los pagos? *</label>
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
                          className={`p-3 text-left rounded border text-sm transition-all cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                              : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.b4_pagos && <p className="text-xs text-red-500">{errors.b4_pagos}</p>}
                </div>
              </div>
            )}

            {/* CAMINO C: Sistema con panel de gestión */}
            {getPath() === "C" && (
              <div className="space-y-6">
                {/* C.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Qué necesitás gestionar? (Elegí hasta 3) *</label>
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
                          className={`p-3 text-left rounded border text-sm transition-all cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                              : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.c1_gestionar && <p className="text-xs text-red-500">{errors.c1_gestionar}</p>}
                </div>

                {/* C.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Ya tenés una web o arrancamos todo desde cero? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.c2_inicio === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.c2_inicio && <p className="text-xs text-red-500">{errors.c2_inicio}</p>}
                </div>

                {/* C.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cuántas personas van a usar el sistema? *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Solo yo", "2 a 5 personas", "Más de 5 personas"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectSingle("c3_usuarios", opt)}
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.c3_usuarios === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.c3_usuarios && <p className="text-xs text-red-500">{errors.c3_usuarios}</p>}
                </div>
              </div>
            )}

            {/* CAMINO D: Automatización o Agente de IA */}
            {getPath() === "D" && (
              <div className="space-y-6">
                {/* D.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Qué proceso querés automatizar? (Elegí hasta 3) *</label>
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
                          className={`p-3 text-left rounded border text-sm transition-all cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                              : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <span className="text-[var(--color-accent)] font-bold text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.d1_automatizar && <p className="text-xs text-red-500">{errors.d1_automatizar}</p>}
                </div>

                {/* D.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Tenés algún sistema digital actualmente? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.d2_sistema_actual === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.d2_sistema_actual && <p className="text-xs text-red-500">{errors.d2_sistema_actual}</p>}
                </div>

                {/* D.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Usás WhatsApp Business actualmente? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.d3_whatsapp_business === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.d3_whatsapp_business && <p className="text-xs text-red-500">{errors.d3_whatsapp_business}</p>}
                </div>
              </div>
            )}

            {/* CAMINO E: API o Backend */}
            {getPath() === "E" && (
              <div className="space-y-6">
                {/* E.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Para qué es la API o backend? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.e1_proposito === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.e1_proposito && <p className="text-xs text-red-500">{errors.e1_proposito}</p>}
                </div>

                {/* E.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Tenés documentación o requerimientos definidos? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.e2_documentacion === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.e2_documentacion && <p className="text-xs text-red-500">{errors.e2_documentacion}</p>}
                </div>

                {/* E.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cuál es tu stack tecnológico actual? (Opcional)</label>
                  <input
                    type="text"
                    name="e3_stack"
                    value={formData.e3_stack}
                    onChange={handleTextChange}
                    placeholder="Ej: React Native para mobile, necesito backend en Node o .NET"
                    className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors text-sm"
                  />
                </div>
              </div>
            )}

            {/* CAMINO F: MVP de producto digital */}
            {getPath() === "F" && (
              <div className="space-y-6">
                {/* F.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿En qué etapa está tu idea? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.f1_etapa === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.f1_etapa && <p className="text-xs text-red-500">{errors.f1_etapa}</p>}
                </div>

                {/* F.2 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Cuál es el problema central que resuelve tu producto? *</label>
                  <textarea
                    name="f2_problema"
                    value={formData.f2_problema}
                    onChange={handleTextChange}
                    placeholder="Ej: Los gimnasios pierden clientes porque no tienen sistema de seguimiento de rutinas simple"
                    maxLength={300}
                    className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors h-24 resize-none text-sm"
                  />
                  <div className="flex justify-between items-center text-xs text-[var(--color-muted)]">
                    <span>{errors.f2_problema ? <span className="text-red-500">{errors.f2_problema}</span> : ""}</span>
                    <span>{formData.f2_problema.length}/300</span>
                  </div>
                </div>

                {/* F.3 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">¿Tenés financiamiento para el proyecto? *</label>
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
                        className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                          formData.f3_financiamiento === opt
                            ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.f3_financiamiento && <p className="text-xs text-red-500">{errors.f3_financiamiento}</p>}
                </div>
              </div>
            )}

            {/* CAMINO G: No tengo claro */}
            {getPath() === "G" && (
              <div className="space-y-6">
                {/* G.1 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Contanos en tus palabras qué problema querés resolver con tecnología: *</label>
                  <textarea
                    name="g1_problema"
                    value={formData.g1_problema}
                    onChange={handleTextChange}
                    placeholder="Ej: Tengo una clínica y mis pacientes no me encuentran en Google. Además no puedo actualizar la información de mi web solo."
                    maxLength={500}
                    className="w-full p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors h-36 resize-none text-sm"
                  />
                  <div className="flex justify-between items-center text-xs text-[var(--color-muted)]">
                    <span>{errors.g1_problema ? <span className="text-red-500">{errors.g1_problema}</span> : ""}</span>
                    <span>{formData.g1_problema.length}/500</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all flex items-center gap-2 text-sm cursor-pointer"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 4 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Tiempos y presupuesto</h2>
            </div>

            <div className="space-y-6">
              {/* Q3.1 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                  ¿Cuándo necesitás tenerlo listo? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Urgente — antes de 2 semanas", "En 1 mes", "En 2 a 3 meses", "En 6 meses o más", "Sin fecha definida"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("tiempos_urgencia", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.tiempos_urgencia === opt
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.tiempos_urgencia && <p className="text-xs text-red-500">{errors.tiempos_urgencia}</p>}
              </div>

              {/* Q3.2 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold flex items-center gap-2">
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
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.tiempos_presupuesto === opt
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      <span>{opt}</span>
                      {opt === "Menos de $800 USD" && (
                        <span className="block text-xs text-[var(--color-muted)] font-normal mt-0.5">
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
                    className="p-3 bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.3)] rounded text-xs text-amber-400 flex gap-2 items-start"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Este presupuesto está por debajo de nuestro mínimo de proyecto ($800 USD). Igualmente envianos el brief — a veces hay soluciones que no contemplaste.
                    </span>
                  </motion.div>
                )}
                {errors.tiempos_presupuesto && <p className="text-xs text-red-500">{errors.tiempos_presupuesto}</p>}
              </div>

              {/* Q3.3 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿Estás invirtiendo en publicidad digital? (Opcional)</label>
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
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.tiempos_publicidad === opt
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all flex items-center gap-2 text-sm cursor-pointer"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider">Paso 5 / 5</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Datos de contacto</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-semibold">Nombre completo *</label>
                <input
                  type="text"
                  name="contacto_nombre"
                  value={formData.contacto_nombre}
                  onChange={handleTextChange}
                  placeholder="Tu nombre completo"
                  className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors text-sm"
                />
                {errors.contacto_nombre && <p className="text-xs text-red-500">{errors.contacto_nombre}</p>}
              </div>

              {/* Q4.2 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold">Email *</label>
                <input
                  type="email"
                  name="contacto_email"
                  value={formData.contacto_email}
                  onChange={handleTextChange}
                  placeholder="nombre@empresa.com"
                  className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors text-sm"
                />
                {errors.contacto_email && <p className="text-xs text-red-500">{errors.contacto_email}</p>}
              </div>

              {/* Q4.3 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold">WhatsApp *</label>
                <input
                  type="tel"
                  name="contacto_whatsapp"
                  value={formData.contacto_whatsapp}
                  onChange={handleTextChange}
                  placeholder="+54 9 341 XXXXXXX"
                  className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors text-sm"
                />
                {errors.contacto_whatsapp && <p className="text-xs text-red-500">{errors.contacto_whatsapp}</p>}
              </div>

              {/* Q4.4 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">¿Cómo llegaste a malcom.builder? (Opcional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Instagram (@malcombuilder)", "LinkedIn", "Me recomendaron", "Google", "Otro"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectSingle("contacto_origen", opt)}
                      className={`p-3 text-left rounded border text-sm transition-all cursor-pointer ${
                        formData.contacto_origen === opt
                          ? "bg-[rgba(123,97,255,0.15)] border-[var(--color-accent)] text-white"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-gray-600"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4.5 */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold">¿Algo más que quieras contarnos? (Opcional)</label>
                <textarea
                  name="contacto_notas"
                  value={formData.contacto_notas}
                  onChange={handleTextChange}
                  placeholder="Contexto adicional, referencias visuales, urgencias especiales..."
                  className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] outline-none transition-colors h-24 resize-none text-sm"
                />
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded text-xs text-red-400">
                  {errors.submit}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] transition-all flex items-center gap-2 text-sm cursor-pointer"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded transition-all flex items-center gap-2 text-sm cursor-pointer disabled:opacity-50"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-6 shadow-xl relative overflow-hidden"
          >
            {/* Soft emerald pulse glow */}
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%) pointer-events-none" />
            
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[var(--color-emerald)]" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">✅ Recibimos tu brief</h2>
              <p className="text-[var(--color-fg)] text-base max-w-md mx-auto">
                Te respondemos en menos de 24 horas hábiles con una propuesta personalizada para{" "}
                <span className="font-bold text-[var(--color-accent)]">{formData.negocio_actividad}</span>.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] space-y-4 max-w-sm mx-auto">
              <p className="text-xs text-[var(--color-muted)] font-medium">¿Querés hablar antes? Escribinos directo:</p>
              
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://wa.me/543412282853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-[#10b981]/10 border border-[#10b981]/30 hover:bg-[#10b981]/20 rounded text-sm text-[var(--color-emerald)] transition-all font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  Escribir por WhatsApp
                </a>
                <a
                  href="mailto:contact@malcombuilder.com"
                  className="flex items-center justify-center gap-2 p-3 bg-[var(--color-border)] hover:bg-gray-800 rounded text-sm text-[var(--color-fg)] transition-all font-medium"
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
