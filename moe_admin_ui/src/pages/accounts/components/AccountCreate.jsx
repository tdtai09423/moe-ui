import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Typography,
  Col,
  Row,
  Space,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles/AccountCreate.module.scss";
import { useAccounts } from "../../../hooks/accounts/useAccount";
const { Option } = Select;

const AccountCreate = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [isVerify, setIsVerify] = useState(false);
  const { loading, getAccountNRIC, reset, createAccount } = useAccounts();

  const handleVerify = async () => {
    try {
      const nric = form.getFieldValue("nric");
      const data = await getAccountNRIC(nric);
      console.log(data);
      form.setFieldsValue({
        fullName: data.fullName,
        dob: data.dateOfBirth,
        email: data.email,
        phone: data.phoneNumber,
        registeredAddress: data.registeredAddress,
      });
      setIsVerify(true);
    } catch (err) {
      notification.error({
        title: "Verify nric fail!",
        description: err.message,
        placement: "topRight",
        duration: 8,
      });
    }
  };

  const handleReset = () => {
    form.resetFields();
    reset();
    setIsVerify(false);
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        nric: values.nric,
        fullName: values.fullName,
        dateOfBirth: values.dob,
        email: values.email,
        contactNumber: values.phone,
        educationLevel: values.educationLevel,
        registeredAddress: values.registeredAddress,
        mailingAddress: values.mailingAddress,
      };
      const res = await createAccount(payload);
      notification.success({
        title: "Add new Account Success...",
        description: res.message,
        placement: "topRight",
        duration: 8,
      });

      handleReset();

      onClose?.();
    } catch (err) {
      notification.error({
        title: "Add new Account fail!",
        description: err.message,
        placement: "topRight",
        duration: 8,
      });
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={640}
      centered
      className={styles.addStudentModal}
    >
      <div className={styles.header}>
        <h2>Add New Student</h2>
        <p>
          Enter NRIC to retrieve student information from the national database.
          Fields will be enabled after NRIC verification.
        </p>
      </div>

      <Form
        layout="vertical"
        form={form}
        className={styles.form}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* Cột cho NRIC và nút Verify */}
          <Col span={12}>
            <Form.Item label="NRIC *" required>
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item
                  name="nric"
                  noStyle
                  rules={[{ required: true, message: "Please input NRIC!" }]}
                  help={
                    isVerify ? (
                      <span style={{ color: "#52c41a" }}>✓ NRIC verified</span>
                    ) : null
                  }
                >
                  <Input placeholder="Enter NRIC" />
                </Form.Item>
                {!isVerify ? (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={handleVerify}
                  >
                    Verify
                  </Button>
                ) : (
                  <Button danger onClick={handleReset}>
                    Reset
                  </Button>
                )}
              </Space.Compact>
            </Form.Item>
          </Col>

          {/* Cột cho Full Name */}
          <Col span={12}>
            <Form.Item label="Full Name" name="fullName">
              <Input
                placeholder="Auto-filled from NRIC verification"
                disabled={!isVerify}
                readOnly={isVerify}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Date of Birth *"
              name="dob"
              rules={[{ required: true }]}
            >
              <DatePicker
                className="dobPicker"
                style={{ width: "100%" }}
                placeholder="DD/MM/YY"
                format="DD/MM/YY"
                allowClear={false}
                disabled={!isVerify}
                readOnly={isVerify}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email *"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                placeholder="email@example.com"
                disabled={!isVerify}
                readOnly={isVerify}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Phone Number" name="phone">
          <Input
            placeholder="+65 9XXX XXXX"
            disabled={!isVerify}
            readOnly={isVerify}
          />
        </Form.Item>

        <Form.Item label="Education Level" name="educationLevel">
          <Select placeholder="Select level">
            <Option value="primary">Primary</Option>
            <Option value="secondary">Secondary</Option>
            <Option value="tertiary">Tertiary</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Registered Address" name="registeredAddress">
          <Input
            placeholder="Enter registered address"
            disabled={!isVerify}
            readOnly={isVerify}
          />
        </Form.Item>

        <Form.Item label="Mailing Address" name="mailingAddress">
          <Input
            placeholder="Enter mailing address (if different)"
            disabled={!isVerify}
            readOnly={isVerify}
          />
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            className={styles.createBtn}
          >
            Create Account
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AccountCreate;
