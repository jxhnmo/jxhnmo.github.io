"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export type AccordionListItem = {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
};

type AccordionListProps = {
  items: AccordionListItem[];
  defaultValue?: string;
};

export function AccordionList({ items, defaultValue }: AccordionListProps) {
  // Controlled purely so each panel knows whether it is closed, which is what
  // `inert` below needs. Behaviour is otherwise identical to the uncontrolled
  // single/collapsible accordion this replaced.
  const [openId, setOpenId] = useState(defaultValue ?? "");

  return (
    <Accordion.Root
      className="AccordionRoot"
      type="single"
      collapsible
      value={openId}
      onValueChange={setOpenId}
    >
      {items.map((item) => (
        <Accordion.Item className="AccordionItem" value={item.id} key={item.id}>
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              {item.trigger}
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          {/*
            `forceMount` keeps closed panels in the DOM. Radix unmounts them by
            default, which meant none of the experience bullets and only the one
            open project description existed in the exported HTML — /experience
            crawled as ~700 characters of bare headings. Search engines index
            content inside accordions normally, so mounting it is what makes the
            substantive copy on this site indexable at all.

            Radix stops applying `hidden` to force-mounted panels, so `inert`
            restores what that gave us for free: closed content stays out of the
            accessibility tree and its links stay unfocusable. It is preferred
            over `visibility: hidden` because it leaves the slide animation
            intact. The matching `height: 0` lives in globals.css.

            Known and accepted limitation: `inert` needs Chrome 102+ / Safari
            15.5+ / Firefox 112+. Older browsers still render the panel collapsed
            (`height: 0` + `overflow: hidden`) but leave its links tabbable.
            `visibility: hidden` would close that gap in every browser, and was
            rejected on purpose: it is a stronger signal to crawlers that the
            content is hidden, which works against the indexability this
            `forceMount` exists to buy. `inert` is invisible to crawlers.
          */}
          <Accordion.Content
            className="AccordionContent"
            forceMount
            inert={openId !== item.id}
          >
            <div className="AccordionContentText">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
