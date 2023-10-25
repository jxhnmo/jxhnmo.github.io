import React from "react";
import Me from '../assets/me1.jpg'

function About() {
    return (
        <div id="page-container" class="my-3">
            <h2>About</h2>
            <div class="main row lightBg">
                <div class="col-md-3half pt-3 pb-3 text-center">
                    <img src={Me} alt='John Mo' width="80%" height='auto' />
                </div>

                <div class="col-md-8half pt-3 pb-3">
                    <h3>
                        Hey! I'm John Mo :D
                    </h3>
                    <th id="darkTxt">
                        <p>
                            I am a global citizen that has lived in 5 different countries! Born in Houston, Texas, I have lived in Oman, Brunei, China, and South Korea. I love meeting new people and interacting with different cultures.
                            <br /><br />
                            My passions include games, technology, food, and startups. Growing up playing games, I have played Collegiate R6 for UNT and now play Apex casually (at one point I was a Valorant fiend).
                            <br /><br />
                            Outside of these, I have a fondness for martial arts and the UFC, having trained Brazillian Jiu-Jitsu for 4 years and touched on others like Taekwondo, Karate, and Kung Fu. Fun fact: I lived in one of the Shaolin academies when I was 5!
                        </p>
                    </th>
                </div>
            </div>
        </div>
    );
}

export default About;
