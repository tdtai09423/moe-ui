import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_MENU } from '../../utils/menuItems'
import './Sidebar.scss';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  return (
    <div className="admin-sidebar-container">
      {/* 1. Profile */}
      <div className="profile-section">
         <div className="profile-card">
            <div className="avatar">A</div>
            <div className="info">
                <span className="name">Admin User</span>
                <span className="role">Administrator</span>
            </div>
         </div>
      </div>

      {/* 2. Menu  */}
      <div className="menu-wrapper">
        <Menu 
            mode="inline" 
            selectedKeys={[location.pathname]} 
            items={ADMIN_MENU.map(i => ({...i, label: <Link to={i.key} onClick={onClose}>{i.label}</Link>}))}
            className="admin-menu" 
        />
      </div>

      {/* 3. Footer System Status */}
      <div className="footer-section">
        <div className="system-status-card">
          <div className="status-label">System Status</div>
          <div className="status-row">
             <span className="dot"></span>
             <span className="status-text">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;