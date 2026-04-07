# Chandima Rathnayake — Portfolio v3

White-background, editorial-style portfolio inspired by Quixo. Built with Next.js 15, Tailwind CSS v4, GSAP 3, Framer Motion 11, and Lenis.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, projects, about, process, services, testimonials, CTA |
| `/work` | Full project grid with category filter |
| `/work/[slug]` | Individual case study — challenge, process, outcome, metrics |
| `/about` | Bio, skills, stats, process |
| `/services` | Service accordion + pricing tiers |
| `/contact` | Contact form with project type + budget selectors |
| `/blog` | Article listing |
| `/blog/[slug]` | Full article with reading progress bar |

## Design system

| Token | Value |
|---|---|
| Background | `#f8f7f4` warm off-white |
| Ink | `#0f0f0d` near-black |
| Display font | Fraunces — italic, weight 300 |
| Body font | Geist — weight 300/400 |
| Mono font | Geist Mono |

## Animation inventory

| Component | Technique |
|---|---|
| Preloader | Letter stagger up → progress bar → full wipe exit |
| Hero headline | GSAP clip-up per line, parallax on scroll |
| Image reveals | `clipPath: inset(100% 0 0 0)` + scale-down inner |
| Process steps | ScrollTrigger active/dim state |
| Marquee | Dual-row opposite direction CSS animation |
| Project cards | Tilt via `rotateX/Y` on mousemove |
| Testimonials | Framer Motion directional slide |
| Services | Framer Motion height accordion |
| Blog post | Reading progress bar |
| Custom cursor | Dot + lagging ring, hover states |
| Lenis | `duration: 1.5`, synced to GSAP ticker |

## Customise

**Content** — Edit `lib/data.ts` for all projects, services, testimonials, posts, and pricing.

**Personal info** — Search `chandimarathnayake` and `Chandima` sitewide.

**Real images** — In `HomeProjects.tsx` and `work/[slug]/page.tsx`, replace placeholder divs with `<Image>` from `next/image`.

## Deploy

```bash
npx vercel   # Vercel (recommended)
```
