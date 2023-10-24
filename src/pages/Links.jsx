import React from "react";
import { SocialIcon } from 'react-social-icons'

function Links() {
    return (
        <div id="page-container" class="my-3">
            <h2>Links</h2>
            <div class="main">
                <div class="row lightContainer">

                    <div class="parent">
                        <div class="child">
                            <SocialIcon network="github" url="https://www.google.com" style={{ width: 25 }} fgColor="#A991E0" bgColor="#2A1A38" />
                        </div>
                        <div class="child">
                            <p>github</p>
                        </div>
                        <div class="child filler">

                        </div>
                        <div class="child">
                            <p>occasional text</p>
                        </div>
                    </div>

                    <div class="justify-start flex items-center whiteBg">
                        <p><SocialIcon network="github" url="https://www.google.com" style={{ width: 25 }} fgColor="#A991E0" /> teststest <br /></p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Links;
