import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag, Button, Table } from 'antd';
import {
   ArrowLeftOutlined,
   DollarOutlined,
   BookOutlined,
   CalendarOutlined,
   CreditCardOutlined,
   CheckCircleOutlined,
   BankOutlined,
   SyncOutlined,
   DollarCircleOutlined
} from '@ant-design/icons';
import StatusTag from '../../components/common/StatusTag/StatusTag';
import styles from './CourseDetails.module.scss';

const CourseDetails = () => {
   const { id } = useParams(); 
   const navigate = useNavigate();

   // --- MOCK DATA FOR "COURSE A" ---
   const courseInfo = {
      name: "COURSE A",
      provider: "Nanyang Technological University",
      status: "Active",
      startDate: "15/01/26",
      endDate: "15/01/27",
      paymentType: "Recurring",
      billingCycle: "Monthly",
      feePerCycle: "$500.00 / Monthly",
      totalFee: "$6000.00",
      outstanding: "$0.00"
   };

   const paymentHistoryData = [
      { key: '1', date: '14/01/26', name: 'COURSE A OUTSTANDING', cycle: 'Jan 2026', amount: '$500.00', method: 'Account Balance And Bank Transfer', status: 'Paid' },
   ];

   const upcomingBills = [
      { key: '1', month: 'Feb 2026', due: '05/02/26', amount: '$500.00', status: 'Scheduled' },
      { key: '2', month: 'Mar 2026', due: '05/03/26', amount: '$500.00', status: 'Scheduled' },
      { key: '3', month: 'Apr 2026', due: '05/04/26', amount: '$500.00', status: 'Scheduled' },
   ];

   // --- COLUMNS FOR PAYMENT HISTORY ---
   const historyColumns = [
      {
         title: 'Payment Date',
         dataIndex: 'date', 
         key: 'date',
         width: 140
      },
      {
         title: 'Course Name',
         dataIndex: 'name', 
         key: 'name',
         render: t => <b style={{ color: '#1e293b' }}>{t}</b>
      },
      {
         title: 'Paid Cycle',
         dataIndex: 'cycle',
         key: 'cycle',
         width: 130
      },
      {
         title: 'Amount',
         dataIndex: 'amount',
         key: 'amount',
         width: 130,
         align: 'right', 
         className: styles.amountText
      },
      {
         title: 'Payment Method',
         dataIndex: 'method',
         key: 'method',
         width: 180 
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         width: 120,
         align: 'center',
         render: (status) => <StatusTag status={status} />
      },
   ];

   return (
      <div className={styles.detailContainer}>

         {/* 1. HEADER NAV */}
         <div className={styles.headerNav}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
               <ArrowLeftOutlined />
            </button>
            <div className={styles.headerContent}>
               <div className={styles.titleInfo}>
                  <h1>{courseInfo.name}</h1>
                  <p>{courseInfo.provider}</p>
               </div>
               <StatusTag status={courseInfo.status} />
            </div>
         </div>

         {/* 2. TOP STATS CARDS */}
         <div className={styles.summaryRow}>
            {/* Card Outstanding */}
            <div className={styles.summaryCard}>
               <div className={`${styles.iconBox} ${styles.yellow}`}>
                  <DollarOutlined />
               </div>
               <div className={styles.info}>
                  <span className={styles.label}>Outstanding</span>
                  <span className={`${styles.value} ${styles.orange}`}>{courseInfo.outstanding}</span>
               </div>
            </div>
            {/* Card Total Fee */}
            <div className={styles.summaryCard}>
               <div className={`${styles.iconBox} ${styles.teal}`}>
                  <DollarCircleOutlined />
               </div>
               <div className={styles.info}>
                  <span className={styles.label}>Total Fee</span>
                  <span className={styles.value}>{courseInfo.totalFee}</span>
               </div>
            </div>
         </div>

         {/* 3. COURSE INFORMATION (GRID 2 CỘT) */}
         <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>Course Information</div>
            <div className={styles.infoGrid}>

               {/* Cột Trái */}
               <div className={styles.infoItem}>
                  <BookOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Course Name</span>
                     <span className={styles.value}>{courseInfo.name}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <CalendarOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Course Start</span>
                     <span className={styles.value}>{courseInfo.startDate}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <CreditCardOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Payment Type</span>
                     <span className={styles.value}>{courseInfo.paymentType}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <CheckCircleOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Status</span>
                     <StatusTag status={courseInfo.status} />
                  </div>
               </div>

               {/* Cột Phải */}
               <div className={styles.infoItem}>
                  <BankOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Provider</span>
                     <span className={styles.value}>{courseInfo.provider}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <CalendarOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Course End</span>
                     <span className={styles.value}>{courseInfo.endDate}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <SyncOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Billing Cycle</span>
                     <span className={styles.value}>{courseInfo.billingCycle}</span>
                  </div>
               </div>
               <div className={styles.infoItem}>
                  <DollarOutlined className={styles.itemIcon} />
                  <div className={styles.itemContent}>
                     <span className={styles.label}>Fee per Cycle</span>
                     <span className={styles.value}>{courseInfo.feePerCycle}</span>
                  </div>
               </div>

            </div>
         </div>

         {/* 4. PAYMENT HISTORY */}
         <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>Payment History</div>
            <Table
               columns={historyColumns}
               dataSource={paymentHistoryData}
               pagination={false}
               className={styles.historyTable}
               scroll={{ x: 800 }}
            />
         </div>

         {/* 5. UPCOMING BILLING CYCLES */}
         <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>Upcoming Billing Cycles</div>
            <div className={styles.billingList}>
               {upcomingBills.map(bill => (
                  <div key={bill.key} className={styles.billingItem}>
                     <div className={styles.leftSide}>
                        <div className={styles.calendarIcon}>
                           <CalendarOutlined />
                        </div>
                        <div className={styles.dateInfo}>
                           <span className={styles.month}>{bill.month}</span>
                           <span className={styles.due}>Due: {bill.due}</span>
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

      </div>
   );
};

export default CourseDetails;