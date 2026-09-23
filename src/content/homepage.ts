export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const consultationProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We walk through your space and goals together, talk honestly about what's feasible, and answer your questions before anything is designed.",
  },
  {
    step: "02",
    title: "Design & scope",
    description:
      "We turn the conversation into a concrete layout, material direction, and written scope — so you know what you're approving before construction starts.",
  },
  {
    step: "03",
    title: "Planning & permits",
    description:
      "Where permits or professional structural review are required, we prepare the documentation and coordinate the process with your municipality.",
  },
  {
    step: "04",
    title: "Construction",
    description:
      "Work proceeds on a sequenced schedule with a single point of contact, so you always know what's happening and why.",
  },
  {
    step: "05",
    title: "Completion & walkthrough",
    description:
      "We complete a detailed walkthrough together and address any final details before we consider the project finished.",
  },
];

export type QualityPillar = {
  title: string;
  description: string;
};

export const qualityPillars: QualityPillar[] = [
  {
    title: "One point of contact",
    description:
      "You work with a single, consistent point of contact for the life of the project — not a rotating cast of trades relaying messages.",
  },
  {
    title: "Written scope before work starts",
    description:
      "Every project begins with a clear, written scope and material selections, so what you approved is what gets built.",
  },
  {
    title: "Straight talk on feasibility",
    description:
      "If something isn't feasible on your property or within your goals, we say so early — before design fees and expectations are built around it.",
  },
  {
    title: "Coordinated trades and sequencing",
    description:
      "Trades are scheduled in a sequence that avoids rework, so one stage doesn't stall — or damage — the next.",
  },
  {
    title: "Permit and inspection follow-through",
    description:
      "Where a permit applies, we prepare documentation and coordinate inspections through to sign-off, rather than leaving compliance to chance.",
  },
  {
    title: "A finished walkthrough, not a disappearing act",
    description:
      "We complete a final walkthrough with you and address outstanding details before considering a project done.",
  },
];

export type HomeFaq = { question: string; answer: string };

export const homeFaqs: HomeFaq[] = [
  {
    question: "Which areas do you serve?",
    answer:
      "We work in Calgary and the surrounding communities of Chestermere, Strathmore, Okotoks, Cochrane, and Airdrie. If you're just outside this list, reach out — we may still be able to help.",
  },
  {
    question: "What happens during a first consultation?",
    answer:
      "We visit your space, listen to what you're trying to achieve, and give you an honest read on feasibility. There's no pressure to commit on the spot — it's a conversation, not a sales pitch.",
  },
  {
    question: "How long does a typical renovation take?",
    answer:
      "It depends heavily on scope — a single bathroom and a full basement development are very different timelines. We'll give you a project-specific schedule once your scope is defined, rather than a generic number that doesn't reflect your actual project.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "For work that requires a permit, yes — we prepare the necessary documentation and coordinate submission and inspections with your municipality. Requirements vary by project and jurisdiction, which we'll walk through as part of planning.",
  },
  {
    question: "Which of your three services is right for our project?",
    answer:
      "If you're planning a self-contained rental or extended-family suite, that's a legal suite basement. If you want a custom lower level for entertaining, guests, or a home office without renting it out, that's a custom basement. Broader updates to kitchens, bathrooms, or the rest of the home fall under home renovation. If you're not sure, tell us what you're trying to achieve and we'll point you the right way.",
  },
];
