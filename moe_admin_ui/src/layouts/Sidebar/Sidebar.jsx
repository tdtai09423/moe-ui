import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_MENU } from '../../utils/menuItems'
import styles from './Sidebar.module.scss';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  return (
    <div className={styles.adminSidebarContainer}>
      {/* 1. Profile */}
      <div className={styles.profileSection}>
         <div className={styles.profileCard}>
            <div className={styles.avatar}>A</div>
            <div className={styles.info}>
                <span className={styles.name}>Admin User</span>
                <span className={styles.role}>Administrator</span>
            </div>
         </div>
      </div>

      {/* 2. Menu  */}
      <div className={styles.menuWrapper}>
        <Menu 
            mode="inline" 
            selectedKeys={[location.pathname]} 
            items={ADMIN_MENU.map(i => ({...i, label: <Link to={i.key} onClick={onClose}>{i.label}</Link>}))}
            className={styles.adminMenu} 
        />
      </div>

      {/* 3. Footer System Status */}
      <div className={styles.footerSection}>
        <div className={styles.systemStatusCard}>
          <div className={styles.statusLabel}>System Status</div>
          <div className={styles.statusRow}>
             <span className={styles.dot}></span>
             <span className={styles.statusText}>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;