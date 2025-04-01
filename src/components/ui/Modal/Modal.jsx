import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, description, children, variant, actions }) => {
  if (!isOpen) return null;

  return (
    <div className='modal__overlay' onClick={onClose}>
      <div
        className={`modal modal--${variant}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='modal__close' onClick={onClose}>
          &times;
        </button>
        <h2 className='modal__title'>{title}</h2>
        <p className='modal__description'>{description}</p>
        <div className="modal__content">
          {children} {/* Aquí va el formulario */}
        </div>
        <div className='modal__actions'>
          {actions?.map(({ text, onClick, variant }, index) => (
            <button
              key={index}
              className={`modal__button modal__button--${variant}`}
              onClick={onClick}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node, // Agregamos children
  variant: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Modal;
