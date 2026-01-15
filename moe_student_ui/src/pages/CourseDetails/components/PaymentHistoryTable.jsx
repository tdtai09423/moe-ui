import React from 'react';
import { Table } from 'antd';
import StatusTag from '../../../components/common/StatusTag/StatusTag';
import styles from '../CourseDetails.module.scss';

const PaymentHistoryTable = ({ data }) => {
  const historyColumns = [
    { title: 'Payment Date', dataIndex: 'date', key: 'date', width: 150 },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
      render: t => <span style={{ color: '#1e293b', fontWeight: 500 }}>{t}</span>
    },
    { title: 'Paid Cycle', dataIndex: 'cycle', key: 'cycle', width: 130 },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      align: 'center',
      render: (amount) => <span className={styles.amountText}>{amount}</span>
    },
    { title: 'Payment Method', dataIndex: 'method', key: 'method', width: 180 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140, 
      align: 'center',
      render: (status) => <StatusTag status={status} />
    },
  ];

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTitle}>Payment History</div>
      <Table
        columns={historyColumns}
        dataSource={data}
        pagination={false}
        className={styles.historyTable}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default PaymentHistoryTable;