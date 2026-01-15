import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Table,
  Tag,
  Alert,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  StopOutlined,
  DollarOutlined,
  BookOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styles from "./styles/AccountDetail.module.scss";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccounts } from "../../../hooks/accounts/useAccount";

const { Title, Text } = Typography;

export default function StudentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, accountInfo, getAccountByID } = useAccounts();
  console.log("IDS:", id);
  useEffect(() => {
    if (!id) return;
    const fetchAccount = async () => {
      await getAccountByID(id);
    };
    fetchAccount();
  }, [id]);
  console.log("Id:", id);

  if (loading) return;
  if (error) return <Alert message="Load failed" type="error" />;
  console.log(accountInfo);
  return (
    <Layout className={styles.page}>
      {accountInfo && (
        <>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Button onClick={() => navigate("/accounts")}>
                <ArrowLeftOutlined className={styles.backIcon} />
              </Button>
              <div>
                <Space direction="vertical" size={4}>
                  <Space size={8}>
                    <Title
                      level={4}
                      className={styles.name}
                      style={{ margin: 0 }}
                    >
                      {accountInfo.fullName}
                    </Title>

                    <Tag color={accountInfo.isActive ? "green" : "red"}>
                      {accountInfo.isActive ? "Active" : "Inactive"}
                    </Tag>
                  </Space>

                  <Text className={styles.subId}>{accountInfo.nric}</Text>
                </Space>
              </div>
            </div>

            <Space>
              <Button icon={<EditOutlined />}>Edit</Button>
              <Button danger icon={<StopOutlined />}>
                Close Account
              </Button>
            </Space>
          </div>

          {/* Stats */}
          <Row gutter={16} className={styles.stats}>
            <Col span={8}>
              <StatCard
                icon={<DollarOutlined />}
                label="Balance"
                value={accountInfo.balance}
              />
            </Col>
            <Col span={8}>
              <StatCard
                icon={<BookOutlined />}
                label="Enrolled Courses"
                value={accountInfo.courseCount}
              />
            </Col>
            <Col span={8}>
              <StatCard
                icon={<CheckCircleOutlined />}
                label="Outstanding Fees"
                value={accountInfo.outstandingFees}
                success
              />
            </Col>
          </Row>

          {/* Student Info */}
          <Card title="Student Information" className={styles.section}>
            <Row gutter={40}>
              <Col span={8}>
                <Info
                  label="Date of Birth"
                  value={accountInfo.studentInformation.dateOfBirth}
                />

                <Info
                  label="Education Level"
                  value={accountInfo.studentInformation.educationLevel}
                />

                <Info
                  label="Account Created"
                  value={accountInfo.studentInformation.createdAt}
                />

                <Info
                  label="Mailing Address"
                  value={accountInfo.studentInformation.mailingAddress}
                />
              </Col>

              <Col span={8}>
                <Info
                  label="Email"
                  value={accountInfo.studentInformation.email}
                />

                <Info
                  label="Residential Status"
                  value={accountInfo.studentInformation.residentialStatus}
                />

                <Info
                  label="Residential Address"
                  value={accountInfo.studentInformation.registeredAddress}
                />
              </Col>

              <Col span={8}>
                <Info
                  label="Phone"
                  value={accountInfo.studentInformation.contactNumber}
                />

                <Info
                  label="Schooling Status"
                  value={
                    <Tag>
                      {accountInfo.studentInformation.schoolingStatus ===
                      "NotInSchool"
                        ? "Not In School"
                        : "In School"}
                    </Tag>
                  }
                />
              </Col>
            </Row>
          </Card>

          {/* Enrolled Courses */}
          <SectionTable
            title="Enrolled Courses (0)"
            emptyText="No courses enrolled"
            columns={[
              { title: "Course Name" },
              { title: "Billing Cycle" },
              { title: "Total Fee" },
              { title: "Collected" },
              { title: "Enrolled Date" },
              { title: "Next Payment" },
              { title: "Payment Status" },
            ]}
          />

          {/* Outstanding Fees */}
          <SectionTable
            title="Outstanding Fees (0)"
            emptyText="No outstanding fees"
            columns={[
              { title: "Course" },
              { title: "Amount" },
              { title: "Due Date" },
            ]}
          />

          {/* Payment History */}
          <SectionTable
            title="Payment History (0)"
            emptyText="No payment history"
            columns={[
              { title: "Course" },
              { title: "Amount" },
              { title: "Paid Date" },
              { title: "Payment Method" },
            ]}
          />
        </>
      )}
    </Layout>
  );
}

/* ===== Reusable Components ===== */

const StatCard = ({ icon, label, value, success }) => (
  <Card className={styles.statCard}>
    <div className={`${styles.statIcon} ${success && styles.success}`}>
      {icon}
    </div>
    <div>
      <Text className={styles.statLabel}>{label}</Text>
      <Title level={4} className={success ? styles.successText : ""}>
        {value}
      </Title>
    </div>
  </Card>
);

const Info = ({ label, value }) => (
  <div className={styles.infoItem}>
    <Text className={styles.infoLabel}>{label}</Text>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

const SectionTable = ({ title, columns, emptyText }) => (
  <Card
    title={title}
    className={styles.section}
    extra={<Button size="small">Columns ({columns.length})</Button>}
  >
    <Table
      columns={columns}
      dataSource={[]}
      locale={{ emptyText }}
      pagination={false}
    />
  </Card>
);
