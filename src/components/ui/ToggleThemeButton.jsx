import { useTheme } from "../../context/ThemeContext";

const ToggleThemeButton = () => {
  const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Cambiar Tema</button>;
};

export default ToggleThemeButton;
