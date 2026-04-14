"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export const Footer = ()=> {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-name .reveal-line", {
                yPercent: 108, stagger: .08, duration: 1.2, ease: "power4.out",
                scrollTrigger: { trigger: ref.current, start: "top 85%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={ref} className="invert-block" style={{ padding: "clamp(5rem,9vw,10rem) clamp(1.5rem,5vw,5rem) 3rem" }}>
            {/* Big name */}
            <div className="footer-name" style={{ marginBottom: "clamp(4rem,7vw,8rem)", overflow: "hidden" }}>
                <div className="line-clip">
                    <div className="reveal-line t-display" style={{ color: "var(--c-bg)" }}>
                        Chandima Rathnayake
                    </div>
                </div>
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", paddingBottom: "clamp(3rem,5vw,6rem)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <p className="t-h3" style={{ color: "rgba(248,247,244,.8)", maxWidth: 500, fontStyle: "italic" }}>
                    Ready to build something that matters?
                </p>
                <a href="/contact" className="btn" style={{ background: "var(--c-bg)", color: "var(--c-ink)", padding: "1.1rem 2.8rem" }}>
                    Get in touch →
                </a>
            </div>

            {/* Bottom bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",  gap: "1.5rem", paddingTop: "2rem" }}>
                <div className={'w-full md:w-1/3 flex items-center justify-start'}>
                    <span className="t-label" style={{ color: "rgba(248,247,244,.25)" }}>
          © {new Date().getFullYear()} Chandima Rathnayake
        </span>
                </div>
                <div className={'w-full md:w-1/3 flex items-center justify-center'} style={{ display: "flex", gap: "2rem" }}>
                    {[
                        { label: "GitHub", href: "https://github.com/Chandima-R" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/chandimarathnayake15/" },
                        { label: "Facebook", href: "https://www.facebook.com/chandima.rathnayake.179373" },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="t-label"
                            style={{
                                color: "rgba(248,247,244,.3)",
                                transition: "color .3s"
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "rgba(248,247,244,.7)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,247,244,.3)")}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
                <div className={'w-full md:w-1/3 flex justify-end items-center'}>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="t-label" style={{ color: "rgba(248,247,244,.3)", transition: "color .3s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "rgba(248,247,244,.7)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,247,244,.3)")}>
                        ↑ Top
                    </button>
                </div>
            </div>
        </footer>
    );
}
