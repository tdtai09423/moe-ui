import React, { useState } from 'react';
import { Button, Form, Input, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EduLogo from '../../assets/icon/EduLogo.jsx';
import styles from './LoginPage.module.scss';

// [1] Import service API
import authService from '../../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // 1. Gọi API
      const response = await authService.login({
        username: values.username,
        password: values.password
      });

      console.log("Login Response:", response); 


      if (response && response.token) {


        localStorage.setItem('accessToken', response.token);


        const userData = {
          id: response.educationAccountId, 
          accountid: response.accountHolderId,
          fullName: response.fullName,
          email: response.email,
          expiresAt: response.expiresAt
        };
        localStorage.setItem('user_data', JSON.stringify(userData));

        message.success(`Welcome back, ${response.fullName}!`);
        navigate('/dashboard');
      } else {
        message.warning('No token received from server!');
      }

    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg = error.response?.data?.message || 'Login failed!';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.splitLayout}>

      {/* --- LEFT COLUMN --- */}
      <div className={styles.leftSide}>
        <div className={styles.brandContent}>
          <div className={styles.badge}>Trusted by 50+ Universities</div>
          <h1>
            Connect, Learn, <br />
            and <span>Grow Together.</span>
          </h1>
          <p>
            Join a thriving community of scholars. EduCredit helps you manage your academic finance so you can focus on what matters most—your future.
          </p>
        </div>
      </div>

      {/* --- RIGHT COLUMN: FORM LOGIN ---  */}
      <div className={styles.rightSide}>
        <div className={styles.formWrapper}>
          <div className={styles.headerMobile}>
            <div className={styles.logoBrand}>
              <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <EduLogo />
              </div>
              <h2>EduCredit</h2>
            </div>
            <h3>Welcome Back</h3>
            <p>Please enter your details to sign in.</p>
          </div>

          <Form
            onFinish={handleLogin}
            layout="vertical"
            initialValues={{ remember: true }}
            size="large"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} placeholder="Enter password" />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, marginTop: -8 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember for 30 days</Checkbox>
              </Form.Item>
              <a href="#" style={{ color: '#0f766e', fontWeight: 600, fontSize: 15 }}>Forgot password?</a>
            </div>

            <Button type="primary" htmlType="submit" block loading={loading} className={styles.submitBtn}>
              Sign In
            </Button>
          </Form>
        </div>

        <div className={styles.copyright}>
          © 2026 EduCredit System. Designed by Tim Chung
        </div>
      </div>
    </div>
  );
};

export default LoginPage;