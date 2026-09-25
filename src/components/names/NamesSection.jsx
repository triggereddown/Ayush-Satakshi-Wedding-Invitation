import { useState, useEffect, useRef } from 'react';
import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';
import { ChromaKeyImage } from '../shared/ChromaKeyImage';

export function NamesSection({ config }) {
  const { groom, bride } = config;
  const [drishtiRevealed, setDrishtiRevealed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const coupleContainerRef = useRef(null);
  const lastTapTimeRef = useRef(0);

  const handleBrideClick = () => {
    if (drishtiRevealed) return;
    setDrishtiRevealed(true);
  };

  const handleRomanticClick = (e) => {
    // Avoid rapid duplicate fire from synthesized click after touch
    const now = Date.now();
    if (e.type === 'click' && now - lastTapTimeRef.current < 250) {
      return;
    }
    if (e.type === 'touchstart') {
      lastTapTimeRef.current = now;
    }

    const container = coupleContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    let clickX = rect.width / 2;
    let clickY = rect.height * 0.45;

    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);

    if (clientX != null && clientY != null) {
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        clickX = relX;
        clickY = relY;
      }
    }

    // Spawn 6 floating hearts from tapped location
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Math.random() + Date.now() + i,
      x: clickX,
      y: clickY,
      size: 16 + Math.random() * 14,
      delay: i * 0.1,
      tx: (Math.random() - 0.5) * 110,
    }));

    setHearts((prev) => [...prev.slice(-24), ...newHearts]);
  };

  // Clean up hearts after they float away
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <section className="names-section" id="names-section">
      <FloatingElements theme="default" count={6} />

      {/* Background Rotating White Bengali Alpana */}
      <div className="names-alpana-bg-container">
        <ChromaKeyImage
          src={assets.elements.bengaliAlpanaWhite}
          alt=""
          aria-hidden="true"
          className="names-rotating-alpana"
          tolerance={35}
        />
      </div>

      {/* Bengali Calligraphy Subheader */}
      <FadeIn delay={0}>
        <p className="bengali-calligraphy-sub">|| শুভ বিবাহ ||</p>
      </FadeIn>

      {/* Romantic couple illustration (braiding hair) */}
      <FadeIn delay={50}>
        <div className="romantic-couple-block">
          <div 
            ref={coupleContainerRef}
            className="romantic-couple-container" 
            onClick={handleRomanticClick}
            onTouchStart={handleRomanticClick}
            role="button"
            tabIndex={-1}
            aria-label="Tap to produce hearts"
          >
            <ChromaKeyImage
              src={assets.elements.romanticCouple}
              alt="Traditional Bengali Romantic Couple Illustration"
              className="names-couple-illustration romantic-couple-img"
              tolerance={45}
              draggable="false"
            />
            {hearts.map((heart) => (
              <span
                key={heart.id}
                className="romantic-heart-el"
                style={{
                  left: `${heart.x}px`,
                  top: `${heart.y}px`,
                  fontSize: `${heart.size}px`,
                  animationDelay: `${heart.delay}s`,
                  '--tx': `${heart.tx}px`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>
          <div 
            className="romantic-hint-badge" 
            onClick={handleRomanticClick}
            onTouchStart={handleRomanticClick}
            role="button"
            tabIndex={-1}
          >
            ✦ TAP FOR LOVE ✦
          </div>
        </div>
      </FadeIn>

      {/* Groom name */}
      <FadeIn delay={100}>
        <div className="names-groom-block">
          <div className="caricature-chroma-wrapper">
            <ChromaKeyImage
              src={assets.bengaliGroom}
              alt="Bengali Groom Caricature"
              className="character-caricature"
              tolerance={45}
            />
          </div>
          <p className="name-script">{groom.firstName}</p>
          <p
            className="blessing-relation-tag"
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--muted)',
              letterSpacing: '0.04em',
              margin: '0 0 6px',
            }}
          >
            (Only Son)
          </p>
          <p className="names-parent">
            S/o {groom.father} &amp; {groom.mother}
          </p>
          <p className="names-grandparent">
            Grandson of {groom.grandfather} &amp; {groom.grandmother}
          </p>
        </div>
      </FadeIn>

      {/* Weds connector */}
      <FadeIn delay={200}>
        <p className="weds-text" style={{ margin: '16px 0' }}>weds</p>
      </FadeIn>

      {/* Bride name */}
      <FadeIn delay={300}>
        <div className="names-bride-block">
          <p className="bengali-calligraphy-tag">শুভ দৃষ্টি</p>
          <div className="shubho-drishti-caricature-wrapper">
            <ChromaKeyImage
              src={assets.bengaliBride}
              alt="Bengali Bride Caricature"
              className="character-caricature"
              tolerance={45}
            />
            {/* Betel Leaves overlay for Shubho Drishti */}
            <div
              className={`betel-leaves-overlay ${drishtiRevealed ? 'revealed' : ''}`}
              onClick={handleBrideClick}
            >
              <ChromaKeyImage
                src={assets.elements.betelLeaf}
                alt="Left Betel Leaf"
                className="paan-leaf left-leaf"
                mode="magenta"
                tolerance={40}
              />
              <ChromaKeyImage
                src={assets.elements.betelLeaf}
                alt="Right Betel Leaf"
                className="paan-leaf right-leaf"
                mode="magenta"
                tolerance={40}
              />
              {!drishtiRevealed && (
                <div className="drishti-hint">
                  <span className="drishti-sparkle">✦</span>
                  <span className="drishti-hint-text">Lift Paan Leaves</span>
                  <span className="drishti-sparkle">✦</span>
                </div>
              )}
            </div>
          </div>
          <p className="name-script">{bride.firstName}</p>
          <p
            className="blessing-relation-tag"
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--muted)',
              letterSpacing: '0.04em',
              margin: '0 0 6px',
            }}
          >
            (Only Daughter)
          </p>
          <p className="names-parent">
            D/o {bride.father} &amp; {bride.mother}
          </p>
          <p className="names-grandparent">
            Granddaughter of {bride.grandfather} &amp; {bride.grandmother}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
