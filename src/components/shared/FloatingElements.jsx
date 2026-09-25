import { useMemo } from 'react';

/**
 * FloatingElements – 3D depth-falling petals and flowers.
 *
 * Renders a fixed-position overlay layer so petals are NEVER clipped by
 * the parent section's overflow, and always visible on screen.
 * The layer is pointer-events:none so it never interferes with touch.
 */

const THEMES = {
  default: {
    symbols: ['🌸', '🌺', '✿', '🍂', '🌼', '✦', '🌿', '🍃'],
    colors:  [null, null, '#c89a42', null, null, '#c89a42', null, null],
  },
  haldi: {
    symbols: ['✿', '🌼', '✦', '🌸', '🌾', '⭐'],
    colors:  ['#d4920a', null, '#c89a42', null, null, '#d4920a'],
  },
  mehndi: {
    symbols: ['🍃', '✿', '🌺', '🍀', '🌿', '🦋'],
    colors:  [null, '#4a7c59', null, null, null, null],
  },
  sangeet: {
    symbols: ['🎵', '✦', '🎶', '💫', '⭐', '🎵'],
    colors:  [null, '#8a86cc', null, null, '#c89a42', null],
  },
  wedding: {
    symbols: ['🌸', '✦', '🌹', '🍃', '🌺', '✿'],
    colors:  [null, '#c89a42', null, null, null, '#c89a42'],
  },
  reception: {
    symbols: ['✨', '🥂', '✦', '💫', '⭐', '🌸'],
    colors:  ['#c89a42', null, '#e0c068', null, '#c89a42', null],
  },
};

// Deterministic pseudo-random — stable across re-renders
function sr(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function FloatingElements({ theme = 'default', count = 6 }) {
  const { symbols, colors } = THEMES[theme] || THEMES.default;

  const particles = useMemo(() => {
    const n = Math.min(count, 12);
    return Array.from({ length: n }, (_, i) => {
      const startX  = 3 + sr(i * 31 + 1) * 94;            // 3%–97%
      const dur     = 12 + sr(i * 31 + 2) * 10;            // 12s–22s
      const delay   = -(sr(i * 31 + 3) * dur);             // stagger: already mid-flight
      const size    = 0.9 + sr(i * 31 + 4) * 0.7;          // 0.9rem–1.6rem
      const swayPx  = (22 + sr(i * 31 + 5) * 55)
                      * (sr(i * 31 + 6) > 0.5 ? 1 : -1);
      const rotDeg  = (110 + sr(i * 31 + 7) * 230)
                      * (sr(i * 31 + 8) > 0.5 ? 1 : -1);
      const depth   = 0.48 + sr(i * 31 + 9) * 0.57;        // 0.48–1.05 for z illusion
      const opacity = 0.2 + depth * 0.45;

      return {
        sym:   symbols[i % symbols.length],
        color: colors[i % colors.length],
        startX, dur, delay, size, swayPx, rotDeg, depth, opacity,
      };
    });
  }, [theme, count, symbols, colors]);

  return (
    <div className="fall-layer" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="fall-el"
          style={{
            left:              `${p.startX}%`,
            fontSize:          `${p.size}rem`,
            color:             p.color || undefined,
            animationDuration: `${p.dur}s`,
            animationDelay:    `${p.delay}s`,
            '--sway':          `${p.swayPx}px`,
            '--rot':           `${p.rotDeg}deg`,
            '--depth':         p.depth,
            '--op':            p.opacity,
          }}
        >
          {p.sym}
        </span>
      ))}
    </div>
  );
}
