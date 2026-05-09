import type { AboutPageContent } from "@/lib/site";

export const aboutPage: AboutPageContent = {
  hero: {
    eyebrow: "Cofounders",
    title: "Built by two Cofounders who already know how to execute together.",
    body: "Ty Stevens and Bucur Andrei Borcoman have worked together for more than 1.5 years through ETH Entrepreneur Club, building trust across fast-moving teams, strategic decisions, and high-effort execution.",
    items: [
      {
        title: "1.5+ years working together",
        body: "A tested working relationship from ETH Entrepreneur Club, not a newly assembled founding pair.",
      },
      {
        title: "Shared leadership standard",
        body: "Both have led large teams individually and know what it takes to move people toward an outcome.",
      },
      {
        title: "Complementary founder instincts",
        body: "Ty leads strategy, industry understanding, recruiting, leadership, and selling. Bucur leads the technical and hardware build.",
      },
    ],
  },
  founders: [
    {
      name: "Ty Stevens",
      role: "Cofounder",
      linkedin: "https://www.linkedin.com/in/ty-stevens-/",
      summary:
        "Strategic founder with indirect behind-the-scenes exposure to how major hotel chains operate, plus strong instincts for recruiting, leadership, and selling.",
      focusAreas: [
        "Strategy, positioning, and go-to-market judgment",
        "Hospitality insight from indirect industry exposure",
        "Recruiting, leadership, and customer-facing execution",
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
        "Technical founder focused on hardware, with roughly eight years of building robots, machinery, and mechanical systems in different forms.",
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
    title: "The important thing is not only what each founder knows. It is how the pair works.",
    body: "Ty and Bucur have already operated together under pressure, moved quickly, and built confidence in each other's judgment across strategy, leadership, and technical execution.",
    items: [
      {
        title: "Tested working rhythm",
        body: "More than 1.5 years of collaboration through ETH Entrepreneur Club gave the team real evidence of speed, trust, and decision quality.",
      },
      {
        title: "Strategic and technical balance",
        body: "Ty brings industry sense, sales orientation, recruiting, and strategy. Bucur brings deep technical judgment, especially around hardware.",
      },
      {
        title: "Mutual domain fluency",
        body: "Each founder has a clear edge, but neither works in isolation. Both understand enough of the other's domain to make decisions quickly together.",
      },
    ],
  },
  trackRecord: {
    eyebrow: "Execution record",
    title: "ETH Entrepreneur Club gave the team a live proving ground for leadership and execution.",
    body: "The exact metrics can be filled in as they are finalized. The point for now is clear: both Cofounders have already led people, shipped events, and worked through real operational pressure.",
    items: [
      {
        label: "Teams led",
        value: "[team size]",
        body: "Large student and operator teams led individually across ETH Entrepreneur Club work.",
      },
      {
        label: "Events built",
        value: "[events led]",
        body: "Different event formats created and executed from planning through delivery.",
      },
      {
        label: "Reach",
        value: "[attendance]",
        body: "Placeholder for attendance, community reach, or participant volume.",
      },
      {
        label: "Partners",
        value: "[sponsors/partners]",
        body: "Placeholder for sponsors, speakers, companies, or institutional partners.",
      },
      {
        label: "Resources",
        value: "[budget]",
        body: "Placeholder for budgets, resources, or operational scope managed.",
      },
      {
        label: "Outcome",
        value: "[outcome]",
        body: "Placeholder for concrete event results, repeatability, or stakeholder feedback.",
      },
    ],
  },
  domainComplement: {
    eyebrow: "Complementary domains",
    title: "The split is clear: strategy and industry judgment on one side, hardware execution on the other.",
    body: "TailorTaste needs both. The product has to understand premium hospitality and still become a real physical object that can be built, tested, and improved.",
    items: [
      {
        title: "Ty: strategy, industry, recruiting, selling",
        body: "Ty brings the strategic lens, hospitality context, customer-facing judgment, recruiting strength, and team leadership needed to shape the company around real demand.",
      },
      {
        title: "Bucur: hardware, robotics, machinery, build",
        body: "Bucur brings the technical brain of the team, with years of hands-on experience building robots, machinery, and physical systems.",
      },
      {
        title: "Shared understanding",
        body: "The pair is not split into disconnected lanes. Each understands enough of the other's domain to challenge decisions and keep execution moving.",
      },
    ],
  },
  operatingStyle: {
    eyebrow: "Operating style",
    title: "High effort, fast iteration, outcome first.",
    body: "The team works quickly, iterates fast, and cares more about results than process theater. Both founders are ambitious, direct, and comfortable leading.",
    items: [
      {
        title: "Fast builders",
        body: "The team prefers quick cycles: decide, build, test, learn, and keep moving.",
      },
      {
        title: "Strong leaders",
        body: "Both founders have led large teams individually and understand how to create momentum around a shared goal.",
      },
      {
        title: "Outcome-driven",
        body: "The standard is simple: does the work create the result? If not, the team changes course quickly.",
      },
    ],
  },
  currentFocus: {
    eyebrow: "Current focus",
    title: "Turning founder fit into a focused first product.",
    body: "Right now the team is using its strategy, hospitality, and hardware edge to build the first version of TailorTaste deliberately, with early proof and pilot conversations as the next important milestones.",
  },
  closingCta: {
    eyebrow: "Talk to the Cofounders",
    title: "For pilots, partnerships, or investor conversations, talk directly to the people building it.",
    body: "TailorTaste is still early, which makes founder-level conversations the highest-signal way to understand the product, the team, and the opportunity.",
    cta: {
      label: "Discuss a pilot",
      href: "/contact",
      variant: "primary",
    },
  },
};
