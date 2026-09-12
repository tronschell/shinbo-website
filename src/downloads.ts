import { useEffect, useState } from "react";

export const RELEASE =
  "https://github.com/tronschell/shinbo/releases/tag/v0.8.1";
const ASSETS = "https://github.com/tronschell/shinbo/releases/download/v0.8.1/";
export const platforms = {
  unknown: {
    label: "Choose your system",
    title: "Choose your download",
    requirement: "Select your operating system below.",
    href: "/#download",
    action: "Choose a download",
    steps:
      "Published installers are available for Apple silicon Macs and Windows x64.",
  },
  mac: {
    icon: "mac",
    label: "Mac · Apple silicon",
    title: "Download for Mac",
    requirement: "macOS 12 or later · Apple M-series chip",
    href: ASSETS + "Shinbo-v0.8.1-darwin-arm64.dmg",
    action: "Download for Mac",
    steps:
      "Open the DMG, drag the app into Applications, then launch it from Applications. Open About This Mac from the Apple menu and check that Chip says Apple M1 or later before installing.",
  },
  windows: {
    icon: "windows",
    label: "Windows · x64",
    title: "Download for Windows",
    requirement: "Windows 10 version 1809 or later · x64",
    href: ASSETS + "Shinbo-v0.8.1-win32-x64-Setup.exe",
    action: "Download for Windows",
    steps:
      "Run Setup.exe to install for your user. This Windows build is unsigned; release notes include checksums.",
  },
  intel: {
    label: "Mac · Intel",
    title: "No Intel Mac installer",
    requirement: "The published Mac build requires Apple silicon.",
    href: RELEASE,
    action: "Read platform notes",
    steps:
      "Open About This Mac from the Apple menu to see your chip or processor. An Intel Mac cannot use the published ARM installer.",
  },
  windowsArm: {
    label: "Windows · ARM",
    title: "No native Windows ARM installer",
    requirement: "Only Windows x64 is published.",
    href: RELEASE,
    action: "Read platform notes",
    steps:
      "Windows ARM64 can be built from source. A native ARM installer is not included in this release.",
  },
  windows32: {
    label: "Windows · 32-bit",
    title: "No 32-bit Windows installer",
    requirement: "The published Windows build requires x64.",
    href: RELEASE,
    action: "Read platform notes",
    steps: "Open Settings, then System, then About to find your system type.",
  },
  linux: {
    label: "Linux",
    title: "No Linux desktop installer",
    requirement: "There is no published Linux desktop build.",
    href: "https://github.com/tronschell/shinbo/tree/dev/harness",
    action: "Explore the source",
    steps:
      "The headless shinbo-cli agent is a separate developer path, not a Linux edition of the desktop interface.",
  },
  mobile: {
    label: "iPhone / iPad / Android",
    title: "Mobile is not publicly distributed",
    requirement: "iPhone client: built, unreleased. iPad and Android: planned.",
    href: "https://github.com/tronschell/shinbo/blob/dev/docs/mobile.md",
    action: "Read mobile status",
    steps:
      "The iPhone client currently requires building with Xcode; there is no App Store or TestFlight download.",
  },
} satisfies Record<string, PlatformInfo>;
export type Platform = keyof typeof platforms;
export type PlatformInfo = {
  icon?: "mac" | "windows";
  label: string;
  title: string;
  requirement: string;
  href: string;
  action: string;
  steps: string;
};
export type BrowserHints = {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  architecture?: string;
  bitness?: string;
  mobile?: boolean;
};

export function detectPlatform(hints: BrowserHints): {
  platform: Platform;
  explanation: string;
} {
  const ua = hints.userAgent ?? "";
  const os = hints.platform ?? "";
  const arch = hints.architecture?.toLowerCase() ?? "";
  if (
    hints.mobile ||
    /Android|iPhone|iPad|iPod/i.test(ua) ||
    (/Mac/i.test(os + ua) && (hints.maxTouchPoints ?? 0) > 1)
  )
    return {
      platform: "mobile",
      explanation:
        "Mobile device detected. Choose another system to download for a computer.",
    };
  if (/Win/i.test(os + ua)) {
    if (/arm|aarch/i.test(arch + ua))
      return { platform: "windowsArm", explanation: "Windows ARM detected." };
    if (hints.bitness === "32")
      return { platform: "windows32", explanation: "32-bit Windows detected." };
    return {
      platform: "windows",
      explanation: "Windows detected. This installer requires an x64 computer.",
    };
  }
  if (/Mac/i.test(os + ua)) {
    if (/x86|x64|amd64/.test(arch))
      return {
        platform: "intel",
        explanation: "Your browser reports an Intel Mac architecture.",
      };
    if (/arm|aarch/.test(arch))
      return {
        platform: "mac",
        explanation: "Your browser reports an Apple silicon Mac.",
      };
    // ponytail: browsers mask Mac chips; use an explicit requirement and manual choice instead of fingerprinting hardware.
    return {
      platform: "mac",
      explanation:
        "Mac detected. Your browser does not identify its chip; this download requires Apple silicon.",
    };
  }
  if (/Linux|CrOS/i.test(os + ua))
    return {
      platform: "linux",
      explanation:
        "Linux or ChromeOS detected; no desktop installer is published for this system.",
    };
  return {
    platform: "unknown",
    explanation: "Choose your system to see the right installer.",
  };
}

export function usePlatformDownload() {
  const [detected, setDetected] = useState(() => detectPlatform({}));
  const [override, setPlatform] = useState<Platform | null>(null);
  useEffect(() => {
    let active = true;
    const nav = navigator as Navigator & {
      userAgentData?: {
        platform?: string;
        mobile?: boolean;
        getHighEntropyValues?: (keys: string[]) => Promise<BrowserHints>;
      };
    };
    const base = {
      userAgent: nav.userAgent,
      platform: nav.userAgentData?.platform || nav.platform,
      maxTouchPoints: nav.maxTouchPoints,
      mobile: nav.userAgentData?.mobile,
    };
    // Wait for architecture hints when available so Windows ARM is never briefly offered x64.
    const detect = async () => {
      let hints: BrowserHints = {};
      try {
        hints =
          (await nav.userAgentData?.getHighEntropyValues?.([
            "architecture",
            "bitness",
          ])) ?? {};
      } catch {
        /* Browser declined; use its ordinary platform information. */
      }
      if (active) setDetected(detectPlatform({ ...base, ...hints }));
    };
    void detect();
    return () => {
      active = false;
    };
  }, []);
  const platform = override ?? detected.platform;
  return {
    platform,
    selected: platforms[platform] as PlatformInfo,
    explanation:
      override === null ? detected.explanation : "Using your selected system.",
    setPlatform,
  };
}
