"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { servicesItems } from "@/data/data";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Label drops from top
      gsap.fromTo(".services-label",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".services-label", start: "top 88%" } }
      );
      // Title reveals bottom to top
      gsap.fromTo(".services-title .line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".services-title", start: "top 88%" } }
      );
      // Desc slides up from bottom
      gsap.fromTo(".services-desc",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".services-desc", start: "top 88%" } }
      );
      // Cards slide up from bottom with stagger
      gsap.fromTo(".service-card",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".service-card", start: "top 88%" } }
      );

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Cards enter with alternating X directions + rotation
      gsap.fromTo(".service-card",
        (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -15 : 15, scale: 0.9 }),
        {
          opacity: 1, x: 0, rotateY: 0, scale: 1,
          duration: 1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".service-card", start: "top 85%" },
        }
      );

      // 2. 3D tilt on mouse move per card
      const cards = document.querySelectorAll<HTMLElement>(".service-card");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotX = ((y - cy) / cy) * -12;
          const rotY = ((x - cx) / cx) * 12;
          gsap.to(card, {
            rotateX: rotX, rotateY: rotY,
            transformPerspective: 800,
            scale: 1.03,
            duration: 0.3, ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0, rotateY: 0, scale: 1,
            duration: 0.6, ease: "elastic.out(1, 0.5)",
          });
        });
      });

      // 3. Image overlay wipe reveal on card hover
      cards.forEach((card) => {
        const wipe = card.querySelector<HTMLElement>(".card-wipe");
        if (!wipe) return;
        card.addEventListener("mouseenter", () => {
          gsap.fromTo(wipe,
            { scaleY: 0, transformOrigin: "bottom center" },
            { scaleY: 1, duration: 0.5, ease: "power3.out" }
          );
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(wipe, { scaleY: 0, transformOrigin: "top center", duration: 0.4, ease: "power3.in" });
        });
      });

      // 4. Card number counter animates on scroll
      document.querySelectorAll<HTMLElement>(".service-num").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // 5. Services section title SplitText char reveal
      const titleEl = document.querySelector<HTMLElement>(".services-title");
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "chars" });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 50, skewX: 10 },
          {
            opacity: 1, y: 0, skewX: 0,
            duration: 0.6, stagger: 0.03, ease: "power3.out",
            scrollTrigger: { trigger: titleEl, start: "top 88%" },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="services" className="section bg-neutral-950 pb-28 lg:pb-32">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="services-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
              OUR SERVICES
            </p>
            <h2 className="services-title section-title text-white">
              <span className="line block overflow-hidden">WHAT WE OFFER </span>
            </h2>
          </div>
          <p className="services-desc text-neutral-400 text-[15px] leading-relaxed max-w-sm">
            From concept to completion, we handle every detail of your
            interior transformation with care and expertise.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {servicesItems.map((item) => (
            <div
              key={item.id}
              className="service-card group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="service-num text-white/40 text-xs font-medium tracking-widest uppercase mb-2">
                  0{item.id}
                </p>
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
              {/* Hover wipe overlay */}
              <div className="card-wipe absolute inset-0 bg-white/10 pointer-events-none scale-y-0" />
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
