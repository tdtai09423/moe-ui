import React from 'react';
import { Table } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { paymentHistoryData as data } from '../../../constants/mockData';
import styles from '../CourseManagement.module.scss';

const PaymentHistory = () => {

  const columns = [
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 280,
      fixed: 'left',
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>{text}</span>
          <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{record.university}</span>
        </div>
      )
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 120, className: styles.amountText },
    { title: 'Billing Cycle', dataIndex: 'cycle', key: 'cycle', width: 120 },
    { title: 'Paid Date', dataIndex: 'paidDate', key: 'paidDate', width: 140 },
    { title: 'Method', dataIndex: 'method', key: 'method', width: 150 },
  ];

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <HistoryOutlined className={styles.icon} style={{ color: '#389e0d' }} />
          <div className={styles.text}>
            <strong>Payment History</strong>
            <span>Your completed course fee payments</span>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        className={styles.customTable}
        scroll={{ x: 800 }}
        onRow={() => ({
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default PaymentHistory;