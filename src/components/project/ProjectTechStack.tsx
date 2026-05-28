"use client";

interface Props {
  techStack: string[];
}

export function ProjectTechStack({ techStack }: Props) {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>Stack</span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.625rem",
          }}
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                border: "1px solid var(--color-border)",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-fg)",
                background: "var(--color-card)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-fg)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
