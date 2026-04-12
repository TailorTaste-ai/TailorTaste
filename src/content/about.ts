import type { AboutPageContent } from "@/lib/site";

export const aboutPage = {
  hero: {
    eyebrow: "About",
    title: "Founder conviction behind Tailor Taste.",
    body: "Tailor Taste is led by Ty Stevens and Bucur Andrei Borcoman. The project is early and pre-pilot, with a focused thesis: premium hospitality should gain software flexibility without making the table feel more digital.",
  },
  founderNote: {
    eyebrow: "Founder thesis",
    title: "The menu is one of hospitality's smallest objects with the biggest emotional weight.",
    body: "It shapes the first decision, the first tactile moment, and the guest's first sense of being considered. We kept returning to that object because changing it changes the whole service experience.",
  },
  founders: [
    {
      name: "Ty Stevens",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/ty-stevens-/",
    },
    {
      name: "Bucur Andrei Borcoman",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/bucur-andrei-borcoman/",
    },
  ],
  sections: [
    {
      eyebrow: "Origin",
      title: "Why start with menus",
      body: "Menus carry brand, kitchen intent, language access, and pace. They are central to service quality but still trapped in mostly static workflows.",
    },
    {
      eyebrow: "Current stage",
      title: "Pre-pilot and deliberately focused.",
      body: "The current objective is to validate form factor, staff-led flow, and practical menu-control value before expanding into deeper software layers.",
    },
    {
      eyebrow: "Mission",
      title: "Make premium hospitality more adaptive without making it feel more digital.",
      body: "The product starts narrow on purpose: one object, one workflow, one credible wedge for long-term product development.",
    },
    {
      eyebrow: "Conversation fit",
      title: "Looking for high-quality early partners.",
      body: "Tailor Taste is currently looking for pilot-minded premium venues, thoughtful investors/advisors, and collaborators who care about service craft as much as software rigor.",
    },
  ],
} satisfies AboutPageContent;
