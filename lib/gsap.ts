import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, TextPlugin, CustomEase);

// Custom aggressive eases
CustomEase.create("aggressive", "M0,0 C0.2,0 0.1,1 1,1");
CustomEase.create("snap", "M0,0 C0.6,0 0.4,1 1,1");

export { gsap, useGSAP, SplitText, ScrollTrigger, TextPlugin, CustomEase };
