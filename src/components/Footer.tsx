import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

/**
 * "2026-08-13" -> "Aug 13, 2026", or "" for anything that is not a date —
 * next.config.js hands over an empty string when it cannot reach git. Pinned to
 * UTC so the day cannot slip backwards when the build machine is west of it.
 */
function formatLastUpdated(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function Footer() {
  const lastUpdated = process.env.NEXT_PUBLIC_LAST_UPDATED;
  const lastUpdatedLabel = formatLastUpdated(lastUpdated);

  return (
    <div className="footer">
      <div className="justify-start">
        <div className="footerContent" style={{ cursor: "pointer" }}>
          <Link href="/" aria-label="John Mo home">
            <Image src={siteConfig.logo} alt="jm logo" width={80} height={60} />
          </Link>
        </div>
      </div>

      <div className="text-right">
        <div className="footerContent">
          <p>
            Always down to chat! <br />
            Reach out at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.email}
            </a>{" "}
            or at my{" "}
            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedIn
            </a>{" "}
            :D
            <br />
            Site made with care by John Mo
          </p>
          {lastUpdatedLabel && (
            <time className="footerUpdated" dateTime={lastUpdated}>
              Last updated {lastUpdatedLabel}
            </time>
          )}
        </div>
      </div>
    </div>
  );
}
