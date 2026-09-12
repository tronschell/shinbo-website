/* Copied verbatim from desktop/src/icons.tsx, desktop/src/terminal.tsx and the
   NavIcon in desktop/src/App.tsx, so the hero window's marks are the app's own
   marks rather than lookalikes. Nothing here is site-specific: if a glyph looks
   different in the hero than it does in Shinbo, this file has drifted. */
import type { ReactElement, ReactNode } from "react";

export function Mark({ className = "" }: { className?: string }) {
  const BOW = [
    ".####......####.",
    ".######..######.",
    ".##..##oo##..##.",
    ".##..##oo##..##.",
    ".##..##oo##..##.",
    ".######oo######.",
    ".####..oo..####.",
    "......####......",
    ".....##..##.....",
    "....###..###....",
    "....##....##....",
  ];
  const pixels = BOW.flatMap((row, index) =>
    [...row]
      .map((ink, x) => ({ ink, x, y: index + 3 }))
      .filter((pixel) => pixel.ink !== "."),
  );
  return (
    <span className={`mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges">
        {pixels.map(({ ink, x, y }) => (
          <rect
            key={`${x},${y}`}
            x={x}
            y={y}
            width="1"
            height="1"
            opacity={ink === "o" ? 0.5 : undefined}
          />
        ))}
      </svg>
    </span>
  );
}

export function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 2H14v4.5M14 2l-5.5 5.5M6.5 14H2V9.5M2 14l5.5-5.5" />
    </svg>
  );
}

export function CaretIcon() {
  return (
    <svg
      className="caret"
      viewBox="0 0 16 16"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

export function ToolIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.4 1.9a3.6 3.6 0 0 0-4.2 4.6l-4.1 4.1a1.4 1.4 0 0 0 2 2l4.1-4.1a3.6 3.6 0 0 0 4.6-4.2L11 6.1 9.9 5 8.2 3.3z" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.4" />
      <path d="M10.4 10.4 14 14" />
    </svg>
  );
}

export function TextIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.6 3.6h10.8M2.6 6.8h10.8M2.6 10h7.6M2.6 13.2h5.4" />
    </svg>
  );
}

export function BranchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4.6" cy="3.3" r="1.8" />
      <circle cx="4.6" cy="12.7" r="1.8" />
      <circle cx="11.4" cy="5.6" r="1.8" />
      <path d="M4.6 5.1v5.8M11.4 7.4a3.6 3.6 0 0 1-3.6 3.6H4.6" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 4.1C6.9 3.1 5.5 2.6 3.6 2.6H2v9.6h1.6c1.9 0 3.3.5 4.4 1.5 1.1-1 2.5-1.5 4.4-1.5H14V2.6h-1.6c-1.9 0-3.3.5-4.4 1.5zM8 4.1v9.6" />
    </svg>
  );
}

export function GlassIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="4.2" cy="8" r="2.6" />
      <circle cx="11.8" cy="8" r="2.6" />
      <path d="M6.8 8h2.4M1.6 8V5.6M14.4 8V5.6" />
    </svg>
  );
}

export function TreeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.8 12.8V3.2h4.3l1.5 1.8h6.6v7.8z" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4M8 1.8c1.7 1.8 2.6 3.9 2.6 6.2S9.7 12.4 8 14.2C6.3 12.4 5.4 10.3 5.4 8s.9-4.4 2.6-6.2z" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 1.8 9.5 6 13.7 7.5 9.5 9 8 13.2 6.5 9 2.3 7.5 6.5 6zM12.8 11.6l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />
    </svg>
  );
}

export function PencilIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.2 2.3 13.7 4.8 5.4 13H2.9v-2.5z" />
      <path d="M9.7 3.8l2.5 2.5" />
    </svg>
  );
}

export function TerminalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1.6" y="2.6" width="12.8" height="10.8" />
      <path d="M4.2 6.1l2.3 2.3-2.3 2.3M8.6 10.7h3.2" />
    </svg>
  );
}

export function ReviewIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4 4.67 11.33 1.33 8" />
      <path d="M14.67 6.67 9.67 11.67 8.67 10.67" />
    </svg>
  );
}

export function InspectorIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1.6" y="2.6" width="12.8" height="10.8" />
      <path d="M10.6 2.6v10.8" />
    </svg>
  );
}

export function PinIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.6 1.9h4.8M6.4 1.9l-.5 4-2 1.7v1.3h8.2V7.6l-2-1.7-.5-4M8 8.9V14.1" />
    </svg>
  );
}

export function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <circle cx="3.4" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12.6" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 4h12M4.5 8h7M7 12h2" />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.8 12.8V3.2h4.3l1.5 1.8h6.6v7.8z" />
    </svg>
  );
}

export function HourglassIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.4 2.2h7.2M4.4 13.8h7.2M5.2 2.2v2.6L8 7.4l2.8-2.6V2.2M5.2 13.8v-2.6L8 8.6l2.8 2.6v2.6" />
    </svg>
  );
}

export function CurveIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 13.5V10M6 13.5V7.5M10 13.5V9M14 13.5V4.5" />
    </svg>
  );
}

const TOOL_MARKS: Record<string, () => ReactElement> = {
  read_file: BookIcon,
  read_tool_result: BookIcon,
  open_file: BookIcon,
  file_info: GlassIcon,
  vision: GlassIcon,
  look_at_image: GlassIcon,
  terminal: TerminalIcon,
  run_command: TerminalIcon,
  bash: TerminalIcon,
  grep_files: SearchIcon,
  glob_files: SearchIcon,
  semantic_search: SearchIcon,
  web_search: SearchIcon,
  search_tools: SearchIcon,
  mcp_search_tools: SearchIcon,
  edit_file: PencilIcon,
  write_file: PencilIcon,
  list_files: TreeIcon,
  create_folder: TreeIcon,
  web_fetch: GlobeIcon,
  save_page: GlobeIcon,
  browser: GlobeIcon,
  subagent: SparkIcon,
};

export function ToolMark({ name = "" }: { name?: string }) {
  const Glyph = TOOL_MARKS[name] ?? ToolIcon;
  return <Glyph />;
}

export function NavIcon({ view }: { view: string }) {
  const paths: Record<string, ReactNode> = {
    threads: (
      <>
        <path d="M13.8 9.2a1.3 1.3 0 0 1-1.3 1.3H5.4l-2.7 2.7V4a1.3 1.3 0 0 1 1.3-1.3h8.5A1.3 1.3 0 0 1 13.8 4z" />
        <path d="M5.4 5.9h5.2M5.4 8h3.4" />
      </>
    ),
    knowledge: (
      <>
        <path d="M8 4.4S6.6 3.1 3.2 3.1a.6.6 0 0 0-.6.6v7.6a.6.6 0 0 0 .6.6c3.4 0 4.8 1.3 4.8 1.3s1.4-1.3 4.8-1.3a.6.6 0 0 0 .6-.6V3.7a.6.6 0 0 0-.6-.6C9.4 3.1 8 4.4 8 4.4z" />
        <path d="M8 4.4v8.8" />
      </>
    ),
    artifacts: (
      <>
        <path d="M9.3 1.9H4.4a1 1 0 0 0-1 1v10.2a1 1 0 0 0 1 1h7.2a1 1 0 0 0 1-1V5.2z" />
        <path d="M9.3 1.9v3.3h3.3M5.9 8.4h4.2M5.9 10.9h2.8" />
      </>
    ),
    agent: (
      <>
        <path d="M8 1.4v2.1" />
        <rect x="2.9" y="3.5" width="10.2" height="8.9" rx="2.4" />
        <path d="M1.3 7.3v2.2M14.7 7.3v2.2M6.1 10.2h3.8" />
        <circle cx="6" cy="7.3" r="0.95" fill="currentColor" stroke="none" />
        <circle cx="10" cy="7.3" r="0.95" fill="currentColor" stroke="none" />
      </>
    ),
    scheduled: (
      <>
        <circle cx="8" cy="8" r="5.8" />
        <path d="M8 4.6V8l2.4 1.6" />
      </>
    ),
    plugins: (
      <>
        <path d="M6.1 2.2v3.2M9.9 2.2v3.2" />
        <path d="M4.3 5.4h7.4v2.4a3.7 3.7 0 0 1-7.4 0z" />
        <path d="M8 11.5v2.3" />
      </>
    ),
    archive: (
      <>
        <path d="M2.2 3.4h11.6v2.7H2.2z" />
        <path d="M3.3 6.1v6.1a1 1 0 0 0 1 1h7.4a1 1 0 0 0 1-1V6.1M6.4 8.6h3.2" />
      </>
    ),
    settings: (
      <g transform="scale(.667)" strokeWidth="1.95">
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
        <circle cx="12" cy="12" r="3" />
      </g>
    ),
    tiles: (
      <>
        <rect x="2.4" y="2.4" width="4.7" height="4.7" rx="1" />
        <rect x="8.9" y="2.4" width="4.7" height="4.7" rx="1" />
        <rect x="2.4" y="8.9" width="4.7" height="4.7" rx="1" />
        <rect x="8.9" y="8.9" width="4.7" height="4.7" rx="1" />
      </>
    ),
    more: <path d="M4 6.3 8 10.2l4-3.9" />,
  };
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[view]}
    </svg>
  );
}

const BRAND_FILES: Record<string, string> = {
  nvidia: "nvidia.svg",
  thinkingmachines: "thinkingmachines.svg",
  "z-ai": "zai.svg",
  poolside: "poolside.svg",
  cohere: "cohere.svg",
  ernie: "ernie.svg",
  hunyuan: "hunyuan.svg",
};

export function BrandIcon({
  ns,
  className,
}: {
  ns: string;
  className: string;
}) {
  const file = BRAND_FILES[ns];
  return file ? (
    <img
      className={`${className} brand-image`}
      draggable={false}
      src={`/brands/${file}`}
      alt=""
      aria-hidden="true"
    />
  ) : (
    <span className={`${className} brand-fallback`} aria-hidden="true">
      {ns.slice(0, 1).toUpperCase()}
    </span>
  );
}
