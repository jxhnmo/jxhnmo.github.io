import React from "react";
import { SocialIcon } from "react-social-icons";

function Links() {
  return (
    <div id="page-container" className="my-3">
      <h2>Links</h2>
      <div className="main">
        <div className="row lightContainer">
          <div className="parent center">
            <h2 className="linkHead">Socials</h2>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/jxhnmo/"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://www.instagram.com/jxhnmo/"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                instagram
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">my latest pix and flix!</p>
            </div>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="spotify"
                url="https://open.spotify.com/user/the_dark_dragon"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://open.spotify.com/user/the_dark_dragon"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                spotify
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">what im listening to</p>
            </div>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="discord"
                url="https://discord.com/invite/CnzYRG6"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://discord.com/invite/CnzYRG6"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                discord
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">my community</p>
            </div>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="twitch"
                url="https://www.twitch.tv/jomgos"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://www.twitch.tv/jomgos"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                twitch
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">maybe ill stream again one day...</p>
            </div>
          </div>

          <div className="parent center">
            <h2 className="linkHead">work</h2>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="linkedin"
                url="https://www.linkedin.com/in/john-mo/"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://www.linkedin.com/in/john-mo/"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                linkedin
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">lets connect!</p>
            </div>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="github"
                url="https://github.com/jxhnmo"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://github.com/jxhnmo"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                github
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">git happens</p>
            </div>
          </div>

          <div className="parent">
            <div className="child">
              <SocialIcon
                network="clubhouse"
                url="https://calendly.com/johnpmo/15"
                target="_blank"
                style={{ width: 30 }}
                fgColor="var(--light)"
                bgColor="var(--dark)"
              />
            </div>
            <div className="child">
              <a
                href="https://calendly.com/johnpmo/15"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                calendly
              </a>
            </div>
            <div className="child filler"></div>
            <div className="child">
              <p className="links">schedule a chat!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
