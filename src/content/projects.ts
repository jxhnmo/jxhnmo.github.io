import aadata from "@/assets/projects/aadata.png";
import djbestie from "@/assets/projects/djbestie.jpg";
import djbestieteam from "@/assets/projects/djbestieteam.jpg";
import facial from "@/assets/projects/facial.png";
import fn1 from "@/assets/projects/fn1.jpg";
import interviewpro from "@/assets/projects/interviewpro.png";
import interviewprodata from "@/assets/projects/interviewprodata.png";
import losalamos1 from "@/assets/projects/losalamos1.png";
import losalamos2 from "@/assets/projects/losalamos2.png";
import nsa1 from "@/assets/projects/nsa1.png";
import nsa2 from "@/assets/projects/nsa2.png";
import nsa3 from "@/assets/projects/nsa3.png";
import personalsite from "@/assets/projects/personalsite.png";
import personalsite1 from "@/assets/projects/personalsite1.png";
import personalsite2 from "@/assets/projects/personalsite2.png";
import sandia from "@/assets/projects/sandia.png";
import usnavy from "@/assets/projects/usnavy.png";
import type { ProjectItem } from "./types";

export const projectItems: ProjectItem[] = [
  {
    id: "dj-bestie",
    year: "2025",
    group: "TAMUhack 2025",
    title: "DJ Bestie",
    summary:
      "Won 3rd out of 700+ with an AI-powered interactive DJ app that personalizes music curation.",
    bullets: [
      "Used computer vision, generative AI conversation topics, and real-time music APIs.",
      "Built a dynamic frontend with React and Next.js.",
    ],
    links: [
      { label: "Demo Video", href: "https://youtu.be/uXpFiFYlSw4" },
      { label: "Devpost", href: "https://devpost.com/software/dj-bestie" },
    ],
    images: [
      { src: djbestie, alt: "DJ Bestie interface" },
      { src: djbestieteam, alt: "DJ Bestie team" },
    ],
  },
  {
    id: "dream-boy-games",
    year: "2023-2024",
    group: "Dream Boy Games",
    title: "Game Studio Startup",
    summary:
      "Built an incubation game studio on Fortnite, reaching 500+ CCU and 11,000+ plays.",
    images: [{ src: fn1, alt: "Fortnite game environment" }],
  },
  {
    id: "interview-pro",
    year: "2024",
    group: "TAMUhack 2024",
    title: "iNterview Pro",
    summary:
      "Won 1st out of 800+ with a full-stack interview prep app that analyzes speech, expression, and eye contact.",
    bullets: [
      "Built and fine-tuned ML models for facial recognition, expressions, eye tracking, and speech-to-text.",
      "Integrated OpenAI APIs for processing, question generation, and improvement summaries.",
      "Displayed an animated Unity frontend model through React.",
    ],
    links: [
      {
        label: "Demo Video",
        href: "https://www.youtube.com/watch?v=9A2LTzXo4qk",
      },
      {
        label: "Devpost",
        href: "https://devpost.com/software/interview-pro-igtp3z",
      },
    ],
    images: [
      { src: interviewpro, alt: "iNterview Pro interface" },
      { src: interviewprodata, alt: "iNterview Pro analytics" },
      { src: facial, alt: "Facial recognition model output" },
    ],
  },
  {
    id: "programming-studio-site",
    year: "2024",
    group: "Programming Studio",
    title: "Personal Website HTML/CSS",
    summary:
      "Built a website with two different visual styles through CSS manipulation without JavaScript libraries.",
    links: [
      { label: "Site", href: "https://people.tamu.edu/~johnmo/index.html" },
    ],
    images: [
      { src: personalsite1, alt: "Personal website style one" },
      { src: personalsite2, alt: "Personal website style two" },
    ],
  },
  {
    id: "react-portfolio",
    year: "2023",
    group: "Personal Website",
    title: "React Portfolio",
    summary:
      "The previous version of this site, built with React and Radix UI while iterating from user testing and feedback.",
    intro:
      "I am still frequently updating the website with new features based on user testing and feedback!",
    sectionsHeading: "Here are some cool updates:",
    sections: [
      {
        heading: "Design Process + Auto Open Tab",
        body: "When you landed here, you probably noticed this tab popped open right away. That's on purpose! I picked up some great insights from a talk by a Google UX Designer, who highlighted the importance of showing not just what a website offers, but also the thinking behind its features. Initially, I thought about creating a separate page to share these thoughts, but then it struck me - why not make it immediately visible? Easier for you to find and keeps the site looking neat!",
      },
      {
        heading: "Interactive Navigation Buttons",
        body: "Turns out, not everyone is a fan of traditional navigation bars (who knew, right?). So, I spiced things up with some fun, interactive buttons that you'll find on our homepage and about page. They're designed to make your experience not just smoother but more satisfying.",
      },
      {
        heading: "Light Mode Toggle",
        body: "I started off with a dark theme because, honestly, I just love how it looks. But, hey, it's not for everyone! So, I added a light mode toggle. Now, you can switch it up anytime you like, making the site more accessible and comfortable for all eyes.",
      },
      {
        heading: "Accordion",
        body: "I've also put in an accordion layout on the projects and experience pages. It's a sleek way to pack in information without overwhelming you. Just click and expand the section you're interested in!",
      },
    ],
    resourcesHeading: "Design inspiration sources!",
    resources: [
      {
        label: "https://vishwas-saini-portfolio.vercel.app/",
        href: "https://vishwas-saini-portfolio.vercel.app/",
      },
      { label: "https://www.rubens.design/", href: "https://www.rubens.design/" },
      { label: "https://caseypei.me/", href: "https://caseypei.me/" },
      { label: "https://lukeypookster.com/", href: "https://lukeypookster.com/" },
      {
        label: "https://webflow.com/made-in-webflow/website/COLIN-MOY",
        href: "https://webflow.com/made-in-webflow/website/COLIN-MOY",
      },
    ],
    images: [{ src: personalsite, alt: "Previous React portfolio screenshot" }],
  },
  {
    id: "skribblio-demon",
    year: "2023",
    group: "TAMU Datathon",
    title: "Skribblio Demon",
    summary:
      "Placed 4th out of 50+ with a TensorFlow/Keras drawing classifier built on Quick, Draw! data and custom classes.",
    links: [
      {
        label: "Devpost",
        href: "https://devpost.com/software/skribblio-demon",
      },
    ],
  },
  {
    id: "american-airlines",
    year: "2023",
    group: "American Airlines",
    title: "Mini-Hack",
    summary:
      "Built an ML model from 200,000 data points to classify passengers as leisure or business and recommend margin improvements.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jxhnmo/american-airlines-challenge",
      },
    ],
    images: [{ src: aadata, alt: "American Airlines model output" }],
  },
  {
    id: "aggies-invent",
    year: "2022-2023",
    group: "Aggies Invent",
    title: "Pitch Competitions",
    summary:
      "Led multidisciplinary teams across industry-sponsored pitch competitions for AI, robotics, aviation, and security concepts.",
    bullets: [
      "Designed ScanX for x-ray contraband identification.",
      "Designed VTOLtally Awesome, a long-endurance VTOL search and rescue aircraft concept.",
      "Designed a radiation-detection swarm robot concept and Mediator, a credibility evaluation extension/app.",
    ],
    links: [
      {
        label: "Sandia Presentation",
        href: "https://youtu.be/hA0vzJ25pFo?si=1yFTgo1Im6vkVnnc&t=6836",
      },
      {
        label: "Los Alamos Presentation",
        href: "https://www.youtube.com/live/CvsA9LDOP4Q?si=YlQZuKxbPMZqMODZ&t=2978",
      },
      {
        label: "NSA Presentation",
        href: "https://www.youtube.com/live/jw86T8we1KM?si=aaFxC1TwVsBxEZhG&t=253",
      },
    ],
    images: [
      { src: sandia, alt: "ScanX pitch board" },
      { src: usnavy, alt: "VTOL aircraft concept" },
      { src: losalamos1, alt: "Los Alamos concept slide one" },
      { src: losalamos2, alt: "Los Alamos concept slide two" },
      { src: nsa1, alt: "NSA project slide" },
      { src: nsa2, alt: "Mediator app screen one" },
      { src: nsa3, alt: "Mediator app screen two" },
    ],
  },
];
