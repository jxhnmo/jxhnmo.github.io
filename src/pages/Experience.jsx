import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionTrigger, AccordionContent } from "../components";
import "./Experience.css";

import firstfun from "../assets/work/firstfunlogo.jpeg";
import powerdb from "../assets/work/powerdb.png";
import samsclub from "../assets/work/samsclub.png";
import supersocial from "../assets/work/supersocial_inc_logo.jpeg";
import mercyships from "../assets/work/Mercy_Ships_Logo.jpg";
import unt from "../assets/work/unt.png";

function Experience() {
  return (
    <div id="page-container" className="my-3">
      <h2>Experience</h2>
      <div className="main">
        <div className="row lightContainer">
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue=""
            collapsible
          >
            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <div className="date">2025-Present</div>
                <div className="name">First Fun</div>
                <div className="title">AI Software Engineer</div>
                <div className="location">Santa Clara, California</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">ai's mentor 🤓</div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={firstfun}
                        alt="first fun logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
                <div className="date">2025-2025</div>
                <div className="name">PowerDB</div>
                <div className="title">Software Developer</div>
                <div className="location">College Station, Texas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <li>
                      Built and deployed a dynamic equipment tracking system in
                      C#, WPF (.NET), and SQL Server, automating XML data
                      parsing to accelerate QA reporting by 50%.
                    </li>
                    <li>
                      Increased equipment assigning workflow performance by 10X
                      through refactoring MVVM architecture and optimising data
                      lookups with dictionary-based mappings.
                    </li>
                    <li>
                      Redesigning company website with Framer, React, and CMS
                      integration, enhancing user experience and decreasing
                      customer support inquiries.
                    </li>
                  </div>
                  <div className="right">
                    <div id="logo">
                      <img
                        src={powerdb}
                        alt="powerdb logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-4">
              <AccordionTrigger>
                <div className="date">2023-2024</div>
                <div className="name">Sam's Club</div>
                <div className="title">Tech Product Management Intern</div>
                <div className="location">Bentonville, Arkansas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <li>
                      Prevented $3.6M annual fraud losses (60% reduction)
                      through implementation of data-driven fraud detection
                      rules using SQL and Salesforce.
                    </li>
                    <li>
                      Owned two strategic fraud initiatives; authored PRDs that
                      outlined strategic solutions, user stories, and product
                      roadmap; aligned cross-functional teams; actively
                      unblocked engineering dependencies.
                    </li>
                  </div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={samsclub}
                        alt="samsclub logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <div className="date">2022-2023</div>
                <div className="name">Supersocial</div>
                <div className="title">Game Engineer Intern</div>
                <div className="location">Remote</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    Built the foundation of Supersocial's Fortnite department.
                    <li>
                      Spearheaded a full IP prototype using Unreal Engine
                      (UEFN/Verse) with Agile sprints; led programming, game
                      balancing, playtesting, and documentation.
                    </li>
                    <li>
                      Authored comprehensive technical documentation and
                      onboarding scripts; collaborated with designers and PMs
                      across product lifecycle.
                    </li>
                  </div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={supersocial}
                        alt="supersocial logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>
                <div className="date">2021-2022</div>
                <div className="name">Mercy Ships</div>
                <div className="title">Product Engineering Intern</div>
                <div className="location">Remote</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <li>
                      Built internal full-stack applications automating travel
                      and medical workflows; managed 100+ Jira tickets.
                    </li>
                  </div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={mercyships}
                        alt="mercyships logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                <div className="date">2020-2021</div>
                <div className="name">UNT CNS Lab</div>
                <div className="title">Research Assistant</div>
                <div className="location">Denton, Texas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <li>
                      Engineered Unity XR test environments with C# for
                      psychological research; awarded $4K research grant.
                    </li>
                  </div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={unt}
                        alt="unt logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
}

export default Experience;
