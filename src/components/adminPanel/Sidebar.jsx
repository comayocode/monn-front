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

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar--collapsed'}`}>
      <Logo isSidebarOpen={isSidebarOpen} />
      <div className='sidebar__menu'>
        <ul className='sidebar__links'>
          {user && user.role === 'admin' && (
            <>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/clientes'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src='/src/assets/clients.svg'
                    alt='clientes'
                  />
                  {isSidebarOpen ? 'Clientes' : ''}
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/productos'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src='/src/assets/products.svg'
                    alt='productos'
                  />
                  {isSidebarOpen ? 'Productos' : ''}
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/usuarios'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src='/src/assets/users-conf.svg'
                    alt='usuarios'
                  />
                  {isSidebarOpen ? 'Usuarios' : ''}
                </NavLink>
              </li>
            </>
          )}
          {user && user.role === 'user' && (
            <>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/clientes'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src='/src/assets/clients.svg'
                    alt='clientes'
                  />
                  {isSidebarOpen ? 'Clientes' : ''}
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/productos'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    className='sidebar__icon'
                    src='/src/assets/products.svg'
                    alt='productos'
                  />
                  {isSidebarOpen ? 'Productos' : ''}
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <button className='logout-button' onClick={handleLogout}>
          <img src='/src/assets/logout.svg' alt='cerrar sesion' />
          <span className='logout-button__text'>{isSidebarOpen ? 'Cerrar Sesión' : ''}</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
