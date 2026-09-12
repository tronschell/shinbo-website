// Run: node scripts/check-hero-mark.mjs — no extra test dependencies.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const transpile = async (file) =>
  ts.transpileModule(await readFile(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
const load = (code) =>
  import(
    "data:text/javascript;base64," +
      Buffer.from(
        code
          .replaceAll('from "react"', `from "${import.meta.resolve("react")}"`)
          .replaceAll(
            'from "react/jsx-runtime"',
            `from "${import.meta.resolve("react/jsx-runtime")}"`,
          ),
      ).toString("base64")
  );
const code = await transpile("../src/HeroMark.tsx");
const { default: HeroMark } = await load(code);
assert.match(
  renderToStaticMarkup(createElement(HeroMark)),
  /src="\/shinbo.svg"/,
);
assert.doesNotMatch(renderToStaticMarkup(createElement(HeroMark)), /canvas/);

let effect, intersect, visibility, mediaChange, desktopChange, resolveImport;
let paint, idle;
let starts = 0;
let stops = 0;
const preference = {
  matches: false,
  addEventListener: (_, fn) => (mediaChange = fn),
  removeEventListener: () => {},
};
const desktop = {
  matches: true,
  addEventListener: (_, fn) => (desktopChange = fn),
  removeEventListener: () => {},
};
globalThis.matchMedia = (query) =>
  query.includes("min-width") ? desktop : preference;
globalThis.requestAnimationFrame = (fn) => {
  paint = fn;
  return 1;
};
globalThis.cancelAnimationFrame = () => {
  paint = undefined;
};
globalThis.window = {
  requestIdleCallback: (fn) => {
    idle = fn;
    return 1;
  },
  cancelIdleCallback: () => {
    idle = undefined;
  },
};
const flushIdle = () => {
  const frame = paint;
  paint = undefined;
  frame?.();
  const callback = idle;
  idle = undefined;
  callback?.();
};
globalThis.document = {
  hidden: false,
  addEventListener: (_, fn) => (visibility = fn),
  removeEventListener: () => {},
};
globalThis.IntersectionObserver = class {
  constructor(callback) {
    intersect = callback;
  }
  observe() {}
  disconnect() {}
};
globalThis.__heroCheck = {
  useEffect: (callback) => (effect = callback),
  useRef: () => ({ current: {} }),
  load: () => new Promise((resolve) => (resolveImport = resolve)),
};
const renderer = {
  renderHeroMark: () => {
    starts++;
    return () => stops++;
  },
};
const { default: TestHero } = await load(
  code
    .replace(
      'import { useEffect, useRef } from "react";',
      "const { useEffect, useRef } = globalThis.__heroCheck;",
    )
    .replace('import("./hero-mark-renderer")', "globalThis.__heroCheck.load()"),
);
TestHero({ playing: false });
assert.equal(effect(), undefined);
assert.equal(resolveImport, undefined, "paused must not download Three.js");
TestHero({ playing: true });
let cleanup = effect();
assert.equal(resolveImport, undefined, "offscreen must not download Three.js");
intersect([{ isIntersecting: true }]);
assert.equal(
  resolveImport,
  undefined,
  "desktop import must wait until after paint/idle",
);
flushIdle();
cleanup();
resolveImport(renderer);
await Promise.resolve();
assert.equal(starts, 0, "a late import must not mount after cleanup");

cleanup = effect();
preference.matches = true;
intersect([{ isIntersecting: true }]);
assert.equal(starts, 0);
preference.matches = false;
mediaChange();
flushIdle();
resolveImport(renderer);
await Promise.resolve();
assert.equal(starts, 1);
document.hidden = true;
visibility();
assert.equal(stops, 1, "hidden page must dispose animation");
document.hidden = false;
visibility();
flushIdle();
resolveImport(renderer);
await Promise.resolve();
assert.equal(starts, 2);
intersect([{ isIntersecting: false }]);
assert.equal(stops, 2, "offscreen must dispose animation");
intersect([{ isIntersecting: true }]);
flushIdle();
resolveImport(renderer);
await Promise.resolve();
preference.matches = true;
mediaChange();
assert.equal(stops, 3, "live reduced-motion change must dispose animation");
cleanup();

// Mobile stays static even when the global Play control is enabled.
resolveImport = undefined;
preference.matches = false;
desktop.matches = false;
cleanup = effect();
intersect([{ isIntersecting: true }]);
flushIdle();
assert.equal(resolveImport, undefined, "mobile must never import Three.js");
desktop.matches = true;
desktopChange();
flushIdle();
resolveImport(renderer);
await Promise.resolve();
assert.equal(starts, 4, "desktop media change should enable the enhancement");
desktop.matches = false;
desktopChange();
assert.equal(stops, 4, "switching to mobile must stop the enhancement");
cleanup();

// Execute the actual frame loop with timestamps older than wall-clock startup.
const rendererCode = await transpile("../src/hero-mark-renderer.ts");
const frameCode = rendererCode.slice(
  rendererCode.indexOf("let yaw"),
  rendererCode.indexOf("const onContextLost"),
);
let frames = 0;
const texture = {};
const u = Object.fromEntries(
  ["uA", "uB", "uMix", "uShift", "uAspA", "uAspB"].map((key) => [
    key,
    { value: 0 },
  ]),
);
runInNewContext(frameCode + "tick(10); tick(3510); tick(9);", {
  disposed: false,
  raf: 0,
  performance: { now: () => 100 },
  el: {
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 400 }),
    dataset: {},
  },
  scrollY: 0,
  innerHeight: 800,
  px: NaN,
  py: NaN,
  mesh: { rotation: {} },
  u,
  tex: [texture, texture],
  shots: ["a", "b"],
  THREE: { MathUtils: { smoothstep: () => 0 } },
  asp: (value) =>
    assert.equal(value, texture, "frame texture must never be undefined"),
  renderer: { render: () => frames++ },
  scene: {},
  camera: {},
  requestAnimationFrame: () => 1,
  dispose: () => assert.fail("frame should not fail"),
});
assert.equal(frames, 3);
console.log(
  "HeroMark: SSR fallback, opt-in loading, cancellation, visibility, reduced motion, desktop/mobile gating, idle loading, and frame timing passed.",
);
