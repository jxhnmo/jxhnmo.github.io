import Image from "next/image";
import type { ExperienceItem } from "@/content/types";

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="companyContainer">
      <div className="left">
        {item.summary ? <p>{item.summary}</p> : null}
        {item.bullets.length ? (
          <ul>
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="right">
        <div className="logoFrame">
          <Image src={item.logo.src} alt={item.logo.alt} />
        </div>
      </div>
    </div>
  );
}

function Header({
  company,
  location,
  note,
  period,
  role,
}: Pick<ExperienceItem, "company" | "location" | "note" | "period" | "role">) {
  return (
    <>
      <div className="date">{period}</div>
      <div className="name">{company}</div>
      <div className="title">
        {role}
        {note ? <span className="roleNote">{note}</span> : null}
      </div>
      <div className="location">{location}</div>
    </>
  );
}

ExperienceCard.Header = Header;

export { ExperienceCard };
