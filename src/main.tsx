import { StrictMode, useEffect, type ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { loadPage } from "./App";
import "./index.css";

const root = document.getElementById("root")!;
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
