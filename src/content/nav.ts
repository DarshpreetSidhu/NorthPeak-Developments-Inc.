export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Legal Suite Basement", href: "/services/legal-suite-basement" },
  { label: "Custom Basement", href: "/services/custom-basement" },
  { label: "Home Renovation", href: "/services/home-renovation" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About NorthPeak", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];
