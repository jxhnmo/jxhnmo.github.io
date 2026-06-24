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
      <div className="main">
        <div className="row glassCard">
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
    );
  }

  return (
    <form onSubmit={onSubmit} className="main">
      <div className="row glassCard">
        <div className="imageBorder">
          <div className="parent center">
            <Image
              src={resumeConfig.portrait}
              alt="Me @ Supersocial"
              width={320}
              height={320}
              style={{ width: "35%", height: "auto" }}
            />
          </div>
        </div>

        <div className="parent center">
          <h2 className="linkHead mt-3">Protected Page</h2>
        </div>

        <div className="parent center mb-1">
          <div id="darkTxt">
            <p>Contact me for the code!</p>
          </div>
        </div>

        <div className="parent center mb-3">
          <input
            className="Input"
            type="password"
            name="password"
            placeholder="Magic word?"
          />
        </div>

        <div className="parent center">
          <button className="btnPrimary" type="submit">
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
}
