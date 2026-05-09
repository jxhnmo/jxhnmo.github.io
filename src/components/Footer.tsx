import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
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
        </div>
      </div>
    </div>
  );
}
