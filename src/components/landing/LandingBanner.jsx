import { Link } from 'react-router-dom';
import './LandingBanner.css';
import { useState } from 'react';

function LandingBanner() {

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  }

  return (
    <div className='landing-banner'>
      <p className='landing-banner__text'>
        ✨ Encuentra tu propiedad ideal con Inmbobiliaria X.
      </p>
      <Link to='/info' className='landing-banner__info'>
        Info aquí.
      </Link>
      <button className='landing-banner__btn' onClick={handleClose}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18 6L6 18'
            stroke='#FFFFFF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M6 6L18 18'
            stroke='#FFFFFF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </button>
    </div>
  );
}

export default LandingBanner;
