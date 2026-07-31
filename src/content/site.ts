import logo from "@/assets/opt/jm_logo.png";
import type { NavItem, NavMenu } from "./types";

export const siteConfig = {
  name: "John Mo",
  /**
   * The site's name in browser tabs and search results — lowercase on purpose,
   * it is the house style. Every page's <title> ends in it: "john mo's site",
   * "about | john mo's site".
   *
   * Share cards deliberately do NOT use it: `og:site_name` and `og:title` use
   * proper case via `name`, because a platform prints those as an attribution
   * line in a feed where lowercase reads as a typo. See seo.ts.
   *
   * There is no `description` here any more: the site description now lives once,
   * as the "/" entry in routes.json, and feeds both the homepage
   * <meta name="description"> and the Person JSON-LD. Two copies had already
   * drifted apart.
   */
  title: "john mo's site",
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
