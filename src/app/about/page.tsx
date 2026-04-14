"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {PageLayout} from "@/components/layout/page-layout";
import {processSteps, skills, stats} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* image */
            gsap.from(".ab-img-wrap", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: ".ab-img-wrap", start: "top 82%" } });
            gsap.from(".ab-img-inner", { scale: 1.1, duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: ".ab-img-wrap", start: "top 82%" } });

            /* text blocks */
            gsap.utils.toArray<HTMLElement>(".ab-fade").forEach(el => {
                gsap.from(el, { opacity: 0, y: 24, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
            });

            /* stat counters */
            stats.forEach((s, i) => {
                const el = document.getElementById(`ab-stat-${i}`);
                if (!el) return;
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: s.v, duration: 2, ease: "power2.out",
                    scrollTrigger: { trigger: ".ab-stats", start: "top 82%" },
                    onUpdate() { el.textContent = Math.round(obj.v) + s.sfx; },
                });
            });

            /* skill tags stagger */
            gsap.from(".ab-skill", {
                opacity: 0, y: 16, scale: .97, stagger: .04, duration: .65, ease: "power3.out",
                scrollTrigger: { trigger: ".ab-skills", start: "top 84%" },
            });

            /* section headlines */
            gsap.utils.toArray<HTMLElement>(".ab-sec-head").forEach(el => {
                gsap.from(el.querySelectorAll(".reveal-line"), {
                    yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            });
        }, bodyRef);
        return () => ctx.revert();
    }, []);

    return (
        <PageLayout label="About" title="The developer behind the work." subtitle="Five years of building products that live at the intersection of engineering rigour and considered design.">
            <div ref={bodyRef}>

                {/* ── BIO + PORTRAIT ── */}
                <div className="wrap" style={{ paddingTop: "clamp(5rem,9vw,11rem)", paddingBottom: "clamp(5rem,9vw,11rem)", borderBottom: "1px solid var(--c-rule)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,9rem)", alignItems: "start" }} className="ab-grid">
                        {/* portrait */}
                        <div>
                            <div className="ab-img-wrap" style={{ aspectRatio: "3/4", overflow: "hidden", background: "#e8e4db" }}>
                                <div className="ab-img-inner" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            backgroundImage: `
      linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
      url("/images/about/me.jpg")
    `,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* copy */}
                        <div>
                            <p className="t-label ab-fade" style={{ marginBottom: "2rem" }}>Chandima Rathnayake — Colombo, Sri Lanka</p>
                            {[
                                "I'm a freelance frontend developer with five years of building products people actually want to use. My work spans e-commerce, fintech, SaaS, and agency sites - unified by an obsession with craft that most clients don't expect from an engineer.",
                                "Before I write a line of code, I spend time understanding why the project exists, who it's for, and what success actually looks like. Most development problems are design problems in disguise, and most design problems are communication problems in disguise.",
                                "I work with a small number of clients at a time - by choice. Every project gets my full attention, not the fractured focus of someone juggling twelve things. If we're a fit, you'll have access to a developer who treats your work as seriously as you do.",
                                "When I'm not building, I'm writing about frontend development, contributing to open source, and following the intersection of design and engineering more closely than is probably healthy."
                            ].map((para, i) => (
                                <p key={i} className="ab-fade t-body-lg" style={{ marginBottom: "1.4rem" }}>{para}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── STATS ── */}
                <div className="wrap ab-stats" style={{ paddingTop: "clamp(4rem,7vw,9rem)", paddingBottom: "clamp(4rem,7vw,9rem)", borderBottom: "1px solid var(--c-rule)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="ab-stat-grid">
                        {stats.map((s, i) => (
                            <div key={i} style={{
                                padding: "clamp(2rem,4vw,4rem) 0",
                                borderRight: i < stats.length - 1 ? "1px solid var(--c-rule)" : "none",
                                paddingLeft: i === 0 ? 0 : "clamp(2rem,4vw,4rem)",
                            }}>
                                <div style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(3rem,6vw,7rem)", letterSpacing: "-.04em", color: "var(--c-ink)", lineHeight: 1 }}>
                                    <span id={`ab-stat-${i}`}>{s.v}{s.sfx}</span>
                                </div>
                                <p className="t-label" style={{ marginTop: ".75rem" }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SKILLS ── */}
                <div className="wrap ab-skills" style={{ paddingTop: "clamp(4rem,7vw,9rem)", paddingBottom: "clamp(4rem,7vw,9rem)", borderBottom: "1px solid var(--c-rule)" }}>
                    <div className="ab-sec-head" style={{ marginBottom: "clamp(3rem,5vw,6rem)" }}>
                        <p className="t-label" style={{ marginBottom: "1.25rem" }}>Expertise</p>
                        <div className="line-clip"><div className="reveal-line t-h2">The tools</div></div>
                        <div className="line-clip"><div className="reveal-line t-h2" style={{ color: "var(--c-rule2)" }}>of my craft.</div></div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
                        {skills.map(sk => (
                            <span key={sk} className="ab-skill" style={{
                                fontFamily: "var(--f-mono)", fontSize: ".6rem", letterSpacing: ".14em",
                                textTransform: "uppercase", color: "var(--c-ink2)",
                                border: "1px solid var(--c-rule)", padding: ".6rem 1.3rem",
                                transition: "border-color .3s, color .3s",
                                cursor: "default",
                            }}
                                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--c-ink)"; e.currentTarget.style.color = "var(--c-ink)"; }}
                                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--c-rule)"; e.currentTarget.style.color = "var(--c-ink2)"; }}
                            >{sk}</span>
                        ))}
                    </div>
                </div>

                {/* ── PROCESS ── */}
                <div className="wrap" style={{ paddingTop: "clamp(5rem,9vw,11rem)", paddingBottom: "clamp(5rem,9vw,11rem)" }}>
                    <div className="ab-sec-head" style={{ marginBottom: "clamp(4rem,7vw,9rem)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end" }}>
                        <div>
                            <p className="t-label" style={{ marginBottom: "1.25rem" }}>Process</p>
                            <div className="line-clip"><div className="reveal-line t-h2">How I work.</div></div>
                        </div>
                        <p className="t-body-lg ab-fade" style={{ maxWidth: 380 }}>
                            Every engagement follows a clear, collaborative process - designed to surface the right answers before any code is written.
                        </p>
                    </div>

                    <div style={{ maxWidth: 680, margin: "0 auto" }}>
                        {processSteps.map((s, i) => (
                            <div key={s.n} className="ab-fade" style={{
                                display: "grid", gridTemplateColumns: "clamp(4rem,7vw,8rem) 1fr",
                                gap: "2rem", paddingBottom: i < processSteps.length - 1 ? "clamp(2.5rem,5vw,5rem)" : 0,
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".75rem" }}>
                                    <div style={{ width: 38, height: 38, border: "1px solid var(--c-rule)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span className="t-label" style={{ fontSize: ".5rem" }}>{s.n}</span>
                                    </div>
                                    {i < processSteps.length - 1 && <div style={{ flex: 1, width: 1, minHeight: 32, background: "linear-gradient(to bottom, var(--c-rule), transparent)" }} />}
                                </div>
                                <div style={{ paddingTop: ".4rem" }}>
                                    <h3 style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.5rem,2.5vw,2.5rem)", letterSpacing: "-.02em", color: "var(--c-ink)", marginBottom: ".75rem" }}>{s.title}</h3>
                                    <p className="t-body" style={{ fontSize: ".95rem", lineHeight: 1.8 }}>{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media(max-width:768px){
          .ab-grid { grid-template-columns:1fr!important; }
          .ab-stat-grid { grid-template-columns:repeat(2,1fr)!important; }
          .ab-sec-head[style*="grid-template-columns"] { grid-template-columns:1fr!important; }
        }
      `}</style>
        </PageLayout>
    );
}
