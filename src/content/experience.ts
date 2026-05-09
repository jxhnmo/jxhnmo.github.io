import firstfun from "@/assets/work/firstfunlogo.jpeg";
import mercyships from "@/assets/work/Mercy_Ships_Logo.jpg";
import morsl from "@/assets/work/morsl.png";
import powerdb from "@/assets/work/powerdb.png";
import samsclub from "@/assets/work/samsclub.png";
import supersocial from "@/assets/work/supersocial_inc_logo.jpeg";
import unt from "@/assets/work/unt.png";
import type { ExperienceItem } from "./types";

export const experienceItems: ExperienceItem[] = [
  {
    id: "morsl",
    period: "2025-Present",
    company: "Morsl",
    role: "Founder",
    location: "Remote",
    summary: "ring ring",
    bullets: [],
    logo: { src: morsl, alt: "Morsl logo" },
  },
  {
    id: "first-fun",
    period: "2025",
    company: "First Fun",
    role: "AI Software Engineer",
    location: "Santa Clara, CA",
    bullets: [
      "Founding engineer led AI tool development, game production, and sprint execution for the U.S. team.",
      "Prototyped an automated mobile game QA system using multilayer ML and computer vision.",
      "Designed and built an AIGC ad pipeline for Meta Ads data, scripts, and video creatives, achieving more than 20% lower CPI.",
    ],
    logo: { src: firstfun, alt: "First Fun logo" },
  },
  {
    id: "powerdb",
    period: "2025",
    company: "PowerDB",
    role: "Software Developer",
    location: "College Station, TX",
    bullets: [
      "Built and deployed a dynamic equipment tracking system in C#, WPF, .NET, and SQL Server.",
      "Improved equipment assignment workflow performance by 10x through MVVM refactoring and dictionary-based lookups.",
      "Redesigned the company website with Framer, React, and CMS integration.",
    ],
    logo: { src: powerdb, alt: "PowerDB logo" },
  },
  {
    id: "sams-club",
    period: "2023-2024",
    company: "Sam's Club",
    role: "Product Manager Intern",
    location: "Bentonville, AR",
    bullets: [
      "Owned two fraud initiatives that prevented $3.6MM in annual fraud losses through data-driven detection rules.",
      "Authored PRDs, user stories, and roadmap plans while aligning cross-functional teams.",
    ],
    logo: { src: samsclub, alt: "Sam's Club logo" },
  },
  {
    id: "supersocial",
    period: "2022-2023",
    company: "Supersocial",
    role: "Game Developer Intern",
    location: "Los Angeles, CA",
    bullets: [
      "Spearheaded a full IP prototype using Unreal Engine, UEFN, and Verse with Agile sprints.",
      "Led programming, game balancing, playtesting, and documentation.",
    ],
    logo: { src: supersocial, alt: "Supersocial logo" },
  },
  {
    id: "mercy-ships",
    period: "2021-2022",
    company: "Mercy Ships",
    role: "Product Engineering Intern",
    location: "Remote",
    bullets: [
      "Built internal full-stack applications automating travel and medical workflows while managing 100+ Jira tickets.",
    ],
    logo: { src: mercyships, alt: "Mercy Ships logo" },
  },
  {
    id: "unt-cns-lab",
    period: "2020-2021",
    company: "UNT CNS Lab",
    role: "Research Assistant",
    location: "Denton, TX",
    bullets: [
      "Engineered Unity XR test environments with C# for psychological research and received a $4K research grant.",
    ],
    logo: { src: unt, alt: "UNT logo" },
  },
];
