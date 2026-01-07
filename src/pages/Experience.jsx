import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionTrigger, AccordionContent } from "../components";
import "./Experience.css";

import firstfun from "../assets/work/firstfunlogo.jpeg";
import morsl from "../assets/work/morsl.png";
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
            <Accordion.Item className="AccordionItem" value="item-7">
              <AccordionTrigger>
                <div className="date">2025-Present</div>
                <div className="name">Morsl</div>
                <div className="title">Founder</div>
                <div className="location">Remote</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">ring ring</div>

                  <div className="right">
                    <div id="logo">
                      <img
                        src={morsl}
                        alt="morsl logo"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <div className="date">2025-2025</div>
                <div className="name">First Fun</div>
                <div className="title">AI Software Engineer</div>
                <div className="location">Santa Clara, CA</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <ul>
                      <li>
                        Founding engineer led AI tool development, game production,
                        and sprint execution for the U.S. team.
                      </li>
                      <li>
                        Prototyped a 0 to 1 automated mobile game QA system using
                        multilayer ML and computer vision, reducing manual QA effort
                        and enabling faster iteration cycles.
                      </li>
                      <li>
                        Designed and built an end-to-end AIGC ad pipeline that
                        ingests Meta Ads data, generates scripts, and produces video
                        creatives, achieving &gt;20% lower CPI.
                      </li>
                    </ul>
                  </div>

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
                <div className="location">College Station, TX</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <ul>
                      <li>
                        Built and deployed a dynamic equipment tracking system in
                        C#, WPF (.NET), and SQL Server, automating XML data
                        parsing to accelerate QA reporting by 50%.
                      </li>
                      <li>
                        Increased equipment assignment workflow performance by 10X
                        through refactoring MVVM architecture and optimising data
                        lookups with dictionary-based mappings.
                      </li>
                      <li>
                        Redesigned company website with Framer, React, and CMS
                        integration, enhancing user experience and decreasing
                        customer support inquiries.
                      </li>
                    </ul>
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
                <div className="title">Product Manager Intern</div>
                <div className="location">Bentonville, AR</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <ul>
                      <li>
                        Owned two fraud initiatives that prevented $3.6MM annual
                        fraud losses (60% reduction) through implementation of
                        data-driven fraud detection rules using SQL and Salesforce.
                      </li>
                      <li>
                        Authored PRDs defining user stories and roadmap; aligned
                        cross-functional teams and unblocked dependencies.
                      </li>
                    </ul>
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
                <div className="title">Game Developer Intern</div>
                <div className="location">Los Angeles, CA</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <ul>
                      <li>
                        Spearheaded a full IP prototype using Unreal Engine
                        (UEFN/Verse) with Agile sprints
                      </li>
                      <li>
                        Led programming, game balancing, playtesting, and
                        documentation.
                      </li>
                    </ul>
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
                    <ul>
                      <li>
                        Built internal full-stack applications automating travel
                        and medical workflows; managed 100+ Jira tickets.
                      </li>
                    </ul>
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
                <div className="location">Denton, TX</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="companyContainer">
                  <div className="left">
                    <ul>
                      <li>
                        Engineered Unity XR test environments with C# for
                        psychological research; awarded $4K research grant.
                      </li>
                    </ul>
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
