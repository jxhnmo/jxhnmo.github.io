import React from "react";
import TypeIt from "typeit-react";

function Home() {
  return (
    <div id="page-container" class="my-3">
      <h1>Hey! It's <br /> &emsp;&emsp; John Mo</h1>

      <div class="main mt-5">
        <p>
          Welcome to my site! I'm John, a sophomore CS major @ Texas A&M with a passion for gaming, food, and startups.
          <br /> <br />
          You can catch me&nbsp;
          <TypeIt
            options={{
              loop: true,
              breakLines: false,
              cursorChar: '|',
              lifeLike: true,
              loopDelay: [0, 1000],
              startDelay: 0,
              cursorSpeed: 200,
              speed: 50,
              strings: [
                'looking for an internship 💼',
                'developing a Fortnite game 👨‍💻',
                'grinding Apex Legends 👾',
                'yelping my most recent restaurant 😋',
                'hanging our with friends 👋',
              ],
              waitUntilVisible: true,
            }}
          />
        </p>
      </div>
    </div>
  );
}

export default Home;
