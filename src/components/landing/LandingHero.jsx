import './LandingHero.css';

function LandingHero() {
  return (
    <div className='landing-hero'>
      <div className='hero-info'>
        <div className='hero-info__text'>
          <h1 className='hero-info__tittle'>
            Descubra la propiedad de sus sueños con Nosotros
          </h1>
          <p className='hero-info__body'>
            Su viaje para encontrar la propiedad perfecta comienza aquí. Explore
            nuestros listados para encontrar la casa que coincida con sus
            sueños.
          </p>
        </div>
        <div className='hero-info__cta'>
          <button className='hero-info__cta-btn--secondary'>Leer más</button>
          <button className='hero-info__cta-btn--primary'>Busca propiedades</button>
        </div>
        <div className='hero-info__cards'>
          <div className='hero-info__card'>
            <h3 className='her-info__card-title'>200+</h3>
            <p className='her-info__card-body'>Clientes felices</p>
          </div>
          <div className='hero-info__card'>
            <h3 className='her-info__card-title'>10k+</h3>
            <p className='her-info__card-body'>Propiedades.</p>
          </div>
          <div className='hero-info__card'>
            <h3 className='her-info__card-title'>16+</h3>
            <p className='her-info__card-body'>Años de experiencia</p>
          </div>
        </div>
      </div>
      <div className='hero-section'>
        <img
          className='landing-hero__abstract-design'
          src='/src/assets/hero-abstract-design.svg'
          alt='hero-design'
        />
        <img
          className='landing-hero__hero-img'
          src='/src/assets/hero-img.svg'
          alt='hero-img inmobiliaria x'
        />
      </div>
    </div>
  );
}

export default LandingHero;
