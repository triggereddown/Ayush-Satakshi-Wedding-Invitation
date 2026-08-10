import { useState } from 'react';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';
import { playShankhaSound } from '../../utils/audioSynth';
import { ChromaKeyImage } from '../shared/ChromaKeyImage';

export function CoverSection({ config, isOpened, onOpen }) {
  const [isBlowing, setIsBlowing] = useState(false);

  const handleShankhaClick = (e) => {
    e.stopPropagation();
    if (isBlowing) return;
    setIsBlowing(true);
    playShankhaSound();
    setTimeout(() => {
      setIsBlowing(false);
    }, 4000);
  };

  return (
    <section className={`cover-section ${isOpened ? 'is-opened' : ''}`} id="cover-section">
      <FloatingElements theme="default" />

      {/* Bengali Alpana & Toran Framing */}
      <img
        src={assets.elements.bengaliToran}
        alt=""
        aria-hidden="true"
        className="bengali-top-toran"
        loading="eager"
      />

      <img
        src={assets.floral.a}
        alt=""
        aria-hidden="true"
        className="cover-flower-tl"
        loading="eager"
      />
      <img
        src={assets.floral.b}
        alt=""
        aria-hidden="true"
        className="cover-flower-tr"
        loading="eager"
      />

      {/* Ganesh Motif */}
      <div className="ganesh-wrapper">
        <img
          src={assets.ganesh}
          alt="Lord Ganesha"
          className="cover-ganesh"
          loading="eager"
        />
      </div>

      {/* Envelope Card */}
      <div className="envelope-scene">
        <button
          type="button"
          id="cover-envelope-btn"
          className={`bi-fold-container ${isOpened ? 'is-opened' : ''}`}
          onClick={onOpen}
          aria-label={isOpened ? 'Invitation opened' : 'Tap to open the invitation'}
        >
          {/* Left Flap */}
          <div className="bi-fold-flap flap-left">
            <img
              className="envelope-img"
              src={assets.opening.closedCard}
              alt=""
              loading="eager"
            />
          </div>

          {/* Right Flap */}
          <div className="bi-fold-flap flap-right">
            <img
              className="envelope-img"
              src={assets.opening.closedCard}
              alt=""
              loading="eager"
            />
          </div>

          {/* Wax seal */}
          <span className="wax-seal" aria-hidden="true" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img
              src={assets.logo}
              alt="Wedding Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(109,31,36,0.35))' }}
            />
          </span>
        </button>
      </div>

      {/* Prominent Auspicious Shankha Blow Banner */}
      <div className="cover-shankha-card-container">
        <button
          type="button"
          className={`shankha-luxury-btn ${isBlowing ? 'is-blowing' : ''}`}
          onClick={handleShankhaClick}
          aria-label="Tap to blow auspicious Shankha sound"
        >
          <div className="shankha-icon-glowing-ring">
            <ChromaKeyImage
              src={assets.elements.shankha}
              alt="Sacred Conch Shell"
              className="shankha-icon-hero"
              tolerance={35}
            />
            {isBlowing && (
              <>
                <span className="shankha-ring ring-1"></span>
                <span className="shankha-ring ring-2"></span>
                <span className="shankha-ring ring-3"></span>
              </>
            )}
          </div>
          <div className="shankha-text-block">
            <span className="shankha-hero-title">🪈 TAP TO BLOW SACRED SHANKH 🪈</span>
            <span className="shankha-hero-sub">✦ Click to play auspicious conch sound ✦</span>
          </div>
        </button>
      </div>

      {/* Text Configured Centralized */}
      <div className="cover-bottom">
        <h1 className="cover-you-re-invited" style={{ whiteSpace: 'pre-line' }}>
          {config.invitation.coverTitle}
        </h1>
        <p className="cover-subtitle">
          {config.invitation.coverSubtitle}
        </p>
        {!isOpened && (
          <span className="cover-tap-hint" aria-live="polite">
            {config.invitation.coverTapHint}
          </span>
        )}
      </div>
    </section>
  );
}

