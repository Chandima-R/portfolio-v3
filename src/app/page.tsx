"use client";
import {useEffect, useState} from "react";
import {Preloader} from "@/components/utils/pre-loader";
import {CustomCursor} from "@/components/utils/custom-cursor";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {Hero} from "@/components/sections/hero";
import {Marquee} from "@/components/sections/marquee";
import {HomeProjects} from "@/components/sections/home-projects";
import {HomeAbout} from "@/components/sections/home-about";
import {HomeProcess} from "@/components/sections/home-process";
import {HomeServices} from "@/components/sections/home-services";
import {HomeTestimonials} from "@/components/sections/home-testimonials";
import {HomeCTA} from "@/components/sections/home-cta";
import {useLenis} from "@/app/hooks/use-lenis";

export default function Home() {
  const [ready, setReady] = useState(false);
  useLenis();

  useEffect(() => { document.body.style.overflow = "hidden"; }, []);

  const onDone = () => {
    document.body.style.overflow = "";
    setReady(true);
  };

  return (
      <>
        <Preloader onDone={onDone} />
        <CustomCursor />
        <div style={{ opacity: ready ? 1 : 0, transition: "opacity .5s ease" }}>
          <Navbar isHome />
          <main>
            <Hero />
            <Marquee />
            <HomeProjects />
            <HomeAbout />
            <HomeProcess />
            <HomeServices />
            <HomeTestimonials />
            <HomeCTA />
          </main>
          <Footer />
        </div>
      </>
  );
}
