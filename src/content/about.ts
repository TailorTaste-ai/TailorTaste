import type { AboutPageContent } from "@/lib/site";

export const aboutPage: AboutPageContent = {
  hero: {
    eyebrow: "Cofounders",
    title: "Two founders covering the two hard parts: demand and the physical object.",
    body: "Ty Stevens focuses on market direction, customer conversations, recruiting, and sales. Bucur Andrei Borcoman focuses on hardware, prototyping, and turning the menu object into something that can be built and tested.",
    items: [
      {
        title: "1.5+ years working together",
        body: "The founders worked together through ETH Entrepreneur Club before starting TailorTaste.",
      },
      {
        title: "Shared leadership standard",
        body: "Both have led teams before, which matters for recruiting and operating beyond a two person prototype.",
      },
      {
        title: "Complementary founder instincts",
        body: "One side pressure tests demand. The other side pressure tests whether the object can actually be made.",
      },
    ],
  },
  founders: [
    {
      name: "Ty Stevens",
      role: "Cofounder",
      linkedin: "https://www.linkedin.com/in/ty-stevens-/",
      summary:
        "Leads market direction, customer conversations, recruiting, and sales discipline.",
      focusAreas: [
        "Positioning and go to market judgment",
        "Hospitality and hotel operator context",
        "Recruiting, leadership, and customer facing execution",
      ],
      portrait: {
        alt: "Portrait placeholder for Ty Stevens",
        initials: "TS",
        placeholder: "Cofounder portrait",
      },
    },
    {
      name: "Bucur Andrei Borcoman",
      role: "Cofounder",
      linkedin: "https://www.linkedin.com/in/bucur-andrei-borcoman/",
      summary:
        "Leads hardware thinking, prototyping, and technical decisions around the physical menu object.",
      focusAreas: [
        "Hardware thinking and physical product execution",
        "Robotics, machinery, and technical prototyping",
        "Fast technical iteration from concept to build",
      ],
      portrait: {
        alt: "Portrait placeholder for Bucur Andrei Borcoman",
        initials: "BB",
        placeholder: "Cofounder portrait",
      },
    },
  ],
  founderFit: {
    eyebrow: "Founder fit",
    title: "The founding split matches the product risk.",
    body: "TailorTaste has to answer two questions at the same time: do premium venues need this badly enough, and can the menu object be built to belong in service?",
    items: [
      {
        title: "Tested working rhythm",
        body: "Prior collaboration reduces the risk of learning founder communication while also building the product.",
      },
      {
        title: "Strategic and technical balance",
        body: "Customer discovery and hardware execution are both first order risks, so both are founder level responsibilities.",
      },
      {
        title: "Mutual domain fluency",
        body: "Decisions can be challenged from both market and build perspectives before time is spent.",
      },
    ],
  },
  domainComplement: {
    eyebrow: "Complementary domains",
    title: "The product has to satisfy both venue operators and physical constraints.",
    body: "A good website mockup is not enough. The object has to survive material choices, charging, service workflow, cleaning, handout behavior, and customer willingness to pilot.",
    items: [
      {
        title: "Ty: strategy, industry, recruiting, selling",
        body: "Owns who the product is for, why they would pilot it, and how the company reaches them.",
      },
      {
        title: "Bucur: hardware, robotics, machinery, build",
        body: "Owns the technical path from product intent to prototype decisions.",
      },
      {
        title: "Shared understanding",
        body: "The team can reject ideas that are commercially weak or physically unrealistic before they absorb too much time.",
      },
    ],
  },
  operatingStyle: {
    eyebrow: "Operating style",
    title: "The current work is evidence, not polish.",
    body: "The team is prioritizing prototype quality, pilot conversations, and service workflow validation over broad feature claims.",
    items: [
      {
        title: "Fast builders",
        body: "Ideas should become tests quickly: a prototype change, a customer question, or a clearer constraint.",
      },
      {
        title: "Strong leaders",
        body: "Clear ownership matters now because hardware, website, sales, and pilot work move in parallel.",
      },
      {
        title: "Outcome driven",
        body: "The output that matters is better product evidence or better customer evidence.",
      },
    ],
  },
  currentFocus: {
    eyebrow: "Current focus",
    title: "Current focus: prototype, workflow, pilot evidence.",
    body: "The next milestone is proving that staff can control the object naturally before and during service, and that premium venues see enough operational value to test it.",
  },
  closingCta: {
    eyebrow: "Talk to the Cofounders",
    title: "Bring the specific question you want answered.",
    body: "Useful conversations are about pilot workflow, venue fit, hardware tradeoffs, or the first commercial path.",
    cta: {
      label: "Discuss a pilot",
      href: "/contact",
      variant: "primary",
    },
  },
};
