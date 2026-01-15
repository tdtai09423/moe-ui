import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { USER_MENU } from '../../utils/menuItems';
// Thêm icon Logout
import { LogoutOutlined } from '@ant-design/icons'; 
import styles from './UserSidebar.module.scss';

const UserSidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  // Mock data
  const currentUser = { name: "Tan Wei Ming", nric: "S****123A" };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {

    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user_data');
    
    // 2. Chuyển hướng về trang login
    navigate('/login');
    
    // 3. Đóng drawer nếu đang ở mobile
    if (onClose) onClose();
  };

  return (
    <div className={styles.userSidebarContainer}>
      {/* 1. Profile */}
      <div className={styles.profileSection}>
         <div className={styles.profileCard}>
            <div className={styles.avatar}>
               {currentUser.name ? currentUser.name.substring(0, 1).toUpperCase() : 'U'}
            </div>
            <div className={styles.info}>
               <span className={styles.name}>{currentUser.name}</span>
               <span className={styles.role}>{currentUser.nric}</span>
            </div>
         </div>
      </div>

      {/* 2. Menu */}
      <div className={styles.menuWrapper}>
        <Menu 
           mode="inline"
           selectedKeys={[location.pathname]}
           items={USER_MENU.map(i => ({
             ...i, 
             label: <Link to={i.key} onClick={onClose}>{i.label}</Link>
           }))}
           className={styles.userMenu}
        />
      </div>

      {/* 3. Footer Section - LOGOUT BUTTON */}
      <div className={styles.footerSection}>
        <div className={styles.logoutBtn} onClick={handleLogout}>
           <LogoutOutlined className={styles.icon} />
           <span className={styles.text}>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;