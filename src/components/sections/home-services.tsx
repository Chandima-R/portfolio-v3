"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimatePresence, motion} from "framer-motion";
import {services} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const HomeServices = () => {
    const sec = useRef<HTMLElement>(null);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hs-head .reveal-line", {
                yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: ".hs-head", start: "top 85%" },
            });
            gsap.from(".svc-row", {
                opacity: 0, x: -24, stagger: .07, duration: .85, ease: "power3.out",
                scrollTrigger: { trigger: ".svc-list", start: "top 82%" },
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sec} className="section" style={{ borderTop: "1px solid var(--c-rule)" }}>
            <div className="wrap">
                {/* header */}
                <div className="hs-head" style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(2rem,6vw,8rem)",
                    marginBottom: "clamp(4rem,7vw,9rem)",
                    alignItems: "flex-end",
                }}>
                    <div>
                        <p className="t-label" style={{ marginBottom: "1.5rem" }}>What I Offer</p>
                        <div className="line-clip"><div className="reveal-line t-h1">Services built</div></div>
                        <div className="line-clip">
                            <div className="reveal-line t-h1" style={{ color: "var(--c-rule2)" }}>for results.</div>
                        </div>
                    </div>
                    <div>
                        <p className="t-body-lg" style={{ maxWidth: 380 }}>
                            End-to-end frontend and full-stack development. From architectural planning
                            to pixel-perfect implementation — every engagement is a genuine partnership.
                        </p>
                        <a href="/services" className="btn-text t-label" style={{ display: "inline-block", marginTop: "2rem" }}>
                            See pricing →
                        </a>
                    </div>
                </div>

                {/* accordion rows */}
                <div className="svc-list" style={{ borderTop: "1px solid var(--c-rule)" }}>
                    {services.map((s) => (
                        <div key={s.n} className="svc-row" style={{ borderBottom: "1px solid var(--c-rule)" }}>
                            <button
                                onClick={() => setActive(active === s.n ? null : s.n)}
                                style={{
                                    width: "100%", display: "grid",
                                    gridTemplateColumns: "clamp(5rem,8vw,9rem) 1fr auto",
                                    alignItems: "center", gap: "2rem",
                                    padding: "clamp(1.8rem,3vw,2.8rem) 0",
                                    textAlign: "left", position: "relative",
                                }}
                            >
                                {/* giant number */}
                                <span className="svc-row__num">{s.n}</span>

                                {/* title */}
                                <motion.span
                                    animate={{ color: active === s.n ? "var(--c-ink)" : "var(--c-ink2)" }}
                                    style={{
                                        fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                                        fontSize: "clamp(1.6rem,2.8vw,3rem)", letterSpacing: "-.025em",
                                    }}
                                >
                                    {s.title}
                                </motion.span>

                                {/* plus/minus */}
                                <motion.span
                                    animate={{ rotate: active === s.n ? 45 : 0 }}
                                    transition={{ duration: .4, ease: [.16,1,.3,1] }}
                                    style={{
                                        fontFamily: "var(--f-mono)", fontSize: "1.4rem",
                                        color: active === s.n ? "var(--c-ink)" : "var(--c-rule2)",
                                        lineHeight: 1, display: "block",
                                    }}
                                >+</motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {active === s.n && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: .5, ease: [.16,1,.3,1] }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "clamp(5rem,8vw,9rem) 1fr",
                                            gap: "2rem",
                                            paddingBottom: "clamp(2rem,4vw,3.5rem)",
                                        }}>
                                            <div />
                                            <div>
                                                <p className="t-body-lg" style={{ maxWidth: 560, marginBottom: "1.5rem" }}>{s.body}</p>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                                                    {s.tags.map(t => (
                                                        <span key={t} style={{
                                                            fontFamily: "var(--f-mono)", fontSize: ".55rem", letterSpacing: ".14em",
                                                            textTransform: "uppercase", color: "var(--c-mid)",
                                                            border: "1px solid var(--c-rule)", padding: ".35rem .85rem",
                                                        }}>{t}</span>
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

            <style>{`@media(max-width:768px){ .hs-head{grid-template-columns:1fr!important;} .svc-row button{grid-template-columns:4rem 1fr auto!important;} }`}</style>
        </section>
    );
}
