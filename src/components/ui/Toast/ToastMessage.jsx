import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ToastMessage.module.css';
import {
  CloseIcon,
  ErrorIcon,
  SuccessIcon,
  InfoIcon,
  WarningIcon,
} from '@/components/ui/icons';
import { toastStyles, toastTitles } from '@/config/toastConfig';

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

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

  const IconComponent  = icons[type];
  const { titleColor, textColor, closeIconColor, progressBarColor  } = toastStyles[type] || {};


  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        visible ? styles.show : ''
      }`}
    >
      {IconComponent && <IconComponent color={titleColor} />}
      <div className={styles.content}>
        <h5 className={styles.title} style={{ color: titleColor }}>
          {toastTitles[type]}
        </h5>
        <p className={styles.message} style={{ color: textColor }}>
          {message}
        </p>
      </div>
      <button className={styles.close} onClick={handleClose}>
        <CloseIcon color={closeIconColor} />
      </button>
      <div
        className={styles.progressBar}
        style={{ animationDuration: `${duration}ms`, backgroundColor: progressBarColor }}
      />
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
