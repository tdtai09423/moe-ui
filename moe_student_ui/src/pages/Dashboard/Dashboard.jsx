import React from 'react';
import { Row, Col, Button } from 'antd';
import { WalletFilled, ReadFilled, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './Dashboard.module.scss';


import WelcomeBanner from './components/WelcomeBanner';
import StatsCard from './components/StatsCard';
import CoursesTable from './components/CoursesTable';


import { userData, coursesData } from '../../constants/mockData';

const Dashboard = () => {
  const { name, balance, activeCoursesCount, outstandingAmount, pendingChargesCount } = userData;

  return (
    <div className={styles.dashboardContainer}>

      <WelcomeBanner userName={name} />

      <div className={styles.statsSection}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Account Balance"
              value={balance}
              subText="Available Credits"
              icon={<WalletFilled />}
              iconColorClass={styles.iconTeal}
              valueColorClass={styles.highlight}
            />
          </Col>

          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Active Courses"
              value={activeCoursesCount}
              subText="Currently enrolled"
              icon={<ReadFilled />}
              iconColorClass={styles.iconBlue}
            />
          </Col>

          <Col xs={24} sm={24} lg={8}>
            <StatsCard
              title="Outstanding Fees"
              value={outstandingAmount}
              subText={`${pendingChargesCount} pending charges`}
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


      <CoursesTable data={coursesData} />

    </div>
  );
};

export default Dashboard;