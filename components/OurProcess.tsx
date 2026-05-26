"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { processItems } from "@/data/data";

export default function OurProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Label drops from top
      gsap.fromTo(".process-label",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".process-label", start: "top 88%" } }
      );
      // Title reveals bottom to top
      gsap.fromTo(".process-title .line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".process-title", start: "top 88%" } }
      );
      // Desc slides up from bottom
      gsap.fromTo(".process-desc",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".process-desc", start: "top 88%" } }
      );
      // Cards slide up from bottom with stagger
      gsap.fromTo(".process-item",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".process-item", start: "top 88%" } }
      );

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Process items alternate from left/right
      document.querySelectorAll<HTMLElement>(".process-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 40 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // 2. Connecting horizontal line draws across on scroll
      gsap.fromTo(".process-connector",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: ".process-connector", start: "top 85%" },
        }
      );

      // 3. Number circles pulse + scale in
      document.querySelectorAll<HTMLElement>(".process-num").forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.6, ease: "back.out(3)",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
        // Continuous subtle pulse
        gsap.to(el, {
          boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
          duration: 1.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });

      // 4. SplitText on process title
      const titleEl = document.querySelector<HTMLElement>(".process-title");
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "words" });
        gsap.fromTo(split.words,
          { opacity: 0, y: 60, rotateX: -45 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, stagger: 0.08, ease: "power4.out",
            scrollTrigger: { trigger: titleEl, start: "top 85%" },
          }
        );
      }

      // 5. Step label text slides in from left
      gsap.fromTo(".process-step-label",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".process-step-label", start: "top 88%" },
        }
      );

      // 6. Process item text reveals line by line
      document.querySelectorAll<HTMLElement>(".process-item-text").forEach((el) => {
        const split = new SplitText(el, { type: "lines" });
        gsap.fromTo(split.lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.5, stagger: 0.07, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="process" className="section bg-black">
      <div className="container">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="process-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Our process
            </p>
            <h2 className="process-title section-title text-white">
              <span className="line block overflow-hidden">How we bring</span>
              <span className="line block overflow-hidden">your vision to life</span>
            </h2>
          </div>
          <p className="process-desc text-neutral-400 text-[15px] leading-relaxed self-end">
            Our proven four-step process ensures every project is delivered on
            time, on budget, and beyond expectations — with clear communication
            at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="process-connector hidden xl:block absolute top-6 left-0 right-0 h-px bg-white/20 z-0" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative z-10">
          {processItems.map((item, index) => (
            <div key={item.id} className="process-item">
              {/* Number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="process-num w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="w-full h-px bg-white/10" />
              </div>

              <p className="process-step-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3">
                {item.step}
              </p>
              <h3 className="text-xl font-semibold text-white capitalize mb-3">
                {item.title}
              </h3>
              <p className="process-item-text text-neutral-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
