import React from "react";
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './Experience.css';


import supersocial from '../assets/work/supersocial_inc_logo.jpeg'
import mercyships from '../assets/work/Mercy_Ships_Logo.jpg'
import unt from '../assets/work/unt.png'

function Experience() {
  return (
    <div id="page-container" class="my-3">
      <h2>Experience</h2>
      <div class="main">
        <div class="row lightContainer">

          <Accordion.Root className="AccordionRoot" type="single" defaultValue="" collapsible>
            <Accordion.Item className="AccordionItem" value="item-1">
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
                    <li>Created a fully-fledged brand IP prototype using UEFN/Verse and Agile methodology, handling game design, programming, balance adjustments, and arranging playtests</li><br />
                    <li>Authored entire technical documentation tree on Fortnite/UEFN/Verse with 50+ Verse scripts/functionality tutorials.</li><br />
                    <li>Presented prototypes and documentation at company all-hands and answered ad-hoc questions from PMs and designers.</li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img src={supersocial} alt='supersocial logo' width="100%" height='auto' />
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
                    <li>Built full-stack applications that automated travel applications for housing, flight, medical, and managerial checks, and more, increasing global operational efficiency.</li><br />
                    <li>Resolved 100+ support tickets for Microsoft 365 and Atlassian Suite.</li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img src={mercyships} alt='mercyships logo' width="100%" height='auto' />
                    </th>
                  </div>
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <div class="date">2020-2021</div>
                <div class="name">UNT CNS Lab</div>
                <div class="title">Researcher</div>
                <div class="location">Denton, Texas</div>
              </AccordionTrigger>
              <AccordionContent>
                <div class="companyContainer">
                  <div class="left">
                    <li>Built XR environments in Unity and wrote C# scripts to run psychological tests under the guidance of Dr. Thomas D. Parsons and Dr. Timothy (Fred) McMahan.</li><br />
                    <li>Acquired a $4000 grant.</li>
                  </div>

                  <div class="right">
                    <th id="logo">
                      <img src={unt} alt='unt logo' width="100%" height='auto' />
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

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));


export default Experience;
