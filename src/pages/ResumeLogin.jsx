import React, { useState } from "react";
import { Resume } from "."; //resume page
import me from '../assets/john_mo_supersocial.jpg'

function ResumeLogin() {
    const [isVerified, setIsVerified] = useState(false);

    const checkPw = async (e) => {
        e.preventDefault();
        // gets the current input value
        const answer = document.getElementById("password").value;

        // Hash the input password
        const msgBuffer = new TextEncoder().encode(answer);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const correctHash = "c8f0ee051ab51fcb9a097fb8515234861eb4460dba82e37489cbfc38365c269d";

        if (hashHex === correctHash) {
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
                                <th id="border">
                                    <div class="parent center">
                                        <img src={me} alt="Me @ Supersocial" width="35%" height="auto" />
                                    </div>
                                </th>

                                <div class="parent center">
                                    <h2 class="linkHead mt-3">Protected Page</h2>
                                </div>

                                <div class="parent center mb-1">
                                    <th id="darkTxt">
                                        <p>Contact me for the code!</p>
                                    </th>
                                </div>

                                <div class="parent center mb-3">
                                    <input class="Input" type="password" id="password" name="password" placeholder="Magic word?" />
                                </div>

                                <div class="parent center">
                                    <button class="loginBtn">SUBMIT</button>
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
