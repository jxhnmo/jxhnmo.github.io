import Image from "next/image";
import Link from "next/link";
import Me from "@/assets/opt/me1.webp";
import { buildMetadata } from "@/content/seo";

// This page was `"use client"` only so three buttons could call router.push(),
// which meant it could not export metadata at all and shipped the generic site
// title/description. Plain <Link>s make it a server component again.
export const metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <main id="page-container" className="my-3">
      <h1 className="pageTitle">About</h1>
      <div className="pageColumn">
        <div className="row">
          <div className="col-md-8half pt-3">
            <h2 className="heads">Hey! I&apos;m John Mo :D</h2>

            <div id="darkTxt">
              <p>
                Welcome to my slice of the internet, where each click and scroll
                uncovers more of my journey through tech, games, and
                globe-trotting adventures. Born in Houston, Texas, my
                life&apos;s adventures have whisked me from Oman to Brunei,
                China, South Korea, and Singapore. Each place has been a chapter
                in my story, crafting a unique lens through which I view
                technology and gaming, whilst on the unending quest for the
                perfect meal.
                <br />
                <br />
                My heart beats for games and my mind for technological wizardry
                as I spend days (and nights!) exploring virtual worlds and
                real-world puzzles. As an ex-collegiate R6 player and now casual
                gamer, my gaming journey has been one heck of a ride that
                started with Minecraft: Pocket Edition.
                <br />
                <br />
                Beyond pixels and code, I love martial arts, with a focus on
                Brazilian Jiu-Jitsu, which I&apos;ve practiced for over 4 years.
                My adventures have led me to also dabble in Taekwondo, Karate,
                and Kung Fu. When I was 5, I lived at Shaolin NanYuan temple in
                the mountains to train with the masters!
                <br />
                <br />
                Known as a foodie among my friends, my travels are never
                complete without diving into the local cuisine. From street food
                stalls to Michelin-starred restaurants, my palate dances across
                a spectrum of flavours. And yes, I&apos;m that person who
                reviews every restaurant adventure, guiding my fellow foodies to
                their next yum!
                <br />
                <br />
                Here&apos;s to the adventures that are ahead and the stories
                they&apos;ll bring. Let&apos;s make some magic happen, together!
              </p>
            </div>
          </div>

          <div className="col-md-3half text-center">
            <div className="imageBorder">
              <Image src={Me} alt="John Mo" width={320} height={320} />
            </div>

            <div className="btnContainer">
              <Link href="/links" className="btnSecondary">
                &gt;&gt; links
              </Link>
              <Link href="/experience" className="btnSecondary">
                &gt;&gt; work
              </Link>
              <Link href="/projects" className="btnSecondary">
                &gt;&gt; projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
