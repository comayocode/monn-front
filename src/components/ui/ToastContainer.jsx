import PropTypes from 'prop-types';
import styles from './ToastContainer.module.css';
import ToastMessage from './ToastMessage';

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Asegurar que el ID sea un número
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
      duration: PropTypes.number,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired, // Se asegura que se pase correctamente
};

export default ToastContainer;