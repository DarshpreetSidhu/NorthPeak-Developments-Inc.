export type ServiceSlug =
  | "legal-suite-basement"
  | "custom-basement"
  | "home-renovation";

export type ServiceFaq = { question: string; answer: string };
export type ServiceListItem = { title: string; description: string };
export type ServiceProcessStep = { title: string; description: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  heroHeadline: string;
  heroSubhead: string;
  metaDescription: string;
  homeIntro: string;
  overview: string[];
  scope: ServiceListItem[];
  designOptions?: ServiceListItem[];
  planningConsiderations?: ServiceListItem[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  disclaimer: string;
  /**
   * A short, substantive note on how *this specific service* plays out
   * across the service area — not a templated city-name swap. Paired with
   * siteConfig.serviceAreas on the service page. Keep this genuinely
   * distinct per service; see docs/OWNER_INPUTS.md for why this project
   * deliberately avoids generating one near-duplicate page per city.
   */
  serviceAreaNote: string;
};

export const services: Service[] = [
  {
    slug: "legal-suite-basement",
    name: "Legal Suite Basement",
    shortName: "Legal Suite",
    heroHeadline: "A basement suite built for approval, not just appearance.",
    heroSubhead:
      "Secondary suites carry their own layout, safety, and permitting logic. We plan around it from the first sketch, not after the drywall is up.",
    metaDescription:
      "Legal basement suite planning and construction in Calgary and area — feasibility, layout, egress, fire separation, and permit coordination handled with care.",
    homeIntro:
      "A self-contained lower-level suite planned around feasibility, safe egress, and separation from day one — coordinated with your municipality's process, not around it.",
    overview: [
      "A legal secondary suite is one of the more technical renovations a basement can take on, because it has to satisfy building and safety requirements in addition to looking good. We start with an honest feasibility conversation about your specific property before any design work begins.",
      "Requirements for secondary suites vary by municipality and by the specifics of your home — ceiling height, existing window openings, structural layout, and parking are common factors. We do not promise an outcome before that assessment is complete, and we coordinate directly with your municipality's permitting and inspection process throughout construction.",
    ],
    scope: [
      { title: "Feasibility and intended use", description: "An early assessment of whether your basement can reasonably support a suite, and what the suite is intended for (rental income, extended family, or future flexibility) shapes every decision that follows." },
      { title: "Layout and separate-entry possibilities", description: "We evaluate realistic layouts for a self-contained unit, including whether a separate or shared entry is achievable given your lot and existing structure." },
      { title: "Kitchen, bathroom, and laundry planning", description: "Secondary suites typically need their own kitchen and bathroom, and often their own laundry — each with plumbing, ventilation, and clearance implications we plan around early." },
      { title: "Sound separation", description: "Separating a suite acoustically from the rest of the home is a planning and assembly decision, addressed in the floor, wall, and mechanical design rather than treated as an afterthought." },
      { title: "Fire and life-safety considerations", description: "Secondary suites are held to fire-separation and life-safety expectations distinct from a single-family basement. We build to the standard your project requires and coordinate the inspections that confirm it." },
      { title: "Egress", description: "Legal suites require compliant means of escape from sleeping areas. Where existing window openings aren't sufficient, we assess options such as enlarging openings or adding an egress window." },
      { title: "Heating and ventilation", description: "A suite needs its own comfortable, code-appropriate heating and ventilation strategy — whether that extends the existing system or introduces a separate one." },
      { title: "Permit and inspection coordination", description: "We prepare drawings and documentation for permit submission and coordinate the inspection stages required by your municipality from rough-in through completion." },
    ],
    designOptions: [
      { title: "Open living and kitchen layout", description: "A single open living, dining, and kitchen area for a compact but comfortable footprint." },
      { title: "Separated bedroom wing", description: "One or more bedrooms set apart from the living space for privacy between occupants and the main home." },
      { title: "Private or shared laundry", description: "In-suite laundry where plumbing allows, or a shared arrangement where it doesn't." },
    ],
    process: [
      { title: "Feasibility Walkthrough", description: "We assess your basement in person — ceiling height, window openings, structural layout, and mechanical systems — and talk through what's realistic for your goals." },
      { title: "Design & Egress Planning", description: "We develop a layout that addresses egress, separation, and suite requirements, and prepare the drawings needed for permit submission." },
      { title: "Municipal Permit Submission", description: "Drawings and supporting documentation are submitted to your municipality. Timelines and requirements are set by them, not by us, and we'll keep you informed as the application moves." },
      { title: "Phased Construction & Inspections", description: "We build in the sequence your permit requires, scheduling inspections at each required stage rather than leaving them until the end." },
      { title: "Final Walkthrough & Handover", description: "We complete a final walkthrough with you once construction and required inspections are finished." },
    ],
    faqs: [
      { question: "Can any basement be converted into a legal suite?", answer: "Not always. It depends on your property's ceiling height, existing window openings, structural layout, parking, and your municipality's rules. That's why we start with a feasibility assessment rather than assuming it's possible." },
      { question: "Do you guarantee our suite will be approved?", answer: "No responsible contractor can guarantee approval, because that decision rests with your municipality's building department based on the plans submitted and the inspections performed. We design and build to the requirements that apply to your project and manage the permit and inspection process closely, but approval itself is theirs to grant." },
      { question: "What's the difference between a legal suite and an illegal one?", answer: "A legal suite meets the applicable building, fire, and safety requirements for a secondary dwelling unit and has been permitted and inspected by your municipality. An unpermitted or non-compliant suite can carry safety, insurance, and resale risks — which is why we build to the standard a legal suite requires and coordinate the inspections that confirm it." },
      { question: "How long does the permitting process take?", answer: "Timelines are set by your municipality and vary with current volume and the complexity of your project, so we can't quote a fixed number. We'll help you understand what to expect once we know your specific scope and jurisdiction." },
      { question: "Do we need a separate entrance?", answer: "It depends on your municipality's requirements and what's achievable on your lot. We'll walk through the realistic options for your property during the feasibility stage." },
    ],
    disclaimer:
      "Secondary suite feasibility and requirements depend on your specific property and the rules of your municipality, which can change and are outside our control. Nothing on this page should be read as a guarantee of approval or as a statement of a universal code requirement — always verify current requirements with your municipality before proceeding.",
    serviceAreaNote:
      "Secondary suite requirements — parking, egress, ceiling height, and the approval process itself — are set by each municipality individually. Before any design work begins, we confirm the specific requirements for your address with your local building department.",
  },
  {
    slug: "custom-basement",
    name: "Custom Basement",
    shortName: "Custom Basement",
    heroHeadline: "A lower level designed around how you actually use it.",
    heroSubhead:
      "Media room, guest suite, home gym, or all three — a custom basement takes the layout, lighting, and finish decisions seriously, room by room.",
    metaDescription:
      "Custom basement development in Calgary and area — entertainment walls, wet bars, guest suites, home offices, and finish selection built around your household.",
    homeIntro:
      "Media rooms, wet bars, guest suites, and home offices — planned as one coherent lower level, with lighting and finishes selected to work together rather than in isolation.",
    overview: [
      "A custom basement isn't one room — it's usually several, each with a different job. We plan the whole floor as a system: how sound moves between the media room and the guest bedroom, where the wet bar sits relative to seating, how layered lighting changes the mood of a space built for both movie nights and quiet mornings.",
      "Because most of this work happens below grade, mechanical, moisture, and acoustic decisions matter as much as the visible finishes — we treat them as part of the design, not a separate technical checklist.",
    ],
    scope: [
      { title: "Entertainment and media rooms", description: "A dedicated space for a home theatre or media setup, planned around sightlines, seating, and acoustics rather than fitted in after the fact." },
      { title: "Entertainment walls", description: "A proportioned, built-in wall composition — cabinetry, panelling, shelving, and television placement — designed as the visual anchor of the room." },
      { title: "Wet bars", description: "A bar area sized to your space, with cabinetry, counter, and plumbing planned alongside the rest of the layout." },
      { title: "Guest bedrooms and bathrooms", description: "Comfortable, private guest accommodations with attention to natural light, egress where required, and finishes that match the rest of the level." },
      { title: "Home offices and fitness spaces", description: "Quiet, well-lit work areas or a dedicated fitness space, planned around ventilation, flooring, and acoustic comfort." },
      { title: "Storage and custom cabinetry", description: "Built-in storage designed into the layout rather than added as an afterthought, sized to what you actually need to store." },
      { title: "Acoustic comfort", description: "Sound-dampening in floors, walls, and mechanical planning to keep a media room from disturbing the rest of the house — and vice versa." },
      { title: "Layered lighting and finish selection", description: "A coordinated lighting plan — ambient, task, and accent — paired with a considered material and paint palette across the whole level." },
    ],
    designOptions: [
      { title: "Single great room", description: "One open entertainment and lounge space anchored by a feature wall." },
      { title: "Zoned multi-room layout", description: "Distinct media, bar, and guest zones separated for privacy and acoustic control." },
      { title: "Flex room option", description: "A secondary room designed to convert between office, gym, or guest use over time." },
    ],
    process: [
      { title: "Discovery conversation", description: "We talk through how you actually plan to use the space — entertaining, guests, work, fitness — before any layout is drawn." },
      { title: "Layout and design", description: "We develop a floor plan and finish direction, including the entertainment-wall composition and lighting plan." },
      { title: "Material and finish selection", description: "You choose from curated finish concepts and see how panelling, cabinetry, metal finishes, and paint work together before construction starts." },
      { title: "Construction", description: "Framing, mechanical, and finishing proceed in sequence, with regular updates so you always know where things stand." },
      { title: "Final walkthrough", description: "We review the finished space together and address any final details before handoff." },
    ],
    faqs: [
      { question: "Can you install a fireplace in the entertainment wall?", answer: "In many cases yes — a linear electric fireplace is a common addition to a custom entertainment wall. Placement and clearances depend on the specific manufacturer's requirements and your room's layout, which we confirm during design." },
      { question: "Do you handle the wet bar plumbing?", answer: "Yes, wet bar plumbing is planned as part of the overall layout and coordinated with the trades doing that work on your project." },
      { question: "Can I mix finish concepts instead of picking just one?", answer: "The three finish concepts on this page are starting points, not fixed packages — we regularly adjust panel, cabinet, and metal choices to fit your taste once we're working from your actual space and lighting." },
      { question: "How do you address moisture and humidity below grade?", answer: "Below-grade moisture management is addressed in the underlying construction — vapour and insulation strategy, drainage, and ventilation — before finishes go in, and is assessed specifically for your property rather than assumed." },
      { question: "Will the basement feel connected to the rest of the house?", answer: "That's part of what the finish-selection and lighting planning are for — we aim for a palette and level of finish that feels considered alongside the rest of your home, not like a separate, disconnected space." },
    ],
    disclaimer:
      "Specific product placement (such as a fireplace or built-in appliance) is subject to the manufacturer's installation and clearance requirements and a review of your room's layout and mechanical systems.",
    serviceAreaNote:
      "Site conditions — ceiling height, existing mechanical rough-ins, foundation age — vary property to property more than they vary by city, which is why every custom basement starts with an in-person walkthrough rather than a remote estimate.",
  },
  {
    slug: "home-renovation",
    name: "Home Renovation",
    shortName: "Home Renovation",
    heroHeadline: "Whole-home renovation, planned as one project — not a pile of trades.",
    heroSubhead:
      "Kitchens, bathrooms, layout changes, and finish upgrades coordinated under one plan and one point of contact.",
    metaDescription:
      "Home renovation services in Calgary and area — kitchens, bathrooms, layout changes, flooring, millwork, and whole-home finish upgrades with clear project communication.",
    homeIntro:
      "Kitchens, bathrooms, layout changes, and finish upgrades, coordinated under one plan and one point of contact instead of a string of separate trades.",
    overview: [
      "Home renovation projects tend to go wrong not because of any single trade, but because of what happens between trades — a gap in scheduling, a decision made twice, a finish that doesn't match what was chosen down the hall. We manage the renovation as one coordinated project, with a single point of contact and a clear plan from the outset.",
      "That applies whether the project is a single kitchen or a full-home update touching layout, flooring, millwork, and lighting throughout.",
    ],
    scope: [
      { title: "Whole-home updates", description: "Coordinated renovation across multiple rooms, so materials, trim, and hardware carry through the home rather than feeling like separate projects." },
      { title: "Kitchen and bathroom renovations", description: "Layout, cabinetry, countertops, and fixtures planned together, with plumbing and electrical coordinated around the design rather than constraining it unnecessarily." },
      { title: "Interior layout improvements", description: "Opening up or reconfiguring rooms to improve flow — any change affecting load-bearing structure is reviewed by a qualified professional before work proceeds." },
      { title: "Flooring, millwork, and finish upgrades", description: "Flooring transitions, trim, baseboards, and built-in millwork specified and installed as part of a single coordinated finish plan." },
      { title: "Feature walls and lighting", description: "A statement wall or updated lighting plan to refresh a room without a full renovation, coordinated with the rest of the home's palette." },
      { title: "Coordinated material palettes", description: "Flooring, paint, hardware, and fixtures selected to work together across the spaces being renovated, not chosen room by room in isolation." },
      { title: "Project planning and communication", description: "A clear schedule, a single point of contact, and regular updates so you always know what's happening next and why." },
    ],
    designOptions: [
      { title: "Single-room refresh", description: "A focused update to one space — most often a kitchen, bathroom, or feature wall." },
      { title: "Multi-room renovation", description: "Coordinated work across several connected spaces, sharing a material and finish palette." },
      { title: "Whole-home renovation", description: "A full-home update sequenced in phases to minimize disruption to daily life." },
    ],
    process: [
      { title: "Feasibility Walkthrough", description: "We walk through your home and priorities together, flag anything that will likely need a structural or permit review, and discuss what's realistic within your goals." },
      { title: "Design & Scope", description: "We define the scope room by room and put together a clear, written plan — including flooring, cabinetry, fixtures, and finish direction for each space." },
      { title: "Planning & Permits", description: "Where plumbing, electrical, or structural work requires a permit, we prepare documentation and coordinate submission and inspections with your municipality." },
      { title: "Construction", description: "Work proceeds in a sequenced schedule, with trades coordinated so one stage doesn't stall the next." },
      { title: "Final Walkthrough & Handover", description: "We complete a detailed walkthrough together and address any final details before considering the project finished." },
    ],
    faqs: [
      { question: "Can you remove a wall to open up our floor plan?", answer: "Sometimes — it depends on whether the wall is load-bearing and what a structural review finds. We involve a qualified professional to assess any structural change before it's included in the plan." },
      { question: "Do we need permits for a kitchen or bathroom renovation?", answer: "It depends on the scope — cosmetic updates often need less than a project involving plumbing relocation, structural changes, or electrical work. We'll flag what your specific project requires as we finalize the scope." },
      { question: "Can you match new work to our home's existing finishes?", answer: "In many cases yes, though exact matches for discontinued materials aren't always possible. We'll be upfront about it during material selection if an exact match isn't achievable." },
      { question: "How do you minimize disruption during a whole-home renovation?", answer: "Sequencing and communication are the main tools — phasing work so essential spaces stay usable where possible, and keeping you informed of the schedule so surprises are rare." },
      { question: "Do you work on additions as well as renovations?", answer: "Our current focus is legal suite basements, custom basements, and interior home renovation. If your project includes an addition, tell us during the consultation and we'll let you know whether it fits what we take on." },
    ],
    disclaimer:
      "Any renovation involving structural changes, load-bearing walls, or work requiring a permit is subject to assessment by a qualified professional and the applicable municipal approval process before construction proceeds.",
    serviceAreaNote:
      "Renovation scope depends more on the home itself than its postal code — from established Calgary neighbourhoods to acreages outside Cochrane or Airdrie. Trade scheduling, material delivery, and permit coordination do vary across the region, and we account for that in every project timeline.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
