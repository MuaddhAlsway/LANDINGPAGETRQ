"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Label drops from top
      gsap.fromTo(".about-label",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 88%" } }
      );
      // Title lines reveal bottom to top
      gsap.fromTo(".about-title .line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-title", start: "top 88%" } }
      );
      // Body text slides up from bottom
      gsap.fromTo(".about-text",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".about-text", start: "top 88%" } }
      );
      // Stats slide up from bottom
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".stat-item", start: "top 88%" } }
      );
      // Image reveals from top down
      gsap.fromTo(".about-img",
        { clipPath: "inset(0% 0 100% 0)" },
        { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".about-img", start: "top 85%" } }
      );
      // Logos marquee — handled by CSS animation (see JSX)

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. SplitText word-by-word reveal on about-title with perspective
      const titleEl = document.querySelector<HTMLElement>(".about-title");
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "words,lines" });
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 80, rotateY: -25 },
          {
            opacity: 1, y: 0, rotateY: 0,
            duration: 0.8, stagger: 0.06, ease: "power4.out",
            scrollTrigger: { trigger: titleEl, start: "top 85%" },
          }
        );
      }

      // 2. Counter roll-up on stat numbers
      document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.val) + "+"; },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // 3. About image inner zoom parallax (the Image inside scales on scroll)
      gsap.fromTo(".about-img-inner",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-img",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // 4. About image subtle horizontal drift on scroll
      gsap.to(".about-img",
        {
          x: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-img",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // 5. Logo hover: pause the CSS marquee
      const marqueeEl = document.querySelector<HTMLElement>(".logos-marquee");
      if (marqueeEl) {
        marqueeEl.addEventListener("mouseenter", () => {
          marqueeEl.style.animationPlayState = "paused";
          (marqueeEl.querySelector(".logos-track") as HTMLElement | null)?.style &&
            ((marqueeEl.querySelector(".logos-track") as HTMLElement).style.animationPlayState = "paused");
        });
        marqueeEl.addEventListener("mouseleave", () => {
          marqueeEl.style.animationPlayState = "running";
          (marqueeEl.querySelector(".logos-track") as HTMLElement | null)?.style &&
            ((marqueeEl.querySelector(".logos-track") as HTMLElement).style.animationPlayState = "running");
        });
      }

      // 6. Label letter spacing breathe animation
      gsap.to(".about-label", {
        letterSpacing: "0.35em",
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    },
    { scope: containerRef }
  );

  const logos = [
    "/clientlogo/18.png",
    "/clientlogo/19.png",
    "/clientlogo/20.png",
    "/clientlogo/21.png",
    "/clientlogo/22.png",
    "/clientlogo/23.png",
    "/clientlogo/24.png",
    "/clientlogo/25.png",
  ];

  return (
    <section ref={containerRef} id="about" className="section bg-black">
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="about-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
              About us
            </p>

            <h2 className="about-title section-title text-white mb-8">
              <span className="line block overflow-hidden">Designing spaces</span>
              <span className="line block overflow-hidden">that tell your story</span>
            </h2>

            <p className="about-text text-neutral-400 leading-relaxed text-[15px] mb-4">
              TRQ STUDIO translates ideas into thoughtfully designed spaces,
              combining clarity of vision with precise execution.
            </p>
            <p className="about-text text-neutral-400 leading-relaxed text-[15px] mb-4">
              Design solutions tailored to your unique vision and requirements.
            </p>
            <p className="about-text text-neutral-400 leading-relaxed text-[15px] mb-8">
              Design the most luxurious, timeless exhibition booths. A glimpse
              into our recent works and design excellence.
            </p>

            <a
              href="https://trqstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-text inline-flex items-center gap-3 text-sm font-semibold text-white border-b border-white/40 pb-0.5 hover:opacity-60 transition-opacity"
            >
              Learn more about us
            </a>
          </div>

          {/* Right — image */}
          <div className="about-img relative rounded-2xl overflow-hidden aspect-[3/4]">
            <Image
              src="/serviceimage/about.webp"
              alt="About our studio"
              fill
              className="about-img-inner object-cover"
            />
          </div>
        </div>

        {/* Logos marquee — CSS infinite scroll */}
        <div className="mt-20 pt-12 pb-28 lg:pb-32 border-t border-white/10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 text-center mb-8">
            Our Clients
          </p>
          {/* Outer mask with fade edges */}
          <div
            className="logos-marquee relative overflow-hidden flex"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            {/* Track 1 */}
            <div className="logos-marquee-track flex items-center gap-16 flex-shrink-0">
              {logos.map((src, i) => (
                <div key={i} className="flex-shrink-0">
                  <Image
                    src={src}
                    alt="client logo"
                    width={90}
                    height={32}
                    className="h-10 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            {/* Track 2 — identical, follows immediately behind */}
            <div className="logos-marquee-track flex items-center gap-16 flex-shrink-0" aria-hidden="true">
              {logos.map((src, i) => (
                <div key={i} className="flex-shrink-0">
                  <Image
                    src={src}
                    alt="client logo"
                    width={90}
                    height={32}
                    className="h-10 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
