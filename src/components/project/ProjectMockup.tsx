"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Shield, Cpu, RefreshCw, Layers } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  img: string;
}

interface Props {
  slug: string;
}

export function ProjectMockup({ slug }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  // Define mockups and configurations based on project slug
  const mockups: Record<string, { tabs: Tab[]; mobile?: string; url: string }> = {
    "zolfo-medicina-estetica": {
      url: "zolfoestetica.com.ar",
      mobile: "/images/projects/zolfo-estetica/mobile-iphone.png",
      tabs: [
        { id: "home", label: "Home", img: "/images/projects/zolfo-estetica/hero-mcbook.png" },
        { id: "admin", label: "Admin Panel", img: "/images/projects/zolfo-estetica/panel-admin-browser.png" },
        { id: "perf", label: "Performance", img: "/images/projects/zolfo-estetica/lighthouse-browser.png" },
        { id: "details", label: "Tratamientos", img: "/images/projects/zolfo-estetica/card-home-mcbook.png" },
      ],
    },
    "nurestetica": {
      url: "nurestetica.com.ar",
      mobile: "/images/projects/nur-estetica/treatment-mobile.png",
      tabs: [
        { id: "home", label: "Home", img: "/images/projects/nur-estetica/hero-macbook.png" },
        { id: "treatments", label: "Tratamientos", img: "/images/projects/nur-estetica/cards-treatment-macbook.png" },
        { id: "about", label: "Nosotros", img: "/images/projects/nur-estetica/aboute-macbook.png" },
      ],
    },
  };

  const projectMockup = mockups[slug];

  // Abstract interactive widgets for projects without screenshots
  const renderAbstractWidget = () => {
    switch (slug) {
      case "authmotion":
        return <AuthMotionWidget />;
      case "smartwallet":
        return <SmartWalletWidget />;
      case "malcombuilder":
        return <MalcomBuilderWidget />;
      case "pulse":
        return <PulseWidget />;
      default:
        return null;
    }
  };

  if (!projectMockup) {
    // If no screens are available, show the beautiful abstract interactive canvas
    return (
      <section className="section" style={{ paddingBlock: "4rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>Interactive Preview</span>
          <div 
            style={{ 
              borderRadius: "16px", 
              border: "1px solid var(--color-border)", 
              background: "var(--color-surface)",
              minHeight: "450px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)"
            }}
          >
            {renderAbstractWidget()}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingBlock: "6rem", borderBottom: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>Showcase</span>

        {/* Interface Navigation Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {projectMockup.tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.85rem",
                fontWeight: activeTab === idx ? 600 : 500,
                background: activeTab === idx ? "var(--color-accent)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeTab === idx ? "var(--color-accent)" : "var(--color-border)"}`,
                color: activeTab === idx ? "#ffffff" : "var(--color-muted)",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.21, 0.47, 0.32, 0.98)",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== idx) {
                  e.currentTarget.style.color = "var(--color-fg)";
                  e.currentTarget.style.borderColor = "rgba(123, 97, 255, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== idx) {
                  e.currentTarget.style.color = "var(--color-muted)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mockups overlapping container */}
        <div style={{ position: "relative", width: "100%", maxWidth: "1000px", marginInline: "auto" }}>
          {/* Main MacBook / Browser container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              background: "rgba(10,10,14,0.8)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5), 0 0 80px rgba(123, 97, 255, 0.15)",
              zIndex: 1,
            }}
          >
            {/* macOS Top Bar */}
            <div
              style={{
                height: "40px",
                background: "rgba(24, 24, 31, 0.5)",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                paddingInline: "1.25rem",
                gap: "0.5rem",
                position: "relative",
              }}
            >
              {/* Window controls */}
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FF5F56" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FFBD2E" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27C93F" }} />
              </div>

              {/* Address bar */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "6px",
                  padding: "0.2rem 3rem",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                }}
              >
                https://{projectMockup.url}
              </div>
            </div>

            {/* Screen Content */}
            <div style={{ position: "relative", width: "100%", height: "calc(100% - 40px)", overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={projectMockup.tabs[activeTab].img}
                    alt={projectMockup.tabs[activeTab].label}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Overlapping mobile iPhone container */}
          {projectMockup.mobile && (
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                position: "absolute",
                right: "-4%",
                bottom: "-10%",
                width: "22%",
                aspectRatio: "9/19.5",
                zIndex: 2,
                borderRadius: "32px",
                border: "4px solid #1a1a24",
                background: "#08080c",
                overflow: "hidden",
                boxShadow: "-12px 16px 50px rgba(0, 0, 0, 0.65), 0 0 40px rgba(123, 97, 255, 0.1)",
              }}
              className="hidden md:block"
            >
              {/* Dynamic Island / Notch */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50px",
                  height: "15px",
                  borderRadius: "99px",
                  background: "#000000",
                  zIndex: 3,
                }}
              />
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={projectMockup.mobile}
                  alt="Mobile Mockup"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── WIDGETS AUXILIARES PARA PROYECTOS SIN SCREENSHOTS ──────────────────────

function AuthMotionWidget() {
  const [logs, setLogs] = useState<string[]>([
    "AUTH_CORE [11:47:02] Loading IAM Configuration...",
    "AUTH_CORE [11:47:02] JWT Signing Keys registered successfully.",
    "AUTH_CORE [11:47:03] OAuth Providers verified: Google, GitHub.",
  ]);

  useEffect(() => {
    const events = [
      "REQUEST [JWT] GET /.well-known/openid-configuration - 200 OK",
      "AUTH_SERVICE - Authenticating User: malcombuilder...",
      "MFA [2FA] - Token validation requested (TOTP)",
      "MFA [2FA] - Token valid. Handshaking context.",
      "TOKEN_ENGINE - Exchanged Code for AccessToken (HttpOnly, secure)",
      "RBAC_ENGINE - Assigned Roles: [Administrator, LeadDeveloper]",
      "SESSION - Session started for 'malcom.builder'. Token expires in 3600s.",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, `AUTH_CORE [${new Date().toLocaleTimeString()}] ${events[idx]}`].slice(-14));
      idx = (idx + 1) % events.length;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "450px", display: "grid", gridTemplateColumns: "1fr", background: "#0b0c10", fontFamily: "monospace", fontSize: "0.8rem", padding: "1.5rem" }} className="md:grid-cols-3">
      {/* Columna 1: Consola */}
      <div className="md:col-span-2" style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--color-border)", paddingRight: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
          <span>AuthMotion Core Monitor v1.1.0</span>
          <span>ONLINE</span>
        </div>
        <div style={{ flex: 1, overflowY: "hidden", display: "flex", flexDirection: "column", gap: "0.25rem", color: "var(--color-fg)" }}>
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {log}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Columna 2: Estados */}
      <div style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-around" }} className="hidden md:flex">
        <div>
          <div style={{ color: "var(--color-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>JWT Sign Engine</div>
          <div style={{ fontSize: "1.25rem", color: "var(--color-fg)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} /> RS256 Active
          </div>
        </div>
        <div>
          <div style={{ color: "var(--color-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>OAuth 2.0 State</div>
          <div style={{ fontSize: "1.25rem", color: "var(--color-fg)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            <Shield size={16} style={{ color: "var(--color-accent)" }} /> Secure Shake
          </div>
        </div>
        <div>
          <div style={{ color: "var(--color-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Uptime</div>
          <div style={{ fontSize: "1.25rem", color: "#10B981", fontWeight: 600, marginTop: "0.25rem" }}>
            100% Core API
          </div>
        </div>
      </div>
    </div>
  );
}

function SmartWalletWidget() {
  const [entries, setEntries] = useState([
    { id: 1, account: "Activo (Caja)", type: "Debe", value: "$4.500,00" },
    { id: 2, account: "Ingresos (Ventas)", type: "Haber", value: "$4.500,00" },
    { id: 3, account: "Gastos (Host/SaaS)", type: "Debe", value: "$120,00" },
    { id: 4, account: "Activo (Banco)", type: "Haber", value: "$120,00" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => {
        const nextId = prev.length + 1;
        const val = (Math.random() * 500 + 50).toFixed(2);
        return [
          ...prev,
          { id: nextId, account: Math.random() > 0.5 ? "Activo (Caja/Banco)" : "Gastos (Op)", type: Math.random() > 0.5 ? "Debe" : "Haber", value: `$${val}` }
        ].slice(-6);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "450px", display: "grid", gridTemplateColumns: "1fr", background: "#0b0e14", fontFamily: "monospace", padding: "1.5rem" }} className="md:grid-cols-2">
      {/* Columna 1: Libro Diario */}
      <div style={{ borderRight: "1px solid var(--color-border)", paddingRight: "1.5rem", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-accent)", fontSize: "0.85rem", fontWeight: 700, borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          <span>Double-Entry Bookkeeping Ledger</span>
          <span>LIVE RECORD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1, overflowY: "hidden" }}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", padding: "0.625rem 1rem", borderRadius: "4px", fontSize: "0.8rem" }}
            >
              <span style={{ color: "var(--color-fg)", fontWeight: 600 }}>{entry.account}</span>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: entry.type === "Debe" ? "var(--color-accent)" : "var(--color-muted)" }}>{entry.type}</span>
                <span style={{ color: "var(--color-fg)", fontWeight: 700 }}>{entry.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Columna 2: Cifrado y Key Vault */}
      <div style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }} className="hidden md:flex">
        <div style={{ padding: "1.25rem", border: "1px solid var(--color-border)", borderRadius: "8px", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-accent)", fontWeight: 600, fontSize: "0.9rem" }}>
            <Cpu size={16} /> Azure Key Vault Protection
          </div>
          <p style={{ color: "var(--color-muted)", fontSize: "0.75rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
            All credentials, transactions and asymmetric ledger keys are signed inside HSM modules. Zero raw exposures.
          </p>
        </div>
        <div style={{ padding: "1.25rem", border: "1px solid var(--color-border)", borderRadius: "8px", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ color: "var(--color-fg)", fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <RefreshCw size={16} className="animate-spin" style={{ animationDuration: "12s" }} /> Hash Ledger Integrity
          </div>
          <p style={{ color: "var(--color-muted)", fontSize: "0.75rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
            Consensual ledger blocks cryptographic validation. Cryptographically sealed chains prevent arbitrary updates.
          </p>
        </div>
      </div>
    </div>
  );
}

function MalcomBuilderWidget() {
  return (
    <div style={{ width: "100%", height: "450px", background: "#0c0c14", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid effects */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }} />

      {/* Glow */}
      <div style={{ position: "absolute", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(123,97,255,0.15) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "450px", paddingInline: "2rem" }}>
        <Layers size={40} style={{ color: "var(--color-accent)", marginBottom: "1.5rem" }} />
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-fg)", marginBottom: "0.75rem" }}>AI-Native Mesh Stack</h4>
        <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
          malcombuilder.com operates with server components rendering directly on Edge servers. Dynamic page routing via next-intl provides multi-locale translations directly at edge network speeds.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <span style={{ fontSize: "0.7rem", padding: "0.25rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "99px", background: "rgba(255,255,255,0.02)", color: "var(--color-muted)" }}>Edge Prerendering</span>
          <span style={{ fontSize: "0.7rem", padding: "0.25rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "99px", background: "rgba(255,255,255,0.02)", color: "var(--color-muted)" }}>Framer 11 Motion</span>
        </div>
      </div>
    </div>
  );
}

function PulseWidget() {
  const [servers, setServers] = useState([
    { name: "Zolfo Medicina Estética", url: "zolfoestetica.com.ar", ping: "22ms", state: "up" },
    { name: "NurEstética", url: "nurestetica.com.ar", ping: "18ms", state: "up" },
    { name: "SmartWallet Core API", url: "api.smartwallet.com", ping: "15ms", state: "up" },
    { name: "malcombuilder.com", url: "malcombuilder.com", ping: "8ms", state: "up" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((srv) => ({
          ...srv,
          ping: `${Math.floor(Math.random() * 20 + 8)}ms`
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "450px", background: "#0b0c10", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10b981" }} />
          <span style={{ color: "var(--color-fg)", fontWeight: 700, fontSize: "0.85rem" }}>Pulse SiteMonitor Service</span>
        </div>
        <span style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>PING RATE: 5m</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBlock: "1.5rem", flex: 1, justifyContent: "center" }}>
        {servers.map((srv) => (
          <div key={srv.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", border: "1px solid var(--color-border)", borderRadius: "6px", background: "rgba(255,255,255,0.01)" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "var(--color-fg)", fontWeight: 600, fontSize: "0.85rem" }}>{srv.name}</span>
              <span style={{ color: "var(--color-muted)", fontSize: "0.7rem", marginTop: "0.125rem" }}>{srv.url}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <span style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700 }}>{srv.ping}</span>
              <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(16,185,129,0.1)", color: "#10B981", fontWeight: 700 }}>ONLINE</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", fontSize: "0.75rem", color: "var(--color-muted)" }}>
        <span>SSL Checked: 4/4 SITES</span>
        <span>ALERT SYSTEM: TELEGRAM (ACTIVE)</span>
      </div>
    </div>
  );
}