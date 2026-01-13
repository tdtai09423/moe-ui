import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./AccountCreate.module.scss";
const { Option } = Select;

const AccountCreate = ({ open, onClose }) => {
  const [form] = Form.useForm();
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
        <p>Manually create an education account for exception cases.</p>
      </div>

      <Form layout="vertical" form={form} className={styles.form}>
        <div className={styles.grid}>
          <Form.Item label="NRIC *" name="nric" rules={[{ required: true }]}>
            <Input placeholder="S1234567A" />
          </Form.Item>

          <Form.Item
            label="Full Name *"
            name="fullName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

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
              
            />
          </Form.Item>

          <Form.Item
            label="Email *"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
        </div>

        <Form.Item label="Phone Number" name="phone">
          <Input placeholder="+65 9XXX XXXX" />
        </Form.Item>

        <Form.Item label="Education Level" name="educationLevel">
          <Select placeholder="Select level">
            <Option value="primary">Primary</Option>
            <Option value="secondary">Secondary</Option>
            <Option value="tertiary">Tertiary</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Registered Address" name="registeredAddress">
          <Input placeholder="Enter registered address" />
        </Form.Item>

        <Form.Item label="Mailing Address" name="mailingAddress">
          <Input placeholder="Enter mailing address (if different)" />
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
