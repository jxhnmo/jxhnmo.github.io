import logo from "@/assets/jm_logo.png";
import type { NavItem, NavMenu } from "./types";

export const siteConfig = {
  name: "John Mo",
  title: "john mo's site",
  description:
    "John Mo is a software engineer, builder, gamer, and foodie based in San Francisco working on startups, games, and applied AI.",
  url: "https://jxhnmo.github.io",
  email: "peikaimo@gmail.com",
  linkedIn: "https://www.linkedin.com/in/john-mo/",
  github: "https://github.com/jxhnmo",
  logo,
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Links", href: "/links" },
  { label: "Resume", href: "/resume" },
];

export const navMenus: NavMenu[] = [
  {
    label: "About",
    href: "/about",
    className: "one",
    callout: {
      label: "Me",
      href: "/",
      description: "Passionate gamer and software dev",
    },
    items: [
      { label: "About", href: "/about", description: "me!" },
      { label: "Links", href: "/links", description: "relevant links of mine" },
    ],
  },
  {
    label: "Experience",
    href: "/experience",
    className: "two",
    items: [
      {
        label: "Experience",
        href: "/experience",
        description: "my work experiences",
      },
      { label: "🔒 Resume", href: "/resume", description: "my resume !" },
    ],
  },
];
