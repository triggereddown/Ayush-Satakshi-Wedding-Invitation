import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

const eventImages = {
  haldi:   assets.haldiCouple,
  mehndi:  assets.mehndiCouple,
  sangeet: assets.sangeetCouple,
  wedding: assets.weddingCouple,
};

export function WardrobeSection({ wardrobe, headerText }) {
  return (
    <section className="wardrobe-section" id="wardrobe-section">
      <FloatingElements theme="default" count={5} />

      <FadeIn delay={0}>
        <img
          src={assets.monogram}
          alt="SR"
          style={{ width: 64, margin: '0 auto 16px', opacity: 0.85 }}
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={80}>
        <p className="section-title">{headerText || 'WARDROBE GUIDE'}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <span className="divider-flower" aria-hidden="true" style={{ marginTop: 12, display: 'block' }}>
          ✿
        </span>
      </FadeIn>

      <FadeIn delay={240}>
        <img
          src={assets.weddingCouple}
          alt="Wedding attire inspiration"
          style={{
            width: '100%',
            maxWidth: 320,
            height: 'auto',
            objectFit: 'contain',
            margin: '28px auto',
            display: 'block',
          }}
          loading="lazy"
        />
      </FadeIn>

      <div className="wardrobe-cards">
        {wardrobe.map((item, i) => (
          <FadeIn key={item.id} delay={80 * (i + 1)}>
            <div className={`wardrobe-card wardrobe-${item.id}`}>
              <img
                src={eventImages[item.id]}
                alt={`${item.eventLabel} attire`}
                className="wardrobe-thumb"
                loading="lazy"
              />
              <div>
                <p className="wardrobe-card-title">{item.eventLabel}</p>
                <p className="wardrobe-card-name">{item.themeName}</p>
                <p className="wardrobe-card-desc">{item.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
