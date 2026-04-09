"use client";

import {useEffect, useRef, useState} from "react";
import {notFound, useParams} from "next/navigation";
import {gsap} from "gsap";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {CustomCursor} from "@/components/utils/custom-cursor";
import {useLenis} from "@/hooks/use-lenis";
import {posts} from "@/lib/data";

export default function BlogPost() {
    const params = useParams()
    const post = posts.find(p => p.slug === params.slug);
    const [progress, setProgress] = useState(0);
    const artRef = useRef<HTMLDivElement>(null);
    useLenis();

    useEffect(() => {
        if (!post) return;
        const ctx = gsap.context(() => {
            gsap.from(".bp-title span", { yPercent: 108, stagger: .07, duration: 1.1, ease: "power4.out", delay: .2 });
            gsap.from(".bp-meta", { opacity: 0, y: 16, duration: .8, ease: "power3.out", delay: .7 });
            gsap.from(".bp-body-p", { opacity: 0, y: 20, stagger: .06, duration: .8, ease: "power3.out", scrollTrigger: { trigger: artRef.current, start: "top 82%" } });
        });

        /* reading progress */
        const onScroll = () => {
            const art = artRef.current;
            if (!art) return;
            const rect = art.getBoundingClientRect();
            const total = art.offsetHeight - window.innerHeight;
            const scrolled = Math.max(0, -rect.top);
            setProgress(Math.min(100, (scrolled / total) * 100));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => { window.removeEventListener("scroll", onScroll); ctx.revert(); };
    }, [post]);

    if (!post) notFound();

    /* simple markdown-like parse */
    const renderBody = (text: string) =>
        text.split("\n\n").map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**"))
                return <h3 key={i} className="bp-body-p" style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.4rem,2.2vw,2rem)", letterSpacing: "-.02em", color: "var(--c-ink)", margin: "3rem 0 1rem" }}>{block.replace(/\*\*/g,"")}</h3>;
            const replaced = block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
            return <p key={i} className="bp-body-p t-body-lg" style={{ marginBottom: "1.5rem" }} dangerouslySetInnerHTML={{ __html: replaced }} />;
        });

    const next = posts[(posts.indexOf(post) + 1) % posts.length];

    return (
        <>
            <CustomCursor />

            {/* reading progress bar */}
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "var(--c-rule)", zIndex: 9999 }}>
                <div style={{ height: "100%", background: "var(--c-ink)", width: `${progress}%`, transition: "width .1s linear" }} />
            </div>

            <Navbar />

            <main>
                {/* hero */}
                <div style={{
                    paddingTop: "calc(80px + 3rem)", paddingBottom: "clamp(4rem,7vw,8rem)",
                    paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)",
                    borderBottom: "1px solid var(--c-rule)",
                    background: "var(--c-bg-alt)",
                }}>
                    <div style={{ maxWidth: 820 }}>
                        <div className="bp-meta" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
                            <a href="/blog" className="t-label" style={{ color: "var(--c-mid)", transition: "color .3s" }}
                               onMouseEnter={e => (e.currentTarget.style.color = "var(--c-ink)")}
                               onMouseLeave={e => (e.currentTarget.style.color = "var(--c-mid)")}>
                                ← All posts
                            </a>
                            <span style={{ width: 1, height: 14, background: "var(--c-rule)" }} />
                            <span className="t-label" style={{ background: "var(--c-bg)", padding: ".2rem .75rem" }}>{post.category}</span>
                            <span className="t-label">{post.date}</span>
                            <span className="t-label">{post.readTime}</span>
                        </div>

                        <div className="bp-title">
                            {post.title.split(" ").map((word, i) => (
                                <div key={i} className="line-clip" style={{ display: "inline-block", marginRight: ".35em" }}>
                                    <span style={{ display: "block", fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem,5vw,6rem)", letterSpacing: "-.04em", lineHeight: 1, color: "var(--c-ink)" }}>{word}</span>
                                </div>
                            ))}
                        </div>

                        <p className="bp-meta t-body-lg" style={{ marginTop: "2rem", maxWidth: 560 }}>{post.excerpt}</p>

                        <div className="bp-meta" style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--c-rule)" }}>
                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--c-rule)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-serif)", fontStyle: "italic", fontSize: "1rem" }}>C</div>
                            <div>
                                <p style={{ fontFamily: "var(--f-sans)", fontSize: ".85rem", color: "var(--c-ink)", fontWeight: 400 }}>Chandima Rathnayake</p>
                                <p className="t-label">Frontend Developer</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* article body */}
                <div ref={artRef} style={{ paddingTop: "clamp(4rem,7vw,8rem)", paddingBottom: "clamp(5rem,9vw,11rem)", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
                    <div style={{ maxWidth: 720, margin: "0 auto" }}>
                        {renderBody(post.body)}
                    </div>
                </div>

                {/* next post */}
                <div style={{ borderTop: "1px solid var(--c-rule)" }}>
                    <a href={`/blog/${next.slug}`}
                       style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(3rem,5vw,6rem) clamp(1.5rem,5vw,5rem)", background: "var(--c-bg-alt)", transition: "opacity .3s" }}
                       onMouseEnter={e => (e.currentTarget.style.opacity = ".7")}
                       onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                        <div>
                            <p className="t-label" style={{ marginBottom: ".75rem", opacity: .5 }}>Next Article</p>
                            <h3 style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.5rem,3vw,3rem)", letterSpacing: "-.025em", color: "var(--c-ink)", maxWidth: 520 }}>{next.title}</h3>
                        </div>
                        <span style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(2rem,5vw,5rem)", fontWeight: 300, fontStyle: "italic", color: "var(--c-rule)" }}>→</span>
                    </a>
                </div>
            </main>

            <Footer />
        </>
    );
}
