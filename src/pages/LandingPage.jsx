import { Link } from 'react-router-dom'; // Importamos Link para la navegación
import Hero from '../components/landing/Hero'; // Componente Hero
import AboutMe from '../components/landing/AboutMe'; // Componente Acerca de mí
import Products from '../components/landing/Products'; // Componente Productos
import Contact from '../components/landing/Contact'; // Componente Contacto
import './LandingPage.css'; // Estilos específicos de la Landing

function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />  {/* Sección Hero */}
      <AboutMe />  {/* Sección Acerca de mí */}
      <Products />  {/* Sección Productos */}
      <Contact />  {/* Sección Contacto */}

      {/* Botón para ingresar al Login */}
      <div className="login-button-container">
        <Link to="/login">
          <button className="login-button">Iniciar Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
