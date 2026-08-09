import { FadeIn } from '../shared/FadeIn';
import { FloatingElements } from '../shared/FloatingElements';
import { assets } from '../../config/assets';

export function NamesSection({ config }) {
  const { groom, bride } = config;

  return (
    <section className="names-section" id="names-section">
      <FloatingElements theme="default" count={6} />

      {/* Shiv-Parvati couple illustration */}
      <FadeIn delay={0}>
        <img
          src={assets.shivParvati}
          alt="Divine couple illustration"
          className="names-couple-illustration"
          loading="lazy"
        />
      </FadeIn>

      {/* Groom name */}
      <FadeIn delay={100}>
        <div className="names-groom-block">
          <img
            src={assets.bengaliGroom}
            alt="Bengali Groom Caricature"
            className="character-caricature"
            loading="lazy"
          />
          <p className="name-script">{groom.firstName}</p>
          <p className="names-parent">
            S/o {groom.father} &amp; {groom.mother}
          </p>
          <p className="names-grandparent">
            Grandson of {groom.grandfather} &amp; {groom.grandmother}
          </p>
        </div>
      </FadeIn>

      {/* Weds connector */}
      <FadeIn delay={200}>
        <p className="weds-text" style={{ margin: '16px 0' }}>weds</p>
      </FadeIn>

      {/* Bride name */}
      <FadeIn delay={300}>
        <div className="names-bride-block">
          <img
            src={assets.bengaliBride}
            alt="Bengali Bride Caricature"
            className="character-caricature"
            loading="lazy"
          />
          <p className="name-script">{bride.firstName}</p>
          <p className="names-parent">
            D/o {bride.father} &amp; {bride.mother}
          </p>
          <p className="names-grandparent">
            Granddaughter of {bride.grandfather} &amp; {bride.grandmother}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
