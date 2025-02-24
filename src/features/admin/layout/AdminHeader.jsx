import { useState } from 'react';
import PropTypes from 'prop-types';
import './AdminHeader.css';
import useAuth from '@/context/useAuth';

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className='admin-header'>
      <div
        className='admin-header__toggle'
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onToggleSidebar}
      >
        <img
          src='/src/assets/icons/sidebar.svg'
          alt='sidebar icon'
          className='admin-header__toggle-icon'
        />
        {showTooltip && (
          <div className='tooltip'>
            {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          </div>
        )}
      </div>

      <div className='admin-header__user'>
        <img
          src={user.pic}
          alt='imagen de perfil'
          className='admin-header__pic'
        />
        <div className='admin-header__info'>
          <p className='admin-header__username'>{user.username}</p>
          <p className='admin-header__role'>{user.role}</p>
        </div>
      </div>
    </div>
  );
};
AdminHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default AdminHeader;
