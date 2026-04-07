"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimatePresence, motion} from "framer-motion";
import {testimonials} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const HomeTestimonials = ()=> {
    const sec = useRef<HTMLElement>(null);
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(1);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ht-head .reveal-line", {
                yPercent: 108, stagger: .09, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: ".ht-head", start: "top 85%" },
            });
            gsap.from(".ht-body", {
                opacity: 0, y: 30, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: ".ht-body", start: "top 82%" },
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    const go = (i: number) => { setDir(i > idx ? 1 : -1); setIdx(i); };
    const next = () => { setDir(1); setIdx(p => (p + 1) % testimonials.length); };
    const prev = () => { setDir(-1); setIdx(p => (p - 1 + testimonials.length) % testimonials.length); };

    const v = {
        enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
    };

    return (
        <section ref={sec} className="section invert-block">
            <div className="wrap">
                <div className="ht-head" style={{ marginBottom: "clamp(4rem,7vw,9rem)" }}>
                    <p className="t-label" style={{ marginBottom: "1.5rem" }}>Client Words</p>
                    <div className="line-clip"><div className="reveal-line t-h1" style={{ color: "var(--c-bg)" }}>What they</div></div>
                    <div className="line-clip">
                        <div className="reveal-line t-h1" style={{
                            paddingLeft: "clamp(2rem,8vw,10rem)",
                            color: "rgba(248,247,244,.25)",
                        }}>
                            say about the work.
                        </div>
                    </div>
                </div>

                {/* large open-quote */}
                <div aria-hidden style={{
                    fontFamily: "var(--f-serif)", fontSize: "clamp(8rem,18vw,20rem)",
                    fontWeight: 300, color: "rgba(255,255,255,.06)", lineHeight: .75,
                    marginBottom: "-clamp(2rem,5vw,5rem)", userSelect: "none",
                }}>"</div>

                <div className="ht-body" style={{ position: "relative", minHeight: 280 }}>
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={idx} custom={dir} variants={v}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: .55, ease: [.65,0,.35,1] }}
                        >
                            <blockquote style={{
                                fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                                fontSize: "clamp(1.5rem,2.8vw,3rem)", letterSpacing: "-.02em",
                                lineHeight: 1.35, color: "rgba(248,247,244,.82)",
                                maxWidth: 820, marginBottom: "3rem",
                            }}>
                                "{testimonials[idx].quote}"
                            </blockquote>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: "50%",
                                    background: "rgba(255,255,255,.06)",
                                    border: "1px solid rgba(255,255,255,.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "var(--f-serif)", fontSize: "1.1rem", fontStyle: "italic",
                                    color: "rgba(248,247,244,.5)",
                                }}>
                                    {testimonials[idx].author[0]}
                                </div>
                                <div>
                                    <p style={{ fontFamily: "var(--f-sans)", fontSize: ".9rem", color: "rgba(248,247,244,.8)", fontWeight: 400, marginBottom: ".15rem" }}>
                                        {testimonials[idx].author}
                                    </p>
                                    <p className="t-label">
                                        {testimonials[idx].role} — {testimonials[idx].company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* controls */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    marginTop: "clamp(3rem,5vw,6rem)",
                    paddingTop: "clamp(2rem,3vw,3rem)",
                    borderTop: "1px solid rgba(255,255,255,.08)",
                }}>
                    {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
                        <button key={label} onClick={fn}
                                style={{
                                    width: 46, height: 46,
                                    border: "1px solid rgba(255,255,255,.12)",
                                    color: "rgba(248,247,244,.5)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "1rem", transition: "all .3s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,247,244,.5)"; e.currentTarget.style.color = "rgba(248,247,244,.9)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; e.currentTarget.style.color = "rgba(248,247,244,.5)"; }}
                        >{label}</button>
                    ))}

                    <div style={{ display: "flex", gap: ".6rem", marginLeft: "auto" }}>
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => go(i)}
                                    style={{
                                        width: i === idx ? 28 : 6, height: 6,
                                        background: i === idx ? "rgba(248,247,244,.7)" : "rgba(248,247,244,.15)",
                                        border: "none", transition: "all .4s cubic-bezier(.16,1,.3,1)",
                                    }}
                                    aria-label={`Go to ${i + 1}`}
                            />
                        ))}
                    </div>

                    <span className="t-label" style={{ fontSize: ".55rem", color: "rgba(248,247,244,.2)" }}>
            {String(idx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
                </div>
            </div>
        </section>
    );
}
