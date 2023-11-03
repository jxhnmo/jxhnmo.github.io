import React, { useState } from "react";
import { Resume } from "."; //resume page
import me from '../assets/john_mo_supersocial.jpg'

function ResumeLogin() {
    const [isVerified, setIsVerified] = useState(false);

    const checkPw = () => {
        // gets the current input value
        const answer = document.getElementById("password").value;

        if (answer === "jomsresume") {
            setIsVerified(true);
        } else {
            alert("You were the chosen one! - Obi-Wan");
        }
    };

    return (
        <div id="page-container" class="my-3">
            <>

                {isVerified ? <Resume />
                    :
                    (
                        <form onSubmit={checkPw} class="main">
                            <div class="row lightContainer">
                                <div class="parent center">
                                    <img src={me} alt="Me @ Supersocial" width="35%" height="auto" />
                                </div>

                                <div class="parent center">
                                    <h2 class="linkHead mt-3">Protected Page</h2>
                                </div>

                                <div class="parent center mb-1">
                                    <p>Contact me for the code!</p>
                                </div>

                                <div class="parent center mb-3">
                                    <input class="Input" type="password" id="password" name="password" placeholder="Magic word?" />
                                </div>

                                <div class="parent center">
                                    <button class="Button">SUBMIT</button>
                                </div>
                            </div>
                        </form>
                    )
                }
            </>
        </div>
    );
}

export default ResumeLogin;
