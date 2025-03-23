import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "./Experience.css";

import powerdb from "../assets/work/powerdb.png";
import samsclub from "../assets/work/samsclub.png";
import supersocial from "../assets/work/supersocial_inc_logo.jpeg";
import mercyships from "../assets/work/Mercy_Ships_Logo.jpg";
import unt from "../assets/work/unt.png";

function Experience() {
  return (
    <div id="page-container" class="my-3">
      <h2>Experience</h2>
      <div class="main">
        <div class="row lightContainer">
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue=""
            collapsible
          >
            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
                <div class="date">2025-Present</div>
                <div class="name">PowerDB</div>
                <div class="title">Software Developer</div>
                <div class="location">College Station, Texas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">Part time developer</div>

                  <div class="right">
                    <th id="logo">
                      <img
                        src={powerdb}
                        alt="powerdb logo"
                        width="100%"
                        height="auto"
                      />
                    </th>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-4">
              <AccordionTrigger>
                <div class="date">2023-2024</div>
                <div class="name">Sam's Club</div>
                <div class="title">Tech Product Management Intern</div>
                <div class="location">Bentonville, Arkansas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">
                    <li>
                      Reduced online agent collusion fraud by 60%, preventing
                      $3.6M in annualised estimated fraud losses by developing
                      and implementing data-driven rules
                    </li>
                    <br />
                    <li>
                      Owned two initiatives targeting online and in-club
                      associate fraud; authored PRDs that outlined strategic
                      solutions, user stories, and product roadmap; aligned
                      cross-functional teams; actively unblocked engineering
                      dependencies
                    </li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img
                        src={samsclub}
                        alt="samsclub logo"
                        width="100%"
                        height="auto"
                      />
                    </th>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <div class="date">2022-2023</div>
                <div class="name">Supersocial</div>
                <div class="title">Game Engineer Intern</div>
                <div class="location">Remote</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">
                    Built the foundation of Supersocial's Fortnite department.
                    <li>
                      Designed and developed a fully-fledged brand IP prototype
                      using UEFN/Verse and Agile methodology, leading game
                      design, programming, balance adjustments, and playtests
                    </li>
                    <br />
                    <li>
                      Authored a comprehensive technical documentation tree with
                      50+ Verse scripts/tutorials
                    </li>
                    <br />
                    <li>
                      Presented prototypes and documentation at company
                      all-hands and answered ad-hoc questions from PMs and
                      designers
                    </li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img
                        src={supersocial}
                        alt="supersocial logo"
                        width="100%"
                        height="auto"
                      />
                    </th>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>
                <div class="date">2021-2022</div>
                <div class="name">Mercy Ships</div>
                <div class="title">Product Engineering Intern</div>
                <div class="location">Remote</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">
                    <li>
                      Built full-stack applications that automated travel
                      applications for housing, flight, medical, and managerial
                      checks, and more, increasing global operational efficiency
                    </li>
                    <br />
                    <li>
                      Resolved 100+ support tickets for Microsoft 365 and
                      Atlassian Suite, ensuring seamless technical operations
                    </li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img
                        src={mercyships}
                        alt="mercyships logo"
                        width="100%"
                        height="auto"
                      />
                    </th>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                <div class="date">2020-2021</div>
                <div class="name">UNT CNS Lab</div>
                <div class="title">Research Assistant</div>
                <div class="location">Denton, Texas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">
                    <li>
                      Secured a $4000 grant and developed XR environments in
                      Unity, implementing C# scripts for psychological testing
                    </li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img
                        src={unt}
                        alt="unt logo"
                        width="100%"
                        height="auto"
                      />
                    </th>
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

export default Experience;
