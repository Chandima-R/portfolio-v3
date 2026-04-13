import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.chandimarathnayake.online"),

    title: {
        default: "Chandima Rathnayake — Freelance Frontend Developer in Sri Lanka",
        template: "%s — Chandima Rathnayake",
    },

    description:
        "Chandima Rathnayake is a freelance frontend developer based in Colombo, Sri Lanka, specializing in high-performance, cinematic web experiences using Next.js, React, GSAP, and modern web technologies.",

    keywords: [
        // Personal branding
        "Chandima Rathnayake",
        "Chandima Rathnayake developer",
        "frontend developer Sri Lanka",
        "freelance web developer Colombo",

        // Services
        "freelance frontend developer",
        "Next.js developer",
        "React developer",
        "GSAP animation developer",
        "website designer Sri Lanka",
        "modern web design",
        "high performance websites",

        // Technical keywords
        "Next.js expert",
        "React.js development",
        "GSAP animations",
        "Framer Motion developer",
        "TypeScript developer",
        "SEO optimized websites",

        // Niche positioning
        "cinematic websites",
        "premium web design",
        "interactive web experiences",
        "luxury website design",
        "creative developer portfolio",

        // Location SEO
        "web developer Colombo",
        "Sri Lanka web developer",
        "hire frontend developer Sri Lanka",
    ],

    authors: [{ name: "Chandima Rathnayake" }],
    creator: "Chandima Rathnayake",
    publisher: "Chandima Rathnayake",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        title: "Chandima Rathnayake — Freelance Frontend Developer",
        description:
            "Cinematic, high-performance websites built with Next.js, React, and GSAP. Based in Colombo, Sri Lanka.",
        url: "https://www.chandimarathnayake.online",
        siteName: "Chandima Rathnayake Portfolio",
        images: [
            {
                url: "/og-image.jpg", // <-- create this
                width: 1200,
                height: 630,
                alt: "Chandima Rathnayake Portfolio",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Chandima Rathnayake — Frontend Developer",
        description:
            "Freelance frontend developer crafting cinematic digital experiences.",
        images: ["/og-image.jpg"],
    },

    alternates: {
        canonical: "https://www.chandimarathnayake.online",
    },

    category: "technology",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* Performance + Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />

            <link
                href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,200;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500&family=Geist+Mono:wght@300;400&display=swap"
                rel="stylesheet"
            />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />

            {/* Theme Color */}
            <meta name="theme-color" content="#0A0A0A" />

            {/* Geo SEO */}
            <meta name="geo.region" content="LK" />
            <meta name="geo.placename" content="Colombo" />
            <meta name="geo.position" content="6.9271;79.8612" />
            <meta name="ICBM" content="6.9271, 79.8612" />
        </head>

        <body>
        <div className="noise" aria-hidden />
        {children}
        </body>
        </html>
    );
}
