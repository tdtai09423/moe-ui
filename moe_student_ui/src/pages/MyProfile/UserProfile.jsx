import React from 'react';
import PersonalInfoSection from './components/PersonalInfoSection.jsx';
import ContactAddressSection from './components/ContactAddressSection.jsx';
import styles from './UserProfile.module.scss'; 

const UserProfile = () => {
  return (
    <div className={styles.userProfilePage}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>My Profile</h1>
          <p>View and update your personal information</p>
        </div>

        <PersonalInfoSection />
        <ContactAddressSection />
      </div>
    </div>
  );
};

export default UserProfile;