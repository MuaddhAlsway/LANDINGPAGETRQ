"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/data";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

    // 1. Nav items stagger in from top with slight rotation
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20, rotateX: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(2)",
        delay: 1.2,
      }
    );

    // 2. Logo slides in from left with a slight overshoot
    gsap.fromTo(
      ".header-logo",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: "elastic.out(1, 0.6)", delay: 0.7 }
    );

    // 3. CTA button pops in with scale bounce
    gsap.fromTo(
      ".header-cta",
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2.5)", delay: 1.5 }
    );

    // 4. Magnetic effect on CTA button
    const ctaBtn = document.querySelector<HTMLElement>(".header-cta");
    if (ctaBtn) {
      ctaBtn.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = ctaBtn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
        gsap.to(ctaBtn, { x: dx, y: dy, duration: 0.25, ease: "power2.out" });
      });
      ctaBtn.addEventListener("mouseleave", () => {
        gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      });
    }

    // 5. Nav link underline draw on hover
    const navLinks = document.querySelectorAll<HTMLElement>(".nav-item");
    navLinks.forEach((link) => {
      const underline = link.querySelector<HTMLElement>(".nav-underline");
      if (!underline) return;
      link.addEventListener("mouseenter", () => {
        gsap.fromTo(underline, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.3, ease: "power3.out" });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power3.in" });
      });
    });
  });

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 py-5 transition-all duration-300 ${
        scrolled ? "bg-black border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/barlogo.png"
            alt="Desint logo"
            width={120}
            height={36}
            className="header-logo w-28"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="nav-item relative text-white text-sm font-medium hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://trqstudio.com/#pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta hidden md:block text-sm font-semibold text-black bg-white px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Get a quote
          </a>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Image src="/images/menu.svg" alt="menu" width={28} height={28} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 mx-[5vw] bg-black/90 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-5 border border-white/10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-base font-medium"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="#"
            className="w-fit text-sm font-semibold text-black bg-white px-6 py-2.5 rounded-full"
          >
            Get a quote
          </Link>
        </div>
      )}
    </header>
  );
}
