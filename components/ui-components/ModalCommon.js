import React, { useState } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputText from './Inputs/InputText'


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

    const onFinish = async () => {
        try {
            await doFetch(record._id, state)
            setIsModalVisible(false);
            refetch()
        }
        catch (e) {
            message.error(e.message)
        }


    };




    return (
        <>
            {isTable ? <EditOutlined style={{ fontSize: '150%' }} onClick={showModal} /> : <Button size="large" style={{ background: "#1890ff", color: 'white' }} onClick={showModal}>Create Category</Button>}

            <Modal width={400} title={title} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <Form
                    onFinish={onFinish}
                    name="nest-messages"
                    validateMessages={validateMessages}
                    initialValues={{
                        ["category"]: state.category,
                        ["icon"]: state.icon
                    }}
                >

                    <Form.Item label="CATEGORY" labelCol={{ span: 24 }}
                        name='category'
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >

                        <InputText placeholder="Enter category" value={state.category} onChange={e => setState(p => ({ ...p, category: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="УКРАЇНСЬКА" labelCol={{ span: 24 }}
                    >

                        <InputText placeholder="Українською" value={state.ua} onChange={e => setState(p => ({ ...p, ua: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="РУССКИЙ" labelCol={{ span: 24 }}>

                        <InputText placeholder="На русском языке" value={state.ru} onChange={e => setState(p => ({ ...p, ru: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="ICON URL" labelCol={{ span: 24 }}
                        name='icon'
                        rules={[
                            {
                                type: 'url',
                                required: true,
                            }
                        ]}
                    >

                        <InputText placeholder="Enter icon url" value={state.icon} onChange={e => setState(p => ({ ...p, icon: e.target.value }))} />
                    </Form.Item>
                    <Form.Item label="DESCRIPTION" labelCol={{ span: 24 }}>
                        <TextArea style={{ width: '350px', height: '100px' }} value={state.description} onChange={e => setState(p => ({ ...p, description: e.target.value }))} />
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