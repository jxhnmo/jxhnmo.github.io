import React from "react";
import TypeIt from "typeit-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div id="page-container" className="my-3">
      <h1>
        <TypeIt
          options={{
            loop: true,
            breakLines: false,
            cursor: false,
            lifeLike: false,
            // loopDelay: [500, 500],
            nextStringDelay: [1000, 0],
            loopDelay: 2000,
            pause: 500,
            speed: 500,
            strings: [
              "Hey!",
              "你好!",
              "안녕!",
              "Hai!",
              "Ciao!",
              "!اهلا", //ahlan
            ],
            waitUntilVisible: true,
          }}
        />
        <br /> &emsp;It's John Mo
      </h1>

      <div className="main">
        <p className="home">
          Welcome to my site! I'm John, a recent CS grad with a passion for
          gaming, food, and startups.
          <br /> <br />
          You can catch me&nbsp;
          <TypeIt
            options={{
              loop: true,
              breakLines: false,
              cursorChar: "|",
              lifeLike: true,
              loopDelay: [0, 1000],
              startDelay: 0,
              cursorSpeed: 1000,
              speed: 50,
              strings: [
                "putting in the work 👨‍💻",
                "exploring virtual worlds 👾",
                "discovering bay area 🌉",
                "reviewing restaurants on beli 😋",
                "hanging out with friends 👋",
                "getting steezy on the slopes 🏂",
              ],
              waitUntilVisible: true,
            }}
          />
        </p>
      </div>

      <div className="main btm30">
        <button onClick={() => navigate("/about")} className="homeBtn">
          Learn more about me!
        </button>
      </div>
    </div>
  );
}

export default Home;
