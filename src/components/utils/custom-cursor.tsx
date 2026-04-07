"use client";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

export const CustomCursor = ()=> {
    const dot  = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia("(max-width:900px)").matches) return;
        const d = dot.current!, r = ring.current!;
        let mx = innerWidth / 2, my = innerHeight / 2;
        let rx = mx, ry = my;

        gsap.set([d, r], { opacity: 0, xPercent: -50, yPercent: -50 });

        const move = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            gsap.to(d, { x: mx, y: my, duration: .08, ease: "none", opacity: 1 });
        };
        window.addEventListener("mousemove", move);

        const tick = () => {
            rx += (mx - rx) * .1; ry += (my - ry) * .1;
            gsap.set(r, { x: rx, y: ry, opacity: 1 });
        };
        gsap.ticker.add(tick);

        /* hover states — size only, blend mode handles color automatically */
        const watch = (selector: string, cls: string) => {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener("mouseenter", () => r.classList.add(cls));
                el.addEventListener("mouseleave", () => r.classList.remove(cls));
            });
        };
        watch("a, button", "hover-link");
        watch("[data-cursor-img]", "hover-img");

        return () => {
            window.removeEventListener("mousemove", move);
            gsap.ticker.remove(tick);
        };
    }, []);

    /*
     * mix-blend-mode: "difference" is the key.
     * Both elements are solid white. The blend mode subtracts from
     * whatever is beneath:
     *   white over light bg → appears dark
     *   white over dark bg  → appears light
     * Works across any background color transition automatically.
     */
    const blend: React.CSSProperties = {
        position:      "fixed",
        top:           0,
        left:          0,
        pointerEvents: "none",
        zIndex:        99999,
        mixBlendMode:  "difference",
    };

    return (
        <>
            <div
                ref={dot}
                style={{
                    ...blend,
                    width:        8,
                    height:       8,
                    borderRadius: "50%",
                    background:   "#fff",
                    transform:    "translate(-50%,-50%)",
                    willChange:   "transform",
                }}
            />
            <div
                ref={ring}
                className="cr-ring"
                style={{
                    ...blend,
                    width:        36,
                    height:       36,
                    borderRadius: "50%",
                    border:       "1.5px solid #fff",
                    background:   "transparent",
                    transform:    "translate(-50%,-50%)",
                    willChange:   "transform",
                    transition:   "width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1)",
                }}
            />

            <style>{`
        .cr-ring.hover-link { width: 56px !important; height: 56px !important; }
        .cr-ring.hover-img  { width: 80px !important; height: 80px !important; }
        @media (max-width: 900px) {
          .cr-ring { display: none; }
          body, button { cursor: auto !important; }
        }
      `}</style>
        </>
    );
}
