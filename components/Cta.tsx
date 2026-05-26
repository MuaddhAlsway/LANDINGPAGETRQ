"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Label drops from top
      gsap.fromTo(".cta-content",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-content", start: "top 80%" } }
      );
      // Image slides up from bottom
      gsap.fromTo(".cta-img",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-img", start: "top 80%" } }
      );

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Entire CTA card scales in from slightly smaller
      gsap.fromTo(".cta-card",
        { scale: 0.88, opacity: 0, borderRadius: "60px" },
        {
          scale: 1, opacity: 1, borderRadius: "24px",
          duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".cta-card", start: "top 85%" },
        }
      );

      // 2. Background image parallax zoom on scroll
      gsap.fromTo(".cta-bg-img",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-card",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // 3. SplitText on CTA heading
      const headingEl = document.querySelector<HTMLElement>(".cta-heading");
      if (headingEl) {
        const split = new SplitText(headingEl, { type: "words,chars" });
        gsap.fromTo(split.words,
          { opacity: 0, y: 80, rotateX: -60 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8, stagger: 0.07, ease: "back.out(1.5)",
            scrollTrigger: { trigger: headingEl, start: "top 82%" },
          }
        );
      }

      // 4. Shimmer loop on primary CTA button
      gsap.to(".cta-btn-primary",
        {
          backgroundPosition: "200% center",
          duration: 2,
          ease: "none",
          repeat: -1,
        }
      );

      // 5. Magnetic effect on both CTA buttons
      document.querySelectorAll<HTMLElement>(".cta-btn").forEach((btn) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
          gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        });
      });

      // 6. "Ready to start?" label flickers in
      gsap.fromTo(".cta-ready-label",
        { opacity: 0, letterSpacing: "0.5em" },
        {
          opacity: 1, letterSpacing: "0.2em",
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-ready-label", start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section bg-black pb-28 lg:pb-32">
      <div className="container">
        <div className="cta-card relative rounded-3xl overflow-hidden bg-neutral-900 min-h-[520px] flex items-center">
          {/* Background */}
          <div className="cta-img absolute inset-0">
            <Image
              src="/serviceimage/product.webp"
              alt="CTA"
              fill
              className="cta-bg-img object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 lg:p-16 max-w-2xl">
            <p className="cta-content cta-ready-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-5">
              Ready to start?
            </p>
            <h2 className="cta-content cta-heading section-title text-white mb-6">
              Let&apos;s design your dream space together
            </h2>
            <p className="cta-content text-neutral-300 text-[15px] leading-relaxed mb-8">
              Whether you&apos;re renovating a single room or building from the
              ground up, our team is ready to bring your vision to life.
            </p>
            <div className="cta-content flex flex-wrap gap-4">
              <a
                href="https://trqstudio.com/#pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-primary bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
                style={{ backgroundSize: "200% auto" }}
              >
                Get a quote
              </a>
              <a
                href="https://trqstudio.com/#portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn border border-white/30 text-white font-medium text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                View our portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
