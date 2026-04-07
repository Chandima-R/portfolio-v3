"use client";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "gsap";

const LINKS = [
    { label: "Work",     href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Services",href: "/services" },
    { label: "Blog",    href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export const Navbar = ({ isHome }: { isHome?: boolean })=> {
    const navRef  = useRef<HTMLElement>(null);
    const [stuck, setStuck]  = useState(false);
    const [open,  setOpen]   = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const delay = isHome ? 3.0 : 0.3;
        gsap.from(navRef.current, { y: -50, opacity: 0, duration: .9, ease: "power3.out", delay });
        const onScroll = () => setStuck(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const go = (href: string) => { setOpen(false); window.location.href = href; };

    return (
        <>
            <nav ref={navRef} className={`nav ${stuck ? "stuck" : ""}`}>
                {/* Logo */}
                <a href="/" style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <rect x=".5" y=".5" width="25" height="25" stroke="var(--c-rule2)" strokeWidth=".75" />
                        <rect x="7" y="7" width="12" height="12" fill="var(--c-ink)" />
                    </svg>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--c-ink2)" }}>
            CR
          </span>
                </a>

                {/* Desktop links */}
                <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hide-mob">
                    {LINKS.map(l => (
                        <a key={l.label} href={l.href}
                           className={`nav-link ${pathname === l.href || pathname.startsWith(l.href + "/") ? "active" : ""}`}>
                            {l.label}
                        </a>
                    ))}
                    <a href="/contact" className="btn btn-dark" style={{ padding: ".7rem 1.8rem", marginLeft: ".5rem" }}>
                        Hire Me
                    </a>
                </div>

                {/* Hamburger */}
                <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="show-mob"
                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {[0,1,2].map(i => (
                        <span key={i} style={{
                            display: "block", height: "1px", background: "var(--c-ink)",
                            width: i === 1 ? (open ? 24 : 16) : 24,
                            transform: open ? (i===0 ? "rotate(45deg) translate(4px,4px)" : i===2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none",
                            opacity: open && i===1 ? 0 : 1,
                            transition: "all .4s cubic-bezier(.16,1,.3,1)",
                        }} />
                    ))}
                </button>
            </nav>

            {/* Mobile menu */}
            <div className={`mob-menu ${open ? "open" : ""}`}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {LINKS.map((l, i) => (
                        <button key={l.label} onClick={() => go(l.href)}
                                style={{
                                    fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                                    fontSize: "clamp(2.2rem,8vw,4rem)", letterSpacing: "-.03em",
                                    color: pathname === l.href ? "rgba(248,247,244,.4)" : "var(--c-bg)",
                                    textAlign: "left", lineHeight: 1.1,
                                    transition: "color .3s",
                                }}>
                            {l.label}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: "auto", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                    <p className="t-label" style={{ color: "rgba(248,247,244,.3)" }}>hello@chandimarathnayake.online</p>
                </div>
            </div>
        </>
    );
}
