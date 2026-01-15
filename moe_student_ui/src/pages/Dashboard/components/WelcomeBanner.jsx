import React from 'react';
import { Typography } from 'antd';
import styles from '../Dashboard.module.scss'; 

const { Title } = Typography;

const WelcomeBanner = ({ userName = "Eric" }) => {
  return (
    <div className={styles.welcomeBanner}>
      <Title level={2} style={{ color: '#fff', margin: '0 0 8px 0', fontWeight: 800 }}>
        Welcome back, {userName}!
      </Title>
      <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '16px' }}>
        Manage your education account and course payments
      </span>
    </div>
  );
};

export default WelcomeBanner;