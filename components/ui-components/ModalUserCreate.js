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

            <Modal width={400} title={title} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <Form
                    onFinish={onFinish}
                    name="nest-messages"
                    validateMessages={validateMessages}
                >

                    <Form.Item label="USERNAME" labelCol={{ span: 24 }}
                        name='username'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >

                        <InputText placeholder="Enter username" value={state.username} onChange={e => setState(p => ({ ...p, username: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="FULL NAME" labelCol={{ span: 24 }}
                        name='full name'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >

                        <InputText placeholder="Enter full name" value={state.full_name} onChange={e => setState(p => ({ ...p, full_name: e.target.value }))} />
                    </Form.Item>
                    <Form.Item
                        label="EMAIL"
                        labelCol={{ span: 24 }}
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                required: true,
                            }
                        ]}
                    >
                        <Input placeholder="Enter email" value={state.email} onChange={e => setState(p => ({ ...p, email: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="PASSWORD" labelCol={{ span: 24 }}
                        name='password'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >

                        <InputText placeholder="Enter password" value={state.full_name} onChange={e => setState(p => ({ ...p, password: e.target.value }))} />
                    </Form.Item>

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