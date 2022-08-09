import React, { useState } from 'react';
import { Layout, Button, Form, Input } from 'antd';
import { login } from '../lib/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Content } = Layout;

const App = () => {
  const router = useRouter();
  const [error, setError] = useState('');
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

  return (
    <Layout>
      <Content>
        <div style={{ textAlign: 'center', fontSize: 24, margin: '20px 0' }}>Login</div>
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
          <div style={{ textAlign: 'center', fontSize: 24, margin: '20px 0' }}>
            <div style={{ color: 'red' }}>{error}</div>
            <Button type="secondary" htmlType="submit">
              Submit
            </Button>
            <div style={{ fontSize: '14px', margin: 10, cursor: 'pointer' }}>Forgot Password</div>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default App;
