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
import { useParams } from "react-router-dom";
import { useAccounts } from "../../../hooks/accounts/useAccount";
import { formatDate } from "../../../utils/dateFormat";

const { Title, Text } = Typography;

export default function StudentDetailPage() {
  const { id } = useParams();
  const { loading, error, accountInfo, getAccountByID } = useAccounts();

  useEffect(() => {
    if (!id) return;
    const fetchAccount = async () => {
      await getAccountByID(id);
    };
    fetchAccount();
  }, [id]);
  console.log("Id:", id);

  if (loading) return <Spin />;
  if (error) return <Alert message="Load failed" type="error" />;
  console.log(accountInfo);
  return (
    <Layout className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <ArrowLeftOutlined className={styles.backIcon} />
          <div>
            <Title level={4} className={styles.name}>
              {accountInfo.fullName}
            </Title>
            <Text className={styles.subId}>{accountInfo.nric}</Text>
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
            value="$1,200.00"
          />
        </Col>
        <Col span={8}>
          <StatCard
            icon={<BookOutlined />}
            label="Enrolled Courses"
            value="0"
          />
        </Col>
        <Col span={8}>
          <StatCard
            icon={<CheckCircleOutlined />}
            label="Outstanding Fees"
            value="$0.00"
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
              value={formatDate(accountInfo.dateOfBirth)}
            />
            <Info label="Email" value={accountInfo.email} />
            <Info label="Phone" value={accountInfo.contactNumber} />
            <Info label="Mailing Address" value="33 Bedok North Ave 4, SG" />
          </Col>

          <Col span={8}>
            <Info label="Education Level" value={accountInfo.educationLevel} />
            <Info
              label="Residential Status"
              value={accountInfo.residentialStatus}
            />

            <Info label="Schooling Status" value={<Tag>Not In School</Tag>} />
          </Col>

          <Col span={8}>
            <Info label="Date of Birth" value="18/07/92 (33 years old)" />
            <Info label="Account Created" value="14/11/22" />
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
