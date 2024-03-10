import React from "react";
import Me from '../assets/me1.jpg'
import { useNavigate } from "react-router-dom"

function About() {
    const navigate = useNavigate();
    return (
        <div id="page-container" class="my-3">
            <h2>About</h2>
            <div class="main row lightBg">
                <div class="col-md-3half pt-3 pb-3 text-center">
                    <img src={Me} alt='John Mo' width="80%" height='auto' />
                </div>

                <div class="col-md-8half pt-3 pb-3">
                    <h3 class="heads">
                        Hey! I'm John Mo :D
                    </h3>

                    <th id="darkTxt">
                        <p>
                            Welcome to my slice of the internet, where each click and scroll uncovers more of my journey through tech, games, and globe-trotting adventures. Born in Houston, Texas, my life's adventures have whisked me from Oman to Brunei, China, and South Korea. Each place has been a chapter in my story, crafting a unique lens through which I view technology and gaming, whilst on the unending quest for the perfect meal.
                            <br /><br />
                            My heart beats for games and my mind for technological wizardry as I spend days (and nights!) exploring virtual worlds and real-world puzzles. As an ex-collegiate R6 player and now casual gamer, my gaming journey has been one heck of a ride that started with Minecraft: Pocket Edition.
                            <br /><br />
                            Beyond pixels and code, I love martial arts, with a focus on Brazilian Jiu-Jitsu, which I've practiced for over 4 years. My adventures have led me to also dabble in Taekwondo, Karate, and Kung Fu. When I was 5, I lived at Shaolin NanYuan temple in the mountains to train with the masters!
                            <br /><br />
                            Known as a foodie among my friends, my travels are never complete without diving into the local cuisine. From street food stalls to Michelin-starred restaurants, my palate dances across a spectrum of flavours. And yes, I'm that person who yelps about every restaurant adventure, guiding my fellow foodies to their next yum!
                            <br /><br />
                            Here's to the adventures that are ahead and the stories they'll bring. Let's make some magic happen, together!
                        </p>
                    </th>

                    <div class="btnContainer">
                        <button onClick={() => navigate('/links')} class="abtBtn">
                            >> links
                        </button>

                        <button onClick={() => navigate('/experience')} class="abtBtn">
                            >> work
                        </button>

                        <button onClick={() => navigate('/projects')} class="abtBtn">
                            >> projects
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;
