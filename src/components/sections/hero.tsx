"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = ()=> {
    const sec     = useRef<HTMLElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const botRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.1 });

            /* lines rise */
            tl.from(".h-line", {
                yPercent: 110, stagger: .1, duration: 1.3, ease: "power4.out",
            });

            /* sub + meta */
            tl.from(botRef.current?.children ?? [], {
                opacity: 0, y: 18, stagger: .08, duration: .9, ease: "power3.out",
            }, "-=.7");

            /* scroll indicator */
            tl.from(".hero-scroll", { opacity: 0, duration: .6 }, "-=.4");

            /* parallax headline on scroll */
            gsap.to(headRef.current, {
                yPercent: 14, ease: "none",
                scrollTrigger: { trigger: sec.current, start: "top top", end: "bottom top", scrub: true },
            });

            /* scroll indicator fade */
            gsap.to(".hero-scroll", {
                opacity: 0, y: -16,
                scrollTrigger: { trigger: sec.current, start: "15% top", end: "30% top", scrub: true },
            });

            /* horizontal rule draw */
            gsap.from(".hero-rule", {
                scaleX: 0, transformOrigin: "left",
                duration: 1.6, ease: "power4.out", delay: 3.5,
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sec} id="hero" style={{
            minHeight: "100svh",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            paddingBottom: "6vh",
            position: "relative", overflow: "hidden",
        }}>
            {/* fine grid */}
            <div aria-hidden style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: `linear-gradient(var(--c-rule) 1px, transparent 1px),
                          linear-gradient(90deg, var(--c-rule) 1px, transparent 1px)`,
                backgroundSize: "80px 80px", opacity: .4,
            }} />

            {/* availability tag */}
            <div style={{
                position: "absolute", top: "calc(80px + 2rem)",
                right: "clamp(1.5rem,5vw,5rem)",
                display: "flex", alignItems: "center", gap: ".6rem",
            }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "block", animation: "pulse-g 2s ease-in-out infinite" }} />
                <span className="t-label">Available for work</span>
            </div>

            <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
                {/* headline */}
                <div ref={headRef} style={{ marginBottom: "clamp(2.5rem,5vw,5rem)" }}>
                    <div className="line-clip"><div className="h-line t-display">Frontend</div></div>
                    <div className="line-clip">
                        <div className="h-line t-display" style={{ paddingLeft: "clamp(2rem,10vw,13rem)", color: "var(--c-rule2)", letterSpacing:"-.06em" }}>
                            developer
                        </div>
                    </div>
                    <div className="line-clip"><div className="h-line t-display">& craftsman.</div></div>
                </div>

                {/* bottom row */}
                <div className="hero-rule rule" style={{ marginBottom: "2.5rem" }} />
                <div ref={botRef} style={{
                    display: "flex", alignItems: "flex-start",
                    justifyContent: "space-between", gap: "2rem", flexWrap: "wrap",
                }}>
                    <div style={{ maxWidth: 400 }}>
                        <p className="t-body-lg">
                            Chandima Rathnayake - crafting motion-rich, high-performance websites for ambitious brands. Based in Colombo, Sri Lanka.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
                        <a href="/work" className="btn btn-dark">View my work →</a>
                        <a href="/contact" className="btn-text t-label">Start a conversation ↗</a>
                    </div>
                </div>
            </div>

            {/* scroll indicator */}
            <div className="hero-scroll scroll-ind" style={{
                position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem",
            }}>
                <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--c-rule2), transparent)" }} />
                <span className="t-label" style={{ fontSize: ".5rem" }}>Scroll</span>
            </div>

            <style>{`@keyframes pulse-g{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.75)}}`}</style>
        </section>
    );
}
