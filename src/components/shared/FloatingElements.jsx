/**
 * FloatingElements – scattered emoji petals, flowers, leaves
 * that drift gently over each section (decoration only).
 */
export function FloatingElements({ theme = 'default', count = 8 }) {
  const configs = {
    default: [
      { el: '🌸', top: '8%',  left: '7%',  delay: '0s',   size: '1.1rem' },
      { el: '🍂', top: '15%', right: '8%', delay: '1.2s', size: '0.9rem' },
      { el: '✿',  top: '25%', left: '3%',  delay: '2.1s', size: '1rem',  color: '#c89a42' },
      { el: '🌺', top: '60%', right: '5%', delay: '0.6s', size: '1rem'   },
      { el: '🍀', top: '75%', left: '6%',  delay: '3.0s', size: '0.85rem'},
      { el: '✦',  top: '40%', right: '4%', delay: '1.8s', size: '0.8rem', color: '#c89a42' },
      { el: '🌼', top: '88%', right: '9%', delay: '0.9s', size: '0.95rem'},
      { el: '🌿', top: '50%', left: '2%',  delay: '2.5s', size: '0.85rem'},
    ],
    haldi: [
      { el: '✿',  top: '10%', left: '6%',  delay: '0s',   size: '1.1rem', color: '#d4920a' },
      { el: '🌼', top: '18%', right: '7%', delay: '1s',   size: '1rem'   },
      { el: '✦',  top: '35%', left: '4%',  delay: '2s',   size: '0.9rem', color: '#c89a42' },
      { el: '🌸', top: '55%', right: '5%', delay: '0.5s', size: '1rem'   },
      { el: '🌾', top: '70%', left: '5%',  delay: '1.5s', size: '0.85rem'},
      { el: '⭐', top: '82%', right: '8%', delay: '2.5s', size: '0.8rem', color: '#d4920a' },
    ],
    mehndi: [
      { el: '🍃', top: '8%',  left: '5%',  delay: '0s',   size: '1rem'   },
      { el: '✿',  top: '20%', right: '6%', delay: '1.4s', size: '1.1rem', color: '#4a7c59' },
      { el: '🌺', top: '40%', left: '3%',  delay: '0.7s', size: '1rem'   },
      { el: '🍀', top: '55%', right: '4%', delay: '2.2s', size: '0.9rem' },
      { el: '🌿', top: '72%', left: '6%',  delay: '1s',   size: '0.85rem'},
      { el: '🦋', top: '30%', right: '8%', delay: '3s',   size: '1.1rem' },
    ],
    sangeet: [
      { el: '🎵', top: '12%', left: '7%',  delay: '0s',   size: '1.2rem' },
      { el: '✦',  top: '22%', right: '8%', delay: '1s',   size: '1rem',  color: '#8a86cc' },
      { el: '🎶', top: '45%', left: '4%',  delay: '2.1s', size: '1.1rem' },
      { el: '💫', top: '60%', right: '5%', delay: '0.5s', size: '1rem'   },
      { el: '⭐', top: '75%', left: '5%',  delay: '1.8s', size: '0.9rem', color: '#c89a42' },
      { el: '🎵', top: '85%', right: '7%', delay: '2.7s', size: '1rem'   },
    ],
    wedding: [
      { el: '🌸', top: '8%',  left: '6%',  delay: '0s',   size: '1rem'   },
      { el: '✦',  top: '18%', right: '7%', delay: '1.2s', size: '0.9rem', color: '#c89a42' },
      { el: '🌹', top: '38%', left: '3%',  delay: '2.4s', size: '1.1rem' },
      { el: '🍃', top: '55%', right: '5%', delay: '0.6s', size: '0.9rem' },
      { el: '🌺', top: '70%', left: '5%',  delay: '1.8s', size: '1rem'   },
      { el: '✿',  top: '82%', right: '8%', delay: '3s',   size: '0.9rem', color: '#c89a42' },
    ],
  };

  const items = configs[theme] || configs.default;

  return (
    <>
      {items.slice(0, count).map((item, i) => (
        <span
          key={i}
          className="float-el"
          aria-hidden="true"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            color: item.color || undefined,
            animationDelay: item.delay,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        >
          {item.el}
        </span>
      ))}
    </>
  );
}
