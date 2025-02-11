import { Outlet } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import Sidebar from '../components/adminPanel/Sidebar';
import './AdminPanel.css';

function AdminPanel() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };

  const user = getCurrentUser();

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Bienvenido, {user ? user.username : 'Usuario'}</p>
          {/* <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button> */}
        </div>
        {/* Aquí renderizará el contenido de las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
