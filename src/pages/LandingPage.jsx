import { Link } from 'react-router-dom'; // Importamos Link para la navegación
import './LandingPage.css'; // Estilos específicos de la Landing
import LandingBanner from '../components/landing/LandingBanner'; // Importamos el componente LandingBanner
import LandingNavbar from '../components/landing/LandingNavbar';


function LandingPage() {
  return (
    <div className="landing-page">
      <LandingBanner />
      <LandingNavbar />
    </div>
  );
}

export default LandingPage;
