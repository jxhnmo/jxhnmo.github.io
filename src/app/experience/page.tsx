import { AccordionList } from "@/components/AccordionList";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experienceItems } from "@/content/experience";
import { buildMetadata } from "@/content/seo";

export const metadata = buildMetadata("/experience");

export default function ExperiencePage() {
  return (
    <main id="page-container" className="my-3">
      <h1 className="pageTitle">Experience</h1>
      <div className="pageColumn">
        <AccordionList
          items={experienceItems.map((item) => ({
            id: item.id,
            trigger: (
              <ExperienceCard.Header
                company={item.company}
                location={item.location}
                note={item.note}
                period={item.period}
                role={item.role}
              />
            ),
            content: <ExperienceCard item={item} />,
          }))}
        />
      </div>
    </main>
  );
}
