import React, { useState } from 'react';
import { Layout, Button, Form, Input } from 'antd';
import { login } from '../lib/auth';
import { resetPasswordRequest } from '../lib/helpers';
import { useRouter } from 'next/router';

const { Content } = Layout;

const App = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const onFinish = async (values) => {
    try {
      const result = await login(values);
      setError('');
      result && (window.location.href = '/poi');
    } catch (error) {
      setError(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onForgotPassword = async (value) => {
    console.log('value', value);
    try {
      const result = await resetPasswordRequest(value);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Content>
        <div style={{ textAlign: 'center', fontSize: 24, margin: '20px 0' }}>
          {!isForgotPassword ? 'Login' : 'Forgot password'}
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={!isForgotPassword ? onFinish : onForgotPassword}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {!isForgotPassword ? (
            <>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </>
          )}

          <div style={{ textAlign: 'center', fontSize: 24, margin: '20px 0' }}>
            <div style={{ color: 'red' }}>{error}</div>
            <Button type="secondary" htmlType="submit">
              Submit
            </Button>
            <div
              onClick={() => setIsForgotPassword(!isForgotPassword)}
              style={{ fontSize: '14px', margin: 10, cursor: 'pointer' }}
            >
              {isForgotPassword ? 'Back' : 'Forgot Password'}
            </div>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default App;
