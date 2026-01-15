import React, { useState } from 'react';
import { Button, Form, Input, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EduLogo from '../../assets/icon/EduLogo.jsx';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === 'admin' && values.password === '123456') {
        localStorage.setItem('accessToken', 'fake-token-123');
        message.success('Welcome back to EduCredit!');
        navigate('/dashboard'); 
      } else {
        message.error('Incorrect username or password!');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className={styles.splitLayout}>
      
      {/* --- LEFT COLUMN --- */}
      <div className={styles.leftSide}>
        <div className={styles.brandContent}>
          <div className={styles.badge}>Trusted by 50+ Universities</div>
          <h1>
            Connect, Learn, <br/>
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

          <Form onFinish={handleLogin} layout="vertical" initialValues={{ remember: true }} size="large">
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="admin" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} placeholder="123456" />
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