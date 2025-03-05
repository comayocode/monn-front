import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Drawer.css';

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`drawer-overlay ${isOpen ? 'drawer-overlay--open' : ''}`}
      onClick={onClose}
    >
      <div
        className={`drawer ${isOpen ? 'drawer--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='drawer__close' onClick={onClose} aria-label='Cerrar'>
          ✕
        </button>
        <h2 className='drawer__title'>{title}</h2>
        <div className='drawer__content'>{children}</div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Drawer;
