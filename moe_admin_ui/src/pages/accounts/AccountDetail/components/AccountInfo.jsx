import React from "react";
import InfoItem from "../../shared/InfoItem";
import StatusTag from "../../../../components/common/StatusTag/StatusTag";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import styles from "./AccountInfo.module.scss";

const AccountInfo = ({ student }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          <UserOutlined /> Student Information
        </h3>
      </div>
      <div className={styles.infoGrid}>
        <InfoItem
          label="DATE OF BIRTH"
          value={`${student.dateOfBirth} (${student.age} years old)`}
          icon={<CalendarOutlined />}
        />
        <InfoItem
          label="EMAIL"
          value={student.email}
          icon={<MailOutlined />}
        />
        <InfoItem
          label="PHONE"
          value={student.contactNumber}
          icon={<PhoneOutlined />}
        />
        <InfoItem
          label="EDUCATION LEVEL"
          value={student.educationLevel}
        />
        <InfoItem
          label="RESIDENTIAL STATUS"
          value={student.residentialStatus}
        />
        <InfoItem
          label="SCHOOLING STATUS"
          value={<StatusTag status={student.schoolingStatus?.replace(/([A-Z])/g, ' $1').trim()} />}
        />
        <InfoItem
          label="ACCOUNT CREATED"
          value={student.createdAt}
        />
        <InfoItem
          label="REGISTERED ADDRESS"
          value={student.registeredAddress}
        />
        <div />
        <InfoItem
          label="MAILING ADDRESS"
          value={student.mailingAddress}
        />
      </div>
    </div>
  );
};

export default AccountInfo;
