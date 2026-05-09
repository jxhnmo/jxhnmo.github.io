"use client";

import { useRouter } from "next/navigation";
import { TypewriterText } from "@/components/TypewriterText";

export default function HomePage() {
  const router = useRouter();

  return (
    <div id="page-container" className="my-3">
      <h1>
        <TypewriterText
          breakLines={false}
          cursor={false}
          nextStringDelay={[1000, 0]}
          loopDelay={2000}
          speed={500}
          strings={["Hey!", "你好!", "안녕!", "Hai!", "Ciao!", "!اهلا"]}
        />
        <br /> &emsp;It&apos;s John Mo
      </h1>

      <div className="main">
        <p className="home">
          Welcome to my site! I&apos;m John, a recent CS grad with a passion for
          gaming, food, and startups.
          <br /> <br />
          You can catch me&nbsp;
          <TypewriterText
            breakLines={false}
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
        </p>
      </div>

      <div className="main btm30">
        <button onClick={() => router.push("/about")} className="homeBtn">
          Learn more about me!
        </button>
      </div>
    </div>
  );
}
