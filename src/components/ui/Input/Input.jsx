import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import variables from '@/styles/variables.module.css';
import { useTheme } from '@/context/ThemeContext';

import eyeOpenIcon from '@/assets/icons/eye-on.svg';
import eyeClosedIcon from '@/assets/icons/eye-off.svg';
import searchIcon from '@/assets/icons/search.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';

const Input = ({
  label,
  placeholder,
  description,
  error,
  variant = 'text',
  isPasswordVisible, // Se recibe desde Form.jsx
  onTogglePassword, // Se recibe desde Form.jsx
  type = 'text',
  onCalendarClick,
  ...props
}) => {
  const { theme } = useTheme();
  const [themeClass, setThemeClass] = useState(variables['input-dark']);

  useEffect(() => {
    setThemeClass(
      theme === 'dark' ? variables['input-dark'] : variables['input-light']
    );
  }, [theme]);

  return (
    <div
      className={
        `${styles.inputWrapper} ${themeClass} ` +
        (variant === 'password' ? styles.passwordWrapper : '') +
        (variant === 'search' ? styles.searchWrapper : '') +
        (variant === 'calendar' ? styles.calendarWrapper : '')
      }
    >
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputContainer}>
        {variant === 'search' && (
          <img src={searchIcon} alt='Buscar' className={styles.inputIcon} />
        )}
        <input
          className={styles.input + (error ? ' ' + styles['input--error'] : '')}
          type={type}
          placeholder={placeholder}
          {...props}
          autoComplete='off'
        />
        {variant === 'password' && (
          <button
            type='button'
            className={styles.eyeButton}
            onClick={onTogglePassword}
            tabIndex={-1}
          >
            <img
              src={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon}
              alt={isPasswordVisible ? 'Ocultar' : 'Mostrar'}
            />
          </button>
        )}
        {variant === 'calendar' && (
          <button
            type='button'
            className={styles.calendarButton}
            tabIndex={-1}
            onClick={onCalendarClick}
          >
            <img
              src={CalendarIcon}
              alt='Calendario'
              className={theme === 'dark' ? styles.eyeIconDark : ''}
            />
          </button>
        )}
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  validation: PropTypes.bool,
  error: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'password', 'search', 'calendar']),
  isPasswordVisible: PropTypes.bool,
  onTogglePassword: PropTypes.func,
  type: PropTypes.string,
  onCalendarClick: PropTypes.func,
};

export default Input;
