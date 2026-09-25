import { useState } from 'react';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function CoverSection({ config, isOpened, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleCardClick = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Flaps unfold gracefully and slightly slower, then smoothly glide into landing page
    setTimeout(() => {
      setIsEntering(true);
    }, 1350);

    setTimeout(() => {
      onOpen();
    }, 1850);
  };

  const isCardOpened = isOpening || isOpened;

  return (
    <section
      className={`cover-section ${isOpening ? 'is-opening' : ''} ${isEntering ? 'is-entering' : ''} ${isOpened ? 'is-opened' : ''}`}
      id="cover-section"
    >
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

      {/* Main Centered Content */}
      <div className="cover-main-center">
        {/* Title above card */}
        <div className="cover-header-text">
          <p className="cover-shubho-bengali">|| শুভ বিবাহ ||</p>
          <h1 className="cover-you-re-invited" style={{ whiteSpace: 'pre-line' }}>
            {config.invitation.coverTitle}
          </h1>
          <p className="cover-subtitle">
            {config.invitation.coverSubtitle}
          </p>
        </div>

        {/* Envelope Card */}
        <div className="envelope-scene">
          <button
            type="button"
            id="cover-envelope-btn"
            className={`bi-fold-container ${isCardOpened ? 'is-opened' : ''}`}
            onClick={handleCardClick}
            aria-label={isOpened ? 'Invitation opened' : 'Tap to open the invitation'}
          >
            {/* Inside Golden Parchment revealed as flaps open */}
            <div className="bi-fold-inside" aria-hidden="true">
              <div className="inside-parchment">
                <img
                  src={assets.ganesh}
                  alt=""
                  className="inside-ganesh-icon"
                />
                <p className="inside-shubho">শুভ বিবাহ</p>
                <div className="inside-divider-line" />
                <p className="inside-invite-txt">Wedding Celebration</p>
              </div>
              <div className="inside-golden-glow" />
            </div>

            {/* Left Flap */}
            <div className="bi-fold-flap flap-left">
              <img
                className="flap-inner-img flap-img-left"
                src={assets.opening.closedCard}
                alt=""
                loading="eager"
              />
            </div>

            {/* Right Flap */}
            <div className="bi-fold-flap flap-right">
              <img
                className="flap-inner-img flap-img-right"
                src={assets.opening.closedCard}
                alt=""
                loading="eager"
              />
            </div>

            {/* High-visibility Wax Seal with "OPEN" badge */}
            <span className="wax-seal" aria-hidden="true">
              <div className="seal-outer-ring">
                <div className="seal-inner-disc">
                  <img
                    src={assets.logo}
                    alt="Wedding Monogram"
                    className="seal-monogram-img"
                  />
                  <div className="seal-open-badge">
                    <span>OPEN</span>
                  </div>
                </div>
              </div>
            </span>
          </button>
        </div>

        {/* Tap hint below card */}
        {!isOpened && (
          <div className="cover-hint-wrapper" onClick={handleCardClick}>
            <span className="cover-tap-hint" aria-live="polite">
              {config.invitation.coverTapHint}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
