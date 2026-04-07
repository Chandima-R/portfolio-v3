"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {PageLayout} from "@/components/layout/page-layout";
import {posts} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bl-card", {
                opacity: 0, y: 28, stagger: .09, duration: .85, ease: "power3.out",
                scrollTrigger: { trigger: ref.current, start: "top 82%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <PageLayout label="Writing" title="Thoughts on the craft." subtitle="Frontend development, motion design, and what I've learned building products people actually want to use.">
            <div ref={ref} className="wrap" style={{ paddingTop: "clamp(4rem,7vw,9rem)", paddingBottom: "clamp(6rem,10vw,12rem)" }}>
                {posts.map((post, i) => (
                    <a key={post.slug} href={`/blog/${post.slug}`} className="bl-card"
                       style={{ display: "grid", gridTemplateColumns: "clamp(5rem,8vw,9rem) 1fr auto", alignItems: "center", gap: "2rem", padding: "clamp(2rem,4vw,4rem) 0", textDecoration: "none" }}
                       onMouseEnter={e => (e.currentTarget.style.opacity = ".7")}
                       onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                        {/* index */}
                        <span style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2rem,4vw,4rem)", color: "var(--c-rule)", lineHeight: 1, letterSpacing:"-.03em" }}>
              {String(i + 1).padStart(2, "0")}
            </span>

                        {/* content */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: ".85rem" }}>
                                <span className="t-label" style={{ background: "var(--c-bg-alt)", padding: ".25rem .75rem", borderRadius: 0 }}>{post.category}</span>
                                <span className="t-label">{post.date}</span>
                                <span className="t-label">{post.readTime}</span>
                            </div>
                            <h2 style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.4rem,2.5vw,2.5rem)", letterSpacing: "-.02em", color: "var(--c-ink)", marginBottom: ".75rem", lineHeight: 1.15 }}>
                                {post.title}
                            </h2>
                            <p className="t-body" style={{ maxWidth: 560, fontSize: ".9rem" }}>{post.excerpt}</p>
                        </div>

                        {/* arrow */}
                        <span style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(1.5rem,2.5vw,2.5rem)", color: "var(--c-rule)", fontStyle: "italic", flexShrink: 0 }}>→</span>
                    </a>
                ))}
            </div>
        </PageLayout>
    );
}
