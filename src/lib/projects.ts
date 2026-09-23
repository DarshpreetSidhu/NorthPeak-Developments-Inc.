export interface Project {
  /** URL-safe identifier — used for the `/projects/[slug]` route. */
  slug: string;
  title: string;
  /**
   * City/area only — never a street address. Publishing a completed
   * project's exact address alongside a client's name identifies a real
   * person's home to the public; see docs/OWNER_INPUTS.md before ever
   * tightening this to a street-level location.
   */
  location: string;
  projectType: string;
  scopeSummary: string;
  /**
   * Public display name for the client. Defaults to a generic reference
   * ("Private homeowner") — only replace with a real name once the client's
   * written consent to be named publicly is on file. See
   * docs/OWNER_INPUTS.md.
   */
  client: string;
  /** Short teaser shown on the /projects index card. */
  summary: string;
  /** Full narrative shown on the case study detail page. */
  description: string;
  scopeOfWork: string[];
  metaDescription: string;
}

export const projects: Project[] = [
  {
    slug: "chestermere-exterior-remediation",
    title: "Exterior Structural Remediation & Envelope Restoration",
    location: "Chestermere, Alberta",
    projectType: "Exterior Remediation",
    scopeSummary: "≈800 sq ft exterior envelope",
    client: "Private homeowner",
    summary:
      "Full exterior envelope remediation on a Chestermere home: stucco removal, structural stud replacement, new sheathing, and reinstated, weatherproofed windows.",
    description:
      "Comprehensive exterior wall remediation. Scope of work included complete stucco removal, structural extraction of rotten framing studs, installation of new OSB sheathing, and precise window reinstallation with upgraded weatherproofing.",
    scopeOfWork: [
      "Complete removal of failed exterior stucco",
      "Structural extraction of rotten and compromised framing studs",
      "Installation of new OSB sheathing across the affected envelope",
      "Precise window reinstallation with upgraded weatherproofing detail",
    ],
    metaDescription:
      "A case study in exterior structural remediation and envelope restoration on an approximately 800 sq ft home exterior in Chestermere, Alberta — stucco removal, framing repair, sheathing, and weatherproofed window reinstallation.",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
