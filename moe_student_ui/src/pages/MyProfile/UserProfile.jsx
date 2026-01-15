import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import PersonalInfoSection from './components/PersonalInfoSection.jsx';
import ContactAddressSection from './components/ContactAddressSection.jsx';
import accountService from '../../services/accountService';
import styles from './UserProfile.module.scss'; 

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await accountService.getMyProfile();
      const data = response.data || response;
      console.log('Profile Data:', data);
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      const updateData = {
        email: values.email,
        contactNumber: values.phone,
        registeredAddress: values.registeredAddress,
        mailingAddress: values.mailingAddress
      };
      
      await accountService.updateProfile(updateData);
      message.success('Profile updated successfully!');
      
      // Refresh profile data
      await fetchProfile();
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
      return false;
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large">
          <div style={{ padding: '50px' }}>Loading profile...</div>
        </Spin>
      </div>
    );
  }

  return (
    <div className={styles.userProfilePage}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>My Profile</h1>
          <p>View and update your personal information</p>
        </div>

        <PersonalInfoSection profileData={profileData} />
        <ContactAddressSection 
          profileData={profileData} 
          onUpdate={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default UserProfile;