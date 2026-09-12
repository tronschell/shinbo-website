import type { ReactNode } from "react";

export type Doc = {
  slug: string;
  title: string;
  blurb: string;
  /** <title> and meta description for /docs/<slug>. */
  seo: { title: string; description: string };
  shot: string;
  body: ReactNode;
};
