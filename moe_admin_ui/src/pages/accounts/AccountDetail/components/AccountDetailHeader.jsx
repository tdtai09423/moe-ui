import React from "react";
import { Button, Typography, Tag } from "antd";
import { ArrowLeftOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StatusTag from "../../../../components/common/StatusTag/StatusTag";
import styles from "./AccountDetailHeader.module.scss";

const { Title, Text } = Typography;

const AccountDetailHeader = ({ accountInfo, onDeactivate, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          className={styles.backBtn}
          onClick={() => navigate("/accounts")}
        />
        <div>
          <div className={styles.titleRow}>
            <Title level={3} className={styles.pageTitle}>
              {accountInfo.fullName}
            </Title>
            <StatusTag status={accountInfo.isActive ? "Active" : "Not Active"} />
          </div>
          <Text type="secondary" className={styles.subtitle}>
            {accountInfo.nric}
          </Text>
        </div>
      </div>
      <div className={styles.headerActions}>
        <Button icon={<EditOutlined />} onClick={onEdit}>Edit</Button>
        <Button
          type="primary"
          danger
          icon={<StopOutlined />}
          onClick={onDeactivate}
        >
          Deactivate Account
        </Button>
      </div>
    </div>
  );
};

export default AccountDetailHeader;
