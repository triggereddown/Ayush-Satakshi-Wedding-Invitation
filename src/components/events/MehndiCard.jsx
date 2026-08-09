import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function MehndiCard({ event }) {
  return (
    <section
      className="event-card event-card-mehndi"
      id="mehndi-section"
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mehndi watercolor background */}
      <img
        src={assets.backgrounds.mehndi}
        alt=""
        aria-hidden="true"
        className="event-card-bg"
        loading="lazy"
      />
      {/* Sage green overlay */}
      <div
        className="event-card-overlay"
        style={{
          background:
            'linear-gradient(180deg, rgba(180,220,190,0.3) 0%, rgba(235,248,238,0.5) 40%, rgba(245,252,246,0.72) 100%)',
        }}
      />

      <FloatingElements theme="mehndi" count={6} />

      <div className="event-card-content" style={{ paddingTop: 28 }}>
        {/* Inner card */}
        <FadeIn delay={0}>
          <div className="event-inner-card" style={{ maxWidth: 360 }}>
            {/* Monogram */}
            <img
              src={assets.monogram}
              alt="SR"
              style={{ width: 54, margin: '0 auto 10px', opacity: 0.85 }}
            />
            <p className="event-hashtag" style={{ color: 'var(--mehndi-deep)' }}>
              {event.hashtag}
            </p>
            <p className="event-join-text">{event.joinText}</p>
            <p className="event-tagline">{event.tagline}</p>

            <p className="event-ceremony-name" style={{ whiteSpace: 'pre-line' }}>
              {event.title}
            </p>

            <div style={{ marginTop: 16 }}>
              <span className="pill" style={{ borderColor: 'var(--mehndi)', color: 'var(--mehndi-deep)' }}>
                {event.date} | {event.time}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Mehndi couple illustration */}
        <FadeIn delay={200}>
          <img
            src={assets.mehndiCouple}
            alt="Mehndi ceremony couple"
            className="event-couple-illustration"
            style={{ marginTop: 24 }}
            loading="lazy"
          />
        </FadeIn>
      </div>
    </section>
  );
}
