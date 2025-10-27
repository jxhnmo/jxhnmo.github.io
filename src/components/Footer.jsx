import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/jm_logo.png";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="justify-start">
        <div id="footer" style={{ cursor: "pointer" }}>
          <img src={logo} alt="jm logo" onClick={() => navigate("/")} />
        </div>
      </div>

      <div className="text-right">
        <div id="footer">
          <p>
            Always down to chat! <br />
            Reach out at{" "}
            <a
              href="mailto:peikaimo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              peikaimo@gmail.com
            </a>{" "}
            or at my{" "}
            <a
              href="https://www.linkedin.com/in/john-mo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedIn
            </a>{" "}
            :D
            <br />
            Site made with care by John Mo
          </p>
        </div>
      </div>
    </div>
  );
}
