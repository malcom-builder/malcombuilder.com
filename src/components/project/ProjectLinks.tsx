"use client";

import { ArrowUpRight, Code } from "lucide-react";

interface Props {
  url: string;
  github?: string;
}

export function ProjectLinks({ url, github }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visitar sitio <ArrowUpRight size={16} />
          </a>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Code size={16} /> Ver código
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
