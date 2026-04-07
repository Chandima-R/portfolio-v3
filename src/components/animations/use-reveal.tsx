"use client";
import {RefObject, useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Clip-up line reveals for elements with class .reveal-line inside the ref */
export function useLineReveal(ref: RefObject<HTMLElement | null>, options?: { delay?: number; stagger?: number; start?: string }) {
    useEffect(() => {
        if (!ref.current) return;
        const ctx = gsap.context(() => {
            gsap.from(ref.current!.querySelectorAll(".reveal-line"), {
                yPercent: 108,
                stagger: options?.stagger ?? 0.09,
                duration: 1.05,
                ease: "power4.out",
                delay: options?.delay ?? 0,
                scrollTrigger: {
                    trigger: ref.current,
                    start: options?.start ?? "top 86%",
                },
            });
        }, ref);
        return () => ctx.revert();
    }, []);
}

/** Fade-up for generic elements */
export function useFadeUp(ref: RefObject<HTMLElement | null>, selector = ".fade-up", options?: { stagger?: number; start?: string }) {
    useEffect(() => {
        if (!ref.current) return;
        const ctx = gsap.context(() => {
            gsap.from(ref.current!.querySelectorAll(selector), {
                opacity: 0, y: 28, stagger: options?.stagger ?? 0.1,
                duration: .9, ease: "power3.out",
                scrollTrigger: { trigger: ref.current, start: options?.start ?? "top 84%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);
}

/** Image reveal via clip-path */
export function useImageReveal(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;
        const ctx = gsap.context(() => {
            const wrap = ref.current!.querySelector(".img-reveal-wrap");
            const inner = ref.current!.querySelector(".img-reveal-inner");
            if (!wrap || !inner) return;
            gsap.from(wrap, {
                clipPath: "inset(100% 0 0 0)",
                duration: 1.3, ease: "power4.inOut",
                scrollTrigger: { trigger: ref.current, start: "top 82%" },
            });
            gsap.from(inner, {
                scale: 1.12, duration: 1.3, ease: "power4.inOut",
                scrollTrigger: { trigger: ref.current, start: "top 82%" },
            });
        }, ref);
        return () => ctx.revert();
    }, []);
}
