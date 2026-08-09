import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function SangeetCard({ event }) {
  return (
    <section
      className="event-card event-card-sangeet"
      id="sangeet-section"
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Night sky background */}
      <img
        src={assets.backgrounds.sangeet}
        alt=""
        aria-hidden="true"
        className="event-card-bg"
        loading="lazy"
      />
      {/* Deep indigo overlay */}
      <div
        className="event-card-overlay"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,18,50,0.55) 0%, rgba(30,25,70,0.65) 50%, rgba(15,12,40,0.78) 100%)',
        }}
      />

      <FloatingElements theme="sangeet" count={6} />

      <div className="event-card-content" style={{ paddingTop: 28 }}>
        {/* Inner card — dark glassmorphic */}
        <FadeIn delay={0}>
          <div
            className="event-inner-card"
            style={{
              maxWidth: 360,
              background: 'rgba(25,20,60,0.72)',
              borderColor: 'rgba(138,134,204,0.3)',
            }}
          >
            {/* Monogram */}
            <img
              src={assets.monogram}
              alt="SR"
              style={{ width: 54, margin: '0 auto 10px', opacity: 0.85 }}
            />
            <p className="event-hashtag" style={{ color: '#c8c4f0' }}>
              {event.hashtag}
            </p>
            <p className="event-join-text" style={{ color: '#9090c8' }}>
              {event.joinText}
            </p>
            <p className="event-tagline" style={{ color: '#9898c4' }}>
              {event.tagline}
            </p>

            <p
              className="event-ceremony-name"
              style={{
                whiteSpace: 'pre-line',
                color: '#e8e4ff',
                textShadow: '0 2px 16px rgba(100,100,200,0.3)',
              }}
            >
              {event.title}
            </p>

            <div style={{ marginTop: 16 }}>
              <span
                className="pill"
                style={{
                  background: 'rgba(50,45,110,0.6)',
                  color: '#e0dcff',
                  borderColor: 'var(--sangeet-light)',
                }}
              >
                {event.date} | {event.time}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Sangeet dancing couple */}
        <FadeIn delay={200}>
          <img
            src={assets.sangeetCouple}
            alt="Sangeet dancing couple"
            className="event-couple-illustration"
            loading="lazy"
          />
        </FadeIn>
      </div>
    </section>
  );
}
