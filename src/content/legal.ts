import type { LegalSection } from "@/components/legal/LegalDocument";

export const legalUpdated = "May 20, 2026";

export const privacySections: LegalSection[] = [
  {
    title: "Who We Are",
    body:
      "TailorTaste is an early-stage hospitality technology project led by its founding team, Ty Stevens and Bucur Andrei Borcoman. TailorTaste is not currently incorporated and does not sell products or services through this website. You can contact the team through the [contact page](/contact).",
  },
  {
    title: "Information We Collect",
    items: [
      "Contact inquiries: name, email address, organization, inquiry type, message, submission timing, and anti-spam fields.",
      "Technical data: IP address or similar request metadata used for rate limiting, abuse prevention, security, and basic server operation.",
      "Site preferences: the site may store a light or dark theme preference in local storage when you choose or preview a theme.",
      "Analytics: Vercel Web Analytics may collect aggregated, cookie-free page view and event data. We do not use advertising pixels or cross-site tracking on this site.",
    ],
  },
  {
    title: "Why We Use It",
    items: [
      "To respond to inquiries, discuss pilots, partnerships, press, investment, and collaboration opportunities.",
      "To protect the contact form from spam, misuse, and unusually high request volume.",
      "To understand aggregate site usage and improve the website without building user profiles.",
      "To maintain security, debug delivery issues, and keep records where reasonably needed for business or legal purposes.",
    ],
  },
  {
    title: "Legal Bases",
    body:
      "Where GDPR-style rules apply, we rely on legitimate interests for responding to business inquiries, securing the site, and measuring aggregate site performance. If a processing activity requires consent in your location, we will ask for it before using that activity.",
  },
  {
    title: "Service Providers",
    items: [
      "Vercel hosts the site and provides privacy-focused web analytics.",
      "Resend is used to deliver contact form emails and confirmation messages.",
      "Email recipients on the TailorTaste team receive inquiry details so they can respond.",
    ],
  },
  {
    title: "International Transfers",
    body:
      "Our providers may process data in countries outside your own, including the United States. We expect providers to use appropriate contractual and technical safeguards for those transfers.",
  },
  {
    title: "Retention",
    body:
      "We keep contact inquiries only for as long as needed to respond, evaluate the opportunity, maintain reasonable business records, or comply with legal obligations. Server, security, and analytics data are kept according to the relevant provider settings and policies.",
  },
  {
    title: "Your Rights",
    body:
      "Depending on your location, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal data. You may also have the right to complain to a data protection authority. To make a request, contact us through the [contact page](/contact).",
  },
  {
    title: "Cookies And Similar Technologies",
    body:
      "This site does not use advertising cookies. Vercel Web Analytics is designed to work without cookies. The theme preference uses browser local storage so the visual mode can persist; it is not used for advertising or cross-site tracking.",
  },
];

export const legalNoticeSections: LegalSection[] = [
  {
    title: "Website Operator",
    items: [
      "Project: TailorTaste",
      "Operator: the TailorTaste founding team, Ty Stevens and Bucur Andrei Borcoman",
      "Status: early-stage project, not currently incorporated",
      "Contact: [contact page](/contact)",
    ],
  },
  {
    title: "No Online Sales",
    body:
      "This website is informational. It does not include checkout, online ordering, subscriptions, accounts, payment processing, or any automated way to enter into a contract with TailorTaste.",
  },
  {
    title: "Content",
    body:
      "The information on this website is provided for general product, pilot, and company communication. We try to keep it accurate and current, but it may change as the product and business develop.",
  },
  {
    title: "External Links",
    body:
      "This website may link to external sites, including partner, founder, and ecosystem pages. TailorTaste is not responsible for the content, availability, or privacy practices of those third-party websites.",
  },
  {
    title: "Copyright And Marks",
    body:
      "Unless stated otherwise, website text, structure, product descriptions, and TailorTaste brand materials are owned by TailorTaste or its contributors. Third-party names, logos, and marks remain the property of their respective owners.",
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Use Of The Site",
    body:
      "You may use this website to learn about TailorTaste and contact the team. Do not misuse the site, attempt to disrupt it, submit unlawful content, or interfere with its security features.",
  },
  {
    title: "No Sale Or Contract Through This Website",
    body:
      "This website is currently informational and does not create a purchase, subscription, pilot agreement, or investment relationship. Any pilot, partnership, investment, or commercial arrangement requires a separate written agreement.",
  },
  {
    title: "Product Information",
    body:
      "TailorTaste is an early-stage product concept and pilot effort. Features, materials, capabilities, availability, pricing, and timelines may change without notice.",
  },
  {
    title: "No Professional Advice",
    body:
      "Website content is not legal, financial, investment, procurement, or technical advice. You should make decisions based on your own review and any advice from qualified professionals.",
  },
  {
    title: "Limitation Of Liability",
    body:
      "To the maximum extent permitted by law, TailorTaste is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of this website.",
  },
  {
    title: "Privacy",
    body: "Personal data submitted through the site is handled as described in the [Privacy Policy](/privacy).",
  },
  {
    title: "Changes",
    body:
      "We may update these terms as the site, product, or company develops. The updated date at the top of this page shows when the terms were last changed.",
  },
];
