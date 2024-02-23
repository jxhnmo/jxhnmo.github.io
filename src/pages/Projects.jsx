import React from "react";
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './Projects.css';

// interview pro pix
import interviewpro from '../assets/projects/interviewpro.png'
import interviewprodata from '../assets/projects/interviewprodata.png'
import facial from '../assets/projects/facial.png'

//personal site pix
import personalsite1 from '../assets/projects/personalsite1.png'
import personalsite2 from '../assets/projects/personalsite2.png'

//this website pix
import thiswebsite from '../assets/projects/personalsite.png'

//aa pix
import aadata from '../assets/projects/aadata.png'

//aggies invent pix
import sandia from '../assets/projects/sandia.png'
import losalamos1 from '../assets/projects/losalamos1.png'
import losalamos2 from '../assets/projects/losalamos2.png'
import nsa1 from '../assets/projects/nsa1.png'
import nsa2 from '../assets/projects/nsa2.png'
import nsa3 from '../assets/projects/nsa3.png'
import usnavy from '../assets/projects/usnavy.png'

function Projects() {
  return (
    <div id="page-container" class="my-3">
      <h2>Projects</h2>
      <div class="main">
        <div class="row lightContainer">

          <Accordion.Root className="AccordionRoot" type="single" defaultValue="" collapsible>
            <Accordion.Item className="AccordionItem" value="item-7">
              <AccordionTrigger>
                <div class="date">2023-Present</div>
                <div class="name">Dream Boy Games</div>
                <div class="title">Game Studio Startup</div>
              </AccordionTrigger>
              <AccordionContent>
                <li>500+ CCU with 11,000+ plays incubation game studio built on Fortnite with my Supersocial manager.</li>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <div class="date">2024</div>
                <div class="name">TAMUhack</div>
                <div class="title">iNterview Pro</div>
              </AccordionTrigger>
              <AccordionContent>
                Won 1st out of 800+<br />
                Check out the <a href="https://www.youtube.com/watch?v=9A2LTzXo4qk" target="_blank" rel="noreferrer">Demo Video</a> and <a href="https://devpost.com/software/interview-pro-igtp3z" target="_blank" rel="noreferrer">DevPost!</a>
                <li>Full stack application to help prepare people for interviews by analyzing speech, emotions, and eye contact, while asking potential interview questions about the role that they are applying for.</li>
                <li>Backend using Pytorch, OpenCV, and SpeechRecognition, built, trained, and fine-tuned 4 ML models for facial recognition, expressions, eye tracking, and speech-to-text.</li>
                <li>Integrated with OpenAI's API for data processing, question generation, and improvement summarisation.</li>
                <li>Frontend model built and animated through Unity, and displayed through React.</li>
                <img src={interviewpro} alt='iNterview Pro' width="33%" height='auto' />
                <img src={interviewprodata} alt='iNterview Pro Data' width="33%" height='auto' />
                <img src={facial} alt='Facial' width="33%" height='auto' />
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
                <div class="date">2024</div>
                <div class="name">Programming Studio</div>
                <div class="title">Personal Website (HTML/CSS)</div>
              </AccordionTrigger>
              <AccordionContent>
                Website with two different styles through CSS manipulation with no JS Libraries.<br />
                Check out the <a href="https://people.tamu.edu/~johnmo/index.html" target="_blank" rel="noreferrer">Site!</a><br />
                <img src={personalsite1} alt='personalsite1' width="50%" height='auto' />
                <img src={personalsite2} alt='personalsite2' width="50%" height='auto' />
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
                  The website you are currently on! Built with React and Radix-UI.<br />
                  <img src={thiswebsite} alt='thissite' width="100%" height='auto' />
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
                  Placed 4th out of 50+<br />
                  Check out the <a href="https://devpost.com/software/skribblio-demon" target="_blank" rel="noreferrer">DevPost!</a>
                  <li>Built, trained, and tested a convolutional neural network with TensorFlow and Keras off of Google's "Quick, Draw!" dataset as well as TAMU Datathon's custom classes to predict and classify drawings based on strokes.</li>
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
                  Built, trained, and tested an ML model from 200,000 data points provided by AA that classifies passengers as leisure or business and presented the data and a plan to optimise profit margins.<br />
                  Check out the <a href="https://github.com/jxhnmo/american-airlines-challenge" target="_blank" rel="noreferrer">GitHub!</a>

                  <img src={aadata} alt='aadata' width="100%" height='auto' />
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
                  Pitch competition to solve problem statements from industry partners.<br />
                  These competitions allow me to work with a diverse team to solve real-world problems and practice presenting to industry professionals. I have lead each team and worked on concepts and design, as well as the video filming and editing.
                  <br /><br />

                  Sandia National Labs: AI/ML <br />
                  Sep 12, 2023<br />
                  Designed "ScanX", a deep learning software that identifies illicit contraband in x-ray content and extrapolates individual items into an easy-to-understand grid.<br />
                  Check out the <a href="https://youtu.be/hA0vzJ25pFo?si=1yFTgo1Im6vkVnnc&t=6836" target="_blank" rel="noreferrer">Presentation!</a><br />
                  <img src={sandia} alt='sandia' width="100%" height='auto' />
                  <br />
                  <br />

                  Sandia National Labs: AI/ML <br />
                  3rd Place<br />
                  Apr 16, 2023<br />
                  Designed "VTOLtally Awesome", a long-endurance VTOL capable aircraft that could be used for search and rescue, as well as reconnaissance.<br />
                  <img src={usnavy} alt='usnavy' width="100%" height='auto' />
                  <br />
                  <br />

                  Los Alamos National Laboratory: Nuclear Security <br />
                  Oct 23, 2022<br />
                  Designed “Spy Kids” a spy bot swarm that detects nuclear radiation and other potential threats.<br />
                  Check out the <a href="https://www.youtube.com/live/CvsA9LDOP4Q?si=YlQZuKxbPMZqMODZ&t=2978" target="_blank" rel="noreferrer">Presentation!</a><br />
                  <img src={losalamos1} alt='losalamos1' width="50%" height='auto' />
                  <img src={losalamos2} alt='losalamos2' width="50%" height='auto' />
                  <br />
                  <br />

                  National Security Agency: Informational Viz <br />
                  4th Place<br />
                  Sep 25, 2022<br />
                  Designed "Mediator", an extension and app that evaluates the credibility of social media posts through machine learning.<br />
                  Check out the <a href="https://www.youtube.com/live/jw86T8we1KM?si=aaFxC1TwVsBxEZhG&t=253" target="_blank" rel="noreferrer">Presentation!</a><br />
                  <img src={nsa1} alt='nsa1' width="50%" height='auto' />
                  <img src={nsa2} alt='nsa2' width="25%" height='auto' />
                  <img src={nsa3} alt='nsa3' width="25%" height='auto' />
                </div>
              </Accordion.Content>
            </Accordion.Item>


          </Accordion.Root>


        </div>
      </div>
    </div >
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
