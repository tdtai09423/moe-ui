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

const { Title, Text } = Typography;

export default function StudentDetailPage() {
  return (
    <Layout className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <ArrowLeftOutlined className={styles.backIcon} />
          <div>
            <Title level={4} className={styles.name}>
              Chua Jun Hao
            </Title>
            <Text className={styles.subId}>S9217788Q</Text>
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
            <Info label="Full Name" value="Chua Jun Hao" />
            <Info label="Email" value="junhao.chua@gmail.com" />
            <Info label="Residential Status" value="SC (Singapore Citizen)" />
            <Info
              label="Registered Address"
              value="9 Bedok South Ave 1, SG"
            />
            <Info
              label="Mailing Address"
              value="33 Bedok North Ave 4, SG"
            />
          </Col>

          <Col span={8}>
            <Info label="NRIC" value="S9217788Q" />
            <Info label="Phone" value="+65 9345 6791" />
            <Info
              label="Schooling Status"
              value={<Tag>Not In School</Tag>}
            />
          </Col>

          <Col span={8}>
            <Info
              label="Date of Birth"
              value="18/07/92 (33 years old)"
            />
            <Info label="Education Level" value="Tertiary" />
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
