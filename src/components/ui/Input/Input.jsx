import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import variables from '@/styles/variables.module.css';
import { useTheme } from '@/context/ThemeContext';

import eyeOpenIcon from '@/assets/icons/eye-on.svg';
import eyeClosedIcon from '@/assets/icons/eye-off.svg';
import searchIcon from '@/assets/icons/search.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';

const Input = React.forwardRef(
  (
    {
      label,
      placeholder,
      description,
      error,
      variant = 'text',
      isPasswordVisible,
      onTogglePassword,
      type = 'text',
      onCalendarClick,
      customClassName,
      margin,
      width,
      searchIconPosition = 'left',
      searchIconMargin = 8,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [themeClass, setThemeClass] = useState(variables['input-dark']);

    useEffect(() => {
      setThemeClass(
        theme === 'dark' ? variables['input-dark'] : variables['input-light']
      );
    }, [theme]);

    // Permite pasar margin como string CSS (ej: "8px 16px") o número (aplica a todos)
    const marginStyle =
      margin !== undefined
        ? { margin: typeof margin === 'number' ? `${margin}px` : margin }
        : undefined;

    const widthClass =
      width && [20, 40, 60, 80, 100].includes(Number(width))
        ? ` ${styles[`w-${width}`]}`
        : '';

    const classNames = `${styles.input}${
      error ? ' ' + styles['input--error'] : ''
    }${customClassName ? ' ' + customClassName : ''}${widthClass}`;

    const searchIconStyle =
      searchIconPosition === 'left'
        ? { marginRight: `${searchIconMargin}px` }
        : { marginLeft: `${searchIconMargin}px` };

    return (
      <div
        className={
          `${styles.inputWrapper} ${themeClass} ` +
          (variant === 'password' ? styles.passwordWrapper : '') +
          (variant === 'search' ? styles.searchWrapper : '') +
          (variant === 'calendar' ? styles.calendarWrapper : '')
        }
        style={marginStyle}
      >
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputContainer}>
          {variant === 'search' && searchIconPosition === 'left' && (
            <img
              src={searchIcon}
              alt='Buscar'
              className={styles.inputIcon}
              style={searchIconStyle}
            />
          )}
          <input
            ref={ref}
            className={classNames}
            type={type}
            placeholder={placeholder}
            {...props}
            autoComplete='off'
          />
          {variant === 'search' && searchIconPosition === 'right' && (
            <img
              src={searchIcon}
              alt='Buscar'
              className={styles.inputIcon}
              style={searchIconStyle}
            />
          )}
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
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'password', 'search', 'calendar']),
  isPasswordVisible: PropTypes.bool,
  onTogglePassword: PropTypes.func,
  type: PropTypes.string,
  onCalendarClick: PropTypes.func,
  customClassName: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOf([20, 40, 60, 80, 100]),
  searchIconPosition: PropTypes.oneOf(['left', 'right']),
  searchIconMargin: PropTypes.number,
};

export default Input;
