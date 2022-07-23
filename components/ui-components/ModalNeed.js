import React, { useState } from 'react';
import { Modal, Checkbox, Input, Form, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputText from './Inputs/InputText'
import Geolocation from './Inputs/MapPicker/GeoLocation'
import SelectCountry from './Inputs/SelectCountry'
import SelectMultiple from './Inputs/SelectMultiple'
import InputPhone from './Inputs/InputPhone'
import { defaultGeolocationProps } from '../../components/ui-components/Inputs/mappers'

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
            {isTable ? <EditOutlined style={{ fontSize: '150%' }} onClick={showModal} /> : <Button size="large" style={{ background: "#1890ff", color: 'white' }} onClick={showModal}>Create need</Button>}

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

                    <Form.Item label="COUNTRY" labelCol={{ span: 24 }}>
                        <SelectCountry value={state.country} onChange={e => setState(p => ({ ...p, country: e }))} />
                    </Form.Item>
                    <Form.Item label="COORDINATES" labelCol={{ span: 24 }}>
                        <Geolocation withoutInput={false} value={state.geo ? state.geo : defaultGeolocationProps} onChange={e => setState(p => ({ ...p, geo: e }))} />
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