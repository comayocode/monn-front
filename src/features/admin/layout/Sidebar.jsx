import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Logo from '../../../components/common/Logo/Logo';
import useAuth from "@/context/useAuth";
import PropTypes from 'prop-types';

function Sidebar({ isSidebarOpen }) {
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '/src/assets/icons/dashboard.svg',
      path: '/admin/dashboard',
      roles: ['admin', 'user'],
    },
    {
      title: 'Clientes',
      icon: '/src/assets/icons/clients.svg',
      path: '/admin/clientes',
      roles: ['admin', 'user'],
    },
    {
      title: 'Productos',
      icon: '/src/assets/icons/products.svg',
      path: '/admin/productos',
      roles: ['admin', 'user'],
    },
    {
      title: 'Usuarios',
      icon: '/src/assets/icons/users-conf.svg',
      path: '/admin/usuarios',
      roles: ['admin'],
    },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar--collapsed'}`}>
      <Logo isSidebarOpen={isSidebarOpen} />
      <div className='sidebar__menu'>
        <ul className='sidebar__links'>
          {menuItems.map(
            (item) =>
              user &&
              item.roles.includes(user.role) && (
                <li key={item.path} className='sidebar__link'>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <img
                      className='sidebar__icon'
                      src={item.icon || '/placeholder.svg'}
                      alt={item.title}
                    />
                    {isSidebarOpen ? item.title : ''}
                  </NavLink>
                </li>
              )
          )}
        </ul>
        <button className='logout-button' onClick={handleLogout}>
          <img src='/src/assets/icons/logout.svg' alt='cerrar sesion' />
          <span className='logout-button__text'>
            {isSidebarOpen ? 'Cerrar Sesión' : ''}
          </span>
        </button>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;