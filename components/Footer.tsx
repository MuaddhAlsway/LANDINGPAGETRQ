"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { footerItems } from "@/data/data";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Columns drop from top with stagger
      gsap.fromTo(".footer-col",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-col", start: "top 90%" } }
      );

      // ── AGGRESSIVE ADDITIONS ──────────────────────────────────────────

      // 1. Footer logo scales in with bounce
      gsap.fromTo(".footer-logo",
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 0.9, ease: "back.out(2)",
          scrollTrigger: { trigger: ".footer-logo", start: "top 92%" },
        }
      );

      // 2. Footer columns enter with alternating Y + rotation
      document.querySelectorAll<HTMLElement>(".footer-col").forEach((col, i) => {
        gsap.fromTo(col,
          { opacity: 0, y: 60, rotateX: -20 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8, ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: col, start: "top 92%" },
          }
        );
      });

      // 3. Bottom bar copyright slides from left, links from right
      gsap.fromTo(".footer-copyright",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-copyright", start: "top 98%" },
        }
      );

      // 4. Footer list items stagger in
      gsap.fromTo(".footer-list-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.4, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-list-item", start: "top 92%" },
        }
      );

      // 5. Border top line draws across
      gsap.fromTo(".footer-border-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-border-line", start: "top 95%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
      <div className="container">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="footer-col col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image src="/barlogo.png" alt="Desint" width={110} height={34} className="footer-logo w-24" />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Interior Design Studio Creating Your Story, Rendered in Stone, Silk, and Light.
            </p>
            <SocialIcons />
          </div>

          {/* Link columns */}
          {footerItems.map((col) => (
            <div key={col.id} className="footer-col">
              <h4 className="text-white font-semibold text-sm mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.id === 1 ? (
                  col.list.map((item) => (
                    <li key={item} className="footer-list-item">
                      <span className="text-neutral-400 text-sm">{item}</span>
                    </li>
                  ))
                ) : (
                  [
                    { label: "Home", href: "https://trqstudio.com/#" },
                    { label: "About", href: "https://trqstudio.com/#about" },
                    { label: "Services", href: "https://trqstudio.com/#services" },
                    { label: "Workflow", href: "https://trqstudio.com/#workflow" },
                    { label: "Portfolio", href: "https://trqstudio.com/#portfolio" },
                    { label: "Contact", href: "https://trqstudio.com/#contact" },
                    { label: "Profile", href: "https://trqstudio.com/#profile" },
                  ].map((item) => (
                    <li key={item.label} className="footer-list-item">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer-col col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-neutral-400 text-sm">Riyadh &amp; Jeddah, Saudi Arabia</li>
              <li>
                <a
                  href="mailto:Info@trqstudio.com"
                  className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Info@trqstudio.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+966506164066"
                  className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                >
                  +966 50 616 4066
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-border-line border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="footer-copyright text-neutral-500 text-xs">
            © {new Date().getFullYear()} Desint Studio. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
