"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { resumeConfig } from "@/content/resume";

async function sha256(value: string) {
  const buffer = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function ResumeGate() {
  const [isVerified, setIsVerified] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const hash = await sha256(password);

    if (hash === resumeConfig.passwordHash) {
      setIsVerified(true);
    } else {
      alert("You were the chosen one! - Obi-Wan");
    }
  }

  if (isVerified) {
    return (
      <>
        {/* Direct child of #page-container, like every other .pageTitle, so it
            insets itself to the content column rather than nesting inside it. */}
        <h1 className="pageTitle">Resume</h1>
        <div className="pageColumn">
          <div className="row">
            <div className="col-md-3half pt-3 pb-3 text-center">
              <p>
                Don&apos;t forget to save my resume!
                <br />
                Last updated: {resumeConfig.lastUpdated}
              </p>

              <p>Download:</p>
              <a href={resumeConfig.pdf} download="John Mo Resume">
                Download PDF
              </a>
            </div>

            <div className="col-md-8half pt-3 pb-3">
              <iframe
                className="resumeFrame"
                title="Resume"
                src={resumeConfig.pdf}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  // The locked state is only a portrait, a line of copy, and two controls, so it
  // skips .pageColumn and centers itself in the viewport instead — the spacing
  // between rows comes from .resumeGate's gap, not per-element margins.
  return (
    <form onSubmit={onSubmit} className="resumeGate">
      <div className="imageBorder">
        <Image
          src={resumeConfig.portrait}
          alt="Me @ Supersocial"
          width={320}
          height={320}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <h1 className="linkHead">Protected Page</h1>

      <div id="darkTxt">
        <p>Contact me for the code!</p>
      </div>

      <input
        className="Input"
        type="password"
        name="password"
        placeholder="Magic word?"
      />

      <button className="btnPrimary" type="submit">
        SUBMIT
      </button>
    </form>
  );
}
