"use client";
import LenisProvider from "@/components/LenisProvider";
import About from "@/components/About";
import Cta from "@/components/Cta";
import Hero from "@/components/Hero";
import OurProcess from "@/components/OurProcess";
import Services from "@/components/Services";

export default function Home() {
  return (
    <LenisProvider>
      <Hero />
      <About />
      <Services />
      <OurProcess />
      <Cta />
    </LenisProvider>
  );
}
