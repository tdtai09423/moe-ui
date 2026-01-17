import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './CourseDetails.module.scss';

// Import Components
import HeaderNav from './components/HeaderNav';
import SummaryStats from './components/SummaryStats';
import CourseInfoGrid from './components/CourseInfoGrid';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import UpcomingBillsList from './components/UpcomingBillsList';
import OutstandingFees from './components/OutstandingFees';

const CourseDetails = () => {
   const { id } = useParams();

   // --- MOCK DATA ---
   const courseInfo = {
      name: "COURSE A",
      provider: "HUFLIT University",
      status: "Active",
      startDate: "15/01/26",
      endDate: "15/01/27",
      paymentType: "Recurring",
      billingCycle: "Monthly",
      feePerCycle: "$500 / Monthly",
      totalFee: "$6000",
      outstanding: "$500"
   };

   const paymentHistoryData = [
      { key: '1', date: '14/01/26', name: 'COURSE A OUTSTANDING', cycle: 'Jan 2026', amount: '$500', method: 'Account Balance And Bank Transfer', status: 'Paid' },
   ];

   const outstandingFeesData = [
      {
         key: '1',
         courseName: 'Course D Combined Method test',
         provider: 'National University of Singapore',
         amount: '$500',
         billingCycle: 'Monthly',
         billingDate: '14/01/26',
         dueDate: '31/01/26',
         daysLeft: 'In 16 days',
         status: 'Outstanding',
      },
   ];

   const upcomingBills = [
      { key: '1', month: 'Feb 2026', due: '05/02/26', amount: '$500', status: 'Scheduled' },
      { key: '2', month: 'Mar 2026', due: '05/03/26', amount: '$500', status: 'Scheduled' },
      { key: '3', month: 'Apr 2026', due: '05/04/26', amount: '$500', status: 'Scheduled' },
   ];

   return (
      <div className={styles.detailContainer}>
         {/* 1. Header */}
         <HeaderNav
            courseName={courseInfo.name}
            provider={courseInfo.provider}
            status={courseInfo.status}
         />

         {/* 2. Top Stats */}
         <SummaryStats
            outstanding={courseInfo.outstanding}
            totalFee={courseInfo.totalFee}
         />

         {/* 3. Course Info */}
         <CourseInfoGrid info={courseInfo} />

         <OutstandingFees data={outstandingFeesData} />

         {/* 4. Payment History */}
         <PaymentHistoryTable data={paymentHistoryData} />



         {/* 5. Upcoming Bills */}
         <UpcomingBillsList bills={upcomingBills} />
      </div>
   );
};

export default CourseDetails;