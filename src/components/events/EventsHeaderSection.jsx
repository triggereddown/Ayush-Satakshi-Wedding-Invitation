import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function EventsHeaderSection({ config }) {
  const { eventsScheduleHeader } = config;

  return (
    <section className="events-header-section" id="events-section">
      <FloatingElements theme="default" count={5} />

      <FadeIn delay={0}>
        <img
          src={assets.logo}
          alt="Wedding Logo"
          style={{ width: 72, margin: '0 auto 16px', opacity: 0.85 }}
          loading="lazy"
        />
      </FadeIn>

      <div className="events-header-border">
        <FadeIn delay={80}>
          <p className="section-title" style={{ whiteSpace: 'pre-line' }}>
            {eventsScheduleHeader.title}
          </p>
        </FadeIn>
        <FadeIn delay={160}>
          <p
            className="eyebrow"
            style={{ marginTop: 12, color: 'var(--muted)' }}
          >
            {eventsScheduleHeader.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={240}>
          <span
            className="divider-flower"
            aria-hidden="true"
            style={{ marginTop: 16, fontSize: '1.1rem', display: 'block' }}
          >
            ✿
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
