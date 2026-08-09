import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';

export function VenueSection({ config }) {
  const { venue } = config;

  return (
    <section className="venue-section" id="venue-section">
      <FloatingElements theme="default" count={5} />

      <FadeIn delay={0}>
        <p className="venue-where-label">{venue.label}</p>
      </FadeIn>

      <FadeIn delay={80}>
        <p className="venue-name-script">{venue.name}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <span className="divider-flower" aria-hidden="true" style={{ marginBottom: 24, display: 'block' }}>
          ✿
        </span>
      </FadeIn>

      <FadeIn delay={200}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--muted)',
            marginBottom: 12,
          }}
        >
          Join us at the venue for these two days at:
        </p>
      </FadeIn>

      <FadeIn delay={240}>
        <p className="venue-address">📍 {venue.fullAddress}</p>
        <p className="venue-sub">{venue.tagline}</p>
      </FadeIn>

      <FadeIn delay={320}>
        <div className="map-container">
          <iframe
            title="Wedding Venue Map"
            src={venue.mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label={`Map showing ${venue.fullAddress}`}
          />
        </div>
      </FadeIn>

      <FadeIn delay={400}>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          id="get-directions-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3,11 22,2 13,21 11,13 3,11" />
          </svg>
          Get Directions
        </a>
      </FadeIn>
    </section>
  );
}
