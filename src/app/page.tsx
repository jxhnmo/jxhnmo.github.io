import Link from "next/link";
import { TypewriterText } from "@/components/TypewriterText";
import { siteConfig } from "@/content/site";

export default function HomePage() {
  return (
    <main
      id="page-container"
      className="homeHeroPage"
    >
      <section className="homeHero" aria-labelledby="home-hero-title">
        <div className="homeHeroCopy">
          <h1 id="home-hero-title" className="homeHeroTitle">
            <span className="homeHeroGreeting">
              <span className="homeHeroGreetingWord">
                <TypewriterText
                  breakLines={false}
                  cursor={false}
                  nextStringDelay={1200}
                  loopDelay={250}
                  speed={500}
                  strings={["Hi,", "你好,", "안녕,", "Hai,", "Ciao,", "!اهلا,"]}
                />
              </span>
            </span>
            <span>it&apos;s John Mo</span>
          </h1>

          <p className="homeHeroIntro">
            Welcome to my site! I&apos;m John, a recent CS grad with a passion
            for gaming, food, and startups.
          </p>

          <p className="homeHeroStatus">
            <span className="homeHeroStatusAccent" aria-hidden="true" />
            <span className="homeHeroStatusText">
              You can catch me{" "}
              <TypewriterText
                breakLines
                cursorChar="|"
                loopDelay={[0, 1000]}
                cursorSpeed={1000}
                speed={50}
                strings={[
                  "putting in the work 👨‍💻",
                  "exploring virtual worlds 👾",
                  "discovering bay area 🌉",
                  "reviewing restaurants on beli 😋",
                  "hanging out with friends 👋",
                  "getting steezy on the slopes 🏂",
                ]}
              />
            </span>
          </p>

          <div className="homeHeroActions" aria-label="Landing page actions">
            <Link href="/about" className="homeHeroButton homeHeroButtonPrimary">
              Learn more about me
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="homeHeroButton homeHeroButtonSecondary"
            >
              <svg
                className="homeHeroButtonIcon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              Get in touch
            </a>
          </div>
        </div>

        <div className="homeHeroVisual" aria-hidden="true">
          <div className="homeHeroAtomScene">
            <div className="homeHeroAtomRing homeHeroAtomRingOne">
              <span className="homeHeroOrbitNode">
                <span className="homeHeroNodeFace" />
              </span>
            </div>
            <div className="homeHeroAtomRing homeHeroAtomRingTwo">
              <span className="homeHeroOrbitNode">
                <span className="homeHeroNodeFace" />
              </span>
            </div>
            <div className="homeHeroAtomRing homeHeroAtomRingThree">
              <span className="homeHeroOrbitNode">
                <span className="homeHeroNodeFace" />
              </span>
            </div>
            <div className="homeHeroAtomRing homeHeroAtomRingFour">
              <span className="homeHeroOrbitNode">
                <span className="homeHeroNodeFace" />
              </span>
            </div>
            <div className="homeHeroAtomRing homeHeroAtomRingFive">
              <span className="homeHeroOrbitNode">
                <span className="homeHeroNodeFace" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
