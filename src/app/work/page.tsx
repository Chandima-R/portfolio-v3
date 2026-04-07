"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {PageLayout} from "@/components/layout/page-layout";
import {projects} from "@/components/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState("All");
    const cats = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".work-card", {
                opacity: 0, y: 40, stagger: .08, duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: gridRef.current, start: "top 84%" },
            });
        }, gridRef);
        return () => ctx.revert();
    }, []);

    const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

    return (
        <PageLayout
            label="Portfolio"
            title="Selected Work"
            subtitle="A curated collection of projects across e-commerce, fintech, agencies, and SaaS."
        >
            {/* filter bar */}
            <div className="wrap" style={{
                paddingTop: "clamp(3rem,5vw,6rem)",
                paddingBottom: "clamp(3rem,5vw,6rem)",
                borderBottom: "1px solid var(--c-rule)",
                display: "flex", gap: "1rem", flexWrap: "wrap",
            }}>
                {cats.map(c => (
                    <button key={c} onClick={() => setFilter(c)}
                            className="t-label"
                            style={{
                                padding: ".55rem 1.4rem",
                                border: `1px solid ${c === filter ? "var(--c-ink)" : "var(--c-rule)"}`,
                                color: c === filter ? "var(--c-ink)" : "var(--c-mid)",
                                background: c === filter ? "rgba(15,15,13,.04)" : "transparent",
                                transition: "all .3s",
                            }}>
                        {c}
                    </button>
                ))}
            </div>

            {/* projects grid */}
            <div ref={gridRef} className="wrap" style={{ paddingTop: "clamp(4rem,7vw,9rem)", paddingBottom: "clamp(6rem,10vw,12rem)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,480px),1fr))", gap: "2px" }}>
                    {filtered.map((p, i) => <WorkCard key={p.id} p={p} i={i} />)}
                </div>
            </div>
        </PageLayout>
    );
}

function WorkCard({ p, i }: { p: typeof projects[0]; i: number }) {
    const [hov, setHov] = useState(false);
    const ref = useRef<HTMLAnchorElement>(null);

    /* tilt */
    const onMove = (e: React.MouseEvent) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        gsap.to(ref.current, { rotateY: x * 5, rotateX: -y * 3, duration: .4, ease: "power2.out", transformPerspective: 900 });
    };
    const onLeave = () => {
        setHov(false);
        gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: .6, ease: "power3.out" });
    };

    return (
        <a ref={ref} href={`/work/${p.slug}`} className="work-card"
           onMouseEnter={() => setHov(true)} onMouseMove={onMove} onMouseLeave={onLeave}
           style={{ display: "block", background: p.bg, aspectRatio: i % 3 === 0 ? "4/3" : "1/1", position: "relative", overflow: "hidden" }}
           data-cursor-img
        >
            {/* subtle grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `linear-gradient(rgba(15,15,13,.05) 1px,transparent 1px), linear-gradient(90deg,rgba(15,15,13,.05) 1px,transparent 1px)`,
                backgroundSize: "48px 48px", opacity: hov ? 1 : 0, transition: "opacity .5s",
            }} />

            {/* number watermark */}
            <div style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                fontFamily: "var(--f-serif)", fontSize: "clamp(4rem,8vw,8rem)",
                fontWeight: 300, fontStyle: "italic", color: "rgba(15,15,13,.06)",
                lineHeight: 1, userSelect: "none",
            }}>{p.id}</div>

            {/* hover overlay */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,15,13,.75) 0%, transparent 55%)",
                opacity: hov ? 1 : 0, transition: "opacity .5s",
            }} />

            {/* info */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.5rem",
                transform: hov ? "translateY(0)" : "translateY(10px)",
                opacity: hov ? 1 : 0,
                transition: "transform .5s cubic-bezier(.16,1,.3,1), opacity .5s",
            }}>
                <p className="t-label" style={{ color: "rgba(248,247,244,.5)", marginBottom: ".6rem" }}>{p.category} · {p.year}</p>
                <h3 style={{
                    fontFamily: "var(--f-serif)", fontSize: "clamp(1.6rem,3vw,2.5rem)",
                    fontWeight: 300, fontStyle: "italic", color: "var(--c-bg)",
                    letterSpacing: "-.02em", marginBottom: ".5rem",
                }}>{p.title}</h3>
                <p style={{ fontFamily: "var(--f-mono)", fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(248,247,244,.45)" }}>
                    View case study →
                </p>
            </div>
        </a>
    );
}
