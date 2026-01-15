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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles/AccountCreate.module.scss";
import { useAccounts } from "../../../hooks/accounts/useAccount";
import dayjs from "dayjs";

const { Option } = Select;

const AccountCreate = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [isVerify, setIsVerify] = useState(false);
  const { loading, getAccountNRIC, reset, createAccount } = useAccounts();

  const handleVerify = async () => {
    try {
      const nric = form.getFieldValue("nric");
      const data = await getAccountNRIC(nric);
      if (!data) {
        message.error("Please input nric!");
      }
      console.log(data);
      form.setFieldsValue({
        fullName: data.fullName,
        dob: data.dateOfBirth ? dayjs(data.dateOfBirth, "YYYY-MM-DD") : null,
        email: data.email,
        phone: data.phoneNumber,
        registeredAddress: data.registeredAddress,
        residentialStatus:data.residentialStatus,
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

  const closeHandle = () => {
    handleReset();
    onClose();
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
        residentialStatus:values.residentialStatus,
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
      onCancel={closeHandle}
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
        <Row gutter={15}>
          {/* Cột cho NRIC và nút Verify */}
          <Col span={12}>
            <Form.Item
              label="NRIC *"
              name="nric"
              rules={[{ required: true, message: "Please input NRIC!" }]}
              help={
                isVerify ? (
                  <span style={{ color: "#52c41a" }}>✓ NRIC verified</span>
                ) : null
              }
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input placeholder="Enter NRIC" />
                {!isVerify ? (
                  <Button type="primary" onClick={handleVerify}>
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
            <Form.Item label="Date of Birth *" name="dob">
              <DatePicker
                className="dobPicker"
                style={{ width: "100%" }}
                placeholder="DD/MM/YY"
                format="DD/MM/YYYY"
                allowClear={false}
                inputReadOnly
                open={false}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email *" name="email">
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

        <Form.Item
          label="Education Level"
          name="educationLevel"
          rules={[
            { required: true, message: "Please select education level!" },
          ]}
          lassName={styles.educationSelect}
        >
          <Select placeholder="Select level">
            <Option value="Primary">Primary</Option>
            <Option value="Secondary">Secondary</Option>
            <Option value="Post-secondary">Post-secondary</Option>
            <Option value="Tertiary">Tertiary</Option>
            <Option value="Post-graduate">Post-graduate</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Residential Status" name="residentialStatus">
          <Input
            placeholder="Auto filled registered address"
            disabled={!isVerify}
            readOnly={isVerify}
          />
        </Form.Item>

        <Form.Item label="Registered Address" name="registeredAddress">
          <Input
            placeholder="Auto filled registered address"
            disabled={!isVerify}
            readOnly={isVerify}
          />
        </Form.Item>

        <Form.Item
          label="Mailing Address"
          name="mailingAddress"
          rules={[
            isVerify && {
              required: true,
              message: "Please input mailing address!",
            },
          ]}
        >
          <Input
            placeholder="Auto filled mailing address (if different)"
            disabled={!isVerify}
          />
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={closeHandle} className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            className={styles.createBtn}
            loading={loading}
          >
            Create Account
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AccountCreate;
