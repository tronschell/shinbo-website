import * as THREE from "three";
import markSvg from "../public/shinbo.svg?raw";

/* The shinbo mark is a grid of 40px squares; each becomes a box. The front
   and back faces act as a clipping mask over a screen-fixed image (like a
   letter cut out of a photo); the sides are solid brand pink. It rotates
   with scroll and leans toward the pointer. */
const CELL = 40;
const DEPTH = 3.2;
const shots = [
  "/shots/thumbs/workspace-720.webp",
  "/bg/plate-6.webp",
  "/shots/thumbs/agent-720.webp",
  "/bg/plate-3.webp",
  "/shots/thumbs/jobs-720.webp",
  "/bg/plate-1.webp",
];

function cells() {
  const out: [number, number][] = [];
  for (const m of markSvg.matchAll(/<rect x="(\d+)" y="(\d+)"/g))
    out.push([+m[1] / CELL, +m[2] / CELL]);
  return out;
}

const vert = /* glsl */ `
varying vec3 vN;
void main() {
  vN = normalize(normalMatrix * mat3(instanceMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uA, uB;
uniform float uMix, uShift;
uniform vec2 uRes, uAspA, uAspB;
uniform vec3 uColor;
varying vec3 vN;
vec2 cover(vec2 uv, vec2 asp) { return (uv - 0.5) * asp + 0.5; }
void main() {
  vec3 n = normalize(vN);
  if (abs(n.z) > 0.5) {
    vec2 uv = gl_FragCoord.xy / uRes;
    uv.x += uShift;
    vec3 a = texture2D(uA, cover(uv, uAspA)).rgb;
    vec3 b = texture2D(uB, cover(uv, uAspB)).rgb;
    vec3 c = mix(a, b, uMix) * 1.6 + 0.06;
    gl_FragColor = vec4(mix(c, uColor, 0.18) * (n.z > 0.0 ? 1.0 : 0.55), 1.0);
  } else {
    float l = 0.45 + 0.55 * max(dot(n, normalize(vec3(0.4, 0.8, 0.6))), 0.0);
    gl_FragColor = vec4(uColor * l, 1.0);
  }
}`;

export function renderHeroMark(el: HTMLDivElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { antialias: true, alpha: true });
  if (!context) return () => {};
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      antialias: true,
      alpha: true,
    });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  let disposed = false;
  let raf = 0;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 200);
  camera.position.z = 27;

  const pts = cells();
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs) + 1) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys) + 1) / 2;
  const loader = new THREE.TextureLoader();
  let loaded = 0;
  const tex = shots.map((src) => {
    const t = loader.load(src, () => {
      loaded++;
      if (!disposed && loaded === shots.length)
        raf = requestAnimationFrame(tick);
    });
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  const asp = (t: THREE.Texture, out: THREE.Vector2) => {
    const img = t.image as HTMLImageElement | undefined;
    const ia = img?.width ? img.width / img.height : 1;
    const sa = el.clientWidth / Math.max(el.clientHeight, 1);
    // cover-fit the image to the canvas
    return sa > ia ? out.set(1, sa / ia) : out.set(ia / sa, 1);
  };
  const u = {
    uA: { value: tex[0] },
    uB: { value: tex[1] },
    uMix: { value: 0 },
    uShift: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uAspA: { value: new THREE.Vector2(1, 1) },
    uAspB: { value: new THREE.Vector2(1, 1) },
    uColor: { value: new THREE.Color("#ff5c94") },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: vert,
    fragmentShader: frag,
  });
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, DEPTH),
    mat,
    pts.length,
  );
  const m = new THREE.Matrix4();
  pts.forEach(([x, y], i) => {
    m.makeTranslation(x + 0.5 - cx, cy - y - 0.5, 0);
    mesh.setMatrixAt(i, m);
  });
  scene.add(mesh);

  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    u.uRes.value.set(
      w * renderer.getPixelRatio(),
      h * renderer.getPixelRatio(),
    );
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  // Pointer in client px; the mark turns to face it (see tick).
  let px = NaN;
  let py = NaN;
  const onMove = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
  };
  addEventListener("pointermove", onMove, { passive: true });

  let yaw = 0;
  let pitch = 0;
  let start: number | undefined;
  const tick = (now: number) => {
    if (disposed) return;
    // rAF uses its own timestamp: the first callback defines time zero.
    start ??= now;
    const t = Math.max(0, now - start) / 1000;
    const r = el.getBoundingClientRect();
    const scroll = scrollY / innerHeight;
    // Face the pointer: yaw/pitch from the canvas centre, as if the mark
    // sat one canvas-width behind the screen. Eased so it never snaps.
    const look = !Number.isNaN(px);
    const ty = look ? Math.atan2(px - (r.left + r.width / 2), r.width) : 0;
    const tx = look ? Math.atan2(py - (r.top + r.height / 2), r.width) : 0;
    yaw += (ty - yaw) * 0.12;
    pitch += (tx - pitch) * 0.12;
    const sway = Math.sin(t * 0.4) * 0.05;
    mesh.rotation.y = scroll * Math.PI * 1.2 + yaw + sway;
    mesh.rotation.x = pitch;
    u.uShift.value = mesh.rotation.y * 0.05;
    // crossfade to the next image every 3.5s
    const phase = (t / 3.5) % shots.length;
    const i = Math.floor(phase);
    u.uA.value = tex[i];
    u.uB.value = tex[(i + 1) % shots.length];
    u.uMix.value = THREE.MathUtils.smoothstep(phase - i, 0.7, 1);
    asp(u.uA.value, u.uAspA.value);
    asp(u.uB.value, u.uAspB.value);
    try {
      renderer.render(scene, camera);
      el.dataset.rendered = "true";
      raf = requestAnimationFrame(tick);
    } catch {
      dispose(); // Keep the static mark if a graphics driver fails.
    }
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    dispose();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  el.appendChild(canvas);

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    removeEventListener("pointermove", onMove);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    ro.disconnect();
    mesh.geometry.dispose();
    mat.dispose();
    tex.forEach((t) => t.dispose());
    renderer.dispose();
    if (!context!.isContextLost()) renderer.forceContextLoss();
    canvas.remove();
    delete el.dataset.rendered;
  }
  return dispose;
}
