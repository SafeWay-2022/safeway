import React, { useState } from 'react';
import axios from 'axios'
import { Modal, Checkbox, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import InputText from './Inputs/InputText'
import Geolocation from './Inputs/MapPicker/GeoLocation'
import SelectCountry from './Inputs/SelectCountry'
import SelectMultiple from './Inputs/SelectMultiple'
import InputPhone from './Inputs/InputPhone'
import InputEmail from './Inputs/InputEmail'
import { API_HOST } from '../../config';
import { getToken } from '../../lib/auth';
import useUpdate from '../../hooks/useUpdate';


const updatePoint = async (id, body) => {
    delete body.approved_at
    delete body.created_at
    delete body.updated_at
    delete body.approved_by
    delete body._id
    delete body.active_at
    delete body.active_by
    delete body.admin
    delete body.author
    delete body.icon
    delete body.key
    console.log(body)
    try {
        await axios.put(API_HOST + `/poi/${id}`,
            {
                description: body.description,
                categories: body.categories,
                organizations: body.organizations,
                phone: body.phone,
                email: body.email,
                url: body.url,
                approved: body.approved,
                active: body.active,
                latilong: [body.geo.lg, body.geo.lat],
                name: body.name,
                messenger: body.messenger

            }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
        // await refetch()
    } catch (e) {
        throw e
    }
}


const ModalComponent = ({ record, refetch, title }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state, setState] = useState(record)
    const { TextArea } = Input;


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        updatePoint(record._id, state)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <EditOutlined style={{ fontSize: '150%' }} onClick={showModal} />
            <Modal width={1900} title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                    <div style={{ marginRight: 10 }}>
                        <span style={{ marginRight: 10 }}>APPROVED</span>
                        <Checkbox checked={state.approved} onClick={() => setState(p => ({ ...p, approved: !p.approved }))} />
                    </div>
                    <div style={{ marginRight: 40 }}>
                        <span style={{ marginRight: 10 }}>ACTIVE</span>
                        <Checkbox checked={state.active} onClick={() => setState(p => ({ ...p, active: !p.active }))} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                    <div style={{ width: '150px' }}>
                        <div>NAME</div>
                        <InputText value={state.name} onChange={e => setState(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div >
                        COORDINATES
                        <Geolocation value={state.geo} onChange={e => setState(p => ({ ...p, geo: e }))} />
                    </div>
                    <div >
                        <div>COUNTRY</div>
                        <SelectCountry value={state.country} onChange={e => setState(p => ({ ...p, country: e }))} />
                    </div>
                    <div >
                        <div>CITY</div>
                        <InputText value={state.city} onChange={e => setState(p => ({ ...p, city: e.target.value }))} />
                    </div>
                    <div >
                        <div>ADDRESS</div>
                        <InputText value={state.address} onChange={e => setState(p => ({ ...p, address: e.target.value }))} />
                    </div>
                    <div style={{ width: '200px' }}>
                        <div >CATEGORIES</div>
                        <SelectMultiple value={state.categories} onChange={e => setState(p => ({ ...p, categories: e }))} />
                    </div>
                    <div >
                        <div>ORGANIZATIONS</div>
                        <SelectMultiple value={state.organizations} onChange={e => setState(p => ({ ...p, organizations: e }))} />
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div >
                        <div>DESCRIPTION</div>
                        <TextArea style={{ width: '282px', height: '200px' }} value={state.description} onChange={e => setState(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <div style={{ width: 1400, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div style={{ marginBottom: 30 }}>
                            <div>CONTACT PERSON</div>
                            <InputText style={{ width: '200px' }} value={state.contact_person} onChange={e => setState(p => ({ ...p, contact_person: e.target.value }))} />
                        </div>
                        <div style={{ width: '200px' }}>
                            <div>LANGUAGES</div>
                            <SelectMultiple value={state.languages} onChange={e => setState(p => ({ ...p, languages: e }))} />
                        </div>
                        <div >
                            <div>WEB-SITE</div>
                            <InputText style={{ width: '200px' }} value={state.url} onChange={e => setState(p => ({ ...p, url: e.target.value }))} />
                        </div>
                        <div >
                            <div>INPUT PHONE</div>
                            <InputPhone style={{ width: '200px' }} value={state.phone} onChange={e => setState(p => ({ ...p, phone: e.target.value }))} />
                        </div>
                        <div >
                            <div>INPUT EMAIL</div>
                            <InputEmail style={{ width: '200px' }} value={state.email} onChange={e => setState(p => ({ ...p, email: e.target.value }))} />
                        </div>
                        <div style={{ marginRight: 30 }}>
                            <div>ADMIN</div>
                            <InputText style={{ width: '200px' }} value={state.admin} onChange={e => setState(p => ({ ...p, admin: e.target.value }))} />
                        </div>
                        <div style={{ marginRight: 30 }}>
                            <div>OPEN HOURS</div>
                            <InputText style={{ width: '200px' }} value={state.open_hours} onChange={e => setState(p => ({ ...p, open_hours: e.target.value }))} />
                        </div>
                        <div style={{ marginRight: 30 }}>
                            <div>SOCIAL-MEDIA</div>
                            <InputText style={{ width: '200px' }} value={state.socialmedia} onChange={e => setState(p => ({ ...p, socialmedia: e.target.value }))} />
                        </div>
                        <div style={{ marginRight: 30 }}>
                            <div>TELEGRAM</div>
                            <InputText style={{ width: '200px' }} value={state.telegram} onChange={e => setState(p => ({ ...p, telegram: e.target.value }))} />
                        </div>
                        <div style={{ marginRight: 30 }}>
                            <div>FACEBOOK</div>
                            <InputText style={{ width: '200px' }} value={state.facebook} onChange={e => setState(p => ({ ...p, facebook: e.target.value }))} />
                        </div>
                        <div >
                            <div>WHATSAPP</div>
                            <InputText style={{ width: '200px' }} value={state.whatsapp} onChange={e => setState(p => ({ ...p, whatsapp: e.target.value }))} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalComponent