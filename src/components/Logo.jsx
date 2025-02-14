import './Logo.css';
import LogoFull from '/src/assets/logo.svg';  // Logo completo
// import LogoCompact from '/src/assets/logo-compact.svg';  // Logo versión compacta (ícono)

const Logo = ({ isSidebarOpen }) => {
  return (
    <div className='logo'>
      <img
        src={LogoFull}
        alt='Logo'
        className='logo__image'
      />
      <span className='logo__text'>{isSidebarOpen ? 'Inmobiliaria X' : ''}</span>
    </div>
  );
};

export default Logo;
