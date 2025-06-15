import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.css';
import variables from '@/styles/variables.module.css';
import { DownIcon } from '@/components/ui/icons';
import { useTheme } from '@/context/ThemeContext';

const CustomSelect = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeClass, setThemeClass] = useState(variables['input-light']);
  const { theme } = useTheme();

  useEffect(() => {
    setThemeClass(
      theme === 'dark' ? variables['input-dark'] : variables['input-light']
    );
  }, [theme]);

  const handleSelect = (selectedValue) => {
    if (!disabled) {
      onChange({ target: { name, value: selectedValue } }); // Ahora pasa name y value
      setIsOpen(false);
    }
  };

  /* Cerrar lista al hacer clic afuera */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.selectWrapper}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.selectWrapper} ${
        disabled ? styles.disabled : ''
      } ${themeClass}`}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.selectContainer} ${isOpen ? styles.open : ''} ${
          error ? styles['select--error'] : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={styles.selectedValue}>
          {options.find((opt) => opt.value === value)?.label ||
            'Selecciona una opción'}
        </span>
        <DownIcon className={styles.dropdownIcon} />
      </div>

      {isOpen && (
        <ul className={`${styles.optionsList} ${isOpen ? styles.open : ''}`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                option.disabled ? styles.optionDisabled : ''
              } ${option.value === value ? styles.selectedOption : ''}`}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default CustomSelect;
