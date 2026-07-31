import { ResumeGate } from "@/components/ResumeGate";
import { buildMetadata } from "@/content/seo";

// buildMetadata adds robots: { index: false } for this route — the gate is
// client-side only and has no indexable content behind it.
export const metadata = buildMetadata("/resume");

export default function ResumePage() {
  return (
    <main id="page-container" className="my-3">
      <h1 className="pageTitle">Resume</h1>
      <ResumeGate />
    </main>
  );
}
