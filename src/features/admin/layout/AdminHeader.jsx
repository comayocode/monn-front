import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import useAuth from '@/hooks/useAuth';

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = (event) => {
    event.stopPropagation(); // Evita que el evento llegue al div padre
    logout(); // Llamamos a la función de cierre de sesión
    navigate('/login'); // Redirige al login
  };

  const handleNavigateProfile = (event) => {
    event.stopPropagation(); // Evita que el evento llegue al div padre
    navigate('perfil');
    setShowMenu(false);
  };

  /* Cerrar menú al hacer clic afuera */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="admin-header">
      <div
        className="admin-header__toggle"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onToggleSidebar}
      >
        <img
          src="/src/assets/icons/sidebar.svg"
          alt="sidebar icon"
          className="admin-header__toggle-icon"
        />
        {showTooltip && (
          <div className="tooltip">
            {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          </div>
        )}
      </div>

      {/* Al hacer clic en el usuario, se muestra el menú */}
      <div className="admin-header__user" onClick={() => setShowMenu(!showMenu)} ref={menuRef}>
        <img src={user.pic} alt="imagen de perfil" className="admin-header__pic" />
        <div className="admin-header__info">
          <p className="admin-header__username">{user.username}</p>
          <p className="admin-header__role">{user.role}</p>
        </div>

        {/* Menú desplegable */}
        {showMenu && (
          <div className="admin-header__menu">
            <button className='admin-header__menu-profile'onMouseDown={handleNavigateProfile}>Perfil</button>
            <button className='admin-header__menu-logout' onMouseDown={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

AdminHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default AdminHeader;
