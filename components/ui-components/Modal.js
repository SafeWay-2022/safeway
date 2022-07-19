import { Modal, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InputText from '../ui-components/Inputs/InputText'
import Geolocation from '../ui-components/Inputs/MapPicker/GeoLocation'
import { mapGeoToInputProps } from '../ui-components/Inputs/mappers'

const ModalComponent = ({ record, title }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state, setState] = useState(record)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <EditOutlined style={{ fontSize: '200%' }} onClick={showModal} />
            <Modal width={1600} height={700} title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ marginBottom: 10 }}>NAME</div>
                <InputText style={{ width: '282px' }} value={state.name} onChange={e => setState(p => ({ ...p, name: e.target.value }))} />
                <div style={{ width: 200 }}>
                    COORDINATES
                    <Geolocation value={state.geo} onChange={e => setState(p => ({ ...p, geo: e }))} />
                </div>
                <span style={{ marginRight: 10 }}>Approved</span>
                <Checkbox checked={state.approved} onClick={() => setState(p => ({ ...p, approved: !p.approved }))} />

            </Modal>
        </>
    );
};
export default ModalComponent