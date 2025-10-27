import React from "react";
import Me from "../assets/me1.jpg";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <div id="page-container" className="my-3">
      <h2>About</h2>
      <div className="main">
        <div className="row lightContainer">
          <div className="col-md-3half pt-3 pb-3 text-center">
            <div id="border">
              <img src={Me} alt="John Mo" width="80%" height="auto" />
            </div>
          </div>

          <div className="col-md-8half pt-3 pb-3">
            <div className="container">
              <h3 className="heads">Hey! I'm John Mo :D</h3>

              <div id="darkTxt">
                <p>
                  Welcome to my slice of the internet, where each click and
                  scroll uncovers more of my journey through tech, games, and
                  globe-trotting adventures. Born in Houston, Texas, my life's
                  adventures have whisked me from Oman to Brunei, China, South
                  Korea, and Singapore. Each place has been a chapter in my
                  story, crafting a unique lens through which I view technology
                  and gaming, whilst on the unending quest for the perfect meal.
                  <br />
                  <br />
                  My heart beats for games and my mind for technological
                  wizardry as I spend days (and nights!) exploring virtual
                  worlds and real-world puzzles. As an ex-collegiate R6 player
                  and now casual gamer, my gaming journey has been one heck of a
                  ride that started with Minecraft: Pocket Edition.
                  <br />
                  <br />
                  Beyond pixels and code, I love martial arts, with a focus on
                  Brazilian Jiu-Jitsu, which I've practiced for over 4 years. My
                  adventures have led me to also dabble in Taekwondo, Karate,
                  and Kung Fu. When I was 5, I lived at Shaolin NanYuan temple
                  in the mountains to train with the masters!
                  <br />
                  <br />
                  Known as a foodie among my friends, my travels are never
                  complete without diving into the local cuisine. From street
                  food stalls to Michelin-starred restaurants, my palate dances
                  across a spectrum of flavours. And yes, I'm that person who
                  reviews every restaurant adventure, guiding my fellow foodies
                  to their next yum!
                  <br />
                  <br />
                  Here's to the adventures that are ahead and the stories
                  they'll bring. Let's make some magic happen, together!
                </p>
              </div>

              <div className="btnContainer">
                <button onClick={() => navigate("/links")} className="abtBtn">
                  &gt;&gt; links
                </button>

                <button
                  onClick={() => navigate("/experience")}
                  className="abtBtn"
                >
                  &gt;&gt; work
                </button>

                <button
                  onClick={() => navigate("/projects")}
                  className="abtBtn"
                >
                  &gt;&gt; projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
