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
import { useAccountList } from "../../hooks/accounts/useAccountList.jsx";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const AccountManage = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const { loading, data, total, filter, updateFilter, changePage } =
    useAccountList();

  const navigate = useNavigate();

  const handleMultiSelectWithAll = (values, fieldName, updateFilter) => {
    if (values.includes("ALL")) {
      updateFilter({ [fieldName]: [] });
      return;
    }

    updateFilter({ [fieldName]: values });
  };

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
            value={filter.Search}
            onChange={(e) => updateFilter({ Search: e.target.value })}
          />

          <Flex gap="middle" wrap="wrap">
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Education Level</span>
              <Select
                placeholder="--Select Education Level--"
                mode="multiple"
                className={styles.customSelect}
                showSearch={false}
                value={filter.EducationLevel} 
                onChange={(values) =>
                  handleMultiSelectWithAll(
                    values,
                    "EducationLevel",
                    updateFilter
                  )
                }
                options={[
                  { value: "ALL", label: "All Levels" },
                  { value: "0", label: "Primary" },
                  { value: "1", label: "Secondary" },
                  { value: "2", label: "Post-secondary" },
                  { value: "3", label: "Tertiary" },
                  { value: "4", label: "Post-graduate" },
                ]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Schooling Status</span>
              <Select
                placeholder="--Select Schooling Status--"
                className={styles.customSelect}
                value={filter.SchoolingStatus}
                onChange={(value) => updateFilter({ SchoolingStatus: value })}
                options={[
                  { value: "", label: "All Student" },
                  { value: "InSchool", label: "In school" },
                  { value: "NotInSchool", label: "Not in school" },
                ]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span className={styles.filterLabel}>Residential Status</span>
              <Select
                placeholder="--Residential Status--"
                mode="multiple"
                className={styles.customSelect}
                showSearch={false}
                value={filter.ResidentialStatus}
                onChange={(values) =>
                  handleMultiSelectWithAll(
                    values,
                    "ResidentialStatus",
                    updateFilter
                  )
                }
                options={[
                  { value: "ALL", label: "All Status" },
                  { value: "0", label: "Singapore Citizen" },
                  {
                    value: "1",
                    label: "Permanent Resident (PR)",
                  },
                  { value: "2", label: "Non-citizen" },
                ]}
              />
            </div>
            <div style={{ flex: 1.5 }}>
              <span className={styles.filterLabel}>Balance Range ($)</span>
              <Flex gap="small" align="center">
                <Input
                  placeholder="Min"
                  className={styles.customInput}
                  value={filter.MinBalance}
                  onChange={(e) => updateFilter({ MinBalance: e.target.value })}
                />
                <span>-</span>
                <Input
                  placeholder="Max"
                  className={styles.customInput}
                  value={filter.MaxBalance}
                  onChange={(e) => updateFilter({ MaxBalance: e.target.value })}
                />
              </Flex>
            </div>
            <div style={{ flex: 1.5 }}>
              <span className={styles.filterLabel}>Age Range</span>
              <Flex gap="small" align="center">
                <Input
                  placeholder="Min"
                  className={styles.customInput}
                  value={filter.MinAge}
                  onChange={(e) => updateFilter({ MinAge: e.target.value })}
                />
                <span>-</span>
                <Input
                  placeholder="Max"
                  className={styles.customInput}
                  value={filter.maxAge}
                  onChange={(e) => updateFilter({ maxAge: e.target.value })}
                />
              </Flex>
            </div>
           
          </Flex>
        </div>

        {/* 3. Export Button */}
        <Flex justify="flex-end" style={{ marginBottom: 16 }}>
          <Button icon={<ExportOutlined />}>Export</Button>
        </Flex>

        {/* 4. Table */}
        <div className={styles.tableWrapper}>
          <Table
            columns={listAccColumn}
            loading={loading}
            dataSource={data}
            pagination={{
              current: filter.pageNumber,
              pageSize: filter.pageSize,
              total,
              onChange: changePage,
            }}
            rowKey="id"
            onRow={(record) => ({
              style: { cursor: "pointer" },
              onClick: () => {
                navigate(`/accounts/${record.id}`);
              },
            })}
          />
        </div>
      </div>
      <AccountCreate open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};

export default AccountManage;
