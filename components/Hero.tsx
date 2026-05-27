"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Tag slides down from top
      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.8 }
      )
        // Title lines reveal bottom to top
        .fromTo(
          ".hero-title .line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.12 },
          "-=0.2"
        )
        // Desc slides up from bottom
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        // Buttons slide up from bottom
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        // Bottom bar slides up
        .fromTo(
          ".hero-bottom",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(".hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Overlay darkens as user scrolls down (scrubbed)
      gsap.to(".hero-overlay", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // 2. Animated scroll indicator line grows downward on loop
      gsap.fromTo(
        ".hero-scroll-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.5,
        }
      );

      // 3. Tag line (the horizontal rule) width animates in
      gsap.fromTo(
        ".hero-tag-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power4.out", delay: 1.6 }
      );

      // 4. Magnetic pull on buttons
      const buttons = document.querySelectorAll<HTMLElement>(".hero-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.35;
          const dy = (e.clientY - cy) * 0.35;
          gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        });
      });

      // 5. SplitText char-by-char stagger on the italic "Spaces." word
      const spacesEl = document.querySelector<HTMLElement>(".hero-spaces");
      if (spacesEl) {
        const split = new SplitText(spacesEl, { type: "chars" });
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 60, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(2)",
          },
          "-=0.8"
        );
      }

      // 6. Content block subtle upward float on scroll (parallax)
      gsap.to(".hero-content-block", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-neutral-900"
    >
      {/* Background video */}
      <div className="hero-bg absolute inset-0 scale-110">
        <video
          src="/full.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Base overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Scroll-driven darkening overlay */}
        <div className="hero-overlay absolute inset-0 bg-black opacity-0" />
      </div>

      {/* Content */}
      <div className="hero-content-block container relative z-10 pb-16 lg:pb-24 pt-32">
        {/* Tag */}
        <div className="hero-tag inline-flex items-center gap-2 mb-6">
          <span className="hero-tag-line w-8 h-px bg-white/50 block" />
          <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">
            Interior Design Studio
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title font-semibold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] mb-8">
          <span className="line block overflow-hidden">
            <span className="block">WE CREATE</span>
          </span>
          <span className="line block overflow-hidden">
            <span className="block">BEAUTIFUL</span>
          </span>
          <span className="line block overflow-hidden">
            <span className="hero-spaces block italic font-light">SPACE.</span>
          </span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="hero-desc text-white/60 text-[15px] max-w-sm leading-relaxed mb-8">
              Award-winning interior design studio crafting timeless spaces
              that blend aesthetics with functionality.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://trqstudio.com/#portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Our Projects
              </a>
              <a
                href="https://trqstudio.com/#pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn border border-white/30 text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>


        </div>

        {/* Bottom bar */}
        <div className="hero-bottom flex items-center justify-between mt-12 pt-8 border-t border-white/10">
          <SocialIcons />
          <div className="flex items-center gap-3 text-white/40 text-xs tracking-widest uppercase">
            <span>Scroll</span>
            {/* Animated scroll line */}
            <span className="relative w-8 h-6 flex items-start justify-center overflow-hidden">
              <span className="hero-scroll-line absolute top-0 w-px h-full bg-white/60 origin-top" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
