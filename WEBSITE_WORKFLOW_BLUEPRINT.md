# Tailor Taste Website Workflow Blueprint

This document is the master checklist for turning the current Tailor Taste scaffold into a polished, premium, vision-led website.

It is designed for future Codex prompts, parallel agents, and step-by-step implementation. Treat it as the operating plan between the source documents and the codebase.

## Source Documents

- `Tailor_Taste_Product_Strategy_Document.docx`
- `TailorTaste_Website_Blueprint_V2.docx`
- `TailorTaste_Technical_Scaffolding_Blueprint.docx`

## Current Scaffold

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Content model: structured local files in `src/content`
- Routes currently scaffolded:
  - `/`
  - `/product`
  - `/vision`
  - `/about`
  - `/contact`
- Deferred routes:
  - `/faq`
  - `/future`
  - dedicated investor page
  - dedicated venue or pilot page

## Technical Verdict

The current structure is technically sound for the project stage.

Approved foundation:

- [ ] Next.js App Router is appropriate for a premium multi-page marketing site.
- [ ] TypeScript is appropriate for structured content, CTA contracts, and component props.
- [ ] Tailwind CSS is appropriate for fast, consistent section-by-section implementation.
- [ ] Static-first local content files are appropriate before a CMS is justified.
- [ ] Server Components by default are appropriate for performance and simplicity.
- [ ] Client Components should remain limited to forms, mobile navigation state, and optional motion islands.
- [ ] The current `src/app`, `src/components`, `src/content`, `src/lib`, and `src/assets` split is appropriate and should be preserved.

Intentionally deferred:

- [ ] CMS.
- [ ] CRM integration.
- [ ] Analytics provider.
- [ ] Heavy motion dependency.
- [ ] Testimonials, partner logos, or proof modules.
- [ ] Dedicated investor/venue landing pages.

Do not change casually:

- [ ] Do not move page copy back into route files.
- [ ] Do not merge all homepage sections into one component.
- [ ] Do not add global state management.
- [ ] Do not introduce a UI component library unless the design system outgrows local primitives.
- [ ] Do not add Framer Motion, GSAP, or a CMS without a dedicated phase and reason.
- [ ] Do not make `/faq` or `/future` part of the main launch nav until those routes exist.

## North Star

The website should make Tailor Taste feel like a category-defining, premium hospitality product before the MVP is mature.

The site should not feel like a cautious MVP landing page, a generic restaurant software homepage, a tablet product page, or a QR-menu replacement. It should feel like the beginning of a new category: paper elegance with software control.

## Master Success Criteria

- [ ] Visitors understand what Tailor Taste is within the first 20 seconds.
- [ ] The site clearly frames the missing category between static paper and intrusive digital menus.
- [ ] The product feels premium, restrained, credible, and hospitality-first.
- [ ] The current stage is honest: early, pre-pilot, focused, and not overclaimed.
- [ ] The homepage builds belief before diving into operational detail.
- [ ] Secondary pages deepen the story instead of repeating the homepage.
- [ ] Contact paths are clear for venues, investors, partners, and builders.
- [ ] Content can be changed through `src/content/*` without rewriting components.
- [ ] Each future prompt can own a bounded workstream without needing to redesign the entire site.
- [ ] The finished site passes lint, build, responsive checks, and basic accessibility checks.

## Non-Negotiable Positioning Rules

- [ ] Describe Tailor Taste as a premium hospitality menu object, not a tablet.
- [ ] Preserve the line: paper elegance, software control.
- [ ] Keep guest-side interaction minimal or absent in the MVP story.
- [ ] Make staff control central to the service model.
- [ ] Avoid ordering, kiosk, QR-menu, and generic restaurant-tech framing.
- [ ] Treat hardware as the wedge and software as the long-term leverage.
- [ ] Use disciplined stage language: designed for, building toward, first direction, over time.
- [ ] Do not invent proof, partner logos, customers, testimonials, or mature product claims.
- [ ] Do not let the future-platform story outrun the credibility of the product wedge.

## Recommended Agent Workflow

Use this order unless a later planning session changes the strategy.

1. P1: Information Architecture and Global Shell
2. P2: Homepage Narrative and Copy System
3. P3: Design System and Premium Styling
4. P4: Product Page Buildout
5. P5: Vision Page Buildout
6. P6: About Page and Founder Voice
7. P7: Contact Flow and Conversion UX
8. P8: Asset System and Visual Placeholders
9. P9: Motion and Interaction Polish
10. P10: FAQ and Reality Anchors
11. P11: Future/Roadmap Page
12. P12: SEO, Metadata, Analytics Readiness
13. P13: Accessibility, Responsive QA, and Performance
14. P14: Final Content Pass and Launch Readiness
15. P15: Technical Launch Hardening and Quality Gates

Each phase below includes purpose, dependencies, implementation checklist, acceptance criteria, and a future prompt starter.

---

# Project Manager Build Specification

This section translates the strategy documents into execution specifications. A project manager should be able to use this section to brief designers, developers, copywriters, and future agents without reopening the source documents.

## Website Type

- [ ] Build a vision-led premium startup website for a pre-MVP hospitality hardware/software company.
- [ ] Treat the site as a hybrid between:
  - [ ] category-creation page
  - [ ] premium product launch site
  - [ ] early investor-facing story layer
  - [ ] conversion funnel for pilot, partner, and investor conversations
- [ ] Do not build a mature SaaS dashboard site.
- [ ] Do not build a single-page placeholder landing page.
- [ ] Do not build an ecommerce site.
- [ ] Do not build a restaurant ordering product.

## Primary Business Goal

- [ ] Generate high-intent conversations with:
  - [ ] premium hotels
  - [ ] hotel restaurants
  - [ ] premium independent restaurants
  - [ ] investors and advisors
  - [ ] strategic partners
  - [ ] builders or collaborators
- [ ] Optimize for conversation quality over raw lead volume.
- [ ] Keep the main action low-friction: discuss a pilot, talk to founders, explore partnership.

## Primary Audience

- [ ] First beachhead: premium hotels and hotel restaurants.
- [ ] Most relevant operator profile:
  - [ ] international guests
  - [ ] multiple languages
  - [ ] multiple service contexts
  - [ ] lunch/dinner/event variation
  - [ ] premium positioning
  - [ ] willingness to run design-conscious pilots
- [ ] Likely internal champions:
  - [ ] F&B manager
  - [ ] director of food and beverage
  - [ ] outlet manager
  - [ ] general manager
- [ ] Secondary audiences:
  - [ ] investors
  - [ ] advisors
  - [ ] strategic partners
  - [ ] potential collaborators
  - [ ] general curious visitors

## Required Visitor Understanding

Within 20 seconds, visitors should understand:

- [ ] Tailor Taste is a menu product.
- [ ] It is paper-like and premium.
- [ ] It is digital underneath but not tablet-like.
- [ ] It is designed for staff-controlled service.
- [ ] It solves the tradeoff between paper elegance and software flexibility.
- [ ] It is early, but serious and directionally ambitious.

## Final Experience Specification

This describes how the finished first version should feel and behave. It is not a pixel-perfect design file, but it should remove ambiguity for a product manager, designer, or engineer.

### Overall Impression

- [ ] The site should feel like a premium product launch for hospitality, not like restaurant software.
- [ ] The first screen should feel cinematic and confident.
- [ ] The product should be understood as an elegant object within seconds.
- [ ] Pages should feel spacious, deliberate, and editorially controlled.
- [ ] The design should use contrast, typography, photography/renders, and spacing rather than decorative effects.
- [ ] The website should feel early-stage only in its honest wording, not in its polish.

### Final Visual Composition

- [ ] Hero:
  - [ ] full-width, high-impact opening section
  - [ ] dark or high-contrast premium atmosphere
  - [ ] large manifesto headline
  - [ ] short explanatory support copy
  - [ ] two clear CTAs
  - [ ] product object visual or cinematic placeholder area
- [ ] Body sections:
  - [ ] alternate between light and dark/full-width bands when useful
  - [ ] keep content width controlled
  - [ ] use grids only for scannable comparisons, features, and outcomes
  - [ ] avoid overusing cards so the page does not feel like SaaS
- [ ] Product/object sections:
  - [ ] make the object feel physical, thin, and premium
  - [ ] use close-up framing and material language when final assets exist
  - [ ] do not show the menu as a glowing tablet interface
- [ ] CTA sections:
  - [ ] visually decisive but restrained
  - [ ] should feel like an invitation, not a sales squeeze
- [ ] Contact page:
  - [ ] should feel like a continuation of the story
  - [ ] should not feel like an administrative form page

### Final Information Rhythm

- [ ] Hero creates belief.
- [ ] Category gap explains why the product should exist.
- [ ] Why-now section creates timing credibility.
- [ ] Object reveal makes the idea tangible.
- [ ] Possibility grid translates into operator and guest value.
- [ ] Service-fit section reduces fear.
- [ ] Future layer opens investability.
- [ ] Founder note creates human conviction.
- [ ] Final CTA converts the right people.

### What The End Result Should Not Look Like

- [ ] Not a generic SaaS page with stacked feature cards and dashboard screenshots.
- [ ] Not a restaurant ordering platform.
- [ ] Not a QR-menu replacement page.
- [ ] Not a luxury hotel editorial site with no product clarity.
- [ ] Not a hardware spec sheet.
- [ ] Not a fake mature startup with invented proof.
- [ ] Not a playful startup page with gimmicky interactions.

## Exact Product Definition To Preserve

Use this as the canonical product definition unless a later strategy revision replaces it:

```text
Tailor Taste is a paper-like digital menu system for premium hospitality that gives restaurants and hotels the flexibility of software without sacrificing the elegance, readability, and immersive feel of a physical menu.
```

## Product Scope Matrix

| Capability | Public Stage | Website Treatment |
| --- | --- | --- |
| Paper-like menu object | Required MVP direction | Show as central product wedge |
| Black-and-white readable display | Required MVP direction | Mention as text-first, monochrome clarity |
| Staff-controlled language switching | Required MVP direction | Use as one of the clearest demo moments |
| Preset menu switching | Required MVP direction | Use lunch/dinner/event examples |
| Low-light readability presets | Required MVP direction | Use as guest comfort and premium atmosphere benefit |
| PDF upload/conversion | MVP direction | Mention mostly on Product page, not hero |
| Individual item activation/removal | Feasibility-dependent MVP feature | Phrase as intended/explored if feasible |
| Diet/allergy highlighting | Early post-MVP | Use future language only |
| Template-based menu design | Early post-MVP | Use future or roadmap language |
| Basic menu analytics | Early post-MVP | Use future language only |
| Inventory-linked changes | Long-term | Do not imply launch availability |
| Ingredient-aware price suggestions | Long-term | Mention only in future-layer context |
| POS/PMS integrations | Long-term | Mention only as platform direction |
| Guest ordering | Excluded from MVP | Explicitly exclude where objections are handled |
| Guest-side touch interaction | Excluded from MVP | Explicitly protect the read-only philosophy |

## MVP Product Boundaries For Website Copy

- [ ] The product should be described as staff-controlled.
- [ ] The guest should not be asked to operate a device in the MVP story.
- [ ] The display should be described as paper-like and text-first.
- [ ] The initial product direction should be black and white.
- [ ] The menu should feel like a premium physical object.
- [ ] Do not promise ordering.
- [ ] Do not promise guest-side touch.
- [ ] Do not promise live inventory integration.
- [ ] Do not promise AI optimization.
- [ ] Do not show a dense dashboard as the core visual.

## Practical Deployment Truths To Communicate Carefully

- [ ] Handout should feel like a normal premium menu handout.
- [ ] Staff may choose language or menu state before giving the menu to the guest.
- [ ] Menus in active guest use should not visibly change mid-meal unless deliberately designed.
- [ ] Prefer inactive-menu updates first.
- [ ] Charging/storage should be treated as part of the product experience, not an afterthought.
- [ ] Dock concept: dedicated charging/storage with metallic pins is a current direction, not final public hardware promise.
- [ ] Battery target from strategy: at least 1.5 days practical runtime.
- [ ] Pilot shape from strategy: one outlet inside a premium hotel is preferred before full-property rollout.
- [ ] Pilot size assumption from strategy: likely 15 to 30 active units plus spares.
- [ ] Cleaning, theft prevention, films/coatings, remote update flow, and durability remain unresolved product workstreams.

## Commercial Story Rules

- [ ] Sell first on premium guest experience plus operational flexibility.
- [ ] Use cost savings as reinforcement, not the whole pitch.
- [ ] Suitable operator value examples:
  - [ ] fewer reprints
  - [ ] easier language coverage
  - [ ] cleaner service transitions
  - [ ] more flexible seasonal menus
  - [ ] less awkward item unavailability communication
  - [ ] stronger premium impression
- [ ] Suitable guest value examples:
  - [ ] higher language comfort
  - [ ] better readability in atmospheric rooms
  - [ ] fresher menu experience
  - [ ] more considered hospitality
- [ ] Do not publish exact pricing yet.
- [ ] Do not imply a finalized business model.
- [ ] If business model is mentioned, use directional language around setup fee plus lease/subscription/service model.

## Competitive Framing Rules

- [ ] Do not claim there is no competition.
- [ ] Frame alternatives as solving different problems in different formats.
- [ ] Mention adjacent categories carefully:
  - [ ] paper menus
  - [ ] QR menus
  - [ ] tablets/self-ordering devices
  - [ ] menu CMS/POS tools
  - [ ] digital signage
  - [ ] adjacent e-paper concepts
- [ ] Core differentiation:
  - [ ] paper-like look and feel
  - [ ] read-only guest experience
  - [ ] hospitality-first service philosophy
  - [ ] waiter-led compatibility
  - [ ] premium physical object plus software roadmap

## Route Specification

| Route | Launch Status | Nav Label | Primary Job | Must Include | Must Avoid |
| --- | --- | --- | --- | --- | --- |
| `/` | Must launch | Home | Vision first, product logic second, action third | hero manifesto, category gap, why now, object reveal, possibilities, service fit, future layer, founder note, CTA | deep FAQ, detailed specs, bloated operational detail |
| `/product` | Must launch | Product | Explain object and capabilities | what it is, service logic, MVP capabilities, deployment thinking, exclusions | broad manifesto repetition, fake dashboard maturity |
| `/vision` | Must launch | Vision | Make category and platform argument | why menus matter, category gap, why now, object-to-system roadmap | too much operational detail |
| `/about` | Must launch | About | Humanize founder thesis | origin insight, stage, mission, conviction | generic biography, fake team/advisor claims |
| `/contact` | Must launch | Contact | Convert high-intent conversations | inquiry form, audience routing, concise invitation | administrative dead-end, long repeated explanations |
| `/faq` | Phase 2 | FAQ | Ground objections | stage honesty, MVP boundaries, pilot questions | speculative promises |
| `/future` | Phase 2 optional | Future | Expand platform ambition | layered roadmap, future software, long-term infrastructure | pretending future features exist |

## Homepage Module Specification

| ID | Component | Purpose | Required Content | Required CTA | Asset Need |
| --- | --- | --- | --- | --- | --- |
| H1 | `HeroManifesto` | Instant belief and clarity | category line, headline, product definition, short support copy | `Discuss a pilot`, `Read the vision` | cinematic render/concept visual |
| H2 | `CategoryGap` | Explain why the category should exist | paper vs intrusive digital vs Tailor Taste | none | simple comparison diagram optional |
| H3 | `WhyNow` | Create timing credibility | multilingual expectations, faster menu changes, weak existing digital answers | optional | minimal icons |
| H4 | `ObjectReveal` | Make product tangible | paper-like object, staff-controlled, monochrome, premium | optional | product render, side profile, close-up |
| H5 | `PossibilityGrid` | Translate product into value | language, states, readability, staff control, future dietary support | none | restrained icons optional |
| H6 | `DreamOutcomes` | Sell higher-level future | operator, guest, category outcomes | none | optional atmosphere visual |
| H7 | `ServiceFit` | Reduce fear | waiter-led service, familiar handout, staff chooses state | optional | service-flow diagram |
| H8 | `FutureLayer` | Open platform upside | object to content control to operations to intelligence | optional | roadmap graphic |
| H9 | `FounderNote` | Add conviction | why menus matter, why build now, current stage | none | founder photo/signature optional |
| H10 | `FinalCTA` | Convert interest | first-wave invitation | `Join the first wave`, `Talk to founders` | none |

## Page-Level Content Specification

### Home

- [ ] Hero must make the category feel obvious.
- [ ] Home should sell the future first.
- [ ] Product detail should be enough to understand, not enough to exhaust the visitor.
- [ ] Operational depth should move to Product, FAQ, or Contact.
- [ ] Final CTA should invite early conversations.

### Product

- [ ] Lead with the object, not the dashboard.
- [ ] Include one clean product definition.
- [ ] Explain staff-controlled logic.
- [ ] Explain MVP capabilities.
- [ ] Explain deployment thinking carefully.
- [ ] Include explicit exclusions.
- [ ] Include a waiter-led hospitality block.

### Vision

- [ ] Make this the manifesto page.
- [ ] Explain the menu as one of hospitality's last static objects.
- [ ] Explain why the category gap matters.
- [ ] Explain why now.
- [ ] Show object-to-infrastructure evolution.
- [ ] End with an ambitious but serious invitation.

### About

- [ ] Show founder conviction, not only biography.
- [ ] Explain the origin insight.
- [ ] Mention current stage honestly.
- [ ] Add one Zurich/premium hospitality starting-context line if accurate and useful.
- [ ] Avoid filler company history.

### Contact

- [ ] Keep a short visionary intro above the form.
- [ ] Make the page feel like an invitation.
- [ ] Form inquiry types should be:
  - [ ] Pilot venue / hotel
  - [ ] Investor / advisor
  - [ ] Strategic partner
  - [ ] Builder / collaborator
  - [ ] Press / media
  - [ ] Other
- [ ] Submission can remain local-only until backend destination is chosen.
- [ ] Do not imply delivery if no backend exists.

## Technical Architecture Specification

### Build Model

- [ ] Use a static-first or hybrid marketing-site model.
- [ ] Do not introduce a CMS for the first launch.
- [ ] Use Next.js App Router routes.
- [ ] Use TypeScript for components and content types.
- [ ] Use Tailwind CSS for the styling foundation.
- [ ] Use local structured content objects in `src/content`.
- [ ] Keep page files thin.
- [ ] Keep shared primitives reusable.
- [ ] Keep section components independently buildable.
- [ ] Keep animation progressive with static fallbacks.
- [ ] Default to Server Components for routes, layout, static sections, and content rendering.
- [ ] Use Client Components only for interactive islands:
  - [ ] contact form
  - [ ] future motion/reveal wrappers if needed
  - [ ] future mobile nav menu if it requires local state
- [ ] Avoid adding global state management; the website does not need it.
- [ ] Avoid adding a component library unless a concrete need appears.
- [ ] Avoid adding a CMS until update frequency or non-technical editing needs justify it.
- [ ] Keep dependencies lean; every new dependency must have a specific reason.
- [ ] Prefer CSS/Tailwind for layout, responsive behavior, and simple transitions.
- [ ] Prefer `next/image` for real image assets once added.
- [ ] Prefer static imports from `src/assets` for component-used images.
- [ ] Use `public/` for browser-addressable assets such as favicon, OG image, and static files referenced by URL.

### Current Target Folder Structure

```text
public/
  favicon.ico
  og/
    tailor-taste-og-placeholder.jpg

src/
  app/
    page.tsx
    product/page.tsx
    vision/page.tsx
    about/page.tsx
    contact/page.tsx
    layout.tsx
    globals.css

  components/
    global/
      Navbar.tsx
      Footer.tsx
      SiteShell.tsx
    primitives/
      Button.tsx
      Container.tsx
      Eyebrow.tsx
      SectionHeader.tsx
      Card.tsx
    sections/
      HeroManifesto.tsx
      CategoryGap.tsx
      WhyNow.tsx
      ObjectReveal.tsx
      PossibilityGrid.tsx
      DreamOutcomes.tsx
      ServiceFit.tsx
      FutureLayer.tsx
      FounderNote.tsx
      FinalCTA.tsx
    forms/
      ContactForm.tsx

  content/
    navigation.ts
    home.ts
    product.ts
    vision.ts
    about.ts
    contact.ts
    ctas.ts
    faq.ts
    roadmap.ts

  lib/
    site.ts
    validation.ts
    analytics.ts
    motion.ts

  assets/
    images/
    icons/
    renders/
```

Future optional additions:

```text
src/
  components/
    motion/
      Reveal.tsx
      MotionMedia.tsx
    layout/
      SplitSection.tsx
      FeatureGrid.tsx
      ProcessSteps.tsx
  content/
    seo.ts
    assets.ts
```

Only add these when the need is real. Do not create abstractions just because they are listed here.

### Ownership Rule

- [ ] Route files assemble sections only.
- [ ] Content files own copy, labels, arrays, feature lists, FAQ entries, and roadmap data.
- [ ] Primitive components own reusable UI behavior.
- [ ] Section components own layout and presentation for a specific narrative block.
- [ ] Global components own navigation, footer, and shell only.
- [ ] Forms own local validation and interaction state.
- [ ] `lib` owns shared types, site config, validation helpers, future analytics helpers, and future form helpers.

### Content Editing Rule

- [ ] Headline and body copy should live in `src/content`.
- [ ] CTA labels and hrefs should live in `src/content/ctas.ts`.
- [ ] Navigation labels and hrefs should live in `src/content/navigation.ts`.
- [ ] FAQ entries should live in `src/content/faq.ts`.
- [ ] Roadmap entries should live in `src/content/roadmap.ts`.
- [ ] Components should not hardcode final public copy unless it is purely structural UI text.

### Type Contracts

The following shared types should remain available and be expanded only when needed:

```ts
export type CTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "text";
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export type FeatureItem = {
  title: string;
  body: string;
  icon?: string;
};
```

If new structured content is needed, add types in `src/lib/site.ts` rather than creating incompatible one-off shapes inside components.

### Data And Linking Flow

Use this flow so future agents know exactly how content, routes, and components connect.

```text
src/lib/site.ts
  shared types + siteConfig

src/content/*.ts
  typed content objects, CTA labels, navigation, page copy

src/app/**/page.tsx
  imports content + section components
  assembles page in required order
  exports metadata when page-specific metadata is needed

src/components/sections/*.tsx
  receives content as props
  handles section layout and presentation

src/components/primitives/*.tsx
  reusable low-level UI elements

src/components/global/*.tsx
  persistent site shell, navigation, footer
```

Linking requirements:

- [ ] All internal links use Next.js `Link`.
- [ ] All CTA href values are defined in `src/content/ctas.ts` unless a page-specific CTA is intentionally local.
- [ ] Navigation links are defined in `src/content/navigation.ts`.
- [ ] Primary CTA routes to `/contact`.
- [ ] `Read the vision` routes to `/vision`.
- [ ] Product-oriented secondary links route to `/product`.
- [ ] Deferred routes must not appear in main nav until implemented.
- [ ] Footer may include only live routes unless a future phase intentionally adds deferred route placeholders.
- [ ] No hardcoded duplicate nav arrays inside components.
- [ ] No external links without clear labels and `rel` handling if opening in a new tab.

### Metadata And SEO Architecture

- [ ] `src/lib/site.ts` owns default site name, description, and canonical base URL.
- [ ] Root layout owns default metadata.
- [ ] Each route may export page-specific `metadata`.
- [ ] Use concise page titles:
  - [ ] `Home | Tailor Taste`
  - [ ] `Product | Tailor Taste`
  - [ ] `Vision | Tailor Taste`
  - [ ] `About | Tailor Taste`
  - [ ] `Contact | Tailor Taste`
- [ ] Open Graph image should live in `public/og/` once created.
- [ ] Do not add SEO pages or keyword-stuffed copy.
- [ ] Metadata must reflect early-stage reality and premium hospitality positioning.

### Form Architecture

- [ ] Keep the contact form as a Client Component.
- [ ] Keep validation helpers in `src/lib/validation.ts`.
- [ ] Keep inquiry options in `src/content/contact.ts`.
- [x] Backend delivery route is implemented under `src/app/api/contact/route.ts`.
- [ ] Backend route should validate server-side even if client validation exists.
- [ ] Email/CRM provider should be wrapped in `src/lib/contact-delivery.ts` or equivalent.
- [ ] Never expose provider secrets to the client.
- [x] If backend delivery is unavailable, success copy must not be shown and a retry-safe error must be shown instead.

### Analytics Architecture

- [ ] Do not add an analytics provider until chosen.
- [ ] Define event names before implementation.
- [ ] Future event helper should live in `src/lib/analytics.ts`.
- [ ] Events to define:
  - [ ] `cta_clicked`
  - [ ] `contact_form_started`
  - [ ] `contact_form_submitted_local`
  - [ ] `contact_form_submitted_backend`
  - [ ] `route_viewed`
- [ ] Event payloads should include:
  - [ ] `label`
  - [ ] `href`
  - [ ] `location`
  - [ ] `inquiryType` where relevant
- [ ] Analytics must not block rendering or form usage.

## Component Specification

### Global Components

- [ ] `Navbar`
  - [ ] Uses `mainNavigation`.
  - [ ] Displays Tailor Taste wordmark/text mark.
  - [ ] Displays primary CTA on desktop.
  - [ ] Has clean mobile behavior.
  - [ ] Does not include fake routes.
- [ ] `Footer`
  - [ ] Uses `footerNavigation`.
  - [ ] Repeats the one-sentence product definition.
  - [ ] Avoids fake social links.
- [ ] `SiteShell`
  - [ ] Wraps navbar, main content, and footer.
  - [ ] Does not own page-specific layout.

### Primitive Components

- [ ] `Button`
  - [ ] Supports `primary`, `secondary`, and `text`.
  - [ ] Uses radius `8px` or less.
  - [ ] Has focus and hover states.
- [ ] `ButtonCluster`
  - [ ] Stacks on mobile.
  - [ ] Lays out horizontally on larger screens.
- [ ] `Container`
  - [ ] Supports `narrow`, `standard`, and `wide`.
  - [ ] Centralizes horizontal padding.
- [ ] `Eyebrow`
  - [ ] Used for section labels.
  - [ ] Should be restrained and consistent.
- [ ] `SectionHeader`
  - [ ] Accepts `SectionIntro`.
  - [ ] Supports left and center alignment.
- [ ] `Card`
  - [ ] Used for repeated items only.
  - [ ] Must not create card-inside-card layouts.

### Section Components

- [ ] Each section component must accept typed props.
- [ ] Each section component should render cleanly with current placeholder content.
- [ ] Each section should be replaceable without breaking page order.
- [ ] Shared layout patterns should be abstracted only when duplication becomes meaningful.
- [ ] Do not create one giant homepage component.

Required section implementation behavior:

- [ ] `HeroManifesto`
  - [ ] accepts eyebrow, title, body, CTAs, and media placeholder/asset config
  - [ ] supports static image now and motion media later
  - [ ] keeps text readable over any background
- [ ] `CategoryGap`
  - [ ] renders three comparison blocks
  - [ ] stacks cleanly on mobile
  - [ ] can later accept a diagram asset
- [ ] `WhyNow`
  - [ ] renders compact proof-like timing statements
  - [ ] should never become long prose
- [ ] `ObjectReveal`
  - [ ] supports product render/close-up area
  - [ ] supports product principles list
  - [ ] does not imply final hardware is complete
- [ ] `PossibilityGrid`
  - [ ] renders capability cards from `FeatureItem[]`
  - [ ] differentiates MVP capabilities from future capabilities through copy
- [ ] `DreamOutcomes`
  - [ ] separates operator, guest, and category outcomes
- [ ] `ServiceFit`
  - [ ] renders staff-led flow steps
  - [ ] avoids self-ordering language
- [ ] `FutureLayer`
  - [ ] renders object-to-system progression
  - [ ] should support 3-step and 4-step variants later
- [ ] `FounderNote`
  - [ ] supports text-only now
  - [ ] supports founder image/signature later
- [ ] `FinalCTA`
  - [ ] accepts CTA list from content
  - [ ] should be reusable on secondary pages

### Form Components

- [ ] `ContactForm`
  - [ ] Client component only where needed.
  - [ ] Validates required fields.
  - [ ] Validates email format.
  - [ ] Shows local success state.
  - [ ] Does not submit to a backend until provider is chosen.
  - [ ] Must be accessible by label and keyboard.

## Design System Specification

### Brand Feel

- [ ] Luxury hospitality restraint.
- [ ] Premium product-launch confidence.
- [ ] Modern software polish underneath.
- [ ] No generic SaaS dashboard aesthetic.
- [ ] No QR-menu startup aesthetic.
- [ ] No loud cyber/tech visual language.

### Typography

- [ ] Define scales for:
  - [ ] hero
  - [ ] H1
  - [ ] H2
  - [ ] H3
  - [ ] body
  - [ ] labels
  - [ ] microcopy
- [ ] Use restrained hierarchy.
- [ ] Avoid too many sizes.
- [ ] Do not use viewport-width-based font scaling.
- [ ] Do not use negative letter spacing.
- [ ] Ensure long words and long headings wrap safely.

Recommended starting scale:

| Token | Mobile | Desktop | Use |
| --- | --- | --- | --- |
| `hero` | 48px / 0.98 line-height | 80px / 0.95 line-height | homepage hero only |
| `h1` | 40px / 1.05 | 64px / 1.0 | page heroes |
| `h2` | 32px / 1.1 | 44px / 1.05 | section titles |
| `h3` | 22px / 1.2 | 28px / 1.15 | cards and subsections |
| `body-lg` | 18px / 1.65 | 20px / 1.65 | hero and intro copy |
| `body` | 16px / 1.65 | 16px / 1.7 | general copy |
| `label` | 12px / 1.2 | 12px / 1.2 | eyebrow and form labels |

Implementation rule:

- [ ] Use Tailwind utility classes or semantic component classes, but keep the scale consistent.
- [ ] Do not invent a new size per section.
- [ ] If a custom font is added later, use `next/font` and define it in `src/app/layout.tsx`.
- [ ] If no custom font is chosen, keep system serif/sans defaults polished and stable.

### Spacing

- [ ] Standardize section vertical spacing.
- [ ] Standardize card padding.
- [ ] Standardize container max widths.
- [ ] Define narrow copy width separately from standard content width.
- [ ] Maintain a premium rhythm through spacing, not decoration.

Recommended starting rhythm:

- [ ] Section vertical padding:
  - [ ] mobile: `py-16` to `py-20`
  - [ ] desktop: `py-24` to `py-32`
- [ ] Container widths:
  - [ ] narrow copy: around `max-w-3xl`
  - [ ] standard content: around `max-w-6xl`
  - [ ] wide media/content: around `max-w-7xl`
- [ ] Grid gaps:
  - [ ] mobile: `gap-4` to `gap-6`
  - [ ] desktop: `gap-8` to `gap-12`
- [ ] Card padding:
  - [ ] mobile: `p-5` or `p-6`
  - [ ] desktop: `p-6` to `p-8`

### Color

- [ ] Use disciplined neutrals plus one or two refined accents.
- [ ] Avoid dominant purple/purple-blue gradients.
- [ ] Avoid beige/cream/sand/tan dominance.
- [ ] Avoid dark blue/slate dominance.
- [ ] Avoid brown/orange/espresso dominance.
- [ ] Dark sections should feel warm and premium, not cyber.
- [ ] Contrast must be sufficient for body text.

Recommended token roles:

- [ ] `ink`: primary dark text and dark background.
- [ ] `paper`: primary page background.
- [ ] `chalk`: elevated light surface.
- [ ] `mist`: subtle border/background support.
- [ ] `graphite`: secondary text.
- [ ] `accent`: restrained CTA/detail accent.
- [ ] `cypress`: secondary dark section color.

Engineering note:

- [ ] The current Tailwind tokens are acceptable for the scaffold.
- [ ] Before final design, visually audit whether `paper` and `accent` make the page read too beige/brown.
- [ ] If the final page feels too beige/brown, shift the accent and dark-section colors while keeping contrast and premium restraint.

### Cards

- [ ] Use cards for repeated items, comparisons, quotes, or functional forms.
- [ ] Do not wrap whole page sections in cards.
- [ ] Do not place cards inside cards.
- [ ] Radius must be `8px` or less.
- [ ] Border, padding, and hover behavior must be consistent.

### Media

- [ ] Hero media should be visually dominant but not confusing.
- [ ] Product media should make the menu object tangible.
- [ ] Hero visual may be abstract if final render is not ready.
- [ ] Avoid cheap device mockups.
- [ ] Avoid tablet chrome.
- [ ] Avoid bright app screens.
- [ ] Maintain consistent aspect ratios.
- [ ] Mobile media should simplify gracefully.

Implementation rules:

- [ ] Real images should use `next/image`.
- [ ] Decorative placeholder blocks can remain CSS-only.
- [ ] Every meaningful image needs useful alt text.
- [ ] Decorative images should use empty alt text.
- [ ] Avoid layout shift by reserving aspect ratio or dimensions.

### Motion

- [ ] Motion should be architectural, calm, and product-led.
- [ ] Add static fallbacks.
- [ ] Respect reduced motion.
- [ ] Recommended moments:
  - [ ] slow menu silhouette reveal
  - [ ] paper-to-Tailor-Taste category transition
  - [ ] language-switch micro animation
  - [ ] lunch-to-dinner state swap
  - [ ] object-to-system progression
- [ ] Avoid playful startup interactions.
- [ ] Avoid scroll-jacking.
- [ ] Avoid heavy animation that slows the build.

### Animation Implementation Specification

Use the lightest implementation that achieves the intended premium feel.

#### Motion Stack Decision

- [ ] Phase 1 motion should use CSS/Tailwind transitions only.
- [ ] Add a custom `Reveal` client component only if section entrance animation is needed.
- [ ] Add Framer Motion only if:
  - [ ] multiple coordinated timeline animations are required
  - [ ] CSS/IntersectionObserver becomes harder to maintain than the dependency
  - [ ] the dependency is approved in a specific motion phase
- [ ] Do not add GSAP for the launch site unless a later visual direction explicitly requires complex timelines.

#### Recommended `Reveal` Component Contract

If needed later, implement:

```ts
type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
};
```

Rules:

- [ ] `Reveal` lives in `src/components/motion/Reveal.tsx`.
- [ ] It must be a Client Component.
- [ ] It should use IntersectionObserver or a minimal motion dependency.
- [ ] It must respect `prefers-reduced-motion`.
- [ ] It must render content visible by default if JavaScript fails.
- [ ] It must not be required for layout correctness.

#### Specific Animation Specs

- [ ] Hero object reveal:
  - [ ] duration: 700ms to 1200ms
  - [ ] easing: smooth ease-out, no bounce
  - [ ] effect: opacity plus small translate or mask reveal
  - [ ] fallback: static product visual visible
- [ ] Category transition:
  - [ ] effect: simple comparison state or diagram, not scroll-jacked
  - [ ] fallback: static three-column comparison
- [ ] Language-switch micro animation:
  - [ ] effect: text label swap or small menu-state change
  - [ ] duration: 300ms to 500ms
  - [ ] fallback: static multilingual feature card
- [ ] Lunch-to-dinner state swap:
  - [ ] effect: subtle content/state transition inside product visual
  - [ ] duration: 400ms to 700ms
  - [ ] fallback: static two-state explanation
- [ ] Object-to-system progression:
  - [ ] effect: sequential highlight of roadmap steps
  - [ ] duration: 500ms to 900ms
  - [ ] fallback: static roadmap cards

#### Motion QA

- [ ] Motion must not cause cumulative layout shift.
- [ ] Motion must not block reading.
- [ ] Motion must not animate large text in a way that harms legibility.
- [ ] Motion must be disabled or simplified under `prefers-reduced-motion`.
- [ ] Motion must be tested on mobile.

## Asset Specification

| Asset | Priority | Timing | Spec |
| --- | --- | --- | --- |
| Wordmark/logo | Essential | Now | Needed for global identity; can start as text mark |
| Hero product render/concept | Essential | Now | Premium, cinematic, paper-like menu object |
| Product close-ups | Essential | Now | 2 to 4 studies: thinness, monochrome clarity, material detail |
| Service-scene concept | Essential | Now | Premium table context; waiter-led service; no tablet interaction |
| Category-gap diagram | Essential | Now | Paper vs intrusive digital vs Tailor Taste |
| Simple icons | Essential | Now | Restrained stroke icons for feature/proof blocks |
| Founder photo/signature | Recommended | Now | Adds human conviction if available |
| Future-layer graphic | Recommended | Now | Object to software-backed layer |
| Venue logos | Optional | Later | Only add when real |
| Testimonials | Optional | Later | Only add when real |
| Actual product imagery | Recommended | Later | Replace concept visuals when product improves |

## Asset Acceptance Rules

- [ ] Product visual must read as a premium menu object, not a tablet.
- [ ] Display content should be text/logos/icons, not a colorful app UI.
- [ ] Visuals should support black-and-white e-paper identity.
- [ ] Do not reuse the same image for unrelated sections.
- [ ] Do not use fake venue logos or fake proof.
- [ ] Keep alt text meaningful.

## CTA System Specification

### Primary CTA Set

- [ ] `Discuss a pilot`
- [ ] `Talk to founders`
- [ ] `Explore partnership`
- [ ] `Join the first wave`

### Secondary CTA Set

- [ ] `Read the vision`
- [ ] `See the product logic`
- [ ] `Learn more`

### CTA Rules

- [ ] Use one dominant primary CTA per section.
- [ ] Do not introduce too many CTA wordings.
- [ ] Use `Discuss a pilot` for operator-oriented paths.
- [ ] Use `Talk to founders` for broad early-stage conversation.
- [ ] Use `Explore partnership` for partner/investor context.
- [ ] Use `Join the first wave` for final CTA.

## Stage-Language Specification

Use these phrases when describing early or future capabilities:

- [ ] designed for
- [ ] building toward
- [ ] current direction
- [ ] first product direction
- [ ] intended MVP
- [ ] if feasible
- [ ] over time
- [ ] future layer
- [ ] longer-term opportunity

Avoid these unless they become true:

- [ ] proven
- [ ] deployed across hotels
- [ ] integrated with inventory
- [ ] AI-powered pricing
- [ ] live operational intelligence
- [ ] trusted by leading venues
- [ ] used by customers

## Definition of Done For Any Implementation Phase

- [ ] Scope stayed inside the named phase.
- [ ] No unrelated refactor was introduced.
- [ ] No fake proof was added.
- [ ] No mature product claim was added.
- [ ] Content remains editable through `src/content` where practical.
- [ ] Components remain reusable and typed.
- [ ] Page files remain thin.
- [ ] Mobile layout was considered.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes unless explicitly skipped by the user.
- [ ] Changed files are summarized.
- [ ] Open decisions are recorded in this document if discovered.

---

# P1: Information Architecture and Global Shell [STATUS: DONE | run_id: 2026-04-12T16-55Z | updated: 2026-04-12]

## Purpose

Make the site structure feel intentional, stable, and ready for future parallel work. This phase protects routes, layout, navigation, footer, metadata, shared CTA logic, and content boundaries.

## Dependencies

- Current scaffold exists.
- Routes `/`, `/product`, `/vision`, `/about`, `/contact` exist.
- Global components exist in `src/components/global`.
- Navigation content exists in `src/content/navigation.ts`.

## Files Likely Owned

- `src/app/layout.tsx`
- `src/components/global/Navbar.tsx`
- `src/components/global/Footer.tsx`
- `src/components/global/SiteShell.tsx`
- `src/content/navigation.ts`
- `src/content/ctas.ts`
- `src/lib/site.ts`

## Checklist

- [ ] Confirm the global layout reflects the brand's premium positioning.
- [ ] Ensure navigation order is intentional: Product, Vision, About, Contact.
- [ ] Keep primary CTA stable across the site: `Discuss a pilot`.
- [ ] Add metadata defaults from `siteConfig`.
- [ ] Add per-page metadata if useful.
- [ ] Ensure footer reinforces the one-sentence product definition.
- [ ] Add deferred route references only where useful, not as live navigation yet.
- [ ] Keep mobile nav simple and functional.
- [ ] Decide whether the navbar should remain sticky.
- [ ] Confirm no page duplicates global layout concerns.
- [ ] Confirm route files stay thin.

## Acceptance Criteria

- [ ] All five launch routes render.
- [ ] Global nav links work.
- [ ] Footer links work.
- [ ] Primary CTA routes to `/contact`.
- [ ] No fake social links or fake company links are added.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P1 only.
Focus on the global shell, route structure, navbar, footer, site metadata, and CTA consistency.
Do not redesign page sections yet.
Keep page files thin and content in src/content.
Run lint and build when finished.
```

---

# P2: Homepage Narrative and Copy System [STATUS: DONE | run_id: 2026-04-12T18-05Z | updated: 2026-04-12]

## Purpose

Turn the homepage scaffold into a clear belief-building narrative while preserving the exact section order from the technical blueprint.

## Dependencies

- P1 is complete or current shell is stable.
- Homepage sections already exist as components.
- Homepage content lives in `src/content/home.ts`.

## Files Likely Owned

- `src/app/page.tsx`
- `src/content/home.ts`
- `src/components/sections/HeroManifesto.tsx`
- `src/components/sections/CategoryGap.tsx`
- `src/components/sections/WhyNow.tsx`
- `src/components/sections/ObjectReveal.tsx`
- `src/components/sections/PossibilityGrid.tsx`
- `src/components/sections/DreamOutcomes.tsx`
- `src/components/sections/ServiceFit.tsx`
- `src/components/sections/FutureLayer.tsx`
- `src/components/sections/FounderNote.tsx`
- `src/components/sections/FinalCTA.tsx`

## Homepage Section Order

- [ ] Hero Manifesto
- [ ] Category Gap
- [ ] Why Now
- [ ] The Object
- [ ] What Becomes Possible
- [ ] Dream Outcomes
- [ ] Service Fit
- [ ] Future Layer
- [ ] Founder Note
- [ ] Final CTA

## Hero Checklist

- [ ] Lead with belief, not a spec sheet.
- [ ] Use the core message: menus should be as dynamic as the hospitality behind them.
- [ ] Include the product definition in the supporting copy.
- [ ] Primary CTA: `Discuss a pilot`.
- [ ] Secondary CTA: `Read the vision`.
- [ ] Make the placeholder visual clearly replaceable.
- [ ] Avoid too much text above the fold.
- [ ] Ensure users understand this is a menu product, not an abstract hospitality platform.

## Category Gap Checklist

- [ ] Explain paper as beautiful but static.
- [ ] Explain QR/tablet menus as flexible but intrusive.
- [ ] Present Tailor Taste as the third path.
- [ ] Keep copy short and skimmable.
- [ ] Avoid sounding anti-technology; the point is restrained technology.

## Why Now Checklist

- [ ] Include multilingual service pressure.
- [ ] Include premium venues needing both atmosphere and flexibility.
- [ ] Include the weakness of QR/tablet solutions.
- [ ] Include paper-like hardware and restrained software as the opening.
- [ ] Avoid white-paper length.

## Object Reveal Checklist

- [ ] Explain the object as thin, paper-like, text-first, black-and-white, staff-controlled.
- [ ] Clarify that guest-side touch is excluded from the MVP.
- [ ] Clarify this is not generic restaurant hardware.
- [ ] Prepare layout for future render or product photography.
- [ ] Include product principles rather than dense specs.

## Possibility Grid Checklist

- [ ] Include language switching.
- [ ] Include lunch/dinner/event menu states.
- [ ] Include low-light readability.
- [ ] Include staff-controlled flexibility.
- [ ] Include future dietary/allergy support with stage-appropriate language.
- [ ] Keep each card outcome-led, not technical.

## Dream Outcomes Checklist

- [ ] Show operator value.
- [ ] Show guest value.
- [ ] Show category-level change.
- [ ] Make this section feel bigger than feature utility.
- [ ] Avoid vague inspirational fluff.

## Service Fit Checklist

- [ ] Reinforce waiter-led service.
- [ ] Explain that staff select the state and guests read.
- [ ] Avoid implying the product replaces hospitality labor.
- [ ] Show a simple three-step service flow.

## Future Layer Checklist

- [ ] Frame the menu object as the wedge.
- [ ] Mention templates, scheduling, menu control, and operational intelligence.
- [ ] Avoid claiming integrations or AI features already exist.
- [ ] Keep the roadmap lightweight.

## Founder Note Checklist

- [ ] Replace placeholder with a sharper founder voice later.
- [ ] Explain why menus matter.
- [ ] Stay specific and personal.
- [ ] Avoid generic startup mission copy.

## Final CTA Checklist

- [ ] Use `Join the first wave`.
- [ ] Use `Talk to founders`.
- [ ] Address venues, partners, and investors.
- [ ] Keep conversion low-friction.

## Acceptance Criteria

- [ ] Homepage tells a complete story from belief to action.
- [ ] Section order matches the blueprint.
- [ ] Copy remains stage-honest.
- [ ] No section becomes a long memo.
- [ ] All content remains editable from `src/content/home.ts`.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P2 only.
Refine the homepage narrative and copy in src/content/home.ts and adjust section components only where necessary.
Preserve the current section order.
Do not do the final visual design pass yet.
Run lint and build when finished.
```

---

# P3: Design System and Premium Styling [STATUS: DONE | run_id: 2026-04-12T18-18Z | updated: 2026-04-12]

## Purpose

Create the visual foundation that makes the site feel premium, restrained, cinematic, and hospitality-first without pretending final product assets exist.

## Dependencies

- P1 shell stable.
- P2 homepage narrative stable enough to style.

## Files Likely Owned

- `tailwind.config.ts`
- `src/app/globals.css`
- `src/components/primitives/*`
- Shared section styling where needed

## Design Principles

- [ ] Premium restraint over decoration.
- [ ] Hospitality atmosphere over SaaS dashboard language.
- [ ] Calm contrast over loud gradients.
- [ ] Thin, intentional borders.
- [ ] Card radius at `8px` or less.
- [ ] Layouts should feel spacious but not empty.
- [ ] Motion should be subordinate to message clarity.
- [ ] Mobile should feel designed, not squeezed.

## Palette Checklist

- [ ] Avoid a one-note palette.
- [ ] Avoid dominant purple, purple-blue gradient, beige-heavy, dark-blue/slate, brown/orange/espresso themes.
- [ ] Use disciplined neutrals with one refined accent.
- [ ] Ensure contrast is sufficient for body text.
- [ ] Ensure dark sections remain readable.
- [ ] Keep brand atmosphere premium but not sleepy.

## Typography Checklist

- [ ] Define hero, H1, H2, H3, body, label, and microcopy styles.
- [ ] Use a restrained number of type sizes.
- [ ] Do not scale font size directly with viewport width.
- [ ] Keep letter spacing at `0` except small uppercase labels if already intentional.
- [ ] Make long headlines wrap gracefully on mobile.
- [ ] Ensure no text overflows its parent.

## Layout Checklist

- [ ] Standardize section padding.
- [ ] Standardize container widths.
- [ ] Standardize narrow text measure.
- [ ] Standardize grid gaps.
- [ ] Ensure cards do not sit inside decorative cards.
- [ ] Keep the main product visual from feeling like an embedded preview.
- [ ] Preserve layout stability across states.

## Button Checklist

- [ ] Primary button is consistent site-wide.
- [ ] Secondary button is consistent site-wide.
- [ ] Text link variant is available but not overused.
- [ ] Buttons have radius `8px` or less.
- [ ] Buttons have visible focus states.
- [ ] Mobile buttons are easy to tap.

## Component Checklist

- [ ] `Button` supports all CTA variants cleanly.
- [ ] `Container` supports standard, narrow, and wide widths.
- [ ] `Card` has restrained styling.
- [ ] `SectionHeader` works on light and dark sections.
- [ ] `Eyebrow` does not become visually noisy.
- [ ] Primitive components stay generic and reusable.

## Acceptance Criteria

- [ ] Site no longer feels like raw scaffold.
- [ ] It still does not pretend to be final design.
- [ ] Responsive layouts work at 375px, 768px, 1440px.
- [ ] No horizontal overflow.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P3 only.
Create the Tailor Taste design-system foundation in Tailwind and shared primitives.
Focus on premium restraint, responsive stability, and reusable styles.
Do not rewrite the website copy except where required for layout.
Run lint and build when finished.
```

---

# P4: Product Page Buildout [STATUS: DONE | run_id: 2026-04-12T18-32Z | updated: 2026-04-12]

## Purpose

Make `/product` answer practical curiosity after belief is created. It should explain what the product is, how it works in service, and what is intentionally outside MVP scope.

## Dependencies

- P1 global shell stable.
- P2 homepage has created category context.
- P3 styling system exists or current scaffold is acceptable.

## Files Likely Owned

- `src/app/product/page.tsx`
- `src/content/product.ts`
- Existing shared section and primitive components

## Required Product Story

- [ ] Tailor Taste is a paper-like digital menu system for premium hospitality.
- [ ] It is staff-controlled.
- [ ] It is read-only for guests in the MVP.
- [ ] It is text-first and monochrome in the initial direction.
- [ ] It supports language switching.
- [ ] It supports preset menu switching.
- [ ] It supports low-light readability presets.
- [ ] It may support individual item activation/deactivation if feasible.
- [ ] It does not include ordering in the MVP.
- [ ] It does not include inventory integration in the MVP.

## Page Section Checklist

- [ ] Product hero: concise product definition.
- [ ] What it is: object, display, interaction model.
- [ ] Capabilities: language, menu states, readability, menu upload/conversion.
- [ ] Service fit: staff control and traditional handout ritual.
- [ ] Deployment model: charging, storage, spares, inactive-menu update logic.
- [ ] MVP boundaries: no ordering, no guest-side touch, no inventory integration.
- [ ] CTA: discuss a pilot.

## Operational Detail Checklist

- [ ] Mention charging/storage only at concept level.
- [ ] Mention dock/pins only if the copy remains stage-appropriate.
- [ ] Mention active versus inactive menu updates as a design concern, not a solved product.
- [ ] Mention pilot size only if needed and carefully.
- [ ] Avoid hard commitments on hardware specs unless currently true.

## Acceptance Criteria

- [ ] Product page deepens practical understanding.
- [ ] Product page does not repeat the full homepage manifesto.
- [ ] Product page makes MVP boundaries clear.
- [ ] Product page reassures premium hospitality operators.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P4 only.
Build out the Product page from src/content/product.ts.
Explain the product, MVP capabilities, service logic, deployment thinking, and boundaries.
Do not add fake product claims or final hardware promises.
Run lint and build when finished.
```

---

# P5: Vision Page Buildout [STATUS: DONE | run_id: 2026-04-12T18-46Z | updated: 2026-04-12]

## Purpose

Make `/vision` carry the category argument and future direction. This page should help investors, advisors, thoughtful operators, and strategic partners understand why Tailor Taste could become more than a device.

## Dependencies

- P2 homepage narrative stable.
- P4 product wedge clear enough to support platform ambition.

## Files Likely Owned

- `src/app/vision/page.tsx`
- `src/content/vision.ts`
- `src/content/roadmap.ts`

## Required Vision Story

- [ ] Menus are one of the last important hospitality objects trapped in print.
- [ ] Kitchens, sourcing, pricing, service contexts, and guest expectations are dynamic.
- [ ] Current choices force a bad tradeoff: paper beauty versus digital flexibility.
- [ ] Tailor Taste creates a new category between static paper and intrusive screens.
- [ ] The first wedge is the premium physical menu.
- [ ] The long-term opportunity is the software layer behind the menu.

## Page Section Checklist

- [ ] Vision hero: category claim.
- [ ] Why menus matter.
- [ ] Why the category gap exists.
- [ ] Why now.
- [ ] Why premium hospitality is the right beachhead.
- [ ] Object-to-system roadmap.
- [ ] Disciplined future software layer.
- [ ] CTA for investors, partners, and pilot venues.

## Future Platform Language Checklist

- [ ] Mention menu scheduling.
- [ ] Mention content templates.
- [ ] Mention operational controls.
- [ ] Mention inventory-linked changes only as future.
- [ ] Mention pricing suggestions only as future.
- [ ] Mention intelligence layer only as long-term direction.
- [ ] Avoid sounding like all future software already exists.

## Acceptance Criteria

- [ ] Vision page feels ambitious but credible.
- [ ] It is clearly different from Product page.
- [ ] It supports investor/advisor interest.
- [ ] It keeps the product wedge concrete.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P5 only.
Build out the Vision page around the category argument, why now, and the object-to-software-layer roadmap.
Keep ambition disciplined and stage-honest.
Run lint and build when finished.
```

---

# P6: About Page and Founder Voice [STATUS: DONE | run_id: 2026-04-12T19-22Z | updated: 2026-04-12]

## Purpose

Make `/about` human and specific. Early visions need founder conviction, not generic company filler.

## Dependencies

- Founder details or a draft founder note may be needed.
- Current About content exists as placeholder structure.

## Files Likely Owned

- `src/app/about/page.tsx`
- `src/content/about.ts`
- Optional founder image asset later

## Founder Voice Goals

- [ ] Explain why menus matter personally or strategically.
- [ ] Explain why premium hospitality is the right starting point.
- [ ] Explain why the project is early but serious.
- [ ] Show disciplined thinking.
- [ ] Avoid inflated founder mythology.
- [ ] Avoid generic startup biography.

## Page Section Checklist

- [ ] Founder thesis hero.
- [ ] Origin insight.
- [ ] Current stage.
- [ ] Mission.
- [ ] Why the product starts narrow.
- [ ] What kind of conversations Tailor Taste is looking for.
- [ ] CTA to contact.

## Possible Founder Note Draft Direction

```text
I kept coming back to the menu because it is one of the smallest objects in hospitality that carries the most meaning. It shapes the first decision, the first tactile impression, the kitchen's point of view, and the guest's sense of being considered. Tailor Taste starts there because premium venues deserve more flexibility without making the table feel more digital.
```

## Acceptance Criteria

- [ ] About page feels specific to Tailor Taste.
- [ ] It explains the founder thesis without oversharing.
- [ ] It is honest about pre-pilot stage.
- [ ] It encourages high-quality conversations.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P6 only.
Refine the About page and founder voice.
Keep it specific, early-stage honest, and grounded in the menu-as-hospitality-object thesis.
Do not add fake team members, advisors, or proof.
Run lint and build when finished.
```

---

# P7: Contact Flow and Conversion UX [STATUS: DONE | run_id: 2026-04-12T19-34Z | updated: 2026-04-12]

## Purpose

Make `/contact` capture high-intent interest from venues, investors, partners, and builders without adding premature backend complexity.

## Dependencies

- Current contact form stub exists.
- Backend destination is not yet chosen.

## Files Likely Owned

- `src/app/contact/page.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/content/contact.ts`
- `src/lib/validation.ts`

## Contact Form Fields

- [ ] Name
- [ ] Email
- [ ] Organization
- [ ] Inquiry type
- [ ] Message

## Inquiry Types

- [ ] Pilot venue / hotel
- [ ] Investor / advisor
- [ ] Strategic partner
- [ ] Builder / collaborator
- [ ] Press / media
- [ ] Other

## UX Checklist

- [ ] Required fields are clearly validated.
- [ ] Invalid email is clearly validated.
- [ ] Success state explains that backend delivery is not yet connected.
- [ ] Form does not pretend data was emailed.
- [ ] CTA copy stays calm and premium.
- [ ] Contact page explains who should reach out.
- [ ] Form is usable on mobile.
- [ ] Focus states are visible.

## Later Integration Options

- [ ] Email delivery through an API route.
- [ ] Resend, Postmark, SendGrid, or similar provider.
- [ ] CRM capture.
- [ ] Scheduling link.
- [ ] Analytics events.
- [ ] Spam protection.

## Acceptance Criteria

- [ ] Empty required fields are rejected.
- [ ] Invalid email is rejected.
- [ ] Valid-looking input shows local success state.
- [ ] No backend claims are made.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P7 only.
Improve the Contact page and static form UX.
Keep submission local-only and do not add an email or CRM provider yet.
Run lint and build when finished.
```

---

# P8: Asset System and Visual Placeholders [STATUS: DONE | run_id: 2026-04-12T19-46Z | updated: 2026-04-12]

## Purpose

Prepare the visual system for premium product renders, concept visuals, diagrams, icons, and founder assets without blocking implementation on final assets.

## Dependencies

- Current placeholder asset folders exist.
- Design direction from P3 should be at least partially stable.

## Files Likely Owned

- `src/assets/images`
- `src/assets/icons`
- `src/assets/renders`
- Section components that display visual placeholders
- Optional asset registry file if needed later

## Required Asset Categories

- [ ] Wordmark or logo.
- [ ] Hero product render or concept visual.
- [ ] Supporting product close-ups.
- [ ] Category-gap diagram.
- [ ] Simple feature icons.
- [ ] Service-flow diagram.
- [ ] Founder photo or founder signature block.
- [ ] Future-layer roadmap graphic.

## Placeholder Rules

- [ ] Every visual placeholder should state what asset belongs there.
- [ ] Placeholders should look intentional, not broken.
- [ ] Placeholder copy should be removable from one content object or component prop later.
- [ ] Avoid fake product mockups that misrepresent current maturity.
- [ ] Avoid generic restaurant stock imagery unless intentionally chosen and licensed.

## Product Render Direction

- [ ] Thin paper-like object.
- [ ] Monochrome display.
- [ ] Premium table context.
- [ ] No tablet UI chrome.
- [ ] No ordering interface.
- [ ] No glowing app-screen aesthetic.
- [ ] Treat it as a physical object worth close inspection.

## Diagram Direction

- [ ] Category gap: paper / intrusive digital / Tailor Taste.
- [ ] Service flow: staff sets state / guest receives menu / menu returns.
- [ ] Future layer: object / content control / operational layer / intelligence.

## Acceptance Criteria

- [ ] Asset folders are documented.
- [ ] Placeholder components are clear and swappable.
- [ ] No fake proof assets are introduced.
- [ ] Visual requirements are ready for a later asset-generation or design prompt.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P8 only.
Improve the asset placeholder system and document exact asset needs for renders, icons, diagrams, and founder visuals.
Do not invent fake partner proof or mature product photography.
Run lint and build when finished.
```

---

# P9: Motion and Interaction Polish [STATUS: DONE | run_id: 2026-04-12T20-06Z | updated: 2026-04-12]

## Purpose

Add calm, premium motion and interaction details after the content and design system are stable. Motion should make the site feel considered, not flashy.

## Dependencies

- P2 copy stable.
- P3 design system stable.
- P8 visual placeholders or real assets in place.

## Files Likely Owned

- Section components
- Shared motion utilities if added
- Tailwind config if animation tokens are needed

## Motion Principles

- [ ] Motion should clarify hierarchy.
- [ ] Motion should never hide content.
- [ ] Motion should have static fallbacks.
- [ ] Motion should be subtle and fast enough to feel responsive.
- [ ] Respect reduced-motion preferences.
- [ ] Avoid gimmicky parallax or heavy scroll-jacking.
- [ ] Avoid performance-heavy animation before launch.

## Interaction Checklist

- [ ] Button hover states feel premium and consistent.
- [ ] Cards have restrained hover states only if useful.
- [ ] Navbar behavior is smooth and non-intrusive.
- [ ] Form focus and error states are clear.
- [ ] Visual placeholder areas can later support animated media.
- [ ] Mobile interactions remain simple.

## Possible Motion Targets

- [ ] Hero visual reveal.
- [ ] Section entrance fade or rise.
- [ ] Object reveal detail transitions.
- [ ] Future-layer progression.
- [ ] Contact form success state.

## Acceptance Criteria

- [ ] Motion improves perceived polish.
- [ ] Site remains fast.
- [ ] Reduced-motion behavior is respected.
- [ ] No layout shift is introduced.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P9 only.
Add restrained motion and interaction polish.
Respect reduced-motion preferences and avoid heavy animation.
Do not change the core content strategy.
Run lint and build when finished.
```

---

# P10: FAQ and Reality Anchors [STATUS: DONE | run_id: 2026-04-12T20-34Z | updated: 2026-04-12]

## Purpose

Add an FAQ page or FAQ module later to answer objections cleanly once the main narrative is stable.

## Dependencies

- Product story and current stage language are stable.
- Common objections are known.

## Files Likely Owned

- `src/app/faq/page.tsx`
- `src/content/faq.ts`
- Reusable FAQ accordion component
- Navigation only if FAQ becomes public nav

## FAQ Topics

- [ ] Is Tailor Taste already built?
- [ ] Is this a tablet?
- [ ] Does the guest interact with the menu?
- [ ] Does it support ordering?
- [ ] What is included in the MVP?
- [ ] What is future only?
- [ ] Who is the first customer segment?
- [ ] How would a pilot work?
- [ ] How does it fit premium service?
- [ ] What happens if a menu breaks or runs out of battery?
- [ ] How are menu updates handled during active service?
- [ ] What kind of venues should reach out?

## FAQ Tone Rules

- [ ] Direct.
- [ ] Honest.
- [ ] Stage-transparent.
- [ ] Not defensive.
- [ ] No speculative promises.
- [ ] No excessive technical depth.

## Acceptance Criteria

- [ ] FAQ answers reduce practical objections.
- [ ] FAQ does not weaken ambition.
- [ ] FAQ is optional in top navigation.
- [ ] FAQ content is structured in `src/content/faq.ts`.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P10 only.
Add a stage-honest FAQ page or reusable FAQ module.
Answer practical objections without overclaiming product maturity.
Run lint and build when finished.
```

---

# P11: Future / Roadmap Page [STATUS: DONE | run_id: 2026-04-12T20-44Z | updated: 2026-04-12]

## Purpose

Add `/future` only when the platform ambition needs more room than the homepage and Vision page can responsibly carry.

## Dependencies

- Vision page is stable.
- Product wedge is credible.
- Roadmap language is disciplined.

## Files Likely Owned

- `src/app/future/page.tsx`
- `src/content/roadmap.ts`
- Reusable roadmap/progression components

## Roadmap Layers

- [ ] Current wedge: premium paper-like menu object.
- [ ] Near-term software: menu upload, templates, language switching, menu presets.
- [ ] Operational layer: scheduling, staff controls, service states, event menus.
- [ ] Future intelligence: inventory-linked changes, pricing suggestions, menu optimization.
- [ ] Integrations: hotel and restaurant software stacks, only as future direction.

## Stage Language Checklist

- [ ] Current.
- [ ] Built toward.
- [ ] Exploring.
- [ ] Over time.
- [ ] Future layer.
- [ ] Not yet part of MVP.

## Acceptance Criteria

- [ ] Future page expands ambition without sounding fake-certain.
- [ ] It does not cannibalize Vision page.
- [ ] It clearly separates MVP, post-MVP, and long-term.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P11 only.
Add a Future/Roadmap page that separates MVP, near-term software, and long-term platform ambition.
Keep all future claims disciplined and stage-honest.
Run lint and build when finished.
```

---

# P12: SEO, Metadata, and Analytics Readiness [STATUS: DONE | run_id: 2026-04-12T20-18Z | updated: 2026-04-12]

## Purpose

Prepare the site for sharing, indexing, and later conversion measurement without adding unnecessary marketing stack complexity.

## Dependencies

- Routes and page purposes are stable.
- Public copy is reasonably close.

## Files Likely Owned

- `src/app/layout.tsx`
- Individual route files for metadata
- `src/lib/site.ts`
- Optional analytics helper file

## Metadata Checklist

- [ ] Default site title.
- [ ] Default site description.
- [ ] Per-page title for Home.
- [ ] Per-page title for Product.
- [ ] Per-page title for Vision.
- [ ] Per-page title for About.
- [ ] Per-page title for Contact.
- [ ] Open Graph defaults.
- [ ] Twitter card defaults.
- [ ] Canonical URL strategy.
- [ ] Favicon/app icon placeholders.

## SEO Copy Checklist

- [ ] Product definition appears clearly in public text.
- [ ] Premium hospitality appears naturally.
- [ ] Digital menu language is used carefully.
- [ ] Avoid stuffing keywords.
- [ ] Avoid over-indexing on QR menu comparisons.

## Analytics Readiness

- [ ] Define events before adding tools.
- [ ] CTA click event names.
- [ ] Contact form start event.
- [ ] Contact form local success event.
- [ ] Route view events.
- [ ] No analytics provider until chosen.

## Acceptance Criteria

- [ ] Metadata is complete enough for sharing.
- [ ] No analytics provider is hardcoded prematurely.
- [ ] Site remains static-friendly.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P12 only.
Add route metadata, Open Graph readiness, and analytics event definitions without integrating an analytics provider yet.
Run lint and build when finished.
```

---

# P13: Accessibility, Responsive QA, and Performance [STATUS: DONE | run_id: 2026-04-12T21-02Z | updated: 2026-04-12]

## Purpose

Verify the site is usable, stable, readable, and performant across key viewports before launch or demo sharing.

## Dependencies

- Major content and styling work complete.
- Dev server can run locally.

## QA Viewports

- [ ] 375px mobile.
- [ ] 768px tablet.
- [ ] 1440px desktop.
- [ ] Wide desktop if hero media becomes complex.

## Accessibility Checklist

- [ ] All pages have a logical heading hierarchy.
- [ ] Buttons and links have clear labels.
- [ ] Forms have labels.
- [ ] Error messages are visible and understandable.
- [ ] Focus states are visible.
- [ ] Color contrast is acceptable.
- [ ] Reduced motion is respected if motion exists.
- [ ] No keyboard traps.
- [ ] Navigation is usable by keyboard.

## Responsive Checklist

- [ ] No horizontal overflow.
- [ ] Hero text wraps gracefully.
- [ ] CTA clusters stack cleanly.
- [ ] Cards maintain stable dimensions.
- [ ] Grids stack intentionally.
- [ ] Contact form fits on mobile.
- [ ] Footer links wrap cleanly.
- [ ] Text does not overlap visuals.

## Performance Checklist

- [ ] Production build succeeds.
- [ ] Static routes remain static where possible.
- [ ] Images are optimized once real assets exist.
- [ ] Heavy animation is avoided.
- [ ] No unused large dependency is added casually.
- [ ] Lighthouse pass is acceptable for a marketing MVP.

## Route Verification Checklist

- [ ] `/`
- [ ] `/product`
- [ ] `/vision`
- [ ] `/about`
- [ ] `/contact`
- [ ] `/faq` if added.
- [ ] `/future` if added.

## Acceptance Criteria

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] All active routes return 200 locally.
- [ ] Manual responsive review is complete.
- [ ] No obvious accessibility blocker remains.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P13 only.
Run accessibility, responsive, route, and performance QA for the current site.
Fix issues found, but avoid unrelated redesign.
Run lint and build when finished.
```

---

# P14: Final Content Pass and Launch Readiness [STATUS: DONE | run_id: 2026-04-12T21-15Z | updated: 2026-04-12]

## Purpose

Make the website coherent as one public-facing narrative after individual workstreams have been implemented.

## Dependencies

- Major pages complete.
- Styling pass complete.
- QA pass complete.
- Any final founder or product language is available.

## Global Content Checklist

- [ ] Product definition is consistent across pages.
- [ ] CTA wording is consistent.
- [ ] Stage language is consistent.
- [ ] Future claims are disciplined.
- [ ] MVP boundaries are clear where needed.
- [ ] No page sounds like a memo.
- [ ] No page sounds like generic SaaS.
- [ ] No section repeats another page unnecessarily.
- [ ] Founder voice feels real.
- [ ] Contact flow feels credible.

## Proof and Trust Checklist

- [ ] No fake logos.
- [ ] No fake testimonials.
- [ ] No fake metrics.
- [ ] No fake press.
- [ ] If proof is absent, use conviction and clarity instead.
- [ ] If pilot conversations exist later, add them only with permission and accurate wording.

## Launch Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] All active routes verified.
- [ ] Metadata checked.
- [ ] Contact form behavior checked.
- [ ] Mobile checked.
- [ ] Desktop checked.
- [ ] README updated if commands or architecture changed.
- [ ] Workflow blueprint updated if future phases changed.

## Acceptance Criteria

- [ ] The site feels premium and investable.
- [ ] The product is understandable.
- [ ] The category argument is memorable.
- [ ] The early-stage reality is honest.
- [ ] The next action is obvious.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P14 only.
Do the final content and launch-readiness pass across the site.
Preserve the strategic positioning and avoid adding fake proof.
Run lint and build when finished.
```

---

# P15: Technical Launch Hardening and Quality Gates [STATUS: DONE | run_id: 2026-04-12T18-08Z | updated: 2026-04-12]

## Purpose

Turn the implementation into a launch-ready system with enforceable quality gates, automated validation, runtime hardening, and explicit founder identity linking.

## Dependencies

- P14 launch-readiness content pass complete.
- Contact backend route and delivery adapter implemented.

## Files Likely Owned

- `package.json`
- `.github/workflows/ci.yml`
- `vitest.config.ts`
- `playwright.config.ts`
- `tests/**`
- `next.config.ts`
- `src/lib/env.ts`
- `src/content/about.ts`
- `src/app/about/page.tsx`

## Checklist

- [ ] Add CI pipeline that runs lint, build, unit/integration tests, and Playwright smoke tests.
- [ ] Add deterministic scripts: `test`, `test:unit`, `test:e2e`, and `check`.
- [ ] Add unit tests for contact validation contracts.
- [ ] Add integration tests for contact API responses and founder-link attributes.
- [ ] Add Playwright smoke tests for active routes plus contact and founder-link behavior.
- [ ] Add centralized env checks for contact delivery configuration.
- [ ] Add production security headers in Next config.
- [ ] Add no-index behavior for non-production environments via `ALLOW_INDEXING`.
- [ ] Ensure About page includes Ty Stevens and Bucur Andrei Borcoman LinkedIn links opening in new tabs.

## Acceptance Criteria

- [ ] `npm run check` passes.
- [ ] CI workflow blocks merges when gates fail.
- [ ] Contact API contract remains stable and non-verbose on provider errors.
- [ ] Founder names link to the correct LinkedIn URLs with secure external-link attributes.
- [ ] No fake proof or maturity claims are introduced.

## Future Prompt Starter

```text
Using WEBSITE_WORKFLOW_BLUEPRINT.md, implement P15 only.
Focus on CI quality gates, launch hardening, automated tests, and founder-link correctness.
Keep strategic messaging intact and avoid unrelated redesign.
Run npm run check when finished.
```

---

# Parallel Work Rules

Use these rules when multiple agents work at the same time.

## Ownership Rules

- [ ] One agent owns global shell at a time.
- [ ] One agent owns design-system primitives at a time.
- [ ] One agent owns each page at a time.
- [ ] One agent owns the contact form at a time.
- [ ] Asset work can run in parallel if it does not edit page logic.
- [ ] QA can run in parallel only after the relevant implementation work is complete.

## Safe Parallel Splits

- [ ] Product page and Vision page can be built in parallel.
- [ ] About page and Contact page can be built in parallel.
- [ ] Asset documentation can run beside page copy work.
- [ ] Metadata planning can run beside visual styling.
- [ ] QA can be split by route after route work is stable.

## Risky Parallel Splits

- [ ] Two agents editing `src/app/globals.css`.
- [ ] Two agents editing `tailwind.config.ts`.
- [ ] Two agents editing the same content file.
- [ ] One agent rewriting primitives while another styles sections.
- [ ] One agent changing CTA types while another builds forms.

## Merge Discipline

- [ ] Keep changes scoped to the phase.
- [ ] Do not rewrite unrelated pages.
- [ ] Do not rename shared components without updating all imports.
- [ ] Do not move content out of `src/content` unless the architecture is intentionally changed.
- [ ] Run lint and build before handing off.
- [ ] Update this blueprint if the workflow changes.

---

# Prompt Packet Template

Use this template for future implementation prompts.

```text
You are working in the Tailor Taste website repo.

Use WEBSITE_WORKFLOW_BLUEPRINT.md as the source of truth.

Implement phase: P[NUMBER] - [PHASE NAME].

Scope:
- [List exact files or folders the agent owns]

Do:
- Follow the positioning rules.
- Keep content in src/content where possible.
- Keep page files thin.
- Preserve stage-honest language.
- Run npm run lint.
- Run npm run build.

Do not:
- Implement other phases.
- Add fake proof, fake customers, or fake metrics.
- Overclaim current product maturity.
- Introduce a CMS, backend, analytics provider, or major dependency unless explicitly requested.

When finished:
- Summarize changed files.
- Report lint/build status.
- Note any unresolved decisions.
```

---

# Current Open Decisions

These are intentionally not solved by the scaffold.

### Contact backend destination [STATUS: DONE | run_id: 2026-04-12T17-41Z | updated: 2026-04-12]

- [x] Provider selected: Resend API through a server-side route handler.
- [x] Delivery adapter implemented in `src/lib/contact-delivery.ts`.
- [x] Contact endpoint implemented in `src/app/api/contact/route.ts`.
- [x] Client form updated to submit to backend and handle success/error states honestly.
- [x] Runtime configuration required: `RESEND_API_KEY`, `CONTACT_TO_EMAILS`, optional `CONTACT_FROM_EMAIL`, `CONTACT_SUBJECT_PREFIX`.

- [ ] Final logo or wordmark.
- [ ] Final product render direction.
- [ ] Founder photo or signature asset.
- [ ] Whether to add `/faq` before launch.
- [ ] Whether to add `/future` before launch.
- [ ] Analytics provider.
- [ ] Deployment platform.
- [ ] Final domain.
- [ ] Real pilot language once customer conversations exist.

---

# Source Document Coverage Map

Use this section to verify that the provided documents have been translated into build requirements.

## Product Strategy Document Coverage

- [ ] Product thesis captured: paper-like digital menu system for premium hospitality.
- [ ] Positioning captured: elegance of paper, flexibility of software.
- [ ] Anti-positioning captured: not QR, not tablet, not digital signage, not generic menu CMS.
- [ ] MVP use cases captured:
  - [ ] staff language switching
  - [ ] preset lunch/dinner/event switching
  - [ ] dark-room readability presets
  - [ ] PDF upload/conversion
  - [ ] item activation/removal if feasible
- [ ] Post-MVP use cases captured:
  - [ ] dietary/allergy highlighting
  - [ ] event-specific menus
  - [ ] templates
  - [ ] basic analytics
- [ ] Long-term use cases captured:
  - [ ] inventory-linked changes
  - [ ] ingredient-aware price suggestions
  - [ ] menu optimization
  - [ ] hospitality software integrations
- [ ] Restaurant value captured:
  - [ ] hard ROI
  - [ ] operational ROI
  - [ ] strategic/brand ROI
- [ ] Guest value captured:
  - [ ] readability
  - [ ] language comfort
  - [ ] fresher menu experience
  - [ ] future personalization
- [ ] Beachhead captured: premium hotels and hotel restaurants.
- [ ] Buyer/champion logic captured: F&B managers, outlet managers, GMs.
- [ ] Pilot shape captured: one outlet first, 15 to 30 active units plus spares as an assumption.
- [ ] MVP boundaries captured:
  - [ ] no guest-side touch
  - [ ] no ordering
  - [ ] no inventory integration
- [ ] Deployment model captured:
  - [ ] normal handout ritual
  - [ ] charging dock direction
  - [ ] 1.5-day battery target
  - [ ] spare units
  - [ ] active/inactive update concern
- [ ] Business model direction captured:
  - [ ] setup/installation fee
  - [ ] recurring fee
  - [ ] lease/rental logic
  - [ ] support included
- [ ] Competition framing captured: alternatives exist but optimize for different service formats.
- [ ] Risks captured:
  - [ ] overbuilding future software too early
  - [ ] treating product as only hardware
  - [ ] unresolved durability/cleaning/theft/update flow
  - [ ] hardware economics

## Website Blueprint V2 Coverage

- [ ] North star captured: belief-building machine.
- [ ] Tone captured: bold, premium, future-facing, disciplined, persuasive.
- [ ] Category claim captured: missing category between static paper and intrusive screens.
- [ ] Why-now logic captured.
- [ ] Benchmark inspiration captured indirectly:
  - [ ] premium product launch
  - [ ] luxury hospitality restraint
  - [ ] hospitality credibility
  - [ ] modern software polish
- [ ] Sitemap captured:
  - [ ] Home
  - [ ] Product
  - [ ] Vision
  - [ ] About
  - [ ] Contact
  - [ ] Future optional
  - [ ] FAQ phase 2
- [ ] Homepage section order captured.
- [ ] Secondary page roles captured.
- [ ] Motion ambition captured:
  - [ ] cinematic hero
  - [ ] calm architectural motion
  - [ ] language-switch micro animation
  - [ ] lunch-to-dinner state swap
  - [ ] object-to-system progression
- [ ] Investability framing captured: object wedge to software-backed hospitality layer.
- [ ] Founder voice requirements captured.
- [ ] Reality anchors captured:
  - [ ] early build stage
  - [ ] premium hospitality use cases
  - [ ] exploring pilot venues and early partners
  - [ ] building toward staff-controlled paper-like menu system
- [ ] Asset plan captured:
  - [ ] hero render
  - [ ] product close-ups
  - [ ] service-scene concept image
  - [ ] category-gap diagram
  - [ ] roadmap graphic
  - [ ] founder portrait/signature
- [ ] Execution sequencing captured: story, hero, and visual ambition before heavy buildout.

## Technical Scaffolding Blueprint Coverage

- [ ] Website purpose captured: hybrid funnel site with visionary landing page and support pages.
- [ ] Audience structure captured.
- [ ] Hybrid multi-page structure captured.
- [ ] Homepage module breakdown captured.
- [ ] Component-level breakdown captured:
  - [ ] navbar
  - [ ] hero block
  - [ ] CTA block
  - [ ] comparison section
  - [ ] feature card grid
  - [ ] process/flow block
  - [ ] roadmap/progression block
  - [ ] quote/founder block
  - [ ] FAQ accordion later
  - [ ] footer
  - [ ] contact form
  - [ ] animated media block later
- [ ] Content hierarchy captured:
  - [ ] belief/category first
  - [ ] why now second
  - [ ] product third
  - [ ] possibilities fourth
  - [ ] service/future fifth
  - [ ] founder/action sixth
- [ ] CTA wording logic captured.
- [ ] Technical build model captured:
  - [ ] static-first
  - [ ] component-based
  - [ ] structured content objects
  - [ ] local assets
  - [ ] progressive animations
- [ ] Design system areas captured:
  - [ ] typography
  - [ ] spacing
  - [ ] buttons
  - [ ] cards
  - [ ] section widths
  - [ ] media rules
  - [ ] icons
  - [ ] animation
  - [ ] responsive behavior
- [ ] Asset requirements captured.
- [ ] MVP website versus later-stage website captured.
- [ ] Risks and mistakes captured.
- [ ] Future prompt segmentation captured and expanded.

---

# Product Truths to Preserve

These should remain consistent across future copy and design work.

- [ ] Tailor Taste starts as a paper-like digital menu system.
- [ ] The first beachhead is premium hotels and hotel restaurants.
- [ ] The product should preserve the physical, elegant, immersive feel of a menu.
- [ ] The display direction is black and white, text-first, and paper-like.
- [ ] Guest-side touch interaction is excluded from the MVP.
- [ ] Staff control is central.
- [ ] Language switching is a required MVP use case.
- [ ] Preset menu switching is a required MVP use case.
- [ ] Low-light readability is an important value proposition.
- [ ] Single-item activation/deactivation is valuable but feasibility-dependent.
- [ ] Ordering through the menu is excluded from MVP.
- [ ] Inventory integration is future only.
- [ ] Hardware is the wedge.
- [ ] Software is the long-term leverage.

---

# Messaging Bank

Use these as raw material, not as mandatory copy everywhere.

## Category Lines

- [ ] Between static paper and intrusive screens, there should be something better.
- [ ] A new category for premium hospitality menus.
- [ ] Paper elegance. Software control.
- [ ] The next interface layer for premium dining.
- [ ] Menus should be as dynamic as the hospitality behind them.

## Product Lines

- [ ] A paper-like digital menu designed for premium hospitality.
- [ ] A beautiful hospitality object on the outside, flexible software infrastructure underneath.
- [ ] Tailor Taste turns one of hospitality's most important physical objects into a live, elegant service layer.
- [ ] Designed for venues that want to stay beautiful and become dynamic.

## Service Lines

- [ ] Staff-controlled by design.
- [ ] The guest reads. The service team controls.
- [ ] Built to support waiter-led service, not replace it.
- [ ] The ritual stays familiar; the menu becomes more capable.

## Future Lines

- [ ] Today a menu object. Over time, a software-backed hospitality layer.
- [ ] The menu is the opening wedge.
- [ ] The deeper opportunity is the system behind the menu.
- [ ] Premium hospitality can become more adaptive without becoming less beautiful.

---

# Final Reminder

The website should create belief before the product is mature.

That does not mean pretending. It means making the thesis sharp enough, the category clear enough, and the execution polished enough that the right people want to talk before every proof point exists.

## Codex Block History

- 2026-04-12 | 2026-04-12T16-55Z | P1: Information Architecture and Global Shell | status changed to PLANNED | note: selected as first implementation block
- 2026-04-12 | 2026-04-12T16-55Z | P1: Information Architecture and Global Shell | status changed to IN_PROGRESS | note: implementation work started
- 2026-04-12 | 2026-04-12T16-55Z | P1: Information Architecture and Global Shell | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T18-05Z | P2: Homepage Narrative and Copy System | status changed to PLANNED | note: selected as next implementation block
- 2026-04-12 | 2026-04-12T18-05Z | P2: Homepage Narrative and Copy System | status changed to IN_PROGRESS | note: implementation work started
- 2026-04-12 | 2026-04-12T18-05Z | P2: Homepage Narrative and Copy System | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T18-18Z | P3: Design System and Premium Styling | status changed to PLANNED | note: selected for sequential execution after P2
- 2026-04-12 | 2026-04-12T18-18Z | P3: Design System and Premium Styling | status changed to IN_PROGRESS | note: design-system implementation work started
- 2026-04-12 | 2026-04-12T18-18Z | P3: Design System and Premium Styling | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T18-32Z | P4: Product Page Buildout | status changed to PLANNED | note: selected for sequential execution after P3
- 2026-04-12 | 2026-04-12T18-32Z | P4: Product Page Buildout | status changed to IN_PROGRESS | note: product page implementation work started
- 2026-04-12 | 2026-04-12T18-32Z | P4: Product Page Buildout | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T18-46Z | P5: Vision Page Buildout | status changed to PLANNED | note: selected for sequential execution after P4
- 2026-04-12 | 2026-04-12T18-46Z | P5: Vision Page Buildout | status changed to IN_PROGRESS | note: vision page implementation work started
- 2026-04-12 | 2026-04-12T18-46Z | P5: Vision Page Buildout | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T19-22Z | P6: About Page and Founder Voice | status changed to PLANNED | note: selected for sequential execution after P5
- 2026-04-12 | 2026-04-12T19-22Z | P6: About Page and Founder Voice | status changed to IN_PROGRESS | note: about page implementation work started
- 2026-04-12 | 2026-04-12T19-22Z | P6: About Page and Founder Voice | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T19-34Z | P7: Contact Flow and Conversion UX | status changed to PLANNED | note: selected for sequential execution after P6
- 2026-04-12 | 2026-04-12T19-34Z | P7: Contact Flow and Conversion UX | status changed to IN_PROGRESS | note: contact flow implementation work started
- 2026-04-12 | 2026-04-12T19-34Z | P7: Contact Flow and Conversion UX | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T19-46Z | P8: Asset System and Visual Placeholders | status changed to PLANNED | note: selected for sequential execution after P7
- 2026-04-12 | 2026-04-12T19-46Z | P8: Asset System and Visual Placeholders | status changed to IN_PROGRESS | note: asset system implementation work started
- 2026-04-12 | 2026-04-12T19-46Z | P8: Asset System and Visual Placeholders | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T20-06Z | P9: Motion and Interaction Polish | status changed to PLANNED | note: selected for Bundle A alongside SEO and analytics readiness
- 2026-04-12 | 2026-04-12T20-06Z | P9: Motion and Interaction Polish | status changed to IN_PROGRESS | note: motion and interaction polish implementation started
- 2026-04-12 | 2026-04-12T20-06Z | P9: Motion and Interaction Polish | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T20-18Z | P12: SEO, Metadata, and Analytics Readiness | status changed to PLANNED | note: selected for Bundle A alongside motion polish
- 2026-04-12 | 2026-04-12T20-18Z | P12: SEO, Metadata, and Analytics Readiness | status changed to IN_PROGRESS | note: metadata and analytics contract implementation started
- 2026-04-12 | 2026-04-12T20-18Z | P12: SEO, Metadata, and Analytics Readiness | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T20-34Z | P10: FAQ and Reality Anchors | status changed to PLANNED | note: selected for Bundle B route expansion
- 2026-04-12 | 2026-04-12T20-34Z | P10: FAQ and Reality Anchors | status changed to IN_PROGRESS | note: FAQ route and content implementation started
- 2026-04-12 | 2026-04-12T20-34Z | P10: FAQ and Reality Anchors | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T20-44Z | P11: Future / Roadmap Page | status changed to PLANNED | note: selected for Bundle B route expansion
- 2026-04-12 | 2026-04-12T20-44Z | P11: Future / Roadmap Page | status changed to IN_PROGRESS | note: future roadmap route implementation started
- 2026-04-12 | 2026-04-12T20-44Z | P11: Future / Roadmap Page | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T21-02Z | P13: Accessibility, Responsive QA, and Performance | status changed to PLANNED | note: selected for Bundle C launch hardening
- 2026-04-12 | 2026-04-12T21-02Z | P13: Accessibility, Responsive QA, and Performance | status changed to IN_PROGRESS | note: QA and remediation pass started
- 2026-04-12 | 2026-04-12T21-02Z | P13: Accessibility, Responsive QA, and Performance | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T21-15Z | P14: Final Content Pass and Launch Readiness | status changed to PLANNED | note: selected for Bundle C final coherence pass
- 2026-04-12 | 2026-04-12T21-15Z | P14: Final Content Pass and Launch Readiness | status changed to IN_PROGRESS | note: final content and launch-readiness pass started
- 2026-04-12 | 2026-04-12T21-15Z | P14: Final Content Pass and Launch Readiness | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T17-41Z | Contact backend destination | status changed to PLANNED | note: selected as first implementation block after P1-P14 completion
- 2026-04-12 | 2026-04-12T17-41Z | Contact backend destination | status changed to IN_PROGRESS | note: implementation work started
- 2026-04-12 | 2026-04-12T17-41Z | Contact backend destination | status changed to DONE | note: acceptance criteria satisfied
- 2026-04-12 | 2026-04-12T18-08Z | P15: Technical Launch Hardening and Quality Gates | status changed to PLANNED | note: selected as launch hardening block with full quality-gate scope
- 2026-04-12 | 2026-04-12T18-08Z | P15: Technical Launch Hardening and Quality Gates | status changed to IN_PROGRESS | note: implementation of CI, tests, runtime hardening, and founder-link changes started
- 2026-04-12 | 2026-04-12T18-08Z | P15: Technical Launch Hardening and Quality Gates | status changed to DONE | note: acceptance criteria satisfied
