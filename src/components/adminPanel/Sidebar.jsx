import { Link } from 'react-router-dom';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h3>Panel de Administración</h3>
      <ul>
        <li><Link to="/admin/landing">Landing</Link></li>
        {user && user.role === 'admin' && (
          <>
            <li><Link to="/admin/hero">Hero</Link></li>
            <li><Link to="/admin/about">Acerca de mí</Link></li>
            <li><Link to="/admin/products">Productos</Link></li>
            <li><Link to="/admin/contact">Contacto</Link></li>
          </>
        )}
        {user && user.role === 'user' && (
          <li><Link to="/admin/about">Acerca de mí</Link></li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
