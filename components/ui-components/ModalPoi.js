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
        if (!state.name && !state.geo.lt) {
            message.error('Name and coordinates is required');
            return
        }
        doFetch(record._id, state)
        refetch()
        setIsModalVisible(false);
    };



    return (
        <>
            {isTable ? <EditOutlined style={{ fontSize: '150%' }} onClick={showModal} /> : <Button onClick={showModal}> Create</Button>}

            <Modal width={1900} title={title} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <Form
                    {...layout}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    name="nest-messages"
                    validateMessages={validateMessages}
                >
                    {isTable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <div style={{ margin: '0px 10px 0px 0px' }}>
                            <Form.Item label="APPROVED" labelCol={{ span: 20 }} >
                                <Checkbox checked={state.approved} onClick={() => setState(p => ({ ...p, approved: !p.approved }))} />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="ACTIVE" labelCol={{ span: 20 }}>
                                <Checkbox checked={state.active} onClick={() => setState(p => ({ ...p, active: !p.active }))} />
                            </Form.Item>
                        </div>
                    </div>}
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <Form.Item label="NAME" labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Please input name!' }]}
                        >

                            <InputText value={state.name} onChange={e => setState(p => ({ ...p, name: e.target.value }))} />
                        </Form.Item>

                        <Form.Item label="COORDINATES" labelCol={{ span: 24 }}>
                            <Geolocation value={state.geo} onChange={e => setState(p => ({ ...p, geo: e }))} />
                        </Form.Item>

                        <Form.Item label="COUNTRY" labelCol={{ span: 24 }}>
                            <SelectCountry value={state.country} onChange={e => setState(p => ({ ...p, country: e }))} />
                        </Form.Item>

                        <Form.Item label="CITY" labelCol={{ span: 24 }}>
                            <InputText value={state.city} onChange={e => setState(p => ({ ...p, city: e.target.value }))} />
                        </Form.Item>

                        <Form.Item label="ADDRESS" labelCol={{ span: 24 }}>
                            <InputText value={state.address} onChange={e => setState(p => ({ ...p, address: e.target.value }))} />
                        </Form.Item>

                        <Form.Item label="CATEGORIES" labelCol={{ span: 24 }}>
                            <SelectMultiple value={state.categories} onChange={e => setState(p => ({ ...p, categories: e }))} />
                        </Form.Item>

                        <Form.Item label="ORGANIZATIONS" labelCol={{ span: 24 }}>
                            <SelectMultiple value={state.organizations} onChange={e => setState(p => ({ ...p, organizations: e }))} />
                        </Form.Item>

                    </div>
                    <div style={{ display: 'flex' }}>
                        <Form.Item label="DESCRIPTION" labelCol={{ span: 24 }}>
                            <TextArea style={{ width: '282px', height: '200px' }} value={state.description} onChange={e => setState(p => ({ ...p, description: e.target.value }))} />
                        </Form.Item>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            <Form.Item label="CONTACT PERSON" labelCol={{ span: 24 }}>
                                <InputText style={{ width: '200px' }} value={state.contact_person} onChange={e => setState(p => ({ ...p, contact_person: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="LANGUAGES" labelCol={{ span: 24 }}>

                                <SelectMultiple value={state.languages} onChange={e => setState(p => ({ ...p, languages: e }))} />
                            </Form.Item>
                            <Form.Item label="WEB-SITE" labelCol={{ span: 24 }}>
                                <Input value={state.url} onChange={e => setState(p => ({ ...p, url: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="INPUT PHONE" labelCol={{ span: 24 }}>
                                <InputPhone value={state.phone} onChange={e => setState(p => ({ ...p, phone: e.target.value }))} />
                            </Form.Item>
                            <Form.Item
                                label="INPUT EMAIL"
                                labelCol={{ span: 24 }}
                                name={['user', 'email']}
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input value={state.email} onChange={e => setState(p => ({ ...p, email: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="ADMIN" labelCol={{ span: 24 }}>
                                <InputText value={state.admin} onChange={e => setState(p => ({ ...p, admin: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="OPEN HOURS" labelCol={{ span: 24 }}>
                                <InputText value={state.open_hours} onChange={e => setState(p => ({ ...p, open_hours: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="SOCIAL-MEDIA" labelCol={{ span: 24 }}>
                                <InputText value={state.socialmedia} onChange={e => setState(p => ({ ...p, socialmedia: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="TELEGRAM" labelCol={{ span: 24 }}>
                                <InputText value={state.telegram} onChange={e => setState(p => ({ ...p, telegram: e.target.value }))} />
                            </Form.Item>
                            <Form.Item label="WHATSAPP" labelCol={{ span: 24 }}>
                                <InputText style={{ width: '200px' }} value={state.whatsapp} onChange={e => setState(p => ({ ...p, whatsapp: e.target.value }))} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Form.Item >
                            <Button type="primary" style={{ background: 'blue' }} htmlType="submit">
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