/* ─── PROJECTS ─── */
export const projects = [
    {
        id: "01", slug: "luxe-commerce",
        title: "Luxe Commerce", subtitle: "Fashion e-commerce platform",
        category: "E-Commerce", year: "2024",
        tags: ["Next.js", "TypeScript", "Stripe", "Sanity CMS"],
        excerpt: "A bespoke fashion platform where conversion grew 34% inside two weeks of launch.",
        description: "A high-end fashion e-commerce platform with real-time inventory management, AI-powered product recommendations, and a bespoke checkout flow architected around conversion — without compromising the brand's luxury positioning.",
        challenge: "The client needed their digital presence to match a brand position built over 15 years of physical retail. The existing site was functional but generic — it communicated nothing about their values.",
        process: "We started with a comprehensive brand audit before a single line of code. Wireframes, content hierarchies, and interaction models were validated with real customers in three rounds of testing before development began.",
        outcome: "34% lift in conversion, 2.1 second average load time, and a site the brand team describes as 'finally feeling like us'.",
        metrics: [{ v: "+34%", l: "Conversion" }, { v: "2.1s", l: "Load time" }, { v: "$420K", l: "Added revenue" }],
        bg: "#f0ebe0",
        featured: true,
    },
    {
        id: "02", slug: "meridian-finance",
        title: "Meridian", subtitle: "Banking dashboard & analytics",
        category: "FinTech", year: "2024",
        tags: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
        excerpt: "A banking dashboard trusted by 50,000+ daily users. Satisfaction at 4.8/5.",
        description: "A sophisticated banking and investment dashboard surfacing complex financial data through a calm, trustworthy interface. 50,000+ daily active users, real-time market feeds, and an accessibility-first component system.",
        challenge: "Financial data is inherently complex. The previous interface overwhelmed users with information density and inconsistent interaction patterns — leading to high support volume and low feature adoption.",
        process: "Led an information architecture overhaul grounded in progressive disclosure principles. Rebuilt the component library from scratch with strict accessibility, then reintroduced features with contextual onboarding.",
        outcome: "NPS jumped from 22 to 71. Support tickets dropped 44%. Mobile daily active users doubled within three months.",
        metrics: [{ v: "50K+", l: "Daily users" }, { v: "4.8/5", l: "Satisfaction" }, { v: "-44%", l: "Support load" }],
        bg: "#e8edf5",
        featured: true,
    },
    {
        id: "03", slug: "kinetic-studio",
        title: "Kinetic Studio", subtitle: "Creative agency website",
        category: "Agency", year: "2023",
        tags: ["Next.js", "GSAP", "Three.js", "Framer Motion"],
        excerpt: "An Awwwards-nominated agency site with 60+ custom GSAP animations.",
        description: "A cinematic agency website that needed to be both a portfolio and a proof of capability. Built with over 60 custom GSAP animations, WebGL scene transitions, and a horizontal scroll narrative that guides visitors through the agency's work.",
        challenge: "The agency's previous site undersold their craft. Clients visiting the website wouldn't have guessed the quality of work the studio was capable of.",
        process: "Treated the website itself as a case study in motion design. Storyboarded the entire scroll journey before writing any code. Each animation was purpose-built to communicate something about the studio's approach.",
        outcome: "Awwwards Site of the Day nomination. Inbound enquiries tripled. Average session duration increased by 4 minutes.",
        metrics: [{ v: "SOTD", l: "Awwwards" }, { v: "+3×", l: "Enquiries" }, { v: "+4min", l: "Session time" }],
        bg: "#ede8f0",
        featured: true,
    },
    {
        id: "04", slug: "orbit-saas",
        title: "Orbit", subtitle: "SaaS project management",
        category: "SaaS", year: "2023",
        tags: ["Next.js", "Supabase", "OpenAI", "Zustand"],
        excerpt: "400 paying customers in 6 months. MRR reached $18K.",
        description: "A collaborative project management SaaS built for small creative teams who found existing tools too heavy. Real-time multiplayer editing, AI task prioritisation, and a focus on reducing friction over adding features.",
        challenge: "The market is saturated with PM tools. The only viable position was radical simplicity — a product that teams could onboard in 10 minutes and feel productive in the first session.",
        process: "Ran a 6-week design sprint with 12 target users before building anything. Cut the feature set in half twice. Built the AI layer last, not first.",
        outcome: "400 paying customers in 6 months without paid acquisition. NPS of 72. Acquired by a larger SaaS company 14 months after launch.",
        metrics: [{ v: "400+", l: "Customers" }, { v: "72", l: "NPS" }, { v: "$18K", l: "MRR" }],
        bg: "#e8f0e8",
        featured: false,
    },
    {
        id: "05", slug: "forma-editorial",
        title: "Forma", subtitle: "Editorial magazine platform",
        category: "Editorial", year: "2023",
        tags: ["Next.js", "Sanity", "Tailwind CSS", "GSAP"],
        excerpt: "A digital publication reaching 120K monthly readers.",
        description: "A digital architecture and design publication needing a platform as considered as its editorial content. Custom reading experience, article-level analytics, and a subscription model built around the community.",
        challenge: "Most magazine platforms are built for volume, not craft. Forma needed something that respected both the editors' work and the readers' time.",
        process: "Designed the reading experience first — typography, rhythm, image treatment, pull quotes. Then built the infrastructure around what the content needed.",
        outcome: "120,000 monthly readers six months after relaunch. Newsletter open rate at 41%. Subscription revenue up 280%.",
        metrics: [{ v: "120K", l: "Monthly readers" }, { v: "41%", l: "Open rate" }, { v: "+280%", l: "Subscriptions" }],
        bg: "#f5ede8",
        featured: false,
    },
];

/* ─── SERVICES ─── */
export const services = [
    {
        n: "01", title: "Frontend Architecture",
        body: "Scalable Next.js and React applications with a performance-first mindset. Component libraries, design systems, and code that's as considered as the product it powers.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
        n: "02", title: "Motion & Interaction",
        body: "Animations that serve the experience rather than distract from it. GSAP scroll storytelling, Framer Motion micro-interactions, and Lenis smooth scrolling implemented with craft.",
        tags: ["GSAP", "Framer Motion", "Three.js", "Lenis"],
    },
    {
        n: "03", title: "Full-Stack Development",
        body: "End-to-end product development from database to deployment. REST and GraphQL APIs, Stripe payments, Supabase real-time, and auth flows that don't get in the way.",
        tags: ["Node.js", "Supabase", "PostgreSQL", "Stripe"],
    },
    {
        n: "04", title: "Performance Engineering",
        body: "Rebuilding slow websites for speed. Core Web Vitals audits, bundle analysis, caching strategies, and edge deployment — without breaking what already works.",
        tags: ["Lighthouse", "Core Web Vitals", "Vercel", "Edge"],
    },
    {
        n: "05", title: "CMS & Content Systems",
        body: "Headless CMS architecture that editors love to use. Sanity Studio, structured content workflows, and GROQ queries that fetch only what the page needs.",
        tags: ["Sanity", "Contentful", "GROQ", "Headless"],
    },
    {
        n: "06", title: "Technical Direction",
        body: "Strategic guidance on stack decisions, architecture reviews, code quality workshops, and mentoring for in-house teams growing their frontend capability.",
        tags: ["Architecture", "Review", "Mentoring", "Strategy"],
    },
];

/* ─── TESTIMONIALS ─── */
export const testimonials = [
    {
        quote: "Chandima delivered a product that genuinely exceeded every expectation. The animations alone were worth the investment — clients couldn't stop talking about how the site felt.",
        author: "Sarah Chen", role: "Founder", company: "Luminary Studio",
    },
    {
        quote: "Working with Chandima felt like having a senior engineer and a top designer in one. He understood both the technical constraints and the brand vision from day one.",
        author: "Marcus Webb", role: "CTO", company: "Meridian Finance",
    },
    {
        quote: "The attention to detail is extraordinary. Every interaction, every transition was considered. Our conversion rate went up 34% within two weeks of launch.",
        author: "Priya Nair", role: "Head of Product", company: "Orbit",
    },
    {
        quote: "Chandima is the rare developer who can talk about design as fluently as code. He pushed back on ideas that wouldn't have worked and always came back with something better.",
        author: "Tom Fitzgerald", role: "Creative Director", company: "Kinetic Studio",
    },
];

/* ─── STATS ─── */
export const stats = [
    { v: 5, sfx: "+", label: "Years" },
    { v: 40, sfx: "+", label: "Projects" },
    { v: 98, sfx: "%", label: "Satisfaction" },
    { v: 12, sfx: "", label: "Awards" },
];

/* ─── SKILLS ─── */
export const skills = [
    "Next.js", "React", "TypeScript", "GSAP", "Framer Motion",
    "Three.js", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL",
    "Figma", "Sanity", "Stripe", "WebGL",
];

/* ─── PROCESS STEPS ─── */
export const processSteps = [
    { n:"01", title:"Discover",  body:"Deep-dive into your goals, audience, constraints, and brand. I ask the questions no one else does — the ones that surface what the project really needs versus what's been asked for." },
    { n:"02", title:"Architect", body:"Technical planning married to design thinking. Information hierarchy, component system, animation strategy, content model — everything mapped before code is touched." },
    { n:"03", title:"Build",     body:"Iterative development in focused two-week cycles. You see real progress every week — no black-box development, no surprise reveals at the end." },
    { n:"04", title:"Refine",    body:"Polish is where premium experiences are made. Every transition, every hover state, every detail is reconsidered until it either earns its place or gets cut." },
    { n:"05", title:"Launch",    body:"Performance-optimised deployment with monitoring, analytics, and documentation thorough enough that your team can confidently own the work after handoff." },
];

/* ─── BLOG POSTS ─── */
export const posts = [
    {
        slug: "building-scroll-experiences",
        title: "Building scroll experiences that earn attention",
        category: "Motion", date: "12 March 2025", readTime: "8 min read",
        excerpt: "A practical framework for deciding when scroll animations serve the user versus when they get in the way — and how to implement the ones that matter.",
        body: `Scroll animations have a reputation problem. Done poorly, they're the digital equivalent of someone waving their hands in your face while you're trying to read. Done well, they guide attention, build narrative, and make complex ideas feel simple.

The question most people get wrong is starting with 'what animations can I add?' The right question is 'what is the user trying to understand here, and how can motion help them understand it faster?'

**The 3-second rule**

Every scroll animation should pass this test: if a user scrolled past it in 3 seconds, would it have communicated something meaningful — or just been decorative? If the answer is decorative, cut it. The web doesn't need more motion for motion's sake.

**GSAP ScrollTrigger fundamentals**

The tool most worth learning is GSAP's ScrollTrigger. Its scrub parameter is what separates good scroll animations from great ones. With scrub: true, animations link directly to scroll position — meaning fast scrollers see a compressed version and slow scrollers see it fully. This respects user agency in a way that time-based animations don't.

**When to use clip-path reveals**

Clip-path reveals — where content appears to wipe into view from an edge — work well for images and large text elements. The key is that the clipping direction should match the natural reading direction. Text reads left-to-right, so a left-to-right clip reveal feels natural. An upward reveal works for elements that are 'emerging' from below the fold.

**The case for restraint**

The portfolios that win Awwwards are not the most animated — they're the most considered. The animations feel inevitable, like they couldn't work any other way. That's the bar worth aiming for.`,
    },
    {
        slug: "nextjs-performance-patterns",
        title: "Next.js performance patterns I use on every project",
        category: "Engineering", date: "28 February 2025", readTime: "6 min read",
        excerpt: "The specific patterns and configurations I reach for on every Next.js project to hit green Core Web Vitals without heroic effort.",
        body: `Performance isn't an afterthought — it's an architectural decision made (or missed) at the start of a project. These are the patterns I reach for on every Next.js build.

**Font loading**

Google Fonts via the next/font package is the fastest path to good typography performance. The font files are self-hosted on the same domain, eliminating the extra DNS lookup. Set display: 'swap' and preload the weights you'll actually use — not all of them.

**Image handling**

The Next.js Image component handles WebP conversion, responsive srcsets, and lazy loading automatically. The patterns I see missed: not setting explicit width/height (causes layout shift), and not using priority on above-the-fold images (delays LCP).

**Bundle analysis**

Run @next/bundle-analyzer before every production deployment. The number of times I've caught a date library (moment.js at 67KB) sneaking into a bundle that needed millisecond-level formatting is embarrassing. date-fns does the same thing at 3KB for tree-shakeable imports.

**Route prefetching**

Next.js prefetches links in the viewport by default. For large applications, this can flood the network. Consider setting prefetch={false} on navigation links and let the router handle prefetching on hover instead.`,
    },
    {
        slug: "design-system-lessons",
        title: "What three years of design systems taught me",
        category: "Design", date: "14 February 2025", readTime: "10 min read",
        excerpt: "Hard-won lessons from building, inheriting, and sometimes rescuing design systems for teams from 3 to 300.",
        body: `Design systems are one of those things everyone wants and almost nobody is happy with. Here's what I've learned from building them, inheriting them mid-project, and occasionally rescuing ones that had collapsed under their own weight.

**The naming problem is the design problem**

If you can't agree on what to call a component, you probably haven't agreed on what it's for. The naming argument about 'Modal vs Dialog vs Overlay' is almost always a proxy for an unresolved product question. Resolve the product question first.

**Avoid the component library trap**

A component library is not a design system. A design system is a shared understanding of why decisions were made — the library is just one artifact of that understanding. Teams that build libraries without the underlying rationale end up with a collection of components that nobody trusts enough to use.

**Tokens first, components second**

The order matters. Define your spacing scale, colour tokens, and typography ramp before you build a single component. Every component built before the token system is a component that will need to be rebuilt.

**The bus factor**

Every design system I've seen fail has had one person who understood it completely. When that person left, the system collapsed. Documentation isn't optional — it's load-bearing infrastructure.`,
    },
];

/* ─── PRICING ─── */
export const pricing = [
    {
        name: "Essentials",
        price: "$4,500",
        desc: "For early-stage products and straightforward marketing sites that need to communicate quality without complexity.",
        features: [
            "Up to 6 pages",
            "Responsive design",
            "Basic scroll animations",
            "CMS integration",
            "2 rounds of revisions",
            "2 weeks post-launch support",
        ],
        cta: "Get started",
        highlight: false,
    },
    {
        name: "Studio",
        price: "$12,000",
        desc: "For brands that need something genuinely exceptional — cinematic motion, considered interactions, and full-stack capability.",
        features: [
            "Unlimited pages",
            "Full GSAP animation system",
            "Custom cursor & interactions",
            "Full-stack with APIs",
            "CMS + content modelling",
            "4 rounds of revisions",
            "3 months post-launch support",
        ],
        cta: "Most popular",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For complex products, design systems, and ongoing partnerships where scope and team size make fixed pricing unrealistic.",
        features: [
            "Design system architecture",
            "Component library",
            "Performance engineering",
            "Team workshops",
            "Monthly retainer option",
            "Direct Slack access",
            "Priority turnaround",
        ],
        cta: "Let's talk",
        highlight: false,
    },
];
