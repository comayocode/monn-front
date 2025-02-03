import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="sidebar">
      <h3>Panel de Administración</h3>
      <ul>
        {/* Enlace común para todos los usuarios */}
        <li><Link to="/admin/landing">Landing</Link></li>

        {/* Enlaces para admin (acceso completo) */}
        {user && user.role === 'admin' && (
          <>
            <li><Link to="/admin/op-01">Operación 01</Link></li>
            <li><Link to="/admin/op-02">Operación 02</Link></li>
            <li><Link to="/admin/op-03">Operación 03</Link></li>
            <li><Link to="/admin/op-04">Operación 04</Link></li>
          </>
        )}

        {/* Enlaces para user (acceso limitado) */}
        {user && user.role === 'user' && (
          <>
            <li><Link to="/admin/op-01">Operación 01</Link></li>
            <li><Link to="/admin/op-02">Operación 02</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;