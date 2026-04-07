"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {Navbar} from "@/components/layout/navbar";

export default function NotFound() {
    useEffect(() => {
        gsap.from(".nf-num", { yPercent: 40, opacity: 0, duration: 1.2, ease: "power4.out", delay: .2 });
        gsap.from(".nf-text", { opacity: 0, y: 20, stagger: .1, duration: .9, ease: "power3.out", delay: .6 });
    }, []);

    return (
        <>
            <Navbar />
            <main style={{
                minHeight: "100dvh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", textAlign: "center",
                padding: "clamp(2rem,5vw,5rem)",
                position: "relative", overflow: "hidden",
            }}>
                {/* huge 404 */}
                <div className="nf-num" style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                    fontSize: "clamp(12rem,30vw,30rem)", color: "var(--c-bg-alt)",
                    lineHeight: 1, userSelect: "none", pointerEvents: "none",
                    letterSpacing: "-.06em", whiteSpace: "nowrap",
                }}>404</div>

                <div style={{ position: "relative", zIndex: 1 }}>
                    <h1 className="nf-text t-h2" style={{ marginBottom: "1rem" }}>Page not found.</h1>
                    <p className="nf-text t-body" style={{ maxWidth: 340, margin: "0 auto 3rem" }}>
                        The page you're looking for has wandered off. Let's get you somewhere useful.
                    </p>
                    <div className="nf-text" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/" className="btn btn-dark">Go home</a>
                        <a href="/work" className="btn btn-outline">View work</a>
                    </div>
                </div>
            </main>
        </>
    );
}
