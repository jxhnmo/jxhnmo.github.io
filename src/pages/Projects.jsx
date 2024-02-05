import React from "react";
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './Projects.css';

import interviewpro from '../assets/projects/interviewpro.png'
import interviewprodata from '../assets/projects/interviewprodata.png'

function Projects() {
  return (
    <div id="page-container" class="my-3">
      <h2>Projects</h2>
      <div class="main">
        <div class="row lightContainer">

          <Accordion.Root className="AccordionRoot" type="single" defaultValue="" collapsible>
            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                <div class="date">2024</div>
                <div class="name">TAMUhack</div>
                <div class="title">iNterview Pro</div>
              </AccordionTrigger>
              <AccordionContent>
                Won 1st out of 800+<br />
                <a href="https://www.youtube.com/watch?v=9A2LTzXo4qk" target="_blank">Demo Video</a>
                <li>Full stack application to help prepare people for interviews by analyzing speech, emotions, and eye contact, while asking potential interview questions about the role that they are applying for.</li>
                <li>Backend using Pytorch, OpenCV, and SpeechRecognition, built, trained, and fine-tuned 4 ML models for facial recognition, expressions, eye tracking, and speech-to-text.</li>
                <li>Integrated with OpenAI's API for data processing, question generation, and improvement summarisation.</li>
                <li>Frontend model built and animated through Unity, and displayed through React.</li>
                <img src={interviewpro} alt='iNterview Pro' width="100%" height='auto' />
                <img src={interviewprodata} alt='iNterview Pro Data' width="100%" height='auto' />
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>
                <div class="date">2021-2022</div>
                <div class="name">Mercy Ships</div>
                <div class="title">Product Engineering Intern</div>
              </AccordionTrigger>
              <AccordionContent>
                <li>Created and updated automation applications and prototypes with 2 applications in use across global locations.</li>
                <li>Resolved 100+ support tickets for Microsoft 365 and Atlassian Suite.</li>
                <li>Received return offer to continue internship during the school year.</li>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <div class="date">2020-2021</div>
                <div class="name">UNT CNS Lab</div>
                <div class="title">Researcher</div>
              </AccordionTrigger>
              <Accordion.Content className="AccordionContent">
                <div className="AccordionContentText">
                  <li>Built XR environments in Unity with neurogaming techniques to run psychological tests under the guidance of Dr. Thomas D. Parsons and Dr. Timothy (Fred) McMahan.</li>
                  <li>Acquired a $4000 grant.</li>
                </div>
              </Accordion.Content>
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


export default Projects;
