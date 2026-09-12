import type { Doc } from "./docs/types";
import harness from "./docs/harness";
import delegation from "./docs/delegation";
import plan from "./docs/plan";
import models from "./docs/models";
import router from "./docs/router";
import control from "./docs/control";
import surfaces from "./docs/surfaces";
import knowledge from "./docs/knowledge";
import jobs from "./docs/jobs";
import agent from "./docs/agent";
import tools from "./docs/tools";

export const docs: Doc[] = [
  harness,
  delegation,
  plan,
  models,
  router,
  control,
  surfaces,
  knowledge,
  jobs,
  agent,
  tools,
];

export const docSeo = Object.fromEntries(
  docs.map((d) => [d.slug, d.seo]),
) as Record<string, Doc["seo"]>;
