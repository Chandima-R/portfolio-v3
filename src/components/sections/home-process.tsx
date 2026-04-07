"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {processSteps} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const HomeProcess = () => {
    const sec = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hp-head .reveal-line", {
                yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: ".hp-head", start: "top 85%" },
            });

            /* step entrance */
            gsap.from(".hp-step", {
                opacity: 0, y: 36, stagger: .1, duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: ".hp-steps", start: "top 80%" },
            });

            /* active highlight */
            gsap.utils.toArray<HTMLElement>(".hp-step").forEach(el => {
                ScrollTrigger.create({
                    trigger: el, start: "top 56%", end: "bottom 44%",
                    onEnter:     () => el.classList.add("hp-active"),
                    onLeave:     () => el.classList.remove("hp-active"),
                    onEnterBack: () => el.classList.add("hp-active"),
                    onLeaveBack: () => el.classList.remove("hp-active"),
                });
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sec} className="section" style={{ background: "var(--c-bg-alt)", borderTop: "1px solid var(--c-rule)" }}>
            <div className="wrap">
                <div className="hp-head" style={{ marginBottom: "clamp(4rem,8vw,10rem)" }}>
                    <p className="t-label" style={{ marginBottom: "1.5rem" }}>How I Work</p>
                    <div className="line-clip"><div className="reveal-line t-h1">How ideas</div></div>
                    <div className="line-clip">
                        <div className="reveal-line t-h1" style={{ paddingLeft: "clamp(2rem,9vw,12rem)", color: "var(--c-rule2)" }}>
                            become products.
                        </div>
                    </div>
                </div>

                <div className="hp-steps" style={{ maxWidth: 740, margin: "0 auto" }}>
                    {processSteps.map((s, i) => (
                        <div key={s.n} className="hp-step" style={{
                            display: "grid", gridTemplateColumns: "clamp(4.5rem,7vw,8rem) 1fr",
                            gap: "2.5rem",
                            paddingBottom: i < processSteps.length - 1 ? "clamp(3rem,5vw,5rem)" : 0,
                            transition: "opacity .5s",
                        }}>
                            {/* left */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".75rem" }}>
                                <div className="hp-circle" style={{
                                    width: 40, height: 40,
                                    border: "1px solid var(--c-rule)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, transition: "border-color .4s, background .4s",
                                }}>
                                    <span className="t-label" style={{ fontSize: ".5rem" }}>{s.n}</span>
                                </div>
                                {i < processSteps.length - 1 && (
                                    <div style={{ flex: 1, width: 1, minHeight: 40, background: "linear-gradient(to bottom, var(--c-rule), transparent)" }} />
                                )}
                            </div>

                            {/* right */}
                            <div style={{ paddingTop: ".5rem" }}>
                                <h3 className="hp-title t-h3" style={{ marginBottom: ".85rem", transition: "color .4s" }}>{s.title}</h3>
                                <p className="t-body" style={{ fontSize: ".95rem", lineHeight: 1.75 }}>{s.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .hp-step { opacity: .3; }
        .hp-step.hp-active { opacity: 1 !important; }
        .hp-step.hp-active .hp-circle { border-color: var(--c-ink); background: rgba(15,15,13,.05); }
        .hp-step.hp-active .hp-title { color: var(--c-ink); }
        .hp-step:not(.hp-active) .hp-title { color: var(--c-mid); }
      `}</style>
        </section>
    );
}
