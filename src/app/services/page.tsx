"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimatePresence, motion} from "framer-motion";
import {PageLayout} from "@/components/layout/page-layout";
import {pricing, services} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".sv-row", {
                opacity: 0, x: -24, stagger: .07, duration: .85, ease: "power3.out",
                scrollTrigger: { trigger: ".sv-list", start: "top 82%" },
            });
            gsap.from(".sv-price-card", {
                opacity: 0, y: 32, stagger: .1, duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: ".sv-pricing", start: "top 80%" },
            });
            gsap.utils.toArray<HTMLElement>(".sv-head").forEach(el => {
                gsap.from(el.querySelectorAll(".reveal-line"), {
                    yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <PageLayout label="Services" title="What I build." subtitle="End-to-end frontend and full-stack development. Every engagement is a genuine partnership — your success is my portfolio.">
            <div ref={ref}>

                {/* ── SERVICES LIST ── */}
                <div className="wrap" style={{ paddingTop: "clamp(4rem,7vw,9rem)" }}>
                    <div className="sv-list" style={{ borderTop: "1px solid var(--c-rule)" }}>
                        {services.map((s) => (
                            <div key={s.n} className="sv-row" style={{ borderBottom: "1px solid var(--c-rule)" }}>
                                <button onClick={() => setActive(active === s.n ? null : s.n)}
                                        style={{
                                            width: "100%", display: "grid",
                                            gridTemplateColumns: "clamp(5rem,8vw,9rem) 1fr auto",
                                            alignItems: "center", gap: "2rem",
                                            padding: "clamp(1.8rem,3vw,2.8rem) 0", textAlign: "left",
                                        }}>
                                    <span className="svc-row__num">{s.n}</span>
                                    <motion.span animate={{ color: active === s.n ? "var(--c-ink)" : "var(--c-ink2)" }}
                                                 style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.6rem,2.8vw,3rem)", letterSpacing: "-.025em" }}>
                                        {s.title}
                                    </motion.span>
                                    <motion.span animate={{ rotate: active === s.n ? 45 : 0 }} transition={{ duration: .4, ease: [.16,1,.3,1] }}
                                                 style={{ fontFamily: "var(--f-mono)", fontSize: "1.4rem", color: active === s.n ? "var(--c-ink)" : "var(--c-rule2)", lineHeight: 1, display: "block" }}>
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {active === s.n && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease: [.16,1,.3,1] }} style={{ overflow: "hidden" }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "clamp(5rem,8vw,9rem) 1fr", gap: "2rem", paddingBottom: "clamp(2rem,4vw,3.5rem)" }}>
                                                <div />
                                                <div>
                                                    <p className="t-body-lg" style={{ maxWidth: 560, marginBottom: "1.5rem" }}>{s.body}</p>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                                                        {s.tags.map(t => (
                                                            <span key={t} style={{ fontFamily: "var(--f-mono)", fontSize: ".55rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--c-mid)", border: "1px solid var(--c-rule)", padding: ".35rem .85rem" }}>{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── PRICING ── */}
                <div className="wrap sv-pricing" style={{ paddingTop: "clamp(6rem,10vw,12rem)", paddingBottom: "clamp(6rem,10vw,12rem)", borderTop: "1px solid var(--c-rule)", marginTop: "clamp(4rem,7vw,9rem)" }}>
                    <div className="sv-head" style={{ marginBottom: "clamp(4rem,7vw,9rem)" }}>
                        <p className="t-label" style={{ marginBottom: "1.25rem" }}>Pricing</p>
                        <div className="line-clip"><div className="reveal-line t-h1">Transparent.</div></div>
                        <div className="line-clip"><div className="reveal-line t-h1" style={{ color: "var(--c-rule2)" }}>No surprises.</div></div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--c-rule)" }} className="sv-price-grid">
                        {pricing.map(plan => (
                            <div key={plan.name} className="sv-price-card" style={{
                                background: plan.highlight ? "var(--c-ink)" : "var(--c-bg)",
                                padding: "clamp(2.5rem,4vw,4rem)",
                                position: "relative",
                            }}>
                                {plan.highlight && (
                                    <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
                                        <span style={{ fontFamily: "var(--f-mono)", fontSize: ".52rem", letterSpacing: ".14em", textTransform: "uppercase", background: "var(--c-bg)", color: "var(--c-ink)", padding: ".3rem .8rem" }}>Popular</span>
                                    </div>
                                )}
                                <p className="t-label" style={{ marginBottom: "1.5rem", color: plan.highlight ? "rgba(248,247,244,.4)" : undefined }}>{plan.name}</p>
                                <div style={{
                                    fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                                    fontSize: "clamp(2.5rem,5vw,5rem)", letterSpacing: "-.04em",
                                    color: plan.highlight ? "var(--c-bg)" : "var(--c-ink)",
                                    lineHeight: 1, marginBottom: "1.5rem",
                                }}>{plan.price}</div>
                                <p className="t-body" style={{ marginBottom: "2.5rem", fontSize: ".9rem", color: plan.highlight ? "rgba(248,247,244,.5)" : undefined, lineHeight: 1.7 }}>{plan.desc}</p>
                                <ul style={{ listStyle: "none", marginBottom: "3rem", display: "flex", flexDirection: "column", gap: ".75rem" }}>
                                    {plan.features.map(f => (
                                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: ".75rem" }}>
                      <span style={{ flexShrink: 0, width: 14, height: 14, border: `1px solid ${plan.highlight ? "rgba(248,247,244,.2)" : "var(--c-rule)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                        <span style={{ width: 5, height: 5, background: plan.highlight ? "rgba(248,247,244,.6)" : "var(--c-ink2)", display: "block" }} />
                      </span>
                                            <span style={{ fontFamily: "var(--f-sans)", fontSize: ".85rem", color: plan.highlight ? "rgba(248,247,244,.7)" : "var(--c-ink2)", fontWeight: 300, lineHeight: 1.5 }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="/contact" style={{
                                    display: "block", textAlign: "center",
                                    fontFamily: "var(--f-mono)", fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase",
                                    padding: "1rem",
                                    background: plan.highlight ? "var(--c-bg)" : "transparent",
                                    color: plan.highlight ? "var(--c-ink)" : "var(--c-ink2)",
                                    border: `1px solid ${plan.highlight ? "transparent" : "var(--c-rule)"}`,
                                    transition: "opacity .3s",
                                }}
                                   onMouseEnter={e => (e.currentTarget.style.opacity = ".7")}
                                   onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                                >
                                    {plan.cta} →
                                </a>
                            </div>
                        ))}
                    </div>

                    <p className="t-body" style={{ textAlign: "center", marginTop: "2rem", fontSize: ".85rem" }}>
                        Not sure which fits? <a href="/contact" style={{ color: "var(--c-ink)", borderBottom: "1px solid var(--c-rule)", transition: "border-color .3s" }}
                                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)")}
                                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--c-rule)")}>
                        Let's talk through your project.
                    </a>
                    </p>
                </div>
            </div>

            <style>{`
        @media(max-width:768px){
          .sv-list button { grid-template-columns:4rem 1fr auto!important; }
          .sv-price-grid { grid-template-columns:1fr!important; }
        }
      `}</style>
        </PageLayout>
    );
}
