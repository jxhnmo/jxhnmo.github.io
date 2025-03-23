import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "./Projects.css";

// dj bestie
import djbestie from "../assets/projects/djbestie.jpg";
import djbestieteam from "../assets/projects/djbestieteam.jpg";

// dream boy
import fn1 from "../assets/projects/fn1.jpg";

// interview pro pix
import interviewpro from "../assets/projects/interviewpro.png";
import interviewprodata from "../assets/projects/interviewprodata.png";
import facial from "../assets/projects/facial.png";

//personal site pix
import personalsite1 from "../assets/projects/personalsite1.png";
import personalsite2 from "../assets/projects/personalsite2.png";

//this website pix
import thiswebsite from "../assets/projects/personalsite.png";

//aa pix
import aadata from "../assets/projects/aadata.png";

//aggies invent pix
import sandia from "../assets/projects/sandia.png";
import losalamos1 from "../assets/projects/losalamos1.png";
import losalamos2 from "../assets/projects/losalamos2.png";
import nsa1 from "../assets/projects/nsa1.png";
import nsa2 from "../assets/projects/nsa2.png";
import nsa3 from "../assets/projects/nsa3.png";
import usnavy from "../assets/projects/usnavy.png";

function Projects() {
  return (
    <div id="page-container" class="my-3">
      <h2>Projects</h2>
      <div class="main">
        <div class="row lightContainer">
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue="item-4"
            collapsible
          >
            <Accordion.Item className="AccordionItem" value="item-8">
              <AccordionTrigger>
                <div class="date">2025</div>
                <div class="name">TAMUhack 2025</div>
                <div class="title">DJ Bestie</div>
              </AccordionTrigger>
              <AccordionContent>
                Won 3rd out of 700+
                <br />
                Check out the{" "}
                <a
                  href="https://youtu.be/uXpFiFYlSw4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo Video
                </a>{" "}
                and{" "}
                <a
                  href="https://devpost.com/software/dj-bestie"
                  target="_blank"
                  rel="noreferrer"
                >
                  DevPost!
                </a>
                <br />
                <li>
                  Developed an AI-powered interactive DJ app that personalises
                  music curation based on computer vision, generative AI
                  conversational topics, and real-time music APIs.
                </li>
                <br />
                <li>
                  Built the frontend using React and Next.js, enabling a dynamic
                  and responsive user experience.
                </li>
                <br />
                <th id="border">
                  <img
                    src={djbestie}
                    alt="DJ Bestie"
                    width="50%"
                    height="auto"
                  />
                  <img
                    src={djbestieteam}
                    alt="DJ Bestie Team"
                    width="50%"
                    height="auto"
                  />
                </th>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-7">
              <AccordionTrigger>
                <div class="date">2023-2024</div>
                <div class="name">Dream Boy Games</div>
                <div class="title">Game Studio Startup</div>
              </AccordionTrigger>
              <AccordionContent>
                Built an incubation game studio on Fortnite achieving 500+ CCU
                and 11,000+ plays.
                <br />
                <th id="border">
                  <img
                    src={fn1}
                    alt="fn1"
                    width="50%"
                    height="auto"
                    class="center"
                  />
                </th>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <div class="date">2024</div>
                <div class="name">TAMUhack 2024</div>
                <div class="title">iNterview Pro</div>
              </AccordionTrigger>
              <AccordionContent>
                Won 1st out of 800+
                <br />
                Check out the{" "}
                <a
                  href="https://www.youtube.com/watch?v=9A2LTzXo4qk"
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo Video
                </a>{" "}
                and{" "}
                <a
                  href="https://devpost.com/software/interview-pro-igtp3z"
                  target="_blank"
                  rel="noreferrer"
                >
                  DevPost!
                </a>
                <br />
                <li>
                  Full stack application to help prepare people for interviews
                  by analyzing speech, emotions, and eye contact, while asking
                  potential interview questions about the role that they are
                  applying for.
                </li>
                <br />
                <li>
                  Backend using Pytorch, OpenCV, and SpeechRecognition, built,
                  trained, and fine-tuned 4 ML models for facial recognition,
                  expressions, eye tracking, and speech-to-text.
                </li>
                <br />
                <li>
                  Integrated with OpenAI's API for data processing, question
                  generation, and improvement summarisation.
                </li>
                <br />
                <li>
                  Frontend model built and animated through Unity, and displayed
                  through React.
                </li>
                <br />
                <th id="border">
                  <img
                    src={interviewpro}
                    alt="iNterview Pro"
                    width="33%"
                    height="auto"
                  />
                  <img
                    src={interviewprodata}
                    alt="iNterview Pro Data"
                    width="33%"
                    height="auto"
                  />
                  <img src={facial} alt="Facial" width="33%" height="auto" />
                </th>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
                <div class="date">2024</div>
                <div class="name">Programming Studio</div>
                <div class="title">Personal Website (HTML/CSS)</div>
              </AccordionTrigger>
              <AccordionContent>
                Website with two different styles through CSS manipulation with
                no JS Libraries.
                <br />
                Check out the{" "}
                <a
                  href="https://people.tamu.edu/~johnmo/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Site!
                </a>
                <br />
                <th id="border">
                  <img
                    src={personalsite1}
                    alt="personalsite1"
                    width="50%"
                    height="auto"
                  />
                  <img
                    src={personalsite2}
                    alt="personalsite2"
                    width="50%"
                    height="auto"
                  />
                </th>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-4">
              <AccordionTrigger>
                <div class="date">2023</div>
                <div class="name">Personal Website</div>
                <div class="title">React</div>
              </AccordionTrigger>
              <Accordion.Content className="AccordionContent">
                <div className="AccordionContentText">
                  The website you are currently on! Built with React and
                  Radix-UI. <br />
                  <th id="border">
                    <img
                      src={thiswebsite}
                      alt="thissite"
                      width="50%"
                      height="auto"
                      class="center"
                    />
                  </th>
                  I am still frequently updating the website with new features
                  based on user testing and feedback!
                  <br />
                  Here are some cool updates:
                  <br />
                  <br />
                  <ul>
                    <li>
                      <b>Design Process + Auto Open Tab</b>
                      <br />
                      When you landed here, you probably noticed this tab popped
                      open right away. That's on purpose! I picked up some great
                      insights from a talk by a Google UX Designer, who
                      highlighted the importance of showing not just what a
                      website offers, but also the thinking behind its features.
                      Initially, I thought about creating a separate page to
                      share these thoughts, but then it struck me - why not make
                      it immediately visible? Easier for you to find and keeps
                      the site looking neat!
                    </li>
                    <br />
                    <li>
                      <b>Interactive Navigation Buttons</b>
                      <br />
                      Turns out, not everyone is a fan of traditional navigation
                      bars (who knew, right?). So, I spiced things up with some
                      fun, interactive buttons that you'll find on our homepage
                      and about page. They're designed to make your experience
                      not just smoother but more satisfying.
                    </li>
                    <br />
                    <li>
                      <b>Light Mode Toggle</b>
                      <br />I started off with a dark theme because, honestly, I
                      just love how it looks. But, hey, it's not for everyone!
                      So, I added a light mode toggle. Now, you can switch it up
                      anytime you like, making the site more accessible and
                      comfortable for all eyes.
                    </li>
                    <br />
                    <li>
                      <b>Accordion</b>
                      <br />
                      I've also put in an accordion layout on the projects and
                      experience pages. It's a sleek way to pack in information
                      without overwhelming you. Just click and expand the
                      section you're interested in!
                    </li>
                    <br />
                  </ul>
                  Design inspiration sources!
                  <br />
                  <li>
                    <a
                      href="https://vishwas-saini-portfolio.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://vishwas-saini-portfolio.vercel.app/
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.rubens.design/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.rubens.design/
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://caseypei.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://caseypei.me/
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://lukeypookster.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://lukeypookster.com/
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://webflow.com/made-in-webflow/website/COLIN-MOY"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://webflow.com/made-in-webflow/website/COLIN-MOY
                    </a>
                  </li>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <div class="date">2023</div>
                <div class="name">TAMU Datathon</div>
                <div class="title">Skribblio Demon</div>
              </AccordionTrigger>
              <Accordion.Content className="AccordionContent">
                <div className="AccordionContentText">
                  Placed 4th out of 50+
                  <br />
                  Check out the{" "}
                  <a
                    href="https://devpost.com/software/skribblio-demon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    DevPost!
                  </a>
                  <li>
                    Built, trained, and tested a convolutional neural network
                    with TensorFlow and Keras off of Google's "Quick, Draw!"
                    dataset as well as TAMU Datathon's custom classes to predict
                    and classify drawings based on strokes.
                  </li>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>
                <div class="date">2023</div>
                <div class="name">American Airlines</div>
                <div class="title">Mini-Hack</div>
              </AccordionTrigger>
              <Accordion.Content className="AccordionContent">
                <div className="AccordionContentText">
                  Built, trained, and tested an ML model from 200,000 data
                  points provided by AA that classifies passengers as leisure or
                  business and presented the data and a plan to optimise profit
                  margins.
                  <br />
                  Check out the{" "}
                  <a
                    href="https://github.com/jxhnmo/american-airlines-challenge"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub!
                  </a>{" "}
                  <br />
                  <th id="border">
                    <img
                      src={aadata}
                      alt="aadata"
                      width="50%"
                      height="auto"
                      class="center"
                    />
                  </th>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                <div class="date">2022 - 2023</div>
                <div class="name">Aggies Invent</div>
                <div class="title">Pitch Competitions</div>
              </AccordionTrigger>
              <Accordion.Content className="AccordionContent">
                <div className="AccordionContentText">
                  Pitch competition to solve problem statements from industry
                  partners.
                  <br />
                  These competitions allow me to work with a diverse team to
                  solve real-world problems and practice presenting to industry
                  professionals. I have led each team and worked on concepts and
                  design, as well as the video filming and editing.
                  <br />
                  <br />
                  Sandia National Labs: AI/ML <br />
                  Sep 12, 2023
                  <br />
                  Designed "ScanX", a deep learning software that identifies
                  illicit contraband in x-ray content and extrapolates
                  individual items into an easy-to-understand grid.
                  <br />
                  Check out the{" "}
                  <a
                    href="https://youtu.be/hA0vzJ25pFo?si=1yFTgo1Im6vkVnnc&t=6836"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Presentation!
                  </a>
                  <br />
                  <th id="border">
                    <img src={sandia} alt="sandia" width="100%" height="auto" />
                  </th>
                  <br />
                  <br />
                  Sandia National Labs: AI/ML <br />
                  3rd Place
                  <br />
                  Apr 16, 2023
                  <br />
                  Designed "VTOLtally Awesome", a long-endurance VTOL capable
                  aircraft that could be used for search and rescue, as well as
                  reconnaissance.
                  <br />
                  <th id="border">
                    <img
                      src={usnavy}
                      alt="usnavy"
                      width="50%"
                      height="auto"
                      class="center"
                    />
                  </th>
                  <br />
                  <br />
                  Los Alamos National Laboratory: Nuclear Security <br />
                  Oct 23, 2022
                  <br />
                  Designed “Spy Kids” a spy bot swarm that detects nuclear
                  radiation and other potential threats.
                  <br />
                  Check out the{" "}
                  <a
                    href="https://www.youtube.com/live/CvsA9LDOP4Q?si=YlQZuKxbPMZqMODZ&t=2978"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Presentation!
                  </a>
                  <br />
                  <th id="border">
                    <img
                      src={losalamos1}
                      alt="losalamos1"
                      width="50%"
                      height="auto"
                    />
                    <img
                      src={losalamos2}
                      alt="losalamos2"
                      width="50%"
                      height="auto"
                    />
                  </th>
                  <br />
                  <br />
                  National Security Agency: Informational Viz <br />
                  4th Place
                  <br />
                  Sep 25, 2022
                  <br />
                  Designed "Mediator", an extension and app that evaluates the
                  credibility of social media posts through machine learning.
                  <br />
                  Check out the{" "}
                  <a
                    href="https://www.youtube.com/live/jw86T8we1KM?si=aaFxC1TwVsBxEZhG&t=253"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Presentation!
                  </a>
                  <br />
                  <th id="border">
                    <img src={nsa1} alt="nsa1" width="50%" height="auto" />
                    <img src={nsa2} alt="nsa2" width="25%" height="auto" />
                    <img src={nsa3} alt="nsa3" width="25%" height="auto" />
                  </th>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
}

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export default Projects;
