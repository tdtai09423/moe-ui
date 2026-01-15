import React from 'react';
import { Card, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../UserProfile.module.scss'; 

const PersonalInfoSection = ({ profileData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const formatDateWithAge = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return `${formatDate(dateString)} (${age} years old)`;
  };

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
          <InfoItem label="Full Name" value={profileData?.fullName || '-'} />
          <InfoItem label="NRIC" value={profileData?.nric || '-'} />
          <InfoItem label="Date of Birth" value={formatDateWithAge(profileData?.dateOfBirth)} />
          <InfoItem label="Account Created" value={formatDate(profileData?.accountCreated)} />
          <InfoItem label="Schooling Status" value={profileData?.schoolingStatus || '-'} />
          <InfoItem label="Education Level" value={profileData?.educationLevel || '-'} />
          <InfoItem label="Residential Status" value={profileData?.residentialStatus || '-'} />

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