"use client";

import { SocialIcon } from "react-social-icons";
import { socialLinks } from "@/content/links";

export default function LinksPage() {
  const socials = socialLinks.filter((link) => link.category === "social");
  const work = socialLinks.filter((link) => link.category === "work");

  return (
    <div id="page-container" className="my-3">
      <h2>Links</h2>
      <div className="main">
        <div className="row glassCard">
          <div className="parent center">
            <h2 className="linkHead">Socials</h2>
          </div>
          {socials.map((link) => (
            <LinkRow key={link.href} {...link} />
          ))}

          <div className="parent center">
            <h2 className="linkHead">work</h2>
          </div>
          {work.map((link) => (
            <LinkRow key={link.href} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkRow({
  description,
  href,
  label,
}: {
  description: string;
  href: string;
  label: string;
}) {
  return (
    <div className="parent glassRow">
      <div className="child">
        <SocialIcon
          network={
            label.toLowerCase() === "calendly"
              ? "clubhouse"
              : label.toLowerCase()
          }
          url={href}
          target="_blank"
          style={{ width: 30 }}
          fgColor="var(--light)"
          bgColor="var(--dark)"
        />
      </div>
      <div className="child">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="links"
        >
          {label.toLowerCase()}
        </a>
      </div>
      <div className="child filler"></div>
      <div className="child">
        <p className="links">{description}</p>
      </div>
    </div>
  );
}
