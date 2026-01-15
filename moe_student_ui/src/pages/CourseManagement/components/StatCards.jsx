import React from 'react';
import { ExclamationCircleOutlined, WalletOutlined } from '@ant-design/icons';
import styles from '../CourseManagement.module.scss';

const StatCards = () => {
  return (
    <div className={styles.statsRow}>
      {/* Card 1: Outstanding */}
      <div className={styles.statCard}>
         <div className={`${styles.iconWrapper} ${styles.orange}`}>
            <ExclamationCircleOutlined />
         </div>
         <div className={styles.statInfo}>
            <span className={styles.label}>Outstanding</span>
            <span className={styles.value}>$1,000.00</span>
         </div>
      </div>

      {/* Card 2: Balance */}
      <div className={styles.statCard}>
         <div className={`${styles.iconWrapper} ${styles.teal}`}>
            <WalletOutlined />
         </div>
         <div className={styles.statInfo}>
            <span className={styles.label}>Account Balance</span>
            <span className={styles.value}>$10,665.00</span>
         </div>
      </div>
    </div>
  );
};

export default StatCards;