import creatorgames from "@/assets/opt/work/creatorgames.webp";
import firstfun from "@/assets/opt/work/firstfunlogo.webp";
import mercyships from "@/assets/opt/work/Mercy_Ships_Logo.webp";
import morsl from "@/assets/opt/work/morsl.webp";
import powerdb from "@/assets/opt/work/powerdb.webp";
import samsclub from "@/assets/opt/work/samsclub.webp";
import supersocial from "@/assets/opt/work/supersocial_inc_logo.webp";
import unt from "@/assets/opt/work/unt.webp";
import type { ExperienceItem } from "./types";

export const experienceItems: ExperienceItem[] = [
  {
    id: "creator-games",
    period: "2026-Present",
    company: "Creator Games",
    role: "Lead Developer",
    location: "San Francisco, CA / Remote",
    summary: "Roblox VC — Data Analysis and Marketplace for Roblox Games",
    bullets: [],
    logo: { src: creatorgames, alt: "Creator Games logo" },
  },
  {
    id: "morsl",
    period: "2025-Present",
    company: "Morsl",
    role: "Founder",
    location: "Remote",
    summary: "reviving connection",
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
      "Prototyped a 0 to 1 automated mobile game QA system using multilayer ML and computer vision, reducing manual QA effort and enabling faster iteration cycles.",
      "Designed and built an end-to-end AIGC ad pipeline that ingests Meta Ads data, generates scripts, and produces video creatives, achieving >20% lower CPI.",
    ],
    logo: { src: firstfun, alt: "First Fun logo" },
  },
  {
    id: "powerdb",
    period: "2025",
    company: "PowerDB",
    role: "Software Developer",
    note: "Part time during university",
    location: "College Station, TX",
    bullets: [
      "Built and deployed a dynamic equipment tracking system in C#, WPF (.NET), and SQL Server, automating XML data parsing to accelerate QA reporting by 50%.",
      "Increased equipment assignment workflow performance by 10X through refactoring MVVM architecture and optimising data lookups with dictionary-based mappings.",
      "Redesigned company website with Framer, React, and CMS integration, enhancing user experience and decreasing customer support inquiries.",
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
      "Owned two fraud initiatives that prevented $3.6MM annual fraud losses (60% reduction) through implementation of data-driven fraud detection rules using SQL and Salesforce.",
      "Authored PRDs defining user stories and roadmap; aligned cross-functional teams and unblocked dependencies.",
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
      "Spearheaded a full IP prototype using Unreal Engine (UEFN/Verse) with Agile sprints",
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
      "Built internal full-stack applications automating travel and medical workflows; managed 100+ Jira tickets.",
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
      "Engineered Unity XR test environments with C# for psychological research; awarded $4K research grant.",
    ],
    logo: { src: unt, alt: "UNT logo" },
  },
];
