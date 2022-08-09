import React, { useState } from 'react';
import { Modal, Checkbox, Input, Form, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputText from './Inputs/InputText';
import SelectCountry from './Inputs/SelectCountry';
import SelectMultiple from './Inputs/SelectMultiple';
import InputPhone from './Inputs/InputPhone';
import ImageComponent from './Image';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ModalComponent = ({ record, refetch, title, doFetch, isTable }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState(record);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async () => {
    if (!state.name) {
      message.warn('Name is required');
      return;
    }
    try {
      await doFetch(record._id, state);
      setIsModalVisible(false);
      refetch();
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      {isTable ? (
        <span style={{ cursor: 'pointer' }} onClick={showModal}>
          <ImageComponent src="/edit.svg" alt="edit_icon" width="40px" height="40px" />
        </span>
      ) : (
        <Button size="large" style={{ background: '#1B3284', color: 'white' }} onClick={showModal}>
          Create organization
        </Button>
      )}

      <Modal
        width={1000}
        title={title}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          name="nest-messages"
          initialValues={{
            ['email']: state.email,
            ['url']: state.url,
          }}
          validateMessages={validateMessages}
        >
          {isTable && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <div style={{ margin: '0px 10px 0px 0px' }}>
                <Form.Item label="APPROVED" labelCol={{ span: 17 }}>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setState((p) => ({ ...p, approved: !p.approved }))}
                    name="approved"
                  >
                    <ImageComponent
                      src={state.approved ? '/checked.svg' : '/not_checked.svg'}
                      alt="checkbox"
                      width="25px"
                      height="25px"
                    />
                  </span>
                </Form.Item>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
            <Form.Item label="NAME" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter name"
                value={state.name}
                onChange={(e) => setState((p) => ({ ...p, name: e.target.value }))}
              />
            </Form.Item>

            <Form.Item label="COUNTRY" labelCol={{ span: 24 }}>
              <SelectCountry
                value={state.country}
                onChange={(e) => setState((p) => ({ ...p, country: e }))}
              />
            </Form.Item>

            <Form.Item label="CITY" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter city"
                value={state.city}
                onChange={(e) => setState((p) => ({ ...p, city: e.target.value }))}
              />
            </Form.Item>

            <Form.Item label="ADDRESS" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter address"
                value={state.address}
                onChange={(e) => setState((p) => ({ ...p, address: e.target.value }))}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
            <Form.Item label="CONTACT PERSON" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter contact person"
                value={state.contact_person}
                onChange={(e) => setState((p) => ({ ...p, contact_person: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="WEB-SITE"
              labelCol={{ span: 24 }}
              name={'url'}
              rules={[
                {
                  type: 'url',
                },
              ]}
            >
              <Input
                placeholder="Enter url"
                value={state.url}
                onChange={(e) => setState((p) => ({ ...p, url: e.target.value }))}
              />
            </Form.Item>
            <Form.Item label="INPUT PHONE" labelCol={{ span: 24 }}>
              <InputPhone
                value={state.phone}
                onChange={(e) => setState((p) => ({ ...p, phone: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="INPUT EMAIL"
              labelCol={{ span: 24 }}
              name="email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input
                placeholder="Enter email"
                value={state.email}
                onChange={(e) => setState((p) => ({ ...p, email: e.target.value }))}
              />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'baseline' }}>
            <Form.Item label="ADMIN" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Who admin"
                value={state.admin}
                onChange={(e) => setState((p) => ({ ...p, admin: e.target.value }))}
              />
            </Form.Item>
            <Form.Item label="SOCIAL-MEDIA" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter social media"
                value={state.socialmedia}
                onChange={(e) => setState((p) => ({ ...p, socialmedia: e.target.value }))}
              />
            </Form.Item>
            <Form.Item label="TELEGRAM" labelCol={{ span: 24 }}>
              <InputText
                placeholder="@example"
                value={state.telegram}
                onChange={(e) => setState((p) => ({ ...p, telegram: e.target.value }))}
              />
            </Form.Item>
            <Form.Item label="WHATSAPP" labelCol={{ span: 24 }}>
              <InputText
                placeholder="Enter whatsapp"
                value={state.whatsapp}
                onChange={(e) => setState((p) => ({ ...p, whatsapp: e.target.value }))}
              />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
            <Form.Item label="CATEGORIES" labelCol={{ span: 24 }}>
              <SelectMultiple
                value={state.categories}
                onChange={(e) => setState((p) => ({ ...p, categories: e }))}
              />
            </Form.Item>

            <Form.Item label="MEMBERS" labelCol={{ span: 24 }}>
              <SelectMultiple
                value={state.members}
                onChange={(e) => setState((p) => ({ ...p, members: e }))}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                style={{ background: '#1B3284', color: 'white' }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalComponent;
