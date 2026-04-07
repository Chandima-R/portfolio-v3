"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {motion} from "framer-motion";
import {projects} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const HomeProjects = ()=> {
    const sec     = useRef<HTMLElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* header */
            // @ts-expect-error third party type error
            gsap.from(headRef.current?.querySelectorAll(".reveal-line"), {
                yPercent: 108, stagger: .1, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: headRef.current, start: "top 85%" },
            });

            /* each project card entrance */
            gsap.utils.toArray<HTMLElement>(".proj-entry").forEach((el) => {
                /* clip reveal on image */
                const imgWrap = el.querySelector(".img-reveal-wrap");
                const imgInner = el.querySelector(".img-reveal-inner");
                if (imgWrap && imgInner) {
                    gsap.from(imgWrap, {
                        clipPath: "inset(100% 0 0 0)",
                        duration: 1.4, ease: "power4.inOut",
                        scrollTrigger: { trigger: el, start: "top 82%" },
                    });
                    gsap.from(imgInner, {
                        scale: 1.12, duration: 1.4, ease: "power4.inOut",
                        scrollTrigger: { trigger: el, start: "top 82%" },
                    });
                }
                /* text */
                gsap.from(el.querySelectorAll(".fade-up"), {
                    opacity: 0, y: 22, stagger: .08, duration: .9, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 78%" },
                });

                /* image parallax while scrolling through */
                if (imgInner) {
                    gsap.to(imgInner, {
                        yPercent: -8, ease: "none",
                        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                    });
                }
            });
        }, sec);
        return () => ctx.revert();
    }, []);

    const featured = projects.filter(p => p.featured);

    return (
        <section ref={sec} className="section" style={{ paddingTop: "clamp(5rem,9vw,11rem)" }}>
            <div className="wrap">
                {/* header */}
                <div ref={headRef} style={{
                    display: "flex", alignItems: "flex-end",
                    justifyContent: "space-between", flexWrap: "wrap", gap: "2rem",
                    marginBottom: "clamp(4rem,7vw,9rem)",
                    paddingBottom: "clamp(2rem,4vw,4rem)",
                    borderBottom: "1px solid var(--c-rule)",
                }}>
                    <div>
                        <p className="t-label" style={{ marginBottom: "1.5rem" }}>Selected Work</p>
                        <div className="line-clip"><div className="reveal-line t-h1">Projects that</div></div>
                        <div className="line-clip">
                            <div className="reveal-line t-h1" style={{ color: "var(--c-rule2)" }}>move the needle.</div>
                        </div>
                    </div>
                    <a href="/work" className="btn-text t-label fade-up">All projects →</a>
                </div>

                {/* project entries — alternating layout */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6rem,11vw,14rem)" }}>
                    {featured.map((p, i) => (
                        <ProjectEntry key={p.id} p={p} reverse={i % 2 !== 0} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectEntry({ p, reverse }: { p: typeof projects[0]; reverse: boolean }) {
    const [hov, setHov] = useState(false);

    return (
        <a href={`/work/${p.slug}`} className="proj-entry" style={{
            display: "grid",
            gridTemplateColumns: reverse ? "1fr 1.4fr" : "1.4fr 1fr",
            gap: "clamp(2rem,5vw,6rem)",
            alignItems: "center",
            textDecoration: "none",
        }}
           onMouseEnter={() => setHov(true)}
           onMouseLeave={() => setHov(false)}
           data-cursor-img
        >
            {/* image — order changes on reverse */}
            <div style={{ order: reverse ? 1 : 0 }}>
                <div className="img-reveal-wrap" style={{ aspectRatio: "4/3", background: p.bg, overflow: "hidden" }}>
                    <div className="img-reveal-inner" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        {/* placeholder visual */}
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,.04) 25%, transparent 25%,
                transparent 50%, rgba(0,0,0,.04) 50%, rgba(0,0,0,.04) 75%, transparent 75%)`,
                            backgroundSize: "40px 40px",
                        }} />
                        <span style={{
                            fontFamily: "var(--f-serif)", fontSize: "clamp(3rem,8vw,8rem)", fontWeight: 300,
                            fontStyle: "italic", color: "rgba(15,15,13,.1)", userSelect: "none", zIndex: 1,
                        }}>{p.id}</span>
                    </div>
                </div>
            </div>

            {/* text */}
            <div style={{ order: reverse ? 0 : 1 }}>
                <p className="t-label fade-up" style={{ marginBottom: "1.5rem" }}>
                    {p.category} / {p.year}
                </p>
                <h2 className="t-h2 fade-up" style={{ marginBottom: "1.25rem", color: "var(--c-ink)" }}>
                    {p.title}
                </h2>
                <p className="t-body fade-up" style={{ marginBottom: "2rem", maxWidth: 380, fontSize: "1rem" }}>
                    {p.excerpt}
                </p>
                <motion.div
                    animate={{ x: hov ? 8 : 0 }}
                    transition={{ duration: .4, ease: [.16,1,.3,1] }}
                    className="fade-up"
                >
                    <span className="btn-text t-label">View case study →</span>
                </motion.div>
            </div>

            <style>{`@media(max-width:768px){ .proj-entry{ grid-template-columns:1fr !important; } .proj-entry > div { order:0 !important; } }`}</style>
        </a>
    );
}
