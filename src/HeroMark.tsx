import { useEffect, useRef } from "react";

export default function HeroMark({ playing = false }: { playing?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    const el = host.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    let visible = false;
    let active = false;
    let version = 0;
    let stop: (() => void) | undefined;
    let cancelLoad: (() => void) | undefined;
    const update = () => {
      const next =
        visible && !document.hidden && !reduce.matches && desktop.matches;
      if (next === active) return;
      active = next;
      const current = ++version;
      cancelLoad?.();
      cancelLoad = undefined;
      stop?.();
      stop = undefined;
      if (active) {
        const load = () => {
          cancelLoad = undefined;
          if (!active || current !== version) return;
          void import("./hero-mark-renderer")
            .then(({ renderHeroMark }) => {
              if (active && current === version) stop = renderHeroMark(el);
            })
            .catch(() => {
              // The initial SVG remains visible if loading or WebGL fails.
            });
        };
        // Paint the static page first, then enhance it during browser idle time.
        const frame = requestAnimationFrame(() => {
          if (typeof window.requestIdleCallback === "function") {
            const idle = window.requestIdleCallback(load);
            cancelLoad = () => window.cancelIdleCallback(idle);
          } else {
            const timer = window.setTimeout(load, 0);
            cancelLoad = () => window.clearTimeout(timer);
          }
        });
        cancelLoad = () => cancelAnimationFrame(frame);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    reduce.addEventListener("change", update);
    desktop.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      active = false;
      version++;
      cancelLoad?.();
      stop?.();
      observer.disconnect();
      reduce.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [playing]);
  return (
    <div className="fg-hero-mark" ref={host} aria-hidden="true">
      <img
        className="fg-hero-mark-fallback"
        src="/shinbo.svg"
        width="440"
        height="440"
        alt=""
      />
    </div>
  );
}
