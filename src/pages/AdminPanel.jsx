import { Outlet } from 'react-router-dom';
// import { getCurrentUser } from '../services/authService';
import Sidebar from '../components/adminPanel/Sidebar';
import './AdminPanel.css';
import AdminHeader from '../components/adminPanel/AdminHeader';
import { useState } from 'react';

function AdminPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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
