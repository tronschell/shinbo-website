/* Take the app's stylesheets as they are and scope them under .ew, so the hero
   window is styled by Shinbo's own CSS instead of a copy that drifts.
   Run from the site root: node scripts/shinbo-css.mjs [path-to-shinbo/desktop]
   Output: src/shinbo-window.css (committed — the site builds without the app). */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const app = process.argv[2] ?? "../shinbo/desktop";
/* The app's own import order, because the cascade depends on it: index.css
   pulls these in first and then lays its base rules over the top. */
const files = [
  "src/styles/tokens.css",
  "src/styles/sidebar.css",
  "src/styles/conversation.css",
  "src/styles/terminal.css",
  "src/styles/markdown.css",
  "src/styles/panels.css",
  "src/styles/timeline.css",
  "src/styles/agents.css",
  "src/styles/activity.css",
  "src/styles/context-bar.css",
  "src/index.css",
];

/* One selector: :root and html/body become .ew itself, everything else lives
   inside it. Selectors that name the frame are left alone. */
const scope = (selector) => {
  const one = selector.trim();
  if (!one || one.startsWith("%") || /^\d/.test(one)) return one;
  if (
    one === ":root" ||
    one === "html" ||
    one === "body" ||
    one === ":root, body"
  )
    return ".ew";
  if (/^(:root|html|body)\b/.test(one))
    return `.ew${one.replace(/^(:root|html|body)/, "")}`;
  return `.ew ${one}`;
};

const scopeList = (list) => list.split(",").map(scope).join(", ");

/* A brace walker, because the app's CSS is plain CSS: at-rules that hold
   selectors get their bodies rewritten, @keyframes and @font-face do not. */
function rewrite(css) {
  let out = "";
  let buffer = "";
  let index = 0;
  const skipStack = [];
  while (index < css.length) {
    const char = css[index];
    if (char === "/" && css[index + 1] === "*") {
      const end = css.indexOf("*/", index + 2);
      index = end < 0 ? css.length : end + 2;
      continue;
    }
    if (char === '"' || char === "'") {
      const end = css.indexOf(char, index + 1);
      buffer += css.slice(index, end < 0 ? css.length : end + 1);
      index = end < 0 ? css.length : end + 1;
      continue;
    }
    if (char === "{") {
      const head = buffer.trim();
      buffer = "";
      const atRule = head.startsWith("@");
      const opaque =
        atRule && !/^@(media|supports|layer|container)\b/.test(head);
      skipStack.push(opaque || skipStack.at(-1) === true);
      out += `${atRule || skipStack.at(-1) === true ? head : scopeList(head)}{`;
      index += 1;
      continue;
    }
    if (char === "}") {
      out += `${buffer.trim()}}`;
      buffer = "";
      skipStack.pop();
      index += 1;
      continue;
    }
    if (char === ";" && skipStack.length === 0) {
      out += `${buffer.trim()};\n`;
      buffer = "";
      index += 1;
      continue;
    }
    buffer += char;
    index += 1;
  }
  return `${out}${buffer.trim()}`;
}

const chunks = files.map((file) => {
  const css = readFileSync(join(app, file), "utf8").replace(
    /@import[^;]+;/g,
    "",
  );
  return `/* ${file} */\n${rewrite(css)}\n`;
});

const head = `/* GENERATED — do not edit. node scripts/shinbo-css.mjs
   Shinbo's own stylesheets (desktop/${files.join(", desktop/")}),
   scoped under .ew so the hero window renders against the real thing. */\n`;

writeFileSync("src/shinbo-window.css", `${head}${chunks.join("\n")}`);
console.log(
  `src/shinbo-window.css — ${chunks.join("").length} bytes from ${files.length} files`,
);
