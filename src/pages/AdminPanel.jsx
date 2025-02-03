import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import { logout, getCurrentUser, isAuthenticated } from '../services/authService'; // Importamos las funciones de auth
import './AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate(); // Usamos useNavigate en vez de useHistory

  useEffect(() => {
    // Si el usuario no está autenticado, redirigir al login
    if (!isAuthenticated()) {
      navigate('/login'); // Redirigir usando navigate
    }
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Limpiamos la sesión
    navigate('/login'); // Redirigimos al login
  };

  const user = getCurrentUser(); // Obtenemos el usuario actual

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user ? user.username : 'Usuario'}</p>
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default AdminPanel;
