"use client";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {PageLayout} from "@/components/layout/page-layout";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "loading" | "done" | "error";

const Spinner = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
         style={{ animation:"spin .75s linear infinite", flexShrink:0, display:"block" }}>
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5"/>
        <path d="M12 7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
);

export default function ContactPage() {
    const ref = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name:"", email:"", budget:"", project:"", message:"" });
    const [status, setStatus] = useState<Status>("idle");
    const [errMsg, setErrMsg]  = useState("");

    const budgets = ["$650 - $2K", "$2K – $5K","$5K – $10K","$10K – $25K","$25K+"];
    const types   = ["Website / Landing Page","Web Application","E-Commerce","Motion & Animation","Technical Consulting","Other"];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ct-field", { opacity:0, y:20, stagger:.07, duration:.8, ease:"power3.out", scrollTrigger:{ trigger:".ct-form", start:"top 82%" } });
            gsap.from(".ct-detail", { opacity:0, y:20, stagger:.1, duration:.8, ease:"power3.out", scrollTrigger:{ trigger:".ct-details", start:"top 82%" } });
        }, ref);
        return () => ctx.revert();
    }, []);

    const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        setErrMsg("");
        try {
            const res  = await fetch("/api/contact", {
                method:  "POST",
                headers: { "Content-Type":"application/json" },
                body:    JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
            setStatus("done");
        } catch (err) {
            setStatus("error");
            setErrMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    const disabled = status === "loading";

    return (
        <PageLayout label="Contact" title="Let's work together."
                    subtitle="I take on a small number of projects each quarter to give each one proper attention. Tell me about yours.">
            <div ref={ref}>
                <div className="wrap" style={{ paddingTop:"clamp(4rem,7vw,9rem)", paddingBottom:"clamp(6rem,10vw,12rem)" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"clamp(4rem,8vw,10rem)", alignItems:"flex-start" }} className="ct-grid">

                        {/* ── LEFT ── */}
                        <div className="ct-details">
                            <div className="ct-detail" style={{ marginBottom:"clamp(3rem,5vw,6rem)" }}>
                                <p className="t-label" style={{ marginBottom:"1.5rem" }}>Email</p>
                                <a href="mailto:chandimar.online@gmail.com" style={{
                                    fontFamily:"var(--f-serif)", fontStyle:"italic", fontWeight:300,
                                    fontSize:"clamp(1rem,2vw,1.6rem)", letterSpacing:"-.01em", color:"var(--c-ink)",
                                    display:"block", borderBottom:"1px solid var(--c-rule)", paddingBottom:"1rem",
                                    transition:"color .3s, border-color .3s", wordBreak:"break-word",
                                }}
                                   onMouseEnter={e => { e.currentTarget.style.color="var(--c-mid)"; e.currentTarget.style.borderColor="var(--c-ink)"; }}
                                   onMouseLeave={e => { e.currentTarget.style.color="var(--c-ink)"; e.currentTarget.style.borderColor="var(--c-rule)"; }}
                                >
                                    chandimar.online@gmail.com ↗
                                </a>
                            </div>

                            {[
                                { label:"Phone", val:"+94 71 626 4936", type:"phone" },
                                { label:"Based in", val:"Colombo, Sri Lanka" },
                                { label:"Availability", val:"Working with clients worldwide" },
                                { label:"Response time", val:"Within 24 hours" },
                                { label:"Timezone", val:"UTC+5:30 (IST)" },
                            ].map(d => (
                                <div
                                    key={d.label}
                                    className="ct-detail"
                                    style={{
                                        marginBottom:"2rem",
                                        paddingBottom:"2rem",
                                        borderBottom:"1px solid var(--c-rule)"
                                    }}
                                >
                                    <p className="t-label" style={{ marginBottom:".4rem" }}>
                                        {d.label}
                                    </p>

                                    {d.label === "Phone" ? (
                                        <a
                                            href={`tel:${d.val.replace(/\s/g, "")}`}
                                            style={{
                                                fontFamily:"var(--f-sans)",
                                                fontSize:".95rem",
                                                color:"var(--c-ink2)",
                                                fontWeight:300,
                                                textDecoration:"none"
                                            }}
                                        >
                                            {d.val}
                                        </a>
                                    ) : (
                                        <p
                                            style={{
                                                fontFamily:"var(--f-sans)",
                                                fontSize:".95rem",
                                                color:"var(--c-ink2)",
                                                fontWeight:300
                                            }}
                                        >
                                            {d.val}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div className="ct-detail">
                                <p className="t-label" style={{ marginBottom:"1rem" }}>Connect</p>
                                <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
                                    {[
                                        { label:"GitHub",   href:"https://github.com/Chandima-R" },
                                        { label:"LinkedIn", href:"https://www.linkedin.com/in/chandimarathnayake15/" },
                                        { label:"Facebook", href:"https://www.facebook.com/chandima.rathnayake.179373" },
                                        { label:"WhatsApp", href:"https://wa.me/94716264936" },
                                    ].map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="t-label"
                                            style={{ color:"var(--c-mid)", transition:"color .3s" }}
                                            onMouseEnter={e => (e.currentTarget.style.color="var(--c-ink)")}
                                            onMouseLeave={e => (e.currentTarget.style.color="var(--c-mid)")}
                                        >
                                            {label} ↗
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT ── */}
                        <AnimatePresence mode="wait">

                            {status === "done" ? (
                                <motion.div key="done"
                                            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                                            transition={{ duration:.8, ease:[.16,1,.3,1] }}
                                            style={{ border:"1px solid var(--c-rule)", padding:"clamp(3rem,5vw,6rem)", textAlign:"center" }}
                                >
                                    <div style={{ width:52, height:52, border:"1px solid var(--c-ink)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2rem", fontSize:"1.1rem" }}>✓</div>
                                    <h3 className="t-h3" style={{ marginBottom:"1rem" }}>Message received.</h3>
                                    <p className="t-body" style={{ maxWidth:320, margin:"0 auto 1.5rem" }}>
                                        I read every message personally and will be in touch within 24 hours.
                                        A confirmation has been sent to your inbox.
                                    </p>
                                    <p className="t-label" style={{ opacity:.35 }}>{form.email}</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" className="ct-form"
                                             onSubmit={onSubmit}
                                             style={{ display:"flex", flexDirection:"column", gap:0 }}
                                             noValidate
                                >
                                    {/* name + email */}
                                    <div className="ct-field" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", marginBottom:"2.5rem" }}>
                                        <div>
                                            <label className="t-label" style={{ display:"block", marginBottom:".6rem" }}>
                                                Your name <span style={{ color:"#cc2200" }}>*</span>
                                            </label>
                                            <input name="name" required value={form.name} onChange={ch} disabled={disabled} className="f-field" placeholder="Full name"/>
                                        </div>
                                        <div>
                                            <label className="t-label" style={{ display:"block", marginBottom:".6rem" }}>
                                                Email <span style={{ color:"#cc2200" }}>*</span>
                                            </label>
                                            <input name="email" type="email" required value={form.email} onChange={ch} disabled={disabled} className="f-field" placeholder="you@company.com"/>
                                        </div>
                                    </div>

                                    {/* project type */}
                                    <div className="ct-field" style={{ marginBottom:"2.5rem" }}>
                                        <label className="t-label" style={{ display:"block", marginBottom:".75rem" }}>Project type</label>
                                        <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
                                            {types.map(t => (
                                                <button type="button" key={t} disabled={disabled}
                                                        onClick={() => setForm(p => ({ ...p, project:t }))}
                                                        style={{
                                                            fontFamily:"var(--f-mono)", fontSize:".55rem", letterSpacing:".14em",
                                                            textTransform:"uppercase", padding:".45rem 1rem",
                                                            border:`1px solid ${form.project===t ? "var(--c-ink)" : "var(--c-rule)"}`,
                                                            color: form.project===t ? "var(--c-ink)" : "var(--c-mid)",
                                                            background: form.project===t ? "rgba(15,15,13,.04)" : "transparent",
                                                            transition:"all .3s",
                                                        }}
                                                >{t}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* budget */}
                                    <div className="ct-field" style={{ marginBottom:"2.5rem" }}>
                                        <label className="t-label" style={{ display:"block", marginBottom:".75rem" }}>Budget range</label>
                                        <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
                                            {budgets.map(b => (
                                                <button type="button" key={b} disabled={disabled}
                                                        onClick={() => setForm(p => ({ ...p, budget:b }))}
                                                        style={{
                                                            fontFamily:"var(--f-mono)", fontSize:".55rem", letterSpacing:".14em",
                                                            textTransform:"uppercase", padding:".45rem 1rem",
                                                            border:`1px solid ${form.budget===b ? "var(--c-ink)" : "var(--c-rule)"}`,
                                                            color: form.budget===b ? "var(--c-ink)" : "var(--c-mid)",
                                                            background: form.budget===b ? "rgba(15,15,13,.04)" : "transparent",
                                                            transition:"all .3s",
                                                        }}
                                                >{b}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* message */}
                                    <div className="ct-field" style={{ marginBottom:"2rem" }}>
                                        <label className="t-label" style={{ display:"block", marginBottom:".6rem" }}>
                                            Tell me about your project <span style={{ color:"#cc2200" }}>*</span>
                                        </label>
                                        <textarea name="message" rows={5} required value={form.message} onChange={ch}
                                                  disabled={disabled} className="f-field"
                                                  placeholder="What are you building, and what's the ideal outcome?"
                                                  style={{ resize:"none" }}/>
                                    </div>

                                    {/* error banner */}
                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.p key="err"
                                                      initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                                                      style={{
                                                          fontFamily:"var(--f-mono)", fontSize:".58rem", letterSpacing:".12em",
                                                          textTransform:"uppercase", color:"#cc2200",
                                                          border:"1px solid rgba(204,34,0,.2)", background:"rgba(204,34,0,.04)",
                                                          padding:".75rem 1rem", marginBottom:"1.5rem",
                                                      }}
                                            >{errMsg}</motion.p>
                                        )}
                                    </AnimatePresence>

                                    {/* submit */}
                                    <div className="ct-field">
                                        <button type="submit" disabled={disabled} className="btn btn-dark"
                                                style={{ width:"100%", justifyContent:"center", gap:".65rem", fontSize:".62rem", opacity:disabled?.7:1, transition:"opacity .3s" }}>
                                            {disabled ? <><Spinner /> Sending…</> : "Send message →"}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style>{`
        @media(max-width:768px){
          .ct-grid{grid-template-columns:1fr!important;}
          .ct-field>div[style*="grid-template-columns"]{grid-template-columns:1fr!important;}
        }
      `}</style>
        </PageLayout>
    );
}
