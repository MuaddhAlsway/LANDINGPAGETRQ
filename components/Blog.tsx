"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { blogItems } from "@/data/data";

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".blog-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-label", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".blog-title .line",
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-title", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-card", start: "top 88%" },
        }
      );

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Blog title SplitText char-by-char with skew
      const titleEl = document.querySelector<HTMLElement>(".blog-title");
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "chars,words" });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 40, skewX: 15, rotateY: -30 },
          {
            opacity: 1, y: 0, skewX: 0, rotateY: 0,
            duration: 0.5, stagger: 0.025, ease: "power3.out",
            scrollTrigger: { trigger: titleEl, start: "top 88%" },
          }
        );
      }

      // 2. Cards enter from opposite sides
      document.querySelectorAll<HTMLElement>(".blog-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100, rotateY: i % 2 === 0 ? -10 : 10 },
          {
            opacity: 1, x: 0, rotateY: 0,
            duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });

      // 3. Blog card image parallax on scroll
      document.querySelectorAll<HTMLElement>(".blog-card-img").forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      // 4. Card hover: lift + glow
      document.querySelectorAll<HTMLElement>(".blog-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12, scale: 1.02,
            boxShadow: "0 30px 60px rgba(255,255,255,0.06)",
            duration: 0.4, ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0, scale: 1,
            boxShadow: "0 0px 0px rgba(255,255,255,0)",
            duration: 0.5, ease: "elastic.out(1, 0.5)",
          });
        });
      });

      // 5. "View all posts" button draws border on hover
      const viewBtn = document.querySelector<HTMLElement>(".blog-view-btn");
      if (viewBtn) {
        gsap.fromTo(viewBtn,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: viewBtn, start: "top 90%" },
          }
        );
        viewBtn.addEventListener("mouseenter", () => {
          gsap.to(viewBtn, { scale: 1.05, duration: 0.25, ease: "power2.out" });
        });
        viewBtn.addEventListener("mouseleave", () => {
          gsap.to(viewBtn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section bg-neutral-950">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="blog-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
              From the studio
            </p>
            <h2 className="blog-title section-title text-white">
              <span className="line block overflow-hidden">Ideas &amp; insights</span>
            </h2>
          </div>
          <a
            href="#"
            className="blog-view-btn w-fit border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            View all posts
          </a>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {blogItems.map((item) => (
            <article
              key={item.id}
              className="blog-card group bg-neutral-900 rounded-2xl overflow-hidden cursor-pointer hover:bg-neutral-800 transition-colors duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/blog-img-1.png"
                  alt={item.title}
                  fill
                  className="blog-card-img object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-neutral-500 text-xs font-medium mb-3">{item.date}</p>
                <h3 className="text-white font-semibold text-xl leading-snug mb-3 group-hover:text-white/80 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{item.text}</p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/20 pb-0.5 group-hover:border-white transition-colors">
                  Read article →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
