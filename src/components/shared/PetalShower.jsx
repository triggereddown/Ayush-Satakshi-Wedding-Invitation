import { useMemo } from 'react';

/**
 * PetalShower – global page-level falling petals overlay.
 *
 * Uses position:fixed + pointer-events:none so it:
 *   ✓ Covers the entire viewport at all scroll positions
 *   ✓ Never interferes with scrolling or taps
 *   ✓ Appears continuously throughout the whole page
 *
 * Mount once at the root level (App.jsx).
 */

const SYMBOLS = ['🌸', '🌺', '✿', '🍃', '🌼', '🍂', '✦', '🌹', '🌿'];
const COLORS  = [null, null, '#c89a42', null, null, null, '#c89a42', null, null];

// Deterministic pseudo-random — no re-render jitter
function sr(seed) {
  const x = Math.sin(seed + 1.618) * 10000;
  return x - Math.floor(x);
}

export function PetalShower({ count = 28 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const startX   = 1 + sr(i * 47 + 1) * 98;            // 1%–99% across viewport
      const dur      = 14 + sr(i * 47 + 2) * 14;           // 14s–28s — slow and graceful
      const delay    = -(sr(i * 47 + 3) * dur);            // stagger so all lanes populated immediately
      const size     = 0.8 + sr(i * 47 + 4) * 0.75;        // 0.8rem–1.55rem
      const swayPx   = (20 + sr(i * 47 + 5) * 55)
                       * (sr(i * 47 + 6) > 0.5 ? 1 : -1); // horizontal drift ±75px
      const rotDeg   = (90 + sr(i * 47 + 7) * 270)
                       * (sr(i * 47 + 8) > 0.5 ? 1 : -1); // 90°–360° tumble
      const depth    = 0.45 + sr(i * 47 + 9) * 0.6;        // depth illusion via scale
      const opacity  = 0.18 + depth * 0.38;                 // far=faint, close=solid

      return {
        sym:   SYMBOLS[i % SYMBOLS.length],
        color: COLORS[i % COLORS.length],
        startX, dur, delay, size, swayPx, rotDeg, depth, opacity,
      };
    });
  }, [count]);

  return (
    <div
      className="petal-shower-layer"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="petal-fall"
          style={{
            left:              `${p.startX}%`,
            fontSize:          `${p.size}rem`,
            color:             p.color || undefined,
            animationDuration: `${p.dur}s`,
            animationDelay:    `${p.delay}s`,
            '--sway':          `${p.swayPx}px`,
            '--rot':           `${p.rotDeg}deg`,
            '--depth':          p.depth,
            '--op':             p.opacity,
          }}
        >
          {p.sym}
        </span>
      ))}
    </div>
  );
}
