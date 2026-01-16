import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message, Spin } from 'antd';
import { WalletFilled, ReadFilled, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './Dashboard.module.scss';


import WelcomeBanner from './components/WelcomeBanner';
import StatsCard from './components/StatsCard';
import CoursesTable from './components/CoursesTable';


import { userData, coursesData } from '../../constants/mockData';
import accountService from '../../services/accountService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(userData.balance);
  const [outstandingFees, setOutstandingFees] = useState({ amount: userData.outstandingAmount, count: userData.pendingChargesCount });
  const [activeCourses, setActiveCourses] = useState([]);
  const [totalActiveCourses, setTotalActiveCourses] = useState(userData.activeCoursesCount);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Lấy user data từ localStorage
  const getUserFromLocalStorage = () => {
    try {
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        return JSON.parse(userDataStr);
      }
    } catch (error) {
      console.error('Error parsing user_data from localStorage:', error);
    }
    return null;
  };

  const currentUser = getUserFromLocalStorage();
  const userName = currentUser?.fullName || userData.name;
  const id = currentUser?.id;
  const accountHolderId = currentUser?.accountid;

  // Fetch all data on component mount
  useEffect(() => {
    if (accountHolderId) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [accountHolderId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Gọi 3 API song song
      const [balanceRes, outstandingRes, coursesRes] = await Promise.all([
        accountService.getBalance(id).catch(err => {
          console.error('Error fetching balance:', err);
          return null;
        }),
        accountService.getOutstandingFees(id).catch(err => {
          console.error('Error fetching outstanding fees:', err);
          return null;
        }),
        accountService.getActiveCourses(accountHolderId).catch(err => {
          console.error('Error fetching active courses:', err);
          return null;
        })
      ]);

      console.log('Dashboard Data:', { balance: balanceRes, outstanding: outstandingRes, courses: coursesRes });

   
      if (balanceRes) {
        const balanceData = balanceRes.data || balanceRes;
        setBalance(balanceData.balance || balanceData.amount || balanceData);
      }
      
      if (outstandingRes) {
        const outstandingData = outstandingRes.data || outstandingRes;
        setOutstandingFees({
          amount: outstandingData.totalOutstandingFee || userData.outstandingAmount,
          count: outstandingData.outstandingInvoices?.length || 0
        });
      }
      
      if (coursesRes) {
        const coursesData = coursesRes.data || coursesRes;
        // API trả về paginated response với items array và totalCount
        if (coursesData.items && Array.isArray(coursesData.items)) {
          // Transform API data to match table format
          const transformedCourses = coursesData.items.map(course => ({
            key: course.enrollmentId,
            courseName: course.courseName,
            university: course.providerName,
            paymentType: course.paymentType,
            billingCycle: course.billingCycle,
            enrolledDate: course.enrollDate ? new Date(course.enrollDate).toLocaleDateString('en-GB') : '-',
            billingDate: course.billingDate ? new Date(course.billingDate).toLocaleDateString('en-GB') : '-',
            status: course.status
          }));
          setActiveCourses(transformedCourses);
          setTotalActiveCourses(coursesData.totalCount || coursesData.items.length);
        } else if (Array.isArray(coursesData)) {
          setActiveCourses(coursesData);
          setTotalActiveCourses(coursesData.length);
        }
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Display loading spinner
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large">
          <div style={{ padding: '50px' }}>Loading dashboard...</div>
        </Spin>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>

      <WelcomeBanner userName={userName} />

      <div className={styles.statsSection}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Account Balance"
              value={`$${Number(balance || 0).toFixed(2)}`}
              subText="Available Credits"
              icon={<WalletFilled />}
              iconColorClass={styles.iconTeal}
              valueColorClass={styles.highlight}
            />
          </Col>

          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Active Courses"
              value={totalActiveCourses}
              subText="Currently enrolled"
              icon={<ReadFilled />}
              iconColorClass={styles.iconBlue}
            />
          </Col>

          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Outstanding Fees"
              value={`$${Number(outstandingFees.amount || 0).toFixed(2)}`}
              subText={`${outstandingFees.count} pending charges`}
              icon={<ExclamationCircleFilled />}
              variant="action"
              iconColorClass={styles.iconOrange}
              valueColorClass={styles.warning}
            >
              <Button type="primary" className={styles.payBtn} block>Pay Now</Button>
            </StatsCard>
          </Col>
        </Row>
      </div>


      <CoursesTable 
        data={activeCourses.length > 0 ? activeCourses : coursesData} 
        loading={coursesLoading}
      />

    </div>
  );
};

export default Dashboard;