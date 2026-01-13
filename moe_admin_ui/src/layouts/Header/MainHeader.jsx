import React from 'react';
import { Layout } from 'antd';
import { SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import './MainHeader.scss';

const { Header } = Layout;

const EduLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

const MainHeader = ({ toggleMobile }) => {


  return (
    <Header className="shared-header">
      <div className="header-left">
        {toggleMobile}
        <div className="logo-container">
          <EduLogo />
        </div>
        <div className="brand-info">
          <h1>EduCredit</h1>
          <span>Education Account System</span>
        </div>
      </div>     
    </Header>
  );
};
export default MainHeader;