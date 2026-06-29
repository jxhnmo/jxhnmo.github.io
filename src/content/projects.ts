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
      "Built the frontend using React and Next.js, enabling a dynamic and responsive user experience.",
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
      "Built an incubation game studio on Fortnite achieving 500+ CCU and 11,000+ plays.",
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
      "Full stack application to help prepare people for interviews by analyzing speech, emotions, and eye contact, while asking potential interview questions about the role that they are applying for.",
      "Backend using Pytorch, OpenCV, and SpeechRecognition, built, trained, and fine-tuned 4 ML models for facial recognition, expressions, eye tracking, and speech-to-text.",
      "Integrated with OpenAI's API for data processing, question generation, and improvement summarisation.",
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
    year: "2023-Present",
    group: "Personal Website",
    title: "2026 Revamp",
    summary:
      "The site you're on right now - I revamped it in 2026 to be faster, cleaner, and a lot nicer to look at.",
    sectionsHeading: "The thinking behind it (newest first):",
    sections: [
      {
        heading: "Why rebuild it... again?",
        body: "Honestly, AI changed the math. The kind of refactor that used to eat a whole weekend now takes an afternoon, so I finally had the budget to redo the foundation properly. The old site was a Create React App single-page app - one big JS bundle that rendered everything in the browser. I migrated it to Next.js with a fully static export, so every page is pre-rendered to plain HTML (better for load speed and SEO) and still hosted on GitHub Pages with no server to babysit. I also pulled all the content - projects, experience, links - out into typed data files, so adding a project like this one is now literally just editing an array.",
      },
      {
        heading: "Mobile-first, accessibility-first nav",
        body: "On phones the menu opens into a full-screen overlay with a proper focus trap, so keyboard and screen-reader folks don't get stranded behind it. The desktop dropdowns got the same once-over: smoother open animations and no weird seams. The kind of stuff nobody notices unless it's broken, which is exactly why I sweated it.",
      },
      {
        heading: "Ideas that survived the rebuild",
        body: "Plenty of the old version's ideas were good enough to keep - just reskinned. Here's what I wrote about them last time:",
      },
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
      "Placed 4th out of 50+ with a TensorFlow/Keras CNN drawing classifier built on Quick, Draw! data and custom classes.",
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
      "Led multidisciplinary teams across industry-sponsored pitch competitions to solve real-world problem statements for AI, robotics, aviation, and security concepts.",
    intro:
      "These competitions allow me to work with a diverse team to solve real-world problems and practice presenting to industry professionals. I have led each team and worked on concepts and design, as well as the video filming and editing.",
    sectionsHeading: "The competitions (newest first):",
    sections: [
      {
        heading: "Sandia National Labs: AI/ML — Sep 12, 2023",
        body: 'Designed "ScanX," deep-learning software that identifies illicit contraband in x-ray content and extrapolates individual items into an easy-to-understand grid.',
        links: [
          {
            label: "Presentation",
            href: "https://youtu.be/hA0vzJ25pFo?si=1yFTgo1Im6vkVnnc&t=6836",
          },
        ],
        images: [{ src: sandia, alt: "ScanX pitch board" }],
      },
      {
        heading: "Sandia National Labs: AI/ML — 3rd Place — Apr 16, 2023",
        body: 'Designed "VTOLtally Awesome," a long-endurance VTOL-capable aircraft that could be used for search and rescue as well as reconnaissance.',
        images: [{ src: usnavy, alt: "VTOL aircraft concept" }],
      },
      {
        heading: "Los Alamos National Laboratory: Nuclear Security — Oct 23, 2022",
        body: 'Designed "Spy Kids," a spy-bot swarm that detects nuclear radiation and other potential threats.',
        links: [
          {
            label: "Presentation",
            href: "https://www.youtube.com/live/CvsA9LDOP4Q?si=YlQZuKxbPMZqMODZ&t=2978",
          },
        ],
        images: [
          { src: losalamos1, alt: "Los Alamos concept slide one" },
          { src: losalamos2, alt: "Los Alamos concept slide two" },
        ],
      },
      {
        heading: "National Security Agency: Informational Viz — 4th Place — Sep 25, 2022",
        body: 'Designed "Mediator," an extension and app that evaluates the credibility of social media posts through machine learning.',
        links: [
          {
            label: "Presentation",
            href: "https://www.youtube.com/live/jw86T8we1KM?si=aaFxC1TwVsBxEZhG&t=253",
          },
        ],
        images: [
          { src: nsa1, alt: "Mediator project slide" },
          { src: nsa2, alt: "Mediator app screen one" },
          { src: nsa3, alt: "Mediator app screen two" },
        ],
      },
    ],
  },
];
