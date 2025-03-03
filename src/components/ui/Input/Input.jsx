import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import variables from '@/styles/variables.module.css';
import { useTheme } from '@/context/ThemeContext';

import eyeOpenIcon from '@/assets/icons/eye-on.svg';
import eyeClosedIcon from '@/assets/icons/eye-off.svg';
import searchIcon from '@/assets/icons/search.svg';

const Input = ({
  label,
  placeholder,
  description,
  validation,
  error,
  variant = 'text',
  ...props
}) => {
  const { theme } = useTheme();
  const [themeClass, setThemeClass] = useState(variables['input-light']);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setThemeClass(
      theme === 'dark' ? variables['input-dark'] : variables['input-light']
    );
  }, [theme]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div
      className={`${styles.inputWrapper} ${themeClass} ${
        variant === 'password' ? styles.passwordWrapper : ''
      } ${variant === 'search' ? styles.searchWrapper : ''}`}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputContainer}>
        {variant === 'search' && (
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        )}

        <input
          type={variant === 'password' && !isPasswordVisible ? 'password' : 'text'}
          className={`${styles.input} 
          ${variant === 'search' ? styles.searchInput : ''} 
          ${validation ? styles['input--validation'] : ''} 
          ${error ? styles['input--error'] : ''}`}
          placeholder={placeholder}
          {...props}
        />

        {variant === 'password' && (
          <button type="button" className={styles.eyeButton} onClick={togglePasswordVisibility}>
            <img className={theme === 'dark' ? styles.eyeIconDark : ''} src={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon} alt="Toggle password visibility" />
          </button>
        )}
      </div>

      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  validation: PropTypes.bool,
  error: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'password', 'search']),
};

export default Input;
