import React from 'react';
import { Table, Tag, Button } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from '../CourseManagement.module.scss';
import { coursesData } from '../../../constants/mockData';
import StatusTag from '../../../components/common/StatusTag/StatusTag';

const EnrolledTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 280,
      fixed: 'left',
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>
            {text}
          </span>
          <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
            {record.university}
          </span>
        </div>
      )
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      width: 100,
      render: t => <b style={{ color: '#1e293b' }}>{t}</b>
    },
    {
      title: 'Billing Cycle',
      dataIndex: 'billingCycle',
      key: 'billingCycle',
      width: 120
    },
    {
      title: 'Enrolled On',
      dataIndex: 'enrolledDate',
      key: 'enrolledDate',
      width: 120
    },
    {
      title: 'Billing Date',
      dataIndex: 'nextBillDate',
      key: 'nextBillDate',
      width: 120
    },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => {
        return (
          <StatusTag status={status} />
        );
      }
    },
    {
      title: '',
      key: 'action',
      width: 120,
      align: 'right',
      render: (_, record) => (
        <Button
          size="small"
          className={styles.viewBtn}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/course-details/${record.id}`);
          }}
        >
          View Details
        </Button>
      )
    }
  ];

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <ReadOutlined className={styles.icon} style={{ color: '#0f766e' }} />
          <div className={styles.text}>
            <strong>Enrolled Courses</strong>
            <span>Your current course enrollments</span>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={coursesData} 
        pagination={{ pageSize: 5 }} 
        className={styles.customTable}
        scroll={{ x: 900 }}
        onRow={(record) => ({
          onClick: () => navigate(`/course-details/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default EnrolledTable;