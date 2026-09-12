import { StrictMode, useEffect, type ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { loadPage } from "./App";
import "./index.css";

const root = document.getElementById("root")!;

// Report installer clicks to GA4 as its built-in file_download event (enhanced
// measurement misses .dmg, so it is disabled in the property and done here).
document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest("a");
  if (!a?.href.includes("/releases/download/")) return;
  const file = a.href.split("/").pop()!;
  (window as { gtag?: (...args: unknown[]) => void }).gtag?.(
    "event",
    "file_download",
    {
      file_name: file,
      file_extension: file.split(".").pop(),
      link_url: a.href,
      transport_type: "beacon",
    },
  );
});
function Page({ children }: { children: ReactNode }) {
  useEffect(() => {
    const target =
      location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, []);
  return children;
}
const tree = (
  <StrictMode>
    <Page>{await loadPage(location.pathname)}</Page>
  </StrictMode>
);

// Prerendered by scripts/prerender.mjs in a real build; empty under `vite dev`.
if (root.firstChild) hydrateRoot(root, tree);
else createRoot(root).render(tree);
