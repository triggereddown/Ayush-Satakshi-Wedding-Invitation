import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function BlessingSection({ config }) {
  const { groom, bride, invitation } = config;

  return (
    <section className="blessing-section" id="blessing-section">
      <FloatingElements theme="default" count={6} />

      <img
        src={assets.elements.arch}
        alt=""
        aria-hidden="true"
        className="blessing-arch-bg"
      />

      <FadeIn delay={0}>
        <img
          src={assets.ganesh}
          alt="Lord Ganesha blessings"
          className="blessing-ganesh"
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={80}>
        <p className="blessing-om">{invitation.blessing}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <div
          style={{
            background: 'rgba(255,251,240,0.85)',
            border: '1px solid rgba(200,154,66,0.3)',
            borderRadius: '18px',
            padding: '24px 20px',
            marginBottom: '28px',
            backdropFilter: 'blur(6px)',
          }}
        >
          <p className="blessing-shloka-dev" style={{ whiteSpace: 'pre-line' }}>{invitation.shloka.devanagari}</p>
          <p className="blessing-shloka-roman" style={{ whiteSpace: 'pre-line' }}>{invitation.shloka.roman}</p>
        </div>
      </FadeIn>

      <FadeIn delay={240}>
        <p className="blessing-invite-text" style={{ whiteSpace: 'pre-line' }}>{invitation.inviteText}</p>
      </FadeIn>

      <FadeIn delay={320}>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <p className="name-script">
            {groom.firstName}
          </p>
          <p
            className="weds-text"
            style={{
              margin: '2px 0',
              fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
              color: 'var(--gold-deep)',
            }}
          >
            &amp;
          </p>
          <p className="name-script">{bride.firstName}</p>
        </div>
      </FadeIn>
    </section>
  );
}
