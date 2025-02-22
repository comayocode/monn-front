import './LandingPage.css'; // Estilos específicos de la Landing
import LandingBanner from '../features/landing/LandingBanner'; // Importamos el componente LandingBanner
import LandingNavbar from '../features/landing/LandingNavbar';
import LandingHero from '../features/landing/LandingHero';


function LandingPage() {
  return (
    <div className="landing-page">
      <LandingBanner />
      <LandingNavbar />
      <LandingHero />
    </div>
  );
}

export default LandingPage;
