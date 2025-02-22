import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Logo from '../Logo';
import { useEffect } from 'react';
import { logout, isAuthenticated } from '../../services/authService';

function Sidebar({ isSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', icon: '/src/assets/dashboard.svg', path: '/admin/dashboard', roles: ['admin', 'user'] },
    { title: 'Clientes', icon: '/src/assets/clients.svg', path: '/admin/clientes', roles: ['admin', 'user'] },
    { title: 'Productos', icon: '/src/assets/products.svg', path: '/admin/productos', roles: ['admin', 'user'] },
    { title: 'Usuarios', icon: '/src/assets/users-conf.svg', path: '/admin/usuarios', roles: ['admin'] },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar--collapsed'}`}>
      <Logo isSidebarOpen={isSidebarOpen} />
      <div className='sidebar__menu'>
        <ul className='sidebar__links'>
        {menuItems.map((item) => (
            (user && item.roles.includes(user.role)) && (
              <li key={item.path} className='sidebar__link'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src={item.icon || "/placeholder.svg"}
                    alt={item.title}
                  />
                  {isSidebarOpen ? item.title : ''}
                </NavLink>
              </li>
            )
          ))}
        </ul>
        <button className='logout-button' onClick={handleLogout}>
          <img src='/src/assets/logout.svg' alt='cerrar sesion' />
          <span className='logout-button__text'>
            {isSidebarOpen ? 'Cerrar Sesión' : ''}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
