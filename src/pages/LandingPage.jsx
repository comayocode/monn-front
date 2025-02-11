import './LandingPage.css'; // Estilos específicos de la Landing
import LandingBanner from '../components/landing/LandingBanner'; // Importamos el componente LandingBanner
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';


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
