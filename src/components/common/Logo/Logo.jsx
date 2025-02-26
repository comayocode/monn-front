import './Logo.css';
import LogoFull from '/src/assets/icons/logo.svg';
import PropTypes from 'prop-types';

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
Logo.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Logo;
