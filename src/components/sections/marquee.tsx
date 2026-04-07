"use client";
import {skills} from "@/lib/data";

const r1 = [...skills, ...skills];
const r2 = [...skills.slice(7), ...skills, ...skills.slice(0,7)];

export const Marquee = () => {
    return (
        <section style={{
            borderTop: "1px solid var(--c-rule)",
            borderBottom: "1px solid var(--c-rule)",
            padding: "clamp(3rem,5vw,6rem) 0",
            overflow: "hidden", background: "var(--c-bg)",
        }}>
            <div style={{ marginBottom: "1rem", overflow: "hidden" }}>
                <div className="mq-left" style={{ whiteSpace: "nowrap" }}>
                    {r1.map((s, i) => (
                        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                  fontFamily: "var(--f-serif)", fontSize: "clamp(2rem,4vw,4.5rem)",
                  fontWeight: 300, fontStyle: "italic", letterSpacing: "-.03em",
                  color: i % 6 === 0 ? "var(--c-ink)" : "var(--c-rule)",
                  padding: "0 2rem",
              }}>{s}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--c-rule)", flexShrink: 0 }} />
            </span>
                    ))}
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <div className="mq-right" style={{ whiteSpace: "nowrap" }}>
                    {r2.map((s, i) => (
                        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                  fontFamily: "var(--f-serif)", fontSize: "clamp(2rem,4vw,4.5rem)",
                  fontWeight: 300, fontStyle: "italic", letterSpacing: "-.03em",
                  color: i % 5 === 0 ? "var(--c-ink)" : "var(--c-rule)",
                  padding: "0 2rem",
              }}>{s}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--c-rule)", flexShrink: 0 }} />
            </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
