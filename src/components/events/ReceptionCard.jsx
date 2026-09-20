import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function ReceptionCard({ event }) {
  if (!event) return null;

  return (
    <section
      className="event-card event-card-reception"
      id="reception-section"
      style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      <img
        src={assets.backgrounds.sangeet || assets.backgrounds.wedding}
        alt=""
        aria-hidden="true"
        className="event-card-bg"
        loading="lazy"
      />
      {/* Royal deep navy & gold overlay */}
      <div
        className="event-card-overlay"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,20,40,0.65) 0%, rgba(25,20,55,0.72) 50%, rgba(10,12,30,0.85) 100%)',
        }}
      />

      <FloatingElements theme="reception" count={6} />

      <div className="event-card-content" style={{ paddingTop: 28 }}>
        {/* Inner card — elegant evening glassmorphic */}
        <FadeIn delay={0}>
          <div
            className="event-inner-card"
            style={{
              maxWidth: 360,
              background: 'rgba(20,22,48,0.78)',
              borderColor: 'rgba(200,154,66,0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {/* Monogram */}
            <img
              src={assets.monogram}
              alt="AS"
              style={{ width: 54, margin: '0 auto 10px', opacity: 0.9 }}
            />
            <p className="event-hashtag" style={{ color: '#e8c97e' }}>
              {event.hashtag}
            </p>
            <p className="event-join-text" style={{ color: '#c4c8e8' }}>
              {event.joinText}
            </p>
            <p className="event-tagline" style={{ color: '#a0a6d0' }}>
              {event.tagline}
            </p>

            <p
              className="event-ceremony-name"
              style={{
                whiteSpace: 'pre-line',
                color: '#f4e8c1',
                textShadow: '0 2px 16px rgba(200,154,66,0.3)',
              }}
            >
              {event.title}
            </p>

            <div style={{ marginTop: 16 }}>
              <span
                className="pill"
                style={{
                  background: 'rgba(40,35,80,0.7)',
                  color: '#f0e6cb',
                  borderColor: 'rgba(200,154,66,0.6)',
                }}
              >
                {event.date} {event.time ? `| ${event.time}` : ''}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Couple illustration */}
        <FadeIn delay={200}>
          <img
            src={assets.weddingCouple}
            alt="Reception couple"
            className="event-couple-illustration"
            style={{ marginTop: 24 }}
            loading="lazy"
          />
        </FadeIn>
      </div>
    </section>
  );
}
