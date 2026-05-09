"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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
  return (
    <Accordion.Root
      className="AccordionRoot"
      type="single"
      collapsible
      defaultValue={defaultValue ?? ""}
    >
      {items.map((item) => (
        <Accordion.Item className="AccordionItem" value={item.id} key={item.id}>
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              {item.trigger}
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            <div className="AccordionContentText">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
