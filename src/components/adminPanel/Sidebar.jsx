import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Logo from '../Logo';
import { useEffect } from 'react';
import { logout, isAuthenticated } from '../../services/authService';

function Sidebar() {
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
    <div className='sidebar'>
      <Logo />
      <div className='sidebar__menu'>
        <ul className='sidebar__links'>
          {user && user.role === 'admin' && (
            <>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/op-01'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Clientes
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/op-02'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Productos
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/op-03'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Usuarios
                </NavLink>
              </li>
            </>
          )}
          {user && user.role === 'user' && (
            <>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/op-01'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Clientes
                </NavLink>
              </li>
              <li className='sidebar__link'>
                <NavLink
                  to='/admin/op-02'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Productos
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <button className='logout-button' onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
