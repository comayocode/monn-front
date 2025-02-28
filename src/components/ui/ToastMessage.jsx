import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ToastMessage.module.css';

import successIcon from '@/assets/icons/success.svg';
import errorIcon from '@/assets/icons/error.svg';
import infoIcon from '@/assets/icons/info.svg';
import warningIcon from '@/assets/icons/warning.svg';
import closeIcon from '@/assets/icons/x.svg';

const icons = {
  success: successIcon,
  error: errorIcon,
  info: infoIcon,
  warning: warningIcon,
};

const titles = {
  success: 'Acción completada',
  error: 'Ocurrió un error',
  info: 'Dato importante',
  warning: 'Revisión necesaria',
}

const ToastMessage = ({ id, message, type, duration = 10000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : ''}`}>
      <img src={icons[type]} alt={type} className={styles.icon} />
      <div className={styles.content}>
        <strong>{titles[type]}</strong>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.close} onClick={handleClose}>
        <img src={closeIcon} alt="Cerrar" />
      </button>
      <div className={styles.progressBar} style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
};

ToastMessage.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default ToastMessage;
