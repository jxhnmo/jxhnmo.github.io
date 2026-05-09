import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div id="root">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
