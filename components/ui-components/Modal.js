import { Modal, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const ModalComponent = ({ record }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

            </Modal>
        </>
    );
};
export default ModalComponent