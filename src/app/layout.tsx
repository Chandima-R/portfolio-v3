import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Chandima Rathnayake", template: "%s — Chandima Rathnayake" },
  description: "Freelance frontend developer crafting cinematic, high-performance digital experiences from Colombo, Sri Lanka.",
  authors: [{ name: "Chandima Rathnayake" }],
  openGraph: { type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,200;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500&family=Geist+Mono:wght@300;400&display=swap"
            rel="stylesheet"
        />
      </head>
      <body>
      <div className="noise" aria-hidden />
      {children}
      </body>
      </html>
  );
}
