import React from 'react';
import { Table, Tag, Button } from 'antd';
import { ExclamationCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { pendingFeesData } from '../../../constants/mockData';
import styles from '../CourseManagement.module.scss';
import StatusTag from '../../../components/common/StatusTag/StatusTag';

const PendingFees = () => {

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
    { title: 'Billing Date', dataIndex: 'billDate', key: 'billDate', width: 120 },
    {
      title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', width: 140,
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>{text}</span>
          <span style={{ fontSize: 11, color: '#d46b08' }}>In {record.daysLeft}</span>
        </div>
      )
    },
    {
      title: 'Payment Status', dataIndex: 'status', key: 'status', width: 120,
      render: (status) => <StatusTag status={status} />
    },
    {
      title: '', key: 'action', width: 120, align: 'right',
      render: () => <Button type="primary" className={styles.payNowSmall}>Pay Now</Button>
    }
  ];

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <ExclamationCircleOutlined className={styles.icon} style={{ color: '#d46b08' }} />
          <div className={styles.text}>
            <strong>Pending Fees</strong>
            <span>Outstanding course fees requiring payment</span>
          </div>
        </div>
        <Button type="primary" icon={<DollarCircleOutlined />} className={styles.payAllBtn}>
          Pay All Outstanding
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={pendingFeesData}
        pagination={{ pageSize: 5 }}
        className={styles.customTable}
        scroll={{ x: 1000 }}
        onRow={() => ({
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default PendingFees;