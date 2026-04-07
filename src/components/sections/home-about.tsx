"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {stats} from "@/components/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const HomeAbout = ()=> {
    const sec = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ha-line", {
                yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: ".ha-head", start: "top 84%" },
            });
            gsap.from(".ha-fade", {
                opacity: 0, y: 22, stagger: .1, duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: ".ha-body", start: "top 82%" },
            });

            /* image reveal */
            gsap.from(".ha-img-wrap", {
                clipPath: "inset(100% 0 0 0)",
                duration: 1.4, ease: "power4.inOut",
                scrollTrigger: { trigger: ".ha-img-wrap", start: "top 82%" },
            });
            gsap.from(".ha-img-inner", {
                scale: 1.1, duration: 1.4, ease: "power4.inOut",
                scrollTrigger: { trigger: ".ha-img-wrap", start: "top 82%" },
            });

            /* stat counters */
            stats.forEach((s, i) => {
                const el = document.getElementById(`ha-stat-${i}`);
                if (!el) return;
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: s.v, duration: 2, ease: "power2.out",
                    scrollTrigger: { trigger: ".ha-stats", start: "top 82%" },
                    onUpdate() { el.textContent = Math.round(obj.v) + s.sfx; },
                });
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sec} className="section" style={{ background: "var(--c-bg-alt)" }}>
            <div className="wrap">
                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(3rem,7vw,9rem)", alignItems: "start" }} className="ha-grid">
                    {/* left */}
                    <div>
                        <div className="ha-head" style={{ marginBottom: "clamp(3rem,5vw,6rem)" }}>
                            <p className="t-label" style={{ marginBottom: "1.5rem" }}>About</p>
                            <div className="line-clip"><div className="ha-line t-h1">I build websites</div></div>
                            <div className="line-clip">
                                <div className="ha-line t-h1" style={{ paddingLeft: "clamp(1.5rem,6vw,8rem)", color: "var(--c-rule2)" }}>
                                    that earn
                                </div>
                            </div>
                            <div className="line-clip"><div className="ha-line t-h1">their place.</div></div>
                        </div>

                        <div className="ha-body" style={{ display: "flex", flexDirection: "column", gap: "1.4rem", marginBottom: "3rem" }}>
                            <p className="ha-fade t-body-lg">
                                I'm Chandima — a freelance frontend developer from Colombo.
                                Five years of building products that sit at the intersection of
                                engineering rigour and considered design.
                            </p>
                            <p className="ha-fade t-body">
                                I obsess over the details that most people don't notice but everyone
                                feels — the timing of an animation, the weight of a typeface, the
                                satisfaction of an interaction that just works.
                            </p>
                        </div>

                        <a href="/about" className="btn btn-outline ha-fade">Learn more →</a>

                        {/* stats */}
                        <div className="ha-stats" style={{
                            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                            gap: "1px", marginTop: "clamp(3rem,5vw,6rem)",
                            borderTop: "1px solid var(--c-rule)", paddingTop: "clamp(2rem,4vw,4rem)",
                        }}>
                            {stats.map((s, i) => (
                                <div key={i}>
                                    <div style={{
                                        fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                                        fontSize: "clamp(2rem,4vw,4rem)", letterSpacing: "-.03em",
                                        color: "var(--c-ink)", lineHeight: 1,
                                    }}>
                                        <span id={`ha-stat-${i}`}>{s.v}{s.sfx}</span>
                                    </div>
                                    <p className="t-label" style={{ marginTop: ".5rem" }}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* right — portrait */}
                    <div>
                        <div className="ha-img-wrap" style={{ aspectRatio: "3/4", overflow: "hidden", background: "#e8e4db" }}>
                            <div className="ha-img-inner" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: `linear-gradient(rgba(15,15,13,.04) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(15,15,13,.04) 1px, transparent 1px)`,
                                    backgroundSize: "32px 32px",
                                }} />
                                <span style={{
                                    fontFamily: "var(--f-serif)", fontSize: "clamp(5rem,12vw,11rem)",
                                    fontWeight: 300, fontStyle: "italic",
                                    color: "rgba(15,15,13,.08)", userSelect: "none", zIndex: 1,
                                }}>CR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`@media(max-width:768px){ .ha-grid{ grid-template-columns:1fr !important; } .ha-stats{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
        </section>
    );
}
