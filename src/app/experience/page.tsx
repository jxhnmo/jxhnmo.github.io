import { AccordionList } from "@/components/AccordionList";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experienceItems } from "@/content/experience";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div id="page-container" className="my-3">
      <h2>Experience</h2>
      <div className="main">
        <div className="row lightContainer">
          <AccordionList
            items={experienceItems.map((item) => ({
              id: item.id,
              trigger: (
                <ExperienceCard.Header
                  company={item.company}
                  location={item.location}
                  period={item.period}
                  role={item.role}
                />
              ),
              content: <ExperienceCard item={item} />,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
