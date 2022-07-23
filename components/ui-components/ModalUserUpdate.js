import React, { useState } from 'react';
import { Modal, Checkbox, Input, Form, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputText from './Inputs/InputText'
import Geolocation from './Inputs/MapPicker/GeoLocation'
import SelectCountry from './Inputs/SelectCountry'
import SelectMultiple from './Inputs/SelectMultiple'
import InputPhone from './Inputs/InputPhone'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 17,
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
    const [state, setState] = useState(record)
    const { TextArea } = Input;


    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = () => {
        // console.log(state)
        // if (!state.geo.lg || !state.email || !state.name) {
        //     message.error("Name , email and coordinates is required")
        //     return
        // }
        // doFetch(record._id, state)
        // refetch()
        setIsModalVisible(false);
    };



    return (
        <>
            {isTable ? <EditOutlined style={{ fontSize: '150%' }} onClick={showModal} /> : <Button size="large" style={{ background: "#1890ff", color: 'white' }} onClick={showModal}>Create User</Button>}

            <Modal width={600} title={title} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name="nest-messages"
                    initialValues={{
                        ["email"]: state.email,
                        ["url"]: state.url
                    }}
                    validateMessages={validateMessages}
                >
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
                        <Form.Item label="FULL NAME" labelCol={{ span: 24 }}
                        >

                            <InputText placeholder="Enter name" value={state.full_name} onChange={e => setState(p => ({ ...p, full_name: e.target.value }))} />
                        </Form.Item>

                        <Form.Item label="PHONE" labelCol={{ span: 24 }}>
                            <InputPhone value={state.phone} onChange={e => setState(p => ({ ...p, phone: e.target.value }))} />
                        </Form.Item>
                        <Form.Item
                            label="EMAIL"
                            labelCol={{ span: 24 }}
                            name='email'
                            rules={[
                                {
                                    type: 'email',
                                }
                            ]}
                        >
                            <Input placeholder="Enter email" value={state.email} onChange={e => setState(p => ({ ...p, email: e.target.value }))} />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
                        <Form.Item label="ORGANIZATION POSITION" labelCol={{ span: 24 }}>
                            <Geolocation withoutInput={true} value={state.geo} onChange={e => setState(p => ({ ...p, geo: e }))} />
                        </Form.Item>
                        <Form.Item label="SUPERUSER" labelCol={{ span: 24 }} >
                            <Checkbox checked={state.superuser} onClick={() => setState(p => ({ ...p, superuser: !p.superuser }))} />
                        </Form.Item>


                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
                        <Form.Item label="MANAGED COUNTRY" labelCol={{ span: 24 }}>
                            <SelectMultiple value={state.managed_country} onChange={e => setState(p => ({ ...p, managed_country: e }))} />
                        </Form.Item>
                        <Form.Item label="MANAGED CITY" labelCol={{ span: 24 }}>
                            <SelectMultiple value={state.managed_city} onChange={e => setState(p => ({ ...p, managed_city: e }))} />
                        </Form.Item>
                        <Form.Item label="ORGANIZATION MEMBERSHIP" labelCol={{ span: 24 }}>
                            <SelectMultiple value={state.organization_membership} onChange={e => setState(p => ({ ...p, organization_membership: e }))} />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Form.Item >
                            <Button type="primary" size="large" style={{ background: '#1890ff' }} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default ModalComponent