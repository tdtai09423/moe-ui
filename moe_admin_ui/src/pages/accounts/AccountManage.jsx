import { Table, Input, Select, Button, Flex, Typography, Space } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  ExportOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import styles from "./AccountManage.module.scss";
import { listAccColumn } from "../../constants/accountColumn.jsx";
import { useState } from "react";
import AccountCreate from "./components/AccountCreate.jsx";
const { Title, Text } = Typography;

const AccountManage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const data = [
    {
      key: "1",
      name: "Chua Jun Hao",
      nric: "S9217788Q",
      age: 33,
      balance: 1200,
      education: "Tertiary",
      status: "Singapore Citizen",
      created: "14/11/22",
      courses: 0,
    },
    {
      key: "2",
      name: "Eric Nguyen",
      nric: "s1234567a",
      age: 26,
      balance: 0,
      education: "Secondary",
      status: "Non-Resident",
      created: "12/01/26",
      courses: 3,
    },
    // ... thêm data tương tự hình
  ];
  return (
    <>
      <div className={styles.accountContainer}>
        {/* 1. Header */}
        <Flex
          justify="space-between"
          align="center"
          className={styles.headerSection}
        >
          <div>
            <Title level={4} className={styles.title}>
              Account Management
            </Title>
            <Text className={styles.subTitle}>Manage all accounts</Text>
          </div>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            className={styles.createBtn}
            onClick={() => setOpenCreate(true)}
          >
            Create Account
          </Button>
        </Flex>

        {/* 2. Filter Card */}
        <div className={styles.filterCard}>
          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Search by name, NRIC or email..."
            className={styles.searchInput}
            size="large"
          />

          <Flex gap="middle" wrap="wrap">
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Education Level</span>
              <Select
                defaultValue="All"
                className={styles.customSelect}
                options={[{ value: "All", label: "All Levels" }]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Schooling Status</span>
              <Select
                defaultValue="All"
                className={styles.customSelect}
                options={[{ value: "All", label: "All Students" }]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Residential Status</span>
              <Select
                defaultValue="All"
                className={styles.customSelect}
                options={[{ value: "All", label: "All Statuses" }]}
              />
            </div>
            <div style={{ flex: 1.5 }}>
              <span className={styles.filterLabel}>Balance Range ($)</span>
              <Flex gap="small" align="center">
                <Input placeholder="Min" className={styles.customInput} />
                <span>-</span>
                <Input placeholder="Max" className={styles.customInput} />
              </Flex>
            </div>
            <div style={{ flex: 1.5 }}>
              <span className={styles.filterLabel}>Age Range</span>
              <Flex gap="small" align="center">
                <Input placeholder="Min" className={styles.customInput} />
                <span>-</span>
                <Input placeholder="Max" className={styles.customInput} />
              </Flex>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <Select
                suffixIcon={<SwapOutlined rotate={90} />}
                defaultValue="name"
                style={{ width: 140 }}
                options={[{ value: "name", label: "Name (A-Z)" }]}
              />
            </div>
          </Flex>
        </div>

        {/* 3. Export Button */}
        <Flex justify="flex-end" style={{ marginBottom: 16 }}>
          <Button icon={<ExportOutlined />}>Export</Button>
        </Flex>

        {/* 4. Table */}
        <div className={styles.tableWrapper}>
          <Table columns={listAccColumn} dataSource={data} pagination={false} />
        </div>
      </div>
      <AccountCreate open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};

export default AccountManage;
