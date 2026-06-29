import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type NavMenuItem = {
  label: string;
  href: string;
  description: string;
};

export type NavMenu = {
  label: string;
  href: string;
  className: "one" | "two";
  callout?: {
    label: string;
    href: string;
    description: string;
  };
  items: NavMenuItem[];
};

export type ContentLink = {
  label: string;
  href: string;
};

export type ContentImage = {
  src: StaticImageData;
  alt: string;
};

export type ExperienceItem = {
  id: string;
  period: string;
  company: string;
  role: string;
  note?: string;
  location: string;
  summary?: string;
  bullets: string[];
  logo: ContentImage;
};

export type ProjectSection = {
  heading: string;
  body: string;
  links?: ContentLink[];
  images?: ContentImage[];
};

export type ProjectItem = {
  id: string;
  year: string;
  group: string;
  title: string;
  summary: string;
  bullets?: string[];
  links?: ContentLink[];
  images?: ContentImage[];
  intro?: string;
  sectionsHeading?: string;
  sections?: ProjectSection[];
  resourcesHeading?: string;
  resources?: ContentLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  description: string;
  category: "social" | "work";
};
