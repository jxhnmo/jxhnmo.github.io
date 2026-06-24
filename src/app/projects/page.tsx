import { AccordionList } from "@/components/AccordionList";
import { ProjectCard } from "@/components/ProjectCard";
import { projectItems } from "@/content/projects";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div id="page-container" className="my-3">
      <h2>Projects</h2>
      <div className="main">
        <div className="row glassCard">
          <AccordionList
            defaultValue="react-portfolio"
            items={projectItems.map((item) => ({
              id: item.id,
              trigger: (
                <ProjectCard.Header
                  group={item.group}
                  title={item.title}
                  year={item.year}
                />
              ),
              content: <ProjectCard item={item} />,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
