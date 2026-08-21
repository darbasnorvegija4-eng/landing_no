"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./roof-assembly-overlay.module.css";

const SOURCE = { width: 1734, height: 907 } as const;
const ROOF = { left: 448, top: 112, width: 1048, height: 238 } as const;
const ASSETS = [
  {
    src: "/gallery/marketing/roof-assembly/rafters.webp",
    className: styles.rafters,
  },
  {
    src: "/gallery/marketing/roof-assembly/membrane-battens.webp",
    className: styles.membrane,
  },
  {
    src: "/gallery/marketing/roof-assembly/tiles.webp",
    className: styles.tiles,
  },
] as const;

const PART_TYPES = [
  "screw",
  "washer",
  "bracket",
  "clip",
  "beam",
  "batten",
  "tile",
  "ridge",
  "flashing",
  "gutter",
  "pipe",
  "hook",
  "roll",
  "vent",
] as const;

type PartType = (typeof PART_TYPES)[number];
type ZoneGeometry = {
  left: number;
  top: number;
  width: number;
  height: number;
  viewportWidth: number;
};
type ParticleStyle = CSSProperties & Record<`--${string}`, string>;
type NetworkInformation = { saveData?: boolean; effectiveType?: string };
type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.731 + salt * 17.117) * 43758.5453;
  return value - Math.floor(value);
}

function sourcePoint(
  side: number,
  width: number,
  height: number,
  index: number,
) {
  if (side === 0)
    return [
      -width * (0.08 + seeded(index, 1) * 0.14),
      height * (0.08 + seeded(index, 2) * 0.84),
    ];
  if (side === 1)
    return [
      width * (1.08 + seeded(index, 3) * 0.14),
      height * (0.08 + seeded(index, 4) * 0.84),
    ];
  if (side === 2)
    return [
      width * (0.03 + seeded(index, 5) * 0.94),
      -height * (0.2 + seeded(index, 6) * 0.34),
    ];
  return [
    width * (0.03 + seeded(index, 7) * 0.94),
    height * (1.14 + seeded(index, 8) * 0.28),
  ];
}

function landingPoint(
  type: PartType,
  width: number,
  height: number,
  index: number,
) {
  const x = width * (0.08 + seeded(index, 9) * 0.84);
  if (type === "gutter" || type === "hook" || type === "pipe")
    return [x, height * (0.78 + seeded(index, 10) * 0.13)];
  if (type === "ridge")
    return [
      width * (0.17 + seeded(index, 11) * 0.58),
      height * (0.12 + seeded(index, 12) * 0.08),
    ];
  if (type === "beam") return [x, height * (0.32 + seeded(index, 13) * 0.48)];
  if (type === "roll") return [x, height * (0.28 + seeded(index, 14) * 0.34)];
  return [x, height * (0.2 + seeded(index, 15) * 0.62)];
}

function flightDuration(type: PartType, index: number) {
  if (
    type === "beam" ||
    type === "bracket" ||
    type === "screw" ||
    type === "washer"
  )
    return 2500 + seeded(index, 16) * 850;
  if (type === "roll" || type === "batten" || type === "flashing")
    return 3550 + seeded(index, 17) * 850;
  if (type === "tile" || type === "ridge" || type === "vent")
    return 5000 + seeded(index, 18) * 850;
  return 5700 + seeded(index, 19) * 700;
}

function buildParticles(count: number, width: number, height: number) {
  return Array.from({ length: count }, (_, index) => {
    const type = PART_TYPES[index % PART_TYPES.length];
    const [sx, sy] = sourcePoint(index % 4, width, height, index);
    const [tx, ty] = landingPoint(type, width, height, index);
    const mx = (sx + tx) / 2 + (seeded(index, 20) - 0.5) * width * 0.18;
    const my = (sy + ty) / 2 - height * (0.18 + seeded(index, 21) * 0.26);
    const z = 70 + seeded(index, 22) * 300;
    const direction = seeded(index, 23) > 0.5 ? 1 : -1;
    const spin = direction * (240 + seeded(index, 24) * 620);
    const duration = flightDuration(type, index);
    const delay = seeded(index, 25) * 240;

    return {
      type,
      style: {
        "--sx": `${sx.toFixed(1)}px`,
        "--sy": `${sy.toFixed(1)}px`,
        "--mx": `${mx.toFixed(1)}px`,
        "--my": `${my.toFixed(1)}px`,
        "--tx": `${tx.toFixed(1)}px`,
        "--ty": `${ty.toFixed(1)}px`,
        "--z": `${z.toFixed(1)}px`,
        "--mz": `${(z * 0.42).toFixed(1)}px`,
        "--spin": `${spin.toFixed(1)}deg`,
        "--spin-38": `${(spin * 0.38).toFixed(1)}deg`,
        "--spin-46": `${(spin * 0.46).toFixed(1)}deg`,
        "--spin-52": `${(spin * 0.52).toFixed(1)}deg`,
        "--spin-72": `${(spin * 0.72).toFixed(1)}deg`,
        "--spin-84": `${(spin * 0.84).toFixed(1)}deg`,
        "--duration": `${duration.toFixed(0)}ms`,
        "--delay": `${delay.toFixed(0)}ms`,
        "--scale": (0.65 + seeded(index, 26) * 0.5).toFixed(2),
      } as ParticleStyle,
    };
  });
}

function shouldSkipAnimation() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;

  return (
    reducedMotion ||
    connection?.saveData ||
    connection?.effectiveType === "2g" ||
    (deviceMemory !== undefined && deviceMemory <= 2)
  );
}

export function RoofAssemblyOverlay({ imageReady }: { imageReady: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [geometry, setGeometry] = useState<ZoneGeometry | null>(null);
  const [prepared, setPrepared] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateGeometry = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.max(width / SOURCE.width, height / SOURCE.height);
      const renderedWidth = SOURCE.width * scale;
      const renderedHeight = SOURCE.height * scale;
      const offsetX = (width - renderedWidth) / 2;
      const offsetY = (height - renderedHeight) / 2;

      setGeometry({
        left: offsetX + ROOF.left * scale,
        top: offsetY + ROOF.top * scale,
        width: ROOF.width * scale,
        height: ROOF.height * scale,
        viewportWidth: width,
      });
    };

    updateGeometry();
    const resizeObserver = new ResizeObserver(updateGeometry);
    resizeObserver.observe(root);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    intersectionObserver.observe(root);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!imageReady || shouldSkipAnimation()) return;

    const prepare = () => setPrepared(true);
    const idleWindow = window as IdleWindow;
    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prepare, { timeout: 1400 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(prepare, 350);
    return () => window.clearTimeout(timeoutId);
  }, [imageReady]);

  useEffect(() => {
    if (!prepared) return;
    let cancelled = false;

    Promise.all(
      ASSETS.map(
        (asset) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new window.Image();
            image.decoding = "async";
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = asset.src;
          }),
      ),
    )
      .then((images) => {
        if (cancelled) return;
        imagesRef.current = images;
        setAssetsReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [prepared]);

  useEffect(() => {
    if (!assetsReady || !geometry) return;

    const pixelRatio = Math.max(
      0.75,
      Math.min(window.devicePixelRatio || 1, 1.5, 1200 / geometry.width),
    );
    const canvasWidth = Math.max(1, Math.round(geometry.width * pixelRatio));
    const canvasHeight = Math.max(1, Math.round(geometry.height * pixelRatio));

    canvasRefs.current.forEach((canvas, index) => {
      const image = imagesRef.current[index];
      if (!canvas || !image) return;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    });
  }, [assetsReady, geometry]);

  useEffect(() => {
    if (!prepared || !assetsReady || !inView || failed) return;
    const frame = window.requestAnimationFrame(() => setActive(true));
    return () => window.cancelAnimationFrame(frame);
  }, [assetsReady, failed, inView, prepared]);

  useEffect(() => {
    if (!active) return;
    const timeoutId = window.setTimeout(() => setFinished(true), 8200);
    return () => window.clearTimeout(timeoutId);
  }, [active]);

  const particles = useMemo(() => {
    if (!geometry) return [];
    return buildParticles(
      geometry.viewportWidth < 640 ? 36 : 72,
      geometry.width,
      geometry.height,
    );
  }, [geometry]);

  if (finished || failed) return null;

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      {prepared && geometry ? (
        <div
          className={`${styles.zone} ${active ? styles.active : ""}`}
          style={{
            left: geometry.left,
            top: geometry.top,
            width: geometry.width,
            height: geometry.height,
          }}
        >
          <div className={styles.cover} />
          {ASSETS.map((asset, index) => (
            <canvas
              key={asset.src}
              ref={(canvas) => {
                canvasRefs.current[index] = canvas;
              }}
              className={`${styles.stage} ${asset.className}`}
            />
          ))}
          <div className={styles.parts}>
            {particles.map((particle, index) => (
              <span
                key={`${particle.type}-${index}`}
                className={`${styles.part} ${styles[particle.type]}`}
                style={particle.style}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
