import { AccordionList } from "@/components/AccordionList";
import { ProjectCard } from "@/components/ProjectCard";
import { projectItems } from "@/content/projects";
import { buildMetadata } from "@/content/seo";

export const metadata = buildMetadata("/projects");

export default function ProjectsPage() {
  return (
    <main id="page-container" className="my-3">
      <h1 className="pageTitle">Projects</h1>
      <div className="pageColumn">
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
    </main>
  );
}
