import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function HaldiCard({ event }) {
  return (
    <section
      className="event-card event-card-haldi"
      id="haldi-section"
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Haldi watercolor background */}
      <img
        src={assets.backgrounds.haldi}
        alt=""
        aria-hidden="true"
        className="event-card-bg"
        style={{ objectPosition: 'top' }}
        loading="lazy"
      />
      {/* Warm yellow gradient overlay */}
      <div
        className="event-card-overlay"
        style={{
          background:
            'linear-gradient(180deg, rgba(245,215,100,0.25) 0%, rgba(255,248,220,0.55) 40%, rgba(255,252,230,0.72) 100%)',
        }}
      />

      <FloatingElements theme="haldi" count={6} />

      <div className="event-card-content" style={{ paddingTop: 0 }}>
        {/* Marigold garland strip at top */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            marginBottom: 16,
            borderBottom: '2px solid rgba(212,146,10,0.25)',
          }}
        >
          <img
            src={assets.elements.bengaliToran}
            alt="Marigold garland"
            aria-hidden="true"
            style={{
              width: '100%',
              height: 90,
              objectFit: 'contain',
              objectPosition: 'top',
              display: 'block',
            }}
            loading="lazy"
          />
        </div>

        {/* Inner card */}
        <FadeIn delay={0}>
          <div className="event-inner-card" style={{ maxWidth: 360 }}>
            {/* Monogram */}
            <img
              src={assets.monogram}
              alt="SR"
              style={{ width: 54, margin: '0 auto 10px', opacity: 0.85 }}
            />
            <p className="event-hashtag" style={{ color: 'var(--haldi-deep)' }}>
              {event.hashtag}
            </p>
            <p className="event-join-text">{event.joinText}</p>
            <p className="event-tagline">{event.tagline}</p>

            <p className="event-ceremony-name" style={{ whiteSpace: 'pre-line' }}>
              {event.title}
            </p>

            <div style={{ marginTop: 16 }}>
              <span className="pill">
                {event.date} | {event.time}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Haldi couple illustration */}
        <FadeIn delay={200}>
          <img
            src={assets.haldiCouple}
            alt="Haldi ceremony couple"
            className="event-couple-illustration"
            style={{ marginTop: 24 }}
            loading="lazy"
          />
        </FadeIn>
      </div>
    </section>
  );
}
