import React from 'react';
import { Card, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../UserProfile.module.scss'; 

const PersonalInfoSection = () => {
  return (
    <Card className={styles.profileCard} variant='borderless'>
      

      <div className={`${styles.cardHeader} ${styles.isBordered}`}>
        <div className={styles.iconContainer} style={{ backgroundColor: '#f3f4f6' }}>
          <UserOutlined style={{ color: '#6b7280' }} />
        </div>
        <div className={styles.headerContent}>
          <h3>Personal Information</h3>
          <span>These details cannot be changed online</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <Row gutter={[48, 24]}>
          <InfoItem label="Full Name" value="Chua Jun Hao" />
          <InfoItem label="NRIC" value="S9217788Q" />
          <InfoItem label="Date of Birth" value="18/07/92 (33 years old)" />
          <InfoItem label="Account Created" value="14/11/22" />
          <InfoItem label="Schooling Status" value="Not In School" />
          <InfoItem label="Education Level" value="Tertiary" />
          <InfoItem label="Residential Status" value="SC (Singapore Citizen)" />
        </Row>
      </div>
    </Card>
  );
};

const InfoItem = ({ label, value }) => (
  <Col xs={24} md={12}>
    <div className={styles.infoField}>
      <label>{label}</label>
      <div className={`${styles.value} ${styles.valueBold}`}>{value}</div>
    </div>
  </Col>
);

export default PersonalInfoSection;