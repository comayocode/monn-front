import { Link } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
  return (
    <div className='landing-navbar'>
      <nav className='navbar-container'>
        <div className='navbar-container__logo'>
          <img src='/src/assets/logo.svg' alt='Logo de Inmobiliaria X' />
          Inmobiliaria X
        </div>
        <ul className='navbar-container__links'>
          {['inicio', 'sobre-nosotros', 'propiedades', 'servicios'].map(
            (section) => (
              <li key={section}>
                <a href={`#${section}`} className='navbar-container__link'>
                  {section.replace('-', ' ').charAt(0).toUpperCase() +
                    section.slice(1).replace('-', ' ')}
                </a>
              </li>
            )
          )}
        </ul>
        <Link to='/login' className='navbar-container__login'>
          <button className='navbar-container__login-button'>
            Ingresar
            <img
              src='/src/assets/right.svg'
              alt='Icono ingresar a inmobiliaria x'
            />
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default LandingNavbar;
