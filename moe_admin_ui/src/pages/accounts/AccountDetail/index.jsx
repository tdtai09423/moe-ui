import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import {
  BookOutlined,
  WarningOutlined,
  CreditCardOutlined,
  WalletOutlined
} from "@ant-design/icons";
import { useAccounts } from "../../../hooks/accounts/useAccount";
import AccountDetailHeader from "./components/AccountDetailHeader";
import AccountStats from "./components/AccountStats";
import AccountInfo from "./components/AccountInfo";
import DeactivateModal from "./components/DeactivateModal";
import EditAccountModal from "./components/EditAccountModal";
import ConfigurableTable from "../shared/ConfigurableTable";
import StatusTag from "../../../components/common/StatusTag/StatusTag";
import styles from "./AccountDetail.module.scss";

const AccountDetail = () => {
  const { id } = useParams();
  const { loading, error, accountInfo, getAccountByID } = useAccounts();
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) getAccountByID(id);
  }, [id]);

  const handleDeactivateClick = () => {
    setIsDeactivateModalOpen(true);
  };

  const handleDeactivateConfirm = async () => {
    setIsDeactivating(true);
    try {
      // TODO: Call API to deactivate account
      // await accountService.deactivateAccount(id);
      console.log('Deactivating account:', id);
      await getAccountByID(id);
      setIsDeactivateModalOpen(false);
    } catch (error) {
      console.error('Failed to deactivate account:', error);
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleDeactivateCancel = () => {
    setIsDeactivateModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSave = async (values) => {
    setIsSaving(true);
    try {
      // TODO: Call API to update account
      // await accountService.updateAccount(id, values);
      console.log('Updating account with values:', values);
      await getAccountByID(id);
      setIsEditModalOpen(false);
      // Show success message
    } catch (error) {
      console.error('Failed to update account:', error);
      // Show error message
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className={styles.loadingPage}><Spin size="large" /></div>;
  if (error) return <Alert message="Failed to load account details" type="error" showIcon />;
  if (!accountInfo) return null;

  const student = accountInfo.studentInformation || {};
  const enrolledCoursesData = accountInfo.enrolledCourses || [];
  const outstandingFeesData = accountInfo.outstandingFeesDetails || [];
  const topUpHistoryData = accountInfo.topUpHistory || [];
  const paymentHistoryData = accountInfo.paymentHistory || [];

  // Column definitions
  const enrolledColumns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName", render: t => <b>{t}</b> },
    { title: "Provider", dataIndex: "providerName", key: "providerName" },
    { title: "Billing Cycle", dataIndex: "billingCycle", key: "billingCycle" },
    { title: "Total Fee", dataIndex: "totalFree", key: "totalFree", render: v => `$${v?.toLocaleString()}` },
    { title: "Enrolled Date", dataIndex: "enrollmentDate", key: "enrollmentDate" },
    { title: "Collected", dataIndex: "collectedFee", key: "collectedFee", render: v => `$${v?.toLocaleString()}` },
    { title: "Next Payment", dataIndex: "nextPaymentDue", key: "nextPaymentDue" },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus", render: s => <StatusTag status={s} /> },
  ];

  const feesColumns = [
    { title: "Course", dataIndex: "courseName", key: "courseName", render: t => <b>{t}</b> },
    { title: "Provider", dataIndex: "providerName", key: "providerName" },
    { title: "Amount", dataIndex: "outstandingAmount", key: "outstandingAmount", render: v => <b style={{ color: '#d97706' }}>${v?.toLocaleString()}</b> },
    { title: "Billing Date", dataIndex: "billingDate", key: "billingDate" },
    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
  ];

  const topUpColumns = [
    { title: "Date & Time", key: "dateTime", render: (_, r) => `${r.topUpDate} ${r.topUpTime}` },
    { title: "Amount", dataIndex: "amount", key: "amount", render: v => <span style={{ color: '#16a34a', fontWeight: 600 }}>+${v?.toLocaleString()}</span> },
    { title: "Reference", dataIndex: "reference", key: "reference", render: t => t || '-' },
    { title: "Description", dataIndex: "description", key: "description", render: t => t || '-' },
  ];

  const paymentHistoryColumns = [
    { title: "Course", dataIndex: "courseName", key: "courseName", render: t => <b>{t}</b> },
    { title: "Provider", dataIndex: "providerName", key: "providerName" },
    { title: "Amount Paid", dataIndex: "amountPaid", key: "amountPaid", render: v => <b>${v?.toLocaleString()}</b> },
    { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
    { title: "Method", dataIndex: "paymentMethod", key: "paymentMethod" },
  ];

  return (
    <div className={styles.detailPage}>
      <AccountDetailHeader
        accountInfo={accountInfo}
        onDeactivate={handleDeactivateClick}
        onEdit={handleEditClick}
      />

      <AccountStats
        balance={accountInfo.balance}
        courseCount={accountInfo.courseCount}
        outstandingFees={accountInfo.outstandingFees}
      />

      <AccountInfo student={student} />

      <div className={styles.tablesStack}>
        <ConfigurableTable
          title="Enrolled Courses"
          icon={<BookOutlined />}
          columns={enrolledColumns}
          dataSource={enrolledCoursesData}
          rowKey={(r) => r.courseName + r.enrollmentDate}
        />
        <ConfigurableTable
          title="Outstanding Fees"
          icon={<WarningOutlined />}
          columns={feesColumns}
          dataSource={outstandingFeesData}
          rowKey={(r) => r.courseName + r.dueDate}
        />
        <ConfigurableTable
          title="Top Up History"
          icon={<CreditCardOutlined />}
          columns={topUpColumns}
          dataSource={topUpHistoryData}
          rowKey={(r) => r.topUpDate + r.topUpTime}
        />
        <ConfigurableTable
          title="Payment History"
          icon={<WalletOutlined />}
          columns={paymentHistoryColumns}
          dataSource={paymentHistoryData}
          rowKey={(r) => r.paymentDate + r.courseName}
        />
      </div>

      <DeactivateModal
        open={isDeactivateModalOpen}
        onCancel={handleDeactivateCancel}
        onConfirm={handleDeactivateConfirm}
        loading={isDeactivating}
        accountInfo={accountInfo}
      />

      <EditAccountModal
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
        loading={isSaving}
        accountInfo={accountInfo}
      />
    </div>
  );
};

export default AccountDetail;
