import React from 'react';
import { Layout } from 'antd';
import EduLogo from '../../../assets/icon/EduLogo';
import { SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import './MainHeader.scss';

const { Header } = Layout;



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