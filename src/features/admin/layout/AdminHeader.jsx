import { useState } from 'react';
import { getCurrentUser } from '../../../api/auth';
import './AdminHeader.css';
// import { useState } from 'react';

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }) => {
  const user = getCurrentUser();
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

export default AdminHeader;
