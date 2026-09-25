// Premium Royal Wedding Confetti Engine
// Custom zero-dependency canvas confetti with gold foil ribbons, 4-point stars, and crimson petals

const ROYAL_COLORS = [
  '#D4AF37', // Pure Royal Gold
  '#F5D77F', // Champagne Gold
  '#E6C280', // Soft Foil Gold
  '#AA771C', // Antique Bronze Gold
  '#8B1A2A', // Royal Bengali Crimson
  '#A52035', // Rose Crimson
  '#6B1420', // Deep Rich Wine
  '#FFF4DC', // Warm Pearl
];

function draw4PointStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

export function fireRoyalConfetti(cardRect) {
  // If already a confetti canvas running, remove it
  const existing = document.getElementById('royal-confetti-canvas');
  if (existing) {
    existing.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'royal-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  };
  resize();

  // Burst coordinates: center of the scratch card or middle-center
  const originX = cardRect
    ? cardRect.left + cardRect.width / 2
    : window.innerWidth / 2;
  const originY = cardRect
    ? cardRect.top + cardRect.height / 2
    : window.innerHeight * 0.55;

  const particles = [];
  const totalCount = 140;

  function createParticle(spawnX, spawnY, isSecondary = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = isSecondary
      ? 5 + Math.random() * 8
      : 8 + Math.random() * 12;
    
    // Spread velocity with upward bias
    const vx = Math.cos(angle) * speed * (0.8 + Math.random() * 0.5);
    const vy = (Math.sin(angle) * speed * 0.8) - (5 + Math.random() * 7);

    const typeRand = Math.random();
    let type = 'ribbon';
    if (typeRand < 0.35) type = 'star';
    else if (typeRand < 0.6) type = 'disc';

    const color = ROYAL_COLORS[Math.floor(Math.random() * ROYAL_COLORS.length)];
    const size = type === 'star' ? 4 + Math.random() * 6 : 6 + Math.random() * 6;

    return {
      x: spawnX,
      y: spawnY,
      vx,
      vy,
      gravity: 0.28 + Math.random() * 0.12,
      drag: 0.982,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.06 + Math.random() * 0.08,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      type,
      size,
      width: size * (type === 'ribbon' ? 1.6 : 1),
      height: size,
      color,
      opacity: 1,
      fadeRate: 0.005 + Math.random() * 0.006,
    };
  }

  // Wave 1: Immediate celebratory explosion from left & right of card
  for (let i = 0; i < totalCount; i++) {
    const xOffset = (Math.random() - 0.5) * (cardRect ? cardRect.width * 0.8 : 100);
    particles.push(createParticle(originX + xOffset, originY));
  }

  // Wave 2: Secondary golden shimmer after 220ms
  setTimeout(() => {
    for (let i = 0; i < 45; i++) {
      const xOffset = (Math.random() - 0.5) * (cardRect ? cardRect.width : 160);
      particles.push(createParticle(originX + xOffset, originY - 10, true));
    }
  }, 220);

  let animationFrameId;
  let startTime = null;

  function render(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.opacity <= 0.01) continue;

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;

      // Start gradual fade out after 1.4s
      if (elapsed > 1400) {
        p.opacity -= p.fadeRate * 1.5;
      }

      if (p.opacity > 0 && p.y < window.innerHeight + 50) {
        activeCount++;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D flutter effect using wobble scale
        const scaleX = Math.cos(p.wobble);
        ctx.scale(scaleX, 1);

        ctx.fillStyle = p.color;

        if (p.type === 'star') {
          draw4PointStar(ctx, 0, 0, 4, p.size * 1.4, p.size * 0.4);
        } else if (p.type === 'disc') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ribbon
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          // Highlight edge on foil
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width * 0.35, p.height);
        }

        ctx.restore();
      }
    }

    if (activeCount > 0 && elapsed < 4500) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Clean up completely
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}
