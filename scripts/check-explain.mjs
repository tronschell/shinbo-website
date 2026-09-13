// Run: node scripts/check-explain.mjs — installed TypeScript + React, no test dependency.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const source = await readFile(
  new URL("../src/Explain.tsx", import.meta.url),
  "utf8",
);
const code = ts
  .transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  .outputText.replace('import "./explain.css";', "");
const resolveReact = (text) =>
  text
    .replaceAll(
      'from "react"',
      `from ${JSON.stringify(import.meta.resolve("react"))}`,
    )
    .replaceAll(
      'from "react/jsx-runtime"',
      `from ${JSON.stringify(import.meta.resolve("react/jsx-runtime"))}`,
    );
const load = (text) =>
  import(
    `data:text/javascript;base64,${Buffer.from(resolveReact(text)).toString("base64")}`
  );
const { default: Explain, verifyExplainModel } = await load(code);
verifyExplainModel();
const html = renderToStaticMarkup(createElement(Explain));
for (const text of [
  'id="explain"',
  'data-playing="false"',
  "How it works",
  'aria-label="Play all animations"',
  "not live runs",
  "Summaries lose detail",
  "not live runs or benchmarks",
])
  assert.ok(html.includes(text), `SSR omitted ${text}`);
assert.equal((html.match(/<h2\b/g) || []).length, 1);
assert.equal((html.match(/<h3\b/g) || []).length, 4);
assert.equal((html.match(/<button\b/g) || []).length, 12);
assert.equal((html.match(/type="button"/g) || []).length, 12);
assert.match(html, /role="group" aria-label="Animation controls"/);
assert.match(html, /type="checkbox"/);

// A tiny hook runner exercises motion preferences and the actual control handlers.
let states = [],
  effects = [],
  cursor = 0;
globalThis.__explainHookCheck = {
  useRef: () => ({ current: null }),
  useState(initial) {
    const index = cursor++;
    if (!(index in states)) states[index] = initial;
    return [
      states[index],
      (value) => {
        states[index] =
          typeof value === "function" ? value(states[index]) : value;
      },
    ];
  },
  useEffect: (effect) => effects.push(effect),
};
const { default: TestExplain } = await load(
  code.replace(
    'import { useEffect, useRef, useState } from "react";',
    "const { useEffect, useRef, useState } = globalThis.__explainHookCheck;",
  ),
);
const render = (props) => {
  cursor = 0;
  effects = [];
  return TestExplain(props);
};
const descendants = (node) => {
  if (Array.isArray(node)) return node.flatMap(descendants);
  if (!node || typeof node !== "object") return [];
  return [node, ...descendants(node.props?.children)];
};
const originalWindow = globalThis.window;
const originalObserver = globalThis.IntersectionObserver;
try {
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  for (const [desktop, reduced] of [
    [true, false],
    [true, true],
    [false, false],
  ]) {
    states = [];
    globalThis.window = {
      matchMedia: (query) => ({
        matches: query.includes("min-width") ? desktop : reduced,
        addEventListener() {},
        removeEventListener() {},
      }),
    };
    render();
    assert.equal(states[0], false, "Initial render must be static");
    const cleanup = effects[0]();
    assert.equal(
      states[0],
      desktop && !reduced,
      "Only normal-motion desktop should autoplay",
    );
    cleanup();
  }
  let reportedMotion;
  render({
    onPlayingChange: (value) => {
      reportedMotion = value;
    },
  });
  effects.at(-1)();
  assert.equal(
    reportedMotion,
    false,
    "Motion state must reach the surrounding diagrams",
  );
  let nodes = descendants(render());
  nodes
    .find((node) => node.props?.type === "checkbox")
    .props.onChange({ target: { checked: true } });
  assert.equal(states[0], false);
  assert.equal(states[2], 4);
  assert.equal(states[3], true);
  assert.match(
    renderToStaticMarkup(render()),
    /3 Write tests: failed; 4 Update docs: done; 5 Review together: waiting; 6 Preview the docs: ready; 7 Return the result: waiting/,
  );
  nodes = descendants(render());
  nodes
    .find((node) => node.type === "button" && node.props.children === "Step")
    .props.onClick();
  assert.equal(states[0], false);
  assert.equal(states[2], 5);
  nodes
    .find((node) => node.type === "button" && node.props.children === "Replay")
    .props.onClick();
  assert.equal(states[2], 0);
  nodes = descendants(render());
  nodes
    .find((node) => node.props?.["aria-label"] === "Play all animations")
    .props.onClick();
  assert.equal(states[0], true);
  assert.equal(states[4], null);
  nodes = descendants(render());
  nodes
    .find((node) => node.type === "button" && node.props.children === "Compact")
    .props.onClick();
  assert.equal(states[0], false);
  assert.equal(states[4], true);
} finally {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalObserver === undefined) delete globalThis.IntersectionObserver;
  else globalThis.IntersectionObserver = originalObserver;
  delete globalThis.__explainHookCheck;
}
console.log(
  "Explain checks passed: dependency states, failed branches, context totals, span bounds, SSR, reduced motion and controls.",
);
