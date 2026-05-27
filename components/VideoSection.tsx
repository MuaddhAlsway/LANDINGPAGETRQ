"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Video reveals with clip-path wipe from bottom
      gsap.fromTo(
        ".video-wrapper",
        { clipPath: "inset(100% 0 0 0)", borderRadius: "40px" },
        {
          clipPath: "inset(0% 0 0 0)",
          borderRadius: "16px",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: ".video-wrapper", start: "top 85%" },
        }
      );

      // Subtle scale-down parallax on the video itself as you scroll past
      gsap.fromTo(
        ".video-el",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".video-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Label fades up
      gsap.fromTo(
        ".video-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".video-label", start: "top 88%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-neutral-950 py-6 px-[5vw] sm:px-[7vw]">
      {/* Optional label */}
      <p className="video-label text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 text-center mb-6">
       OUR WORK IN MOTION
      </p>

      {/* Video */}
      <div className="video-wrapper relative w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        <video
          className="video-el w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
      </div>
    </section>
  );
}
