import { Outlet } from 'react-router-dom';
// import { getCurrentUser } from '../services/authService';
import Sidebar from '../components/adminPanel/Sidebar';
import './AdminPanel.css';
import AdminHeader from '../components/adminPanel/AdminHeader';
import { useState } from 'react';

function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const [isSidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem(`sidebarState_${userId}`); // guardar en localStorage el state del sidebar para cada usuario registrado
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    setSidebarOpen((oldState) => {
      const newState = !oldState;
      localStorage.setItem(`sidebarState_${userId}`, JSON.stringify(newState)); // Guardar con ID único
      return newState;
    });
  };

  return (
    <div className="admin-panel">
      <Sidebar isSidebarOpen={isSidebarOpen}/>
      <div className="admin-content">
      <AdminHeader onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
