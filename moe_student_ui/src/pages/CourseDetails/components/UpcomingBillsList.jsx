import React from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import StatusTag from '../../../components/common/StatusTag/StatusTag';
import styles from '../CourseDetails.module.scss';
import { formatDate } from '../../../utils/formatters';

const UpcomingBillsList = ({ bills }) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTitle}>Upcoming Billing Cycles</div>
      <div className={styles.billingList}>
        {bills.map(bill => (
          <div key={bill.key} className={styles.billingItem}>
            <div className={styles.leftSide}>
              <div className={styles.calendarIcon}>
                <CalendarOutlined />
              </div>
              <div className={styles.dateInfo}>
                <span className={styles.month}>{bill.month}</span>
                <span className={styles.due}>Due: {formatDate(bill.due)}</span>
              </div>
            </div>
            <div className={styles.rightSide}>
              <span className={styles.amount}>{bill.amount}</span>
              <StatusTag status={bill.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBillsList;