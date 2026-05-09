import { ResumeGate } from "@/components/ResumeGate";

export const metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div id="page-container" className="my-3">
      <h2>Resume</h2>
      <ResumeGate />
    </div>
  );
}
