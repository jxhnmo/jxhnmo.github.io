import { ResumeGate } from "@/components/ResumeGate";
import { buildMetadata } from "@/content/seo";

// buildMetadata adds robots: { index: false } for this route — the gate is
// client-side only and has no indexable content behind it.
export const metadata = buildMetadata("/resume");

// No page title here: the two gate states want different headings (the locked
// state is a viewport-centered card that titles itself), so ResumeGate owns the
// <h1> for whichever state it renders.
export default function ResumePage() {
  return (
    <main id="page-container" className="my-3">
      <ResumeGate />
    </main>
  );
}
