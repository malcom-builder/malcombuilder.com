interface Props {
  description: string;
}

export function ProjectOverview({ description }: Props) {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "var(--color-muted)",
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
