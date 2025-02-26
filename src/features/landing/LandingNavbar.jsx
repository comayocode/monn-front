import './LandingNavbar.css';
import Logo from '@/components/common/Logo/Logo';
import Button from '@/components/ui/Button.jsx';
import iconRight from '@/assets/icons/right.svg';

function LandingNavbar() {
  return (
    <div className='landing-navbar'>
      <nav className='navbar-container'>
        <div className='navbar-container__logo'>
          <Logo isSidebarOpen={true} />
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
        <Button
          isLink
          to='/login'
          variant='primary'
          size='normal'
          icon={iconRight}
        >
          Ingresar
        </Button>
      </nav>
    </div>
  );
}

export default LandingNavbar;
