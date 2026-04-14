"use client";
import {useEffect} from "react";
import {notFound, useParams} from "next/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {CustomCursor} from "@/components/utils/custom-cursor";
import {useLenis} from "@/hooks/use-lenis";
import {projects} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const params = useParams()
  const p = projects.find(x => x.slug === params.slug);
  useLenis();

  useEffect(() => {
    if (!p) return;
    const ctx = gsap.context(() => {
      /* hero */
      gsap.from(".cs-title span", { yPercent: 108, stagger: .09, duration: 1.2, ease: "power4.out", delay: .2 });
      gsap.from(".cs-meta-item", { opacity: 0, y: 16, stagger: .08, duration: .8, ease: "power3.out", delay: .7 });

      /* body reveals */
      gsap.from(".cs-reveal", {
        opacity: 0, y: 32, stagger: .1, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: ".cs-body", start: "top 82%" },
      });

      /* image reveal */
      gsap.from(".cs-img-wrap", {
        clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut",
        scrollTrigger: { trigger: ".cs-img-wrap", start: "top 82%" },
      });
      gsap.from(".cs-img-inner", {
        scale: 1.1, duration: 1.4, ease: "power4.inOut",
        scrollTrigger: { trigger: ".cs-img-wrap", start: "top 82%" },
      });

      /* metrics count up */
      p.metrics.forEach((m, i) => {
        const num = parseFloat(m.v.replace(/[^0-9.]/g, ""));
        if (isNaN(num)) return;
        const suffix = m.v.replace(/[0-9.]/g, "");
        const el = document.getElementById(`cs-m-${i}`);
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: num, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: ".cs-metrics", start: "top 80%" },
          onUpdate() { el.textContent = Math.round(obj.v) + suffix; },
        });
      });
    });
    return () => ctx.revert();
  }, [p]);

  if (!p) notFound();

  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  const meta = [
    { label: "Stack", val: p.tags.join(" · ") },
    { label: "Year", val: p.year },
    { label: "Category", val: p.category },
    { label: "Live", val: "Visit site", link: p.link },
  ];

  const groupOne = [meta[0], meta[2]];
  const groupTwo = [meta[3]];

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <div style={{
          minHeight: "90svh",
          background: p.bg,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "calc(80px + 3rem) clamp(1.5rem,5vw,5rem) clamp(4rem,7vw,8rem)",
          position: "relative", overflow: "hidden",
          borderBottom: "1px solid var(--c-rule)",
        }}>
          {/* pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(15,15,13,.05) 1px,transparent 1px),
                              linear-gradient(90deg,rgba(15,15,13,.05) 1px,transparent 1px)`,
            backgroundSize: "64px 64px",
          }} />
          {/* watermark number */}
          <div aria-hidden style={{
            position: "absolute", right: "clamp(2rem,6vw,8rem)", bottom: "clamp(3rem,6vw,7rem)",
            fontFamily: "var(--f-serif)", fontSize: "clamp(10rem,22vw,24rem)",
            fontWeight: 300, fontStyle: "italic", color: "rgba(15,15,13,.06)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>{p.id}</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <span className="t-label" style={{ background: "var(--c-ink)", color: "var(--c-bg)", padding: ".3rem .9rem" }}>
                {p.category}
              </span>
              <span className="t-label">{p.year}</span>
            </div>

            <div className="cs-title" style={{ marginBottom: "clamp(2rem,4vw,5rem)" }}>
              <div className="line-clip">
                <span style={{
                  display: "block",
                  fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(4rem,10vw,12rem)", letterSpacing: "-.04em", lineHeight: .9,
                  color: "var(--c-ink)",
                }}>{p.title}</span>
              </div>
              <div className="line-clip">
                <span style={{
                  display: "block",
                  fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(1.4rem,2.5vw,2.5rem)", letterSpacing: "-.02em",
                  color: "var(--c-ink2)", marginTop: ".5rem",
                }}>{p.subtitle}</span>
              </div>
            </div>

            {/* meta strip */}
            <div
                style={{
                  display: "flex",
                  gap: "3rem",
                  flexWrap: "wrap",
                  borderTop: "1px solid rgba(15,15,13,.1)",
                  paddingTop: "2rem",
                }}
            >
              {/* Group 1: Stack + Category */}
              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
                {[
                  { label: "Stack", val: p.tags.join(" · ") },
                  { label: "Category", val: p.category },
                ].map((m) => (
                    <div key={m.label} className="cs-meta-item">
                      <p
                          className="t-label"
                          style={{ opacity: 0.4, marginBottom: ".35rem" }}
                      >
                        {m.label}
                      </p>
                      <p
                          style={{
                            fontFamily: "var(--f-sans)",
                            fontSize: ".9rem",
                            color: "var(--c-ink2)",
                            fontWeight: 300,
                          }}
                      >
                        {m.val}
                      </p>
                    </div>
                ))}
              </div>

              {/* Group 2: Year */}
              <div className="cs-meta-item">
                <p className="t-label" style={{ opacity: 0.4, marginBottom: ".35rem" }}>
                  Year
                </p>
                <p
                    style={{
                      fontFamily: "var(--f-sans)",
                      fontSize: ".9rem",
                      color: "var(--c-ink2)",
                      fontWeight: 300,
                    }}
                >
                  {p.year}
                </p>
              </div>

              {/* Group 3: Live CTA */}
              <div className="cs-meta-item">
                <p className="t-label" style={{ opacity: 0.4, marginBottom: ".35rem" }}>
                  Live
                </p>

                <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "var(--f-sans)",
                      fontSize: ".9rem",
                      color: "var(--c-ink2)",
                      fontWeight: 300,
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(15,15,13,.3)",
                      paddingBottom: "2px",
                    }}
                >
                  Visit site →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="cs-body wrap" style={{
          paddingTop: "clamp(5rem,9vw,11rem)",
          paddingBottom: "clamp(5rem,9vw,11rem)",
        }}>
          {/* intro quote */}
          <div className="cs-reveal" style={{
            maxWidth: 720, marginBottom: "clamp(5rem,8vw,10rem)",
            paddingBottom: "clamp(3rem,5vw,6rem)",
            borderBottom: "1px solid var(--c-rule)",
          }}>
            <p style={{
              fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(1.5rem,2.6vw,2.4rem)", letterSpacing: "-.02em",
              lineHeight: 1.4, color: "var(--c-ink2)",
            }}>{p.description}</p>
          </div>

          {/* image placeholder */}
          <div className="cs-img-wrap" style={{ marginBottom: "clamp(5rem,8vw,10rem)", overflow: "hidden", aspectRatio: "16/9", background: p.bg }}>
            <div className="cs-img-inner" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
      url('${p.banner}'),
      linear-gradient(rgba(15,15,13,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15,15,13,.04) 1px, transparent 1px)
    `,
                    backgroundSize: "cover, 48px 48px, 48px 48px",
                    backgroundPosition: "center, 0 0, 0 0",
                    backgroundRepeat: "no-repeat, repeat, repeat",
                  }}
              />
              <span style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(3rem,10vw,10rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(15,15,13,.08)", zIndex: 1 }}>
                {p.title}
              </span>
            </div>
          </div>

          {/* 3-col challenge/process/outcome */}
          <div className="cs-reveal" style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: "clamp(2rem,4vw,5rem)",
            marginBottom: "clamp(5rem,8vw,10rem)",
            paddingBottom: "clamp(3rem,5vw,6rem)",
            borderBottom: "1px solid var(--c-rule)",
          }}>
            {[
              { label: "Challenge", text: p.challenge },
              { label: "Process",   text: p.process },
              { label: "Outcome",   text: p.outcome },
            ].map(item => (
              <div key={item.label}>
                <p className="t-label" style={{ marginBottom: "1.25rem", paddingBottom: ".75rem", borderBottom: "1px solid var(--c-rule)" }}>
                  {item.label}
                </p>
                <p className="t-body" style={{ fontSize: ".95rem", lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* metrics */}
          <div className="cs-metrics cs-reveal" style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            background: "var(--c-bg-alt)",
            marginBottom: "clamp(5rem,8vw,10rem)",
          }}>
            {p.metrics.map((m, i) => (
              <div key={i} style={{
                padding: "clamp(2.5rem,5vw,5rem) clamp(2rem,4vw,4rem)",
                borderRight: i < p.metrics.length - 1 ? "1px solid var(--c-rule)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(2.5rem,5vw,5.5rem)", letterSpacing: "-.03em",
                  color: "var(--c-ink)", lineHeight: 1, marginBottom: ".75rem",
                }}>
                  <span id={`cs-m-${i}`}>{m.v}</span>
                </div>
                <p className="t-label">{m.l}</p>
              </div>
            ))}
          </div>

          {/* tech stack */}
          <div className="cs-reveal" style={{ marginBottom: "clamp(5rem,8vw,10rem)" }}>
            <p className="t-label" style={{ marginBottom: "1.5rem" }}>Technology Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--f-mono)", fontSize: ".58rem", letterSpacing: ".14em",
                  textTransform: "uppercase", color: "var(--c-ink2)",
                  border: "1px solid var(--c-rule)", padding: ".5rem 1.1rem",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEXT PROJECT ── */}
        <div style={{ borderTop: "1px solid var(--c-rule)" }}>
          <a href={`/work/${next.slug}`} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "clamp(3rem,5vw,6rem) clamp(1.5rem,5vw,5rem)",
            background: next.bg, transition: "opacity .3s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <div>
              <p className="t-label" style={{ marginBottom: ".75rem", opacity: .5 }}>Next Project</p>
              <h3 style={{
                fontFamily: "var(--f-serif)", fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(2rem,4vw,4.5rem)", letterSpacing: "-.03em", color: "var(--c-ink)",
              }}>{next.title}</h3>
            </div>
            <span style={{
              fontFamily: "var(--f-serif)", fontSize: "clamp(3rem,7vw,7rem)",
              fontWeight: 300, fontStyle: "italic", color: "rgba(15,15,13,.15)",
            }}>→</span>
          </a>
        </div>
      </main>

      <Footer />

      <style>{`
        @media(max-width:768px){
          .cs-body > div[style*="grid-template-columns: repeat(3"] { grid-template-columns:1fr!important; }
        }
      `}</style>
    </>
  );
}
