import React from "react";
import Pdf from '../assets/test.pdf'

const PDFViewer = () => {
    return (
        <div>
            <iframe src={Pdf} />
        </div>
    );
};

function Resume() {
    return (
        <div id="page-container" class="my-3">
            <h2>Resume</h2>
            <div class="main row lightBg">
                <div class="col-md-3half pt-3 pb-3 text-center">
                    <p>Don't forget to save my resume!
                        <br />
                        Last updated: November 1, 2023
                    </p>

                    <p>Download:</p>
                    <a class="" href={Pdf} download="John Mo Resume" target="_blank">
                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                                stroke="#241730" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                </div>

                <div class="col-md-8half pt-3 pb-3">
                    <PDFViewer />
                </div>
            </div>
        </div>
    );
}

export default Resume;
