import React, { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import { MenuOutlined ,CloseOutlined} from '@ant-design/icons';
import SharedHeader from './Header/MainHeader';
import AdminSidebar from './Sidebar/Sidebar';
import './AdminLayout.scss';
const { Sider, Content } = Layout;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Layout className="app-layout-main">
      <SharedHeader
        toggleMobile={
          <div className="mobile-toggle-btn" onClick={() => setMobileOpen(true)}>
            <MenuOutlined />
          </div>
        }
      />

      <Layout className="layout-content-wrapper">
        {/* Sidebar cứng cho Desktop */}
        <Sider width={260} theme="light" trigger={null} className="layout-sider">
          <AdminSidebar />
        </Sider>

        {/* Drawer trượt cho Mobile */}
        <Drawer
          open={mobileOpen}
          placement="left"
          onClose={() => setMobileOpen(false)}
          size={280} 
          className="responsive-drawer" 
          styles={{ body: { padding: 0 } }}
          closeIcon={<CloseOutlined style={{ fontSize: 20, color: '#64748b' }} />}
          title={<span style={{ fontWeight: 700, fontSize: 16 }}>Menu</span>}
        >
          <AdminSidebar onClose={() => setMobileOpen(false)} />
        </Drawer>

        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;