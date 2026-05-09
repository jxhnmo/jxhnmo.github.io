import Image from "next/image";
import type { ProjectItem } from "@/content/types";

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <>
      {item.summary}
      {item.links?.length ? (
        <>
          {" "}
          {item.links.map((link, index) => (
            <span key={link.href}>
              {index === 0 ? "Check out the " : " and "}
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
              {index === item.links!.length - 1 ? "!" : ""}
            </span>
          ))}
        </>
      ) : null}
      {item.bullets?.length ? (
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.images?.length ? (
        <div className="imageBorder">
          {item.images.map((image) => (
            <Image
              key={`${image.alt}-${image.src.src}`}
              src={image.src}
              alt={image.alt}
              width={image.src.width}
              height={image.src.height}
              style={{
                width: item.images!.length > 2 ? "33%" : "50%",
                height: "auto",
              }}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function Header({
  group,
  title,
  year,
}: Pick<ProjectItem, "group" | "title" | "year">) {
  return (
    <>
      <div className="date">{year}</div>
      <div className="name">{group}</div>
      <div className="title">{title}</div>
    </>
  );
}

ProjectCard.Header = Header;

export { ProjectCard };
