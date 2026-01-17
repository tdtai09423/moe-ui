import React from 'react';
import { Table, Button } from 'antd';
import StatusTag from '../../../components/common/StatusTag/StatusTag';
import styles from '../CourseDetails.module.scss';
import { formatDate, formatBillingCycle } from '../../../utils/formatters';

const OutstandingFees = ({ data }) => {
  const columns = [
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 300,
      render: (text, record) => (
        <div className={styles.courseCell}>
          <div className={styles.name}>{text}</div>
          <div className={styles.provider}>{record.provider}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'left',
      render: (text) => <span className={styles.amountText}>{text}</span>,
    },
    {
      title: 'Billing Cycle',
      dataIndex: 'billingCycle',
      key: 'billingCycle',
      width: 140,
      render: (text) => <span className={styles.cycleText}>{formatBillingCycle(text)}</span>,
    },
    {
      title: 'Billing Date',
      dataIndex: 'billingDate',
      key: 'billingDate',
      width: 140,
      render: (text) => <span className={styles.dateText}>{formatDate(text)}</span>,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 160,
      render: (text, record) => (
        <div className={styles.dueDateCell}>
          <span className={styles.date}>{formatDate(text)}</span>
          {record.daysLeft && <span className={styles.daysLeft}>{record.daysLeft}</span>}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => <StatusTag status={status} />,     
    },
    {
      title: '',
      key: 'action',
      width: 120,
      align: 'right',
      render: () => (
        <Button type="primary" className={styles.payNowBtn}>
          Pay Now
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTitle}>Outstanding Fees</div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className={styles.outstandingTable}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default OutstandingFees;