import React from 'react';
import { Table, Tag } from 'antd';
import { ReadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import styles from '../Dashboard.module.scss';

const CoursesTable = ({ data, loading = false }) => {
  const navigate = useNavigate(); 

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 280,
      fixed: 'left',
      render: (text, record) => (
        <div className={styles.courseInfo}>
          <span className={styles.cName}>{text}</span>
          <span className={styles.cUni}>{record.university}</span>
        </div>
      ),
    },
    { title: 'Payment Type', dataIndex: 'paymentType', key: 'paymentType', width: 140 },
    { title: 'Billing Cycle', dataIndex: 'billingCycle', key: 'billingCycle', width: 130 },
    { title: 'Enrolled Date', dataIndex: 'enrolledDate', key: 'enrolledDate', width: 130 },
    { title: 'Billing Date', dataIndex: 'billingDate', key: 'billingDate', width: 130 },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => {
        let color = status === 'Outstanding' ? 'orange' : 'success';
        const customStyle = status === 'Outstanding' ? {
             color: '#d46b08', background: '#fff7e6', borderColor: '#ffbb96',
        } : {
             color: '#389e0d', background: '#f6ffed', borderColor: '#b7eb8f',
        };

        return (
          <Tag style={{ 
              ...customStyle, borderRadius: '12px', padding: '2px 12px', fontWeight: 600, fontSize: '12px', margin: 0
          }}>
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className={styles.tableSection}>
      <div className={styles.tableHeader}>
          <div className={styles.sectionTitle}>
              <ReadOutlined style={{color: '#0f766e'}} /> Your Courses
          </div>
          <a href="#" className={styles.viewAllLink}>
            View all <ArrowRightOutlined />
          </a>
      </div>
      
      <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false} 
          loading={loading}
          className={styles.customTable}
          scroll={{ x: 1000 }} 
          

          onRow={(record) => {
            return {
              onClick: () => {
                navigate(`/course-details/${record.key}`);
                console.log('Navigate to course ID:', record.key);
              },
            };
          }}
      />
    </div>
  );
};

export default CoursesTable;