"use client";
import {useEffect} from "react";
import {CustomCursor} from "../utils/custom-cursor";
import {gsap} from "gsap";
import {useLenis} from "@/hooks/use-lenis";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";

export const PageLayout = ({ children, title, subtitle, label }: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    label?: string;
}) => {
    useLenis();

    useEffect(() => {
        /* page entrance */
        const ctx = gsap.context(() => {
            gsap.from(".page-hero .reveal-line", {
                yPercent: 108, stagger: .1, duration: 1.1, ease: "power4.out", delay: .2,
            });
            gsap.from(".page-hero-sub", {
                opacity: 0, y: 20, duration: .9, ease: "power3.out", delay: .6,
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            <CustomCursor />
            <Navbar />

            {/* Page hero header */}
            {(title || subtitle) && (
                <div className="page-hero" style={{
                    paddingTop: "clamp(8rem,14vw,16rem)",
                    paddingBottom: "clamp(4rem,7vw,8rem)",
                    paddingLeft: "clamp(1.5rem,5vw,5rem)",
                    paddingRight: "clamp(1.5rem,5vw,5rem)",
                    borderBottom: "1px solid var(--c-rule)",
                }}>
                    {label && <p className="t-label" style={{ marginBottom: "1.5rem" }}>{label}</p>}
                    {title && (
                        <div style={{ overflow: "hidden" }}>
                            <h1 className="reveal-line t-display">{title}</h1>
                        </div>
                    )}
                    {subtitle && (
                        <p className="page-hero-sub t-body-lg" style={{ maxWidth: 560, marginTop: "1.5rem" }}>
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <main>{children}</main>
            <Footer />
        </>
    );
}
