import { useEffect, useState } from 'react';

const floatingFlowers = [
  { src: 'floralCornerA', className: 'flower flower-a', alt: 'Watercolor floral sprig' },
  { src: 'floralCornerB', className: 'flower flower-b', alt: 'Marigold floral cluster' },
  { src: 'floralCornerC', className: 'flower flower-c', alt: 'Decorative blossom bouquet' },
  { src: 'floralSprig', className: 'flower flower-d', alt: 'Leafy floral accent' },
];

export function OpeningInvitation({ invitation, isOpened, onOpen }) {
  const [readyToReveal, setReadyToReveal] = useState(false);

  useEffect(() => {
    if (!isOpened) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setReadyToReveal(true);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [isOpened]);

  return (
    <section className={`opening-stage ${isOpened ? 'is-opened' : ''}`}>
      <div className="atmosphere atmosphere-top" aria-hidden="true" />
      <div className="atmosphere atmosphere-bottom" aria-hidden="true" />

      {floatingFlowers.map((flower) => (
        <img
          key={flower.className}
          className={flower.className}
          src={invitation.assets[flower.src]}
          alt=""
          aria-hidden="true"
          loading="eager"
        />
      ))}

      <div className="card-scene">
        <button
          type="button"
          className={`invitation-shell ${isOpened ? 'is-opened' : ''}`}
          onClick={onOpen}
          disabled={isOpened}
          aria-label={isOpened ? invitation.openedLabel : invitation.prompt}
        >
          <span className="shell-glow" aria-hidden="true" />
          <span className="seal-ring" aria-hidden="true">
            <span className="seal-core">{invitation.monogram}</span>
          </span>

          <div className="card-face card-closed" aria-hidden="true">
            <img
              className="card-art"
              src={invitation.assets.closedCard}
              alt=""
              loading="eager"
            />
            <div className="card-copy">
              <p className="eyebrow">{invitation.blessing}</p>
              <h1>{invitation.coupleDisplay}</h1>
              <p>{invitation.teaserTitle}</p>
              <span className="tap-pill">{invitation.prompt}</span>
            </div>
          </div>

          <div className="card-face card-open" aria-hidden="true">
            <div className="open-paper">
              <img className="paper-bg" src={invitation.assets.paperBackground} alt="" />
              <img className="paper-toran" src={invitation.assets.toran} alt="" />
              <img className="paper-arch" src={invitation.assets.arch} alt="" />
              <img className="paper-monogram" src={invitation.assets.monogram} alt="" />
              <img className="paper-leaves" src={invitation.assets.leaves} alt="" />

              <div className={`paper-copy ${readyToReveal ? 'is-visible' : ''}`}>
                <p className="eyebrow">{invitation.blessing}</p>
                <h2>A handcrafted Bengali wedding invitation</h2>
                <p>
                  The full story unfolds in the next iterations. For now, the opening ritual
                  invites guests into the palette, paper, and ornament of the celebration.
                </p>
                <span className="status-note">{invitation.note}</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
