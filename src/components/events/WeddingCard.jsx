import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function WeddingCard({ event }) {
  return (
    <section
      className="event-card event-card-wedding"
      id="wedding-section"
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Wedding maroon background */}
      <img
        src={assets.backgrounds.wedding}
        alt=""
        aria-hidden="true"
        className="event-card-bg"
        loading="lazy"
      />
      {/* Warm maroon overlay */}
      <div
        className="event-card-overlay"
        style={{
          background:
            'linear-gradient(180deg, rgba(180,50,70,0.15) 0%, rgba(255,248,240,0.55) 30%, rgba(255,252,247,0.72) 100%)',
        }}
      />

      <FloatingElements theme="wedding" count={6} />

      <div className="event-card-content" style={{ paddingTop: 20 }}>
        {/* Inner card */}
        <FadeIn delay={0}>
          <div className="event-inner-card" style={{ maxWidth: 360 }}>
            {/* Monogram */}
            <img
              src={assets.monogram}
              alt="SR"
              style={{ width: 54, margin: '0 auto 10px', opacity: 0.85 }}
            />
            <p className="event-hashtag" style={{ color: 'var(--wine)' }}>
              {event.hashtag}
            </p>
            <p className="event-join-text">{event.joinText}</p>
            <p className="event-tagline">{event.tagline}</p>

            <p className="event-ceremony-name" style={{ whiteSpace: 'pre-line' }}>
              {event.title}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sc)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: 'var(--muted)',
                marginTop: 8,
              }}
            >
              {event.date}
            </p>

            {/* Rituals schedule */}
            {event.rituals && (
              <div className="rituals-list">
                {event.rituals.map((r) => (
                  <div className="ritual-row" key={r.name}>
                    <span>
                      <span className="ritual-icon">♦</span>
                      {r.name}
                    </span>
                    <span className="ritual-time">{r.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Wedding couple illustration */}
        <FadeIn delay={200}>
          <img
            src={assets.weddingCouple}
            alt="Wedding couple"
            className="event-couple-illustration"
            style={{ marginTop: 24 }}
            loading="lazy"
          />
        </FadeIn>
      </div>
    </section>
  );
}
