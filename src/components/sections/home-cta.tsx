"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HomeCTA = ()=> {
    const sec = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hcta-line", {
                yPercent: 108, stagger: .09, duration: 1.2, ease: "power4.out",
                scrollTrigger: { trigger: sec.current, start: "top 80%" },
            });
            gsap.from(".hcta-fade", {
                opacity: 0, y: 20, stagger: .1, duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: sec.current, start: "top 75%" },
            });

            /* horizontal marquee-style text */
            gsap.to(".hcta-scroll-text", {
                xPercent: -20, ease: "none",
                scrollTrigger: { trigger: sec.current, start: "top bottom", end: "bottom top", scrub: true },
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sec} className="section" style={{
            borderTop: "1px solid var(--c-rule)",
            position: "relative", overflow: "hidden",
        }}>
            {/* slow-moving background text */}
            <div className="hcta-scroll-text" aria-hidden style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)",
                whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
                fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(8rem,18vw,22rem)", color: "rgba(15,15,13,.03)",
                lineHeight: 1, letterSpacing: "-.04em",
            }}>
                Let's build something exceptional together —&nbsp;
            </div>

            <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <p className="t-label hcta-fade" style={{ marginBottom: "2.5rem" }}>Ready when you are</p>

                <div style={{ marginBottom: "clamp(3rem,5vw,6rem)" }}>
                    <div className="line-clip"><div className="hcta-line t-display">Let's build</div></div>
                    <div className="line-clip">
                        <div className="hcta-line t-display" style={{ color: "var(--c-rule2)" }}>something</div>
                    </div>
                    <div className="line-clip"><div className="hcta-line t-display">exceptional.</div></div>
                </div>

                <div className="hcta-fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                    <a href="/contact" className="btn btn-dark" style={{ fontSize: ".65rem", padding: "1.2rem 3.5rem" }}>
                        Start a conversation →
                    </a>
                    <a href="mailto:hello@chandimarathnayake.online" className="t-label" style={{
                        color: "var(--c-mid)", transition: "color .3s",
                    }}
                       onMouseEnter={e => (e.currentTarget.style.color = "var(--c-ink)")}
                       onMouseLeave={e => (e.currentTarget.style.color = "var(--c-mid)")}
                    >
                        hello@chandimarathnayake.online
                    </a>
                </div>
            </div>
        </section>
    );
}
