// Run with Node 24: node scripts/check-downloads.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { detectPlatform, platforms } from "../src/downloads.ts";

for (const [hints, expected] of [
  [{}, "unknown"],
  [
    { userAgent: "Mozilla Macintosh Intel Mac OS X", platform: "MacIntel" },
    "mac",
  ],
  [{ platform: "macOS", architecture: "arm", bitness: "64" }, "mac"],
  [{ platform: "macOS", architecture: "x86", bitness: "64" }, "intel"],
  [{ platform: "MacIntel", maxTouchPoints: 5 }, "mobile"],
  [{ userAgent: "Linux; Android 14" }, "mobile"],
  [{ userAgent: "iPhone" }, "mobile"],
  [{ userAgent: "Windows NT 10.0; Win64; x64" }, "windows"],
  [{ platform: "Windows", architecture: "arm", bitness: "64" }, "windowsArm"],
  [{ userAgent: "Windows ARM64" }, "windowsArm"],
  [{ platform: "Windows", bitness: "32" }, "windows32"],
  [{ platform: "Linux x86_64" }, "linux"],
])
  assert.equal(detectPlatform(hints).platform, expected);
assert.match(platforms.mac.href, /Emma-v0\.7\.1-darwin-arm64\.dmg$/);
assert.match(platforms.windows.href, /Emma-v0\.7\.1-win32-x64-Setup\.exe$/);
for (const key of [
  "unknown",
  "intel",
  "windowsArm",
  "windows32",
  "mobile",
  "linux",
])
  assert.doesNotMatch(platforms[key].href, /\.(dmg|exe)$/);

// Minimal hook runner: exercise SSR and a manual selection before async hints resolve.
const source = stripTypeScriptTypes(
  await readFile(new URL("../src/downloads.ts", import.meta.url), "utf8"),
);
const states = [];
let cursor = 0;
let effect;
globalThis.__downloadHookTest = {
  useState(initial) {
    const index = cursor++;
    if (!(index in states))
      states[index] = typeof initial === "function" ? initial() : initial;
    return [
      states[index],
      (value) => {
        states[index] = value;
      },
    ];
  },
  useEffect(callback) {
    effect = callback;
  },
};
const module = await import(
  "data:text/javascript;base64," +
    Buffer.from(
      source.replace(
        /import \{ useEffect, useState \} from "react";/,
        "const { useEffect, useState } = globalThis.__downloadHookTest;",
      ),
    ).toString("base64")
);
const render = () => {
  cursor = 0;
  return module.usePlatformDownload();
};
assert.equal(render().platform, "unknown");
let resolveHints;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: {
    platform: "Win32",
    userAgentData: {
      platform: "Windows",
      getHighEntropyValues: () =>
        new Promise((resolve) => {
          resolveHints = resolve;
        }),
    },
  },
});
const cleanup = effect();
render().setPlatform("mac");
resolveHints({ architecture: "arm", bitness: "64" });
await new Promise((resolve) => setTimeout(resolve, 0));
assert.equal(
  render().platform,
  "mac",
  "late detection must not replace manual selection",
);
render().setPlatform(null);
assert.equal(render().platform, "windowsArm");
cleanup();
delete globalThis.__downloadHookTest;
console.log(
  "Download detection, installer links, SSR and manual-selection race checks passed.",
);
