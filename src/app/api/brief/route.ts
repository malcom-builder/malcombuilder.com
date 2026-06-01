import { NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory store for rate limiting (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the window
  const activeTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

// Helper to calculate 24 business hours from now
// Simple approximation: if weekend, reply by Tuesday. If weekday, reply by next business day.
function calculateBusinessDeadline(now: Date): string {
  const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const deadlineDate = new Date(now);
  
  if (day === 5) {
    // Friday -> Monday
    deadlineDate.setDate(now.getDate() + 3);
  } else if (day === 6) {
    // Saturday -> Tuesday
    deadlineDate.setDate(now.getDate() + 3);
  } else if (day === 0) {
    // Sunday -> Monday
    deadlineDate.setDate(now.getDate() + 1);
  } else {
    // Mon-Thu -> Next Day
    deadlineDate.setDate(now.getDate() + 1);
  }
  
  // Format as DD/MM/YYYY or DD de Mes
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  };
  
  const formatted = deadlineDate.toLocaleDateString("es-AR", options);
  // Capitalize first letter
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Honeypot check
    if (body.honeypot) {
      // Quietly return success to confuse bot
      return NextResponse.json({ success: true, bot: true });
    }

    const {
      negocio_nombre,
      rubro,
      ubicacion,
      proyecto_tipo,
      proyecto_respuestas,
      tiempos_urgencia,
      tiempos_presupuesto,
      tiempos_publicidad,
      contacto_nombre,
      contacto_email,
      contacto_whatsapp,
      contacto_origen,
      contacto_notas,
    } = body;

    // Validate required fields
    if (
      !negocio_nombre ||
      !rubro ||
      !ubicacion ||
      !proyecto_tipo ||
      !tiempos_urgencia ||
      !tiempos_presupuesto ||
      !contacto_nombre ||
      !contacto_email ||
      !contacto_whatsapp
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not defined. Email dispatch will be simulated.");
    }
    const resend = new Resend(resendApiKey || "mock-key");

    // Map project type to a friendly Spanish string for the client email
    const projectDescriptions: Record<string, string> = {
      "Presencia digital (web, landing page)": "la presencia digital (web, landing page)",
      "Tienda online (e-commerce)": "la tienda online (e-commerce)",
      "Sistema con panel de gestión (admin, dashboard)": "el sistema con panel de gestión",
      "Automatización o agente de IA": "la automatización o agente de IA",
      "API o backend para mi aplicación": "la API o backend para tu aplicación",
      "MVP de producto digital": "el MVP de tu producto digital",
      "No tengo claro — necesito orientación": "la orientación tecnológica para tu idea",
    };

    const projectDesc = projectDescriptions[proyecto_tipo] || "tu proyecto digital";
    const deadlineString = calculateBusinessDeadline(new Date());

    // Flag budget under $800 USD with a yellow circle
    const isLowBudget = tiempos_presupuesto === "Menos de $800 USD";
    const budgetFlag = isLowBudget ? "🟡 [BAJO PRESUPUESTO]" : "";
    const subjectInternal = `${budgetFlag} Nuevo brief — ${negocio_nombre} — ${rubro}`;

    // Format project-specific details as HTML list items
    const answersHtml = Object.entries(proyecto_respuestas || {})
      .map(([key, val]) => {
        const formattedVal = Array.isArray(val) ? val.join(", ") : val;
        return `<li><strong>${key}:</strong> ${formattedVal}</li>`;
      })
      .join("");

    // 1. Send Internal Email to malcom.builder
    const internalEmailBody = `
      <h2>Nuevo brief recibido</h2>
      <p><strong>Nombre:</strong> ${contacto_nombre}</p>
      <p><strong>Negocio:</strong> ${negocio_nombre}</p>
      <p><strong>Rubro:</strong> ${rubro}</p>
      <p><strong>Ubicación:</strong> ${ubicacion}</p>
      <p><strong>Email:</strong> ${contacto_email}</p>
      <p><strong>WhatsApp:</strong> ${contacto_whatsapp}</p>
      <hr />
      <h3>PROYECTO</h3>
      <p><strong>Tipo:</strong> ${proyecto_tipo}</p>
      <ul>
        ${answersHtml}
      </ul>
      <hr />
      <h3>TIEMPOS Y PRESUPUESTO</h3>
      <p><strong>Urgencia:</strong> ${tiempos_urgencia}</p>
      <p><strong>Presupuesto:</strong> ${tiempos_presupuesto} ${isLowBudget ? "🟡" : ""}</p>
      <p><strong>Publicidad:</strong> ${tiempos_publicidad || "No especificado"}</p>
      <hr />
      <h3>ORIGEN</h3>
      <p><strong>Cómo llegó:</strong> ${contacto_origen || "No especificado"}</p>
      ${contacto_notas ? `<p><strong>Notas:</strong> ${contacto_notas}</p>` : ""}
      <hr />
      <p style="color: #666; font-size: 12px;">
        Responder en menos de 24 horas hábiles.<br />
        Usar PROPOSAL.md para armar la propuesta.<br />
        Cargar CATALOG.md y PRICING.md como contexto.
      </p>
    `;

    // 2. Send Client Email
    const clientEmailBody = `
      <p>Hola ${contacto_nombre},</p>
      <p>Recibí tu brief sobre ${projectDesc}.</p>
      <p>Te respondo con una propuesta personalizada antes del <strong>${deadlineString}</strong> (en menos de 24hs hábiles).</p>
      <p>Si mientras tanto surge alguna consulta, respondé este email o escribime por WhatsApp.</p>
      <br />
      <p>
        Malcom<br />
        <strong>malcom.builder</strong><br />
        <a href="mailto:contact@malcombuilder.com">contact@malcombuilder.com</a><br />
        <a href="https://wa.me/543412282853">+54 9 341 228-2853</a>
      </p>
    `;

    if (resendApiKey) {
      // Send internal notification
      await resend.emails.send({
        from: "brief@malcombuilder.com",
        to: "contact@malcombuilder.com",
        subject: subjectInternal,
        html: internalEmailBody,
      });

      // Send client confirmation
      await resend.emails.send({
        from: "contact@malcombuilder.com",
        to: contacto_email,
        subject: "Recibí tu brief — malcom.builder",
        html: clientEmailBody,
      });
    } else {
      console.log("--- MOCK EMAIL SEND ---");
      console.log("To Internal:", "contact@malcombuilder.com", "Subject:", subjectInternal);
      console.log("To Client:", contacto_email, "Subject: Recibí tu brief — malcom.builder");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error handling brief submission:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
