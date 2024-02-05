import React from "react";
import { SocialIcon } from 'react-social-icons'

function Links() {
    return (
        <div id="page-container" class="my-3">
            <h2>Links</h2>
            <div class="main">
                <div class="row lightContainer">


                    <div class="parent center">
                        <h2 class="linkHead">Socials</h2>
                    </div>


                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="instagram" url="https://www.instagram.com/jxhnmo/" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://www.instagram.com/jxhnmo/" target="_blank" rel="noopener noreferrer" class="links">instagram</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>my latest pix and flix!</p>
                        </div>
                    </div>

                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="spotify" url="https://open.spotify.com/user/the_dark_dragon" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://open.spotify.com/user/the_dark_dragon" target="_blank" rel="noopener noreferrer" class="links">spotify</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>what im listening to</p>
                        </div>
                    </div>

                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="discord" url="https://discord.com/invite/CnzYRG6" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://discord.com/invite/CnzYRG6" target="_blank" rel="noopener noreferrer" class="links">discord</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>my community</p>
                        </div>
                    </div>

                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="twitch" url="https://www.twitch.tv/jomgos" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://www.twitch.tv/jomgos" target="_blank" rel="noopener noreferrer" class="links">twitch</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>maybe ill stream again one day...</p>
                        </div>
                    </div>


                    <div class="parent center">
                        <h2 class="linkHead">work</h2>
                    </div>


                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="linkedin" url="https://www.linkedin.com/in/john-mo/" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://www.linkedin.com/in/john-mo/" target="_blank" rel="noopener noreferrer" class="links">linkedin</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>lets connect!</p>
                        </div>
                    </div>

                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="github" url="https://github.com/jxhnmo" target="_blank" style={{ width: 30 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <a href="https://github.com/jxhnmo" target="_blank" rel="noopener noreferrer" class="links">github</a>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>git happens</p>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default Links;
