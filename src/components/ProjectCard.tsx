import Image from "next/image";
import type { ContentImage, ContentLink, ProjectItem } from "@/content/types";

function LinkRun({ links }: { links: ContentLink[] }) {
  return (
    <>
      {" "}
      {links.map((link, index) => (
        <span key={link.href}>
          {index === 0 ? "Check out the " : " and "}
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
          {index === links.length - 1 ? "!" : ""}
        </span>
      ))}
    </>
  );
}

// Keep the `gap` in sync with `.imageBorder { gap }` in globals.css.
const IMAGE_ROW_GAP_REM = 1;

function ImageRow({ images }: { images: ContentImage[] }) {
  const count = images.length;
  const perRow = count > 2 ? 3 : count;
  // Each image gives up its share of the row's total gap so a full row still
  // fits on one line (e.g. two 50% images + a 1rem gap would otherwise wrap).
  const gapShareRem = ((perRow - 1) / perRow) * IMAGE_ROW_GAP_REM;
  const width =
    count > 1
      ? `calc(${(100 / perRow).toFixed(4)}% - ${gapShareRem.toFixed(4)}rem)`
      : "50%";

  return (
    <div className="imageBorder">
      {images.map((image) => (
        <Image
          key={`${image.alt}-${image.src.src}`}
          src={image.src}
          alt={image.alt}
          width={image.src.width}
          height={image.src.height}
          style={{ width, height: "auto" }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <>
      {item.summary}
      {item.links?.length ? <LinkRun links={item.links} /> : null}
      {item.bullets?.length ? (
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.intro ? (
        <>
          <br />
          {item.intro}
        </>
      ) : null}
      {item.sections?.length ? (
        <>
          {item.sectionsHeading ? <p>{item.sectionsHeading}</p> : null}
          <ul>
            {item.sections.map((section) => (
              <li key={section.heading}>
                <b>{section.heading}</b>
                <br />
                {section.body}
                {section.links?.length ? <LinkRun links={section.links} /> : null}
                {section.images?.length ? (
                  <ImageRow images={section.images} />
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {item.resources?.length ? (
        <>
          {item.resourcesHeading ? <p>{item.resourcesHeading}</p> : null}
          <ul>
            {item.resources.map((resource) => (
              <li key={resource.href}>
                <a href={resource.href} target="_blank" rel="noreferrer">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {item.images?.length ? <ImageRow images={item.images} /> : null}
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
