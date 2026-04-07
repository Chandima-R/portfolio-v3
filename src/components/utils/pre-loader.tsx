"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";

export const Preloader = ({ onDone }: { onDone: () => void })=> {
    const wrapRef    = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLDivElement>(null);
    const fillRef    = useRef<HTMLDivElement>(null);
    const pctRef     = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const letters = lettersRef.current?.querySelectorAll<HTMLSpanElement>(".preloader__letter");
        const tl = gsap.timeline();

        /* letters stagger in */
        tl.to(letters ?? [], {
            y: 0, duration: .9, stagger: .055,
            ease: "power4.out",
        });

        /* count + bar */
        const obj = { v: 0 };
        tl.to(obj, {
            v: 100, duration: 1.6, ease: "power2.inOut",
            onUpdate() {
                const n = Math.round(obj.v);
                setCount(n);
                if (fillRef.current) fillRef.current.style.width = `${n}%`;
                if (pctRef.current) pctRef.current.textContent = `${n}%`;
            },
        }, "-=.3");

        /* letters stagger out */
        tl.to(letters ?? [], {
            y: "-110%", duration: .7, stagger: .04, ease: "power3.in",
        }, "-=.15");

        /* full wipe up */
        tl.to(wrapRef.current, {
            yPercent: -102, duration: 1, ease: "power4.inOut",
            onComplete: onDone,
        }, "-=.1");

        return () => { tl.kill(); };
    }, [onDone]);

    const word = "Chandima";

    return (
        <div ref={wrapRef} className="preloader">
            <div ref={lettersRef} className="preloader__letters">
                {word.split("").map((ch, i) => (
                    <span key={i} className="preloader__letter">{ch}</span>
                ))}
            </div>
            <div className="preloader__bottom">
                <div style={{ flex: 1 }}>
                    <div className="preloader__line-wrap">
                        <div ref={fillRef} className="preloader__line-fill" />
                    </div>
                </div>
                <span ref={pctRef} className="preloader__pct" style={{ marginLeft: "2rem" }}>
          0%
        </span>
            </div>
        </div>
    );
}
