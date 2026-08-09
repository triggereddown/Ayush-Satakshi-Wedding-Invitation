import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function ClosingSection({ config }) {
  const { groom, bride, hashtag, invitation } = config;

  return (
    <section className="closing-section" id="closing-section">
      <FloatingElements theme="default" count={5} />

      <FadeIn delay={0}>
        <p className="closing-with-love">{invitation.closingWithLove}</p>
      </FadeIn>

      <FadeIn delay={80}>
        <p className="closing-names">
          {groom.firstName} &amp; {bride.firstName}
        </p>
      </FadeIn>

      <FadeIn delay={160}>
        <span className="closing-heart" aria-hidden="true" role="img">❤️</span>
      </FadeIn>

      <FadeIn delay={240}>
        <p className="closing-dates">{invitation.dates}</p>
      </FadeIn>

      <FadeIn delay={320}>
        <p className="closing-hashtag">{hashtag}</p>
      </FadeIn>

      {/* Bengali Alpana Watermark */}
      <img
        src={assets.elements.bengaliAlpana}
        alt=""
        aria-hidden="true"
        className="bengali-alpana-watermark"
      />
    </section>
  );
}
