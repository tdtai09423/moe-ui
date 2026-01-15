import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Input, Form } from 'antd';
import { MailOutlined, EditOutlined, SaveOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../UserProfile.module.scss';

const ContactAddressSection = ({ profileData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    email: profileData?.emailAddress || '',
    phone: profileData?.phoneNumber || '',
    registeredAddress: profileData?.registeredAddress || '',
    mailingAddress: profileData?.mailingAddress || ''
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [profileData]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const success = await onUpdate(values);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={styles.profileCard} bordered={false}>
      <div className={`${styles.cardHeader} ${styles.isBordered}`}>
        <div className={styles.iconContainer} style={{ backgroundColor: '#e6fffa' }}>
          <MailOutlined style={{ color: '#117a65' }} />
        </div>
        <div className={styles.headerContent}>
          <h3>Contact & Address Information</h3>
          <span>{isEditing ? 'Edit your contact details' : 'Your contact and address details'}</span>
        </div>
        <div className={styles.headerActions}>
          {!isEditing && (
            <Button className={styles.btnEdit} icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        <Form form={form} initialValues={initialValues} layout="vertical">
          <Row gutter={[48, 24]}>
            <Col xs={24} md={12}>
              <FormItemOrView 
                isEditing={isEditing} 
                name="email" 
                label="Email Address" 
                value={initialValues.email} 
                prefixIcon={<MailOutlined style={{ color: '#9ca3af' }} />} 
              />
            </Col>
            <Col xs={24} md={12}>
              <FormItemOrView 
                isEditing={isEditing} 
                name="phone" 
                label="Phone Number" 
                value={initialValues.phone}
                prefixIcon={<PhoneOutlined style={{ color: '#9ca3af', transform: 'rotate(90deg)' }} />} 
              />
            </Col>
          </Row>

          <div style={{ height: 24 }}></div> 

          <Row gutter={[48, 24]}>
            <Col xs={24} md={12}>
              <FormItemOrView isEditing={isEditing} name="registeredAddress" label="Registered Address" value={initialValues.registeredAddress} isTextArea />
            </Col>
            <Col xs={24} md={12}>
              <FormItemOrView isEditing={isEditing} name="mailingAddress" label="Mailing Address" value={initialValues.mailingAddress} isTextArea />
            </Col>
          </Row>

          {isEditing && (
            <div className={styles.formFooter}>
              <Button size="large" className={styles.btnCancel} onClick={() => setIsEditing(false)} disabled={loading}>Cancel</Button>
              <Button type="primary" size="large" className={styles.btnSave} onClick={handleSave} icon={<SaveOutlined />} loading={loading}>Save Changes</Button>
            </div>
          )}
        </Form>
      </div>
    </Card>
  );
};

const FormItemOrView = ({ isEditing, name, label, value, isTextArea = false, prefixIcon }) => {
  if (isEditing) {
    return (
      <Form.Item name={name} label={label} rules={[{ required: true }]}>
        {isTextArea ? <Input.TextArea rows={2} /> : <Input size="large" prefix={prefixIcon} />}
      </Form.Item>
    );
  }
  return (
    <div className={styles.infoField}>
      <label>{label}</label>
      <div className={`${styles.value} ${styles.valueBold}`}>{value}</div>
    </div>
  );
};

export default ContactAddressSection;