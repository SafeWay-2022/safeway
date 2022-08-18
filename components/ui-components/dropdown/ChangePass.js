import React, { useState } from 'react';
import { Modal, Form, Button, message, Spin } from 'antd';
import InputText from '../Inputs/InputText';
import { changePasswordRequest } from '../../../lib/helpers';

const ChangePass = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onFinish = async () => {
    setIsLoading(true);
    try {
      const response = await changePasswordRequest(state);
      if (response?.data === 'OK') {
        message.success('Password changed successfully');
        setIsModalVisible(false);
        setState({});
      } else {
        message.warn(response?.data, 3);
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={showModal}>Change Password</div>
      <Modal
        width={400}
        title="Reset password"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="CURRENT PASSWORD"
            labelCol={{ span: 24 }}
            name="current_password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputText
              placeholder="Current password"
              value={state?.current_password}
              onChange={(e) => setState((p) => ({ ...p, current_password: e.target.value }))}
            />
          </Form.Item>
          <Form.Item
            label="NEW PASSWORD"
            labelCol={{ span: 24 }}
            name="new_password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputText
              placeholder="New password"
              value={state?.new_password}
              onChange={(e) => setState((p) => ({ ...p, new_password: e.target.value }))}
            />
          </Form.Item>
          <Form.Item
            label="VERIFY PASSWORD"
            labelCol={{ span: 24 }}
            name="verify_password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputText
              placeholder="Enter password"
              value={state?.verify_password}
              onChange={(e) => setState((p) => ({ ...p, verify_password: e.target.value }))}
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                style={{ background: '#1B3284', color: 'white' }}
                htmlType="submit"
              >
                {isLoading ? <Spin size="small" /> : 'Submit'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ChangePass;
