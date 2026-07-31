import { socialLinks } from "@/content/links";
import { buildMetadata } from "@/content/seo";
import { socialIconPaths } from "@/components/socialIconPaths";

// Dropping react-social-icons (a client component) let this page go back to
// static server rendering, so it can export metadata again — it previously
// shipped the generic site title and description.
export const metadata = buildMetadata("/links");

export default function LinksPage() {
  const socials = socialLinks.filter((link) => link.category === "social");
  const work = socialLinks.filter((link) => link.category === "work");

  return (
    <main id="page-container" className="my-3">
      <h1 className="pageTitle">Links</h1>
      <div className="pageColumn">
        <div className="parent center">
          <h2 className="linkHead">work</h2>
        </div>
        {work.map((link) => (
          <LinkRow key={link.href} {...link} />
        ))}

        <div className="parent center">
          <h2 className="linkHead">Socials</h2>
        </div>
        {socials.map((link) => (
          <LinkRow key={link.href} {...link} />
        ))}
      </div>
    </main>
  );
}

/**
 * Reproduces react-social-icons' exact two-layer markup so these render
 * pixel-identically to the dependency they replaced.
 *
 * Layer one draws a clockwise square plus the glyph path, layer two draws the
 * glyph path alone; the glyphs carry their own counter-wound square, so the two
 * cancel and the layers resolve to "glyph" over "disc minus glyph".
 *
 * `fill-rule: evenodd` is required, not cosmetic: Instagram's glyph is wound
 * such that it renders as a blank disc under the default nonzero rule. All seven
 * icons were checked under both rules — evenodd is correct for every one.
 *
 * `border-radius` is what turns the square into a circle, as before.
 */
function SocialGlyph({ label }: { label: string }) {
  const path = socialIconPaths[label.toLowerCase()];
  if (!path) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 64 64"
      width={30}
      height={30}
      style={{ borderRadius: "50%", display: "block" }}
      aria-hidden="true"
    >
      <path d={`M0,0H64V64H0Z${path}`} fillRule="evenodd" fill="var(--light)" />
      <path d={path} fillRule="evenodd" fill="var(--dark)" />
    </svg>
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <SocialGlyph label={label} />
        </a>
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
