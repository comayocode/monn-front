import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@/context/ThemeContext";
import variables from "@/styles/variables.module.css";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange, disabled }) => {
  const { theme } = useTheme();
  const [themeClass, setThemeClass] = useState(variables["input-light"]);

  useEffect(() => {
    setThemeClass(theme === "dark" ? variables["input-dark"] : variables["input-light"]);
  }, [theme]);

  return (
    <label className={`${styles.checkboxContainer} ${themeClass}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};
Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
