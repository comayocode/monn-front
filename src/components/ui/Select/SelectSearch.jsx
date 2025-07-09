import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.css';
import inputStyles from '../Input/Input.module.css'; // importa el CSS module del input
import variables from '@/styles/variables.module.css';
import { DownIcon } from '@/components/ui/icons';
import { useTheme } from '@/context/ThemeContext';
import Input from '../Input/Input';

const SelectSearch = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  error,
  placeholder = 'Buscar...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [themeClass, setThemeClass] = useState(variables['input-light']);
  const { theme } = useTheme();

  useEffect(() => {
    setThemeClass(
      theme === 'dark' ? variables['input-dark'] : variables['input-light']
    );
  }, [theme]);

  const handleSelect = (selectedValue) => {
    if (!disabled) {
      onChange({ target: { name, value: selectedValue } });
      setIsOpen(false);
      setSearch('');
    }
  };

  // Filtrar opciones por búsqueda
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Cerrar lista al hacer clic afuera
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
          {options.find((opt) => opt.value === value)?.label
            ? `${options.find((opt) => opt.value === value).label} ` +
              (options.find((opt) => opt.value === value).id
                ? `(ID: ${options.find((opt) => opt.value === value).id})`
                : '')
            : value}
        </span>
        {/* <img src={DownIcon} alt='Desplegar' className={styles.dropdownIcon} /> */}
        <DownIcon className={styles.dropdownIcon} />
      </div>
      {isOpen && (
        <div
          className={styles.selectWrapper + ' ' + (isOpen ? styles.open : '')}
        >
          <ul className={styles.optionsList}>
            <div className={styles.searchBarWrapper}>
              <Input
                variant='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                customClassName={inputStyles['input__select-search--small']}
                margin='20px 16px 10px'
                width={80}
                searchIconPosition='right'
              />
            </div>
            {filteredOptions.length === 0 ? (
              <li className={styles.noOptions}>Sin resultados</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`${styles.option} ${
                    option.disabled ? styles.optionDisabled : ''
                  } ${option.value === value ? styles.selectedOption : ''}`}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {option.id && (
                    <span
                      className={styles.optionId}
                      style={{
                        fontSize: '0.85em',
                        color: '#888',
                        marginLeft: 8,
                      }}
                    >
                      (ID: {option.id})
                    </span>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

SelectSearch.propTypes = {
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
  placeholder: PropTypes.string,
};

export default SelectSearch;
