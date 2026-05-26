import {
  BlogItem,
  FooterItem,
  NavItem,
  ProcessItem,
  ServiceItem,
  StatusItem,
} from "@/types/types";

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    href: "#home",
  },
  {
    id: 2,
    label: "About",
    href: "#about",
  },
  {
    id: 3,
    label: "Our Service",
    href: "#services",
  },
  {
    id: 4,
    label: "Our Process",
    href: "#process",
  },
];

export const status: StatusItem[] = [
  {
    id: 1,
    value: "340+",
    label: "Successfull projects",
  },
  {
    id: 2,
    value: "64+",
    label: "Team members",
  },
  {
    id: 3,
    value: "80+",
    label: "Happy Clients",
  },
];

export const servicesItems: ServiceItem[] = [
  {
    id: 1,
    img: "/serviceimage/14c.webp",
    title: "Interior Design",
  },
  {
    id: 2,
    img: "/serviceimage/event.webp",
    title: "Booth Design Management & Execution",
  },
  {
    id: 3,
    img: "/serviceimage/product.webp",
    title: "Product & Furniture Design",
  },
  {
    id: 4,
    img: "/serviceimage/concept.webp",
    title: "Concept Design",
  },
];

export const processItems: ProcessItem[] = [
  {
    id: 1,
    title: "Discovery & Analysis",
    step: "Step 01",
    text: "Aligning with your vision, brand identity, and project goals.",
  },
  {
    id: 2,
    title: "Concept Development",
    step: "Step 02",
    text: "Mapping out space planning and how people will actually move through the area.",
  },
  {
    id: 3,
    title: "3D Design & Experience",
    step: "Step 03",
    text: "Creating highly realistic 3D renders from the best angles.",
  },
  {
    id: 4,
    title: "Technical Documentation",
    step: "Step 04",
    text: "Detailed blueprints and technical specifications.",
  },
  {
    id: 5,
    title: "Final Handover",
    step: "Step 05",
    text: "Completing your perfect space.",
  },
];

export const blogItems: BlogItem[] = [
  {
    id: 1,
    title: "Interior Color Trends Designers Are Betting On for 2026",
    text: "From warm neutrals to bold accent palettes, 2026 is shaping up to be the year designers break the rules and embrace personality-driven interiors.",
    date: "Design • Dec 30, 2025",
  },
  {
    id: 2,
    title: "How Minimal Spaces Are Evolving Into Warmer, Lived-In Homes",
    text: "Minimalism isn’t disappearing  it’s getting softer. Here’s how designers are blending clean layouts with texture, warmth, and human comfort.",
    date: "Interior • Jan 12, 2026",
  },
];

export const footerItems: FooterItem[] = [
  {
    id: 1,
    title: "Services",
    list: [
      "Interior Design",
      "Booth Design",
      "Management & Execution",
      "Product & Furniture Design",
      "Concept Design",
    ],
  },
  {
    id: 2,
    title: "Quick Links",
    list: [
      "Home",
      "About",
      "Services",
      "Workflow",
      "Portfolio",
      "Contact",
      "Profile",
    ],
  },
];
