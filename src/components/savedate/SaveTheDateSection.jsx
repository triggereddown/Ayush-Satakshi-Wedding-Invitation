import { useEffect, useRef, useState } from 'react';
import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { fireRoyalConfetti } from '../../utils/confetti';

export function SaveTheDateSection({ config }) {
  const canvasRef = useRef(null);
  const cardContainerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fill foil overlay with luxury royal gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8B1A2A');
    gradient.addColorStop(0.5, '#6D1F24');
    gradient.addColorStop(1, '#4A1016');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text on foil
    ctx.fillStyle = '#E8C878';
    ctx.font = '600 13px "Cormorant SC", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL DATE ✦', width / 2, height / 2);

    const checkScratchedPercentage = () => {
      const imgData = ctx.getImageData(0, 0, width, height);
      let clearPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) {
          clearPixels++;
        }
      }
      const percentage = (clearPixels / (imgData.data.length / 4)) * 100;
      if (percentage > 35) {
        setIsRevealed(true);
      }
    };

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkScratchedPercentage();
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (width / rect.width),
        y: (clientY - rect.top) * (height / rect.height),
      };
    };

    const handleStart = (e) => {
      isDrawingRef.current = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleMove = (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, []);

  // Trigger celebratory royal confetti upon reveal
  useEffect(() => {
    if (isRevealed && !hasFiredRef.current) {
      hasFiredRef.current = true;
      const rect = cardContainerRef.current
        ? cardContainerRef.current.getBoundingClientRect()
        : null;
      fireRoyalConfetti(rect);
    }
  }, [isRevealed]);

  return (
    <section className="save-date-section" id="save-date-section">
      <FloatingElements theme="default" count={5} />

      <FadeIn delay={0}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>✦ {config.saveTheDate.eyebrow} ✦</p>
      </FadeIn>

      <FadeIn delay={80}>
        <p className="save-date-eyebrow">{config.saveTheDate.title}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <span className="divider-flower" aria-hidden="true" style={{ marginBottom: 32, display: 'block' }}>
          ✿
        </span>
      </FadeIn>

      {/* Real HTML5 Canvas Scratch Card */}
      <FadeIn delay={240}>
        <div
          ref={cardContainerRef}
          className={`scratch-card-container ${isRevealed ? 'is-revealed' : ''}`}
        >
          <div className="scratch-underlayer">
            <span className="scratch-revealed-text">{config.saveTheDate.dateText}</span>
          </div>

          <canvas
            ref={canvasRef}
            width={340}
            height={100}
            className={`scratch-canvas ${isRevealed ? 'is-revealed' : ''}`}
            aria-label="Interactive scratch card"
            style={{ touchAction: 'none' }}
          />
        </div>

        {isRevealed && (
          <p className="scratch-success-note" style={{ marginTop: 16 }}>
            ✨ Mark your calendars for our auspicious union! ✨
          </p>
        )}
      </FadeIn>
    </section>
  );
}
