import React from 'react';
import styles from './CourseManagement.module.scss';

// Import Components
import StatCards from './components/StatCards';
import EnrolledTable from './components/EnrolledTable';
import PendingFees from './components/PendingFees';
import PaymentHistory from './components/PaymentHistory';

const CourseManagement = () => {
  return (
    <div className={styles.pageContainer}>
      
      {/* 1. Header */}
      <div className={styles.pageHeader}>
        <h2>Your Courses</h2>
        <p>View your enrolled courses and payment history</p>
      </div>

      {/* 2. Top Stats */}
      <StatCards />

      {/* 3. Tables */}
      <EnrolledTable />
      
      <PendingFees />
      
      <PaymentHistory />

    </div>
  );
};

export default CourseManagement;