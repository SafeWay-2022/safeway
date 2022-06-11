import { useState, useEffect } from 'react';
import axios from 'axios';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Avatar, Modal } from 'antd';
import { API_REMOTE_HOST } from '../../../config'
import { logOut } from '../../../lib/auth';
import { useRouter } from 'next/router';

const MeComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        axios.get(`${API_REMOTE_HOST}/aaa/me`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(({ data }) => setData(data)).catch(e => console.log(e))
    }, [])

    const styles = {
        border: '1px solid #d9d9d9',
        margin: 2,
        padding: '2px 2px 2px 10px'
    }
    return (
        <>
            <div onClick={showModal}>
                About me
            </div>
            <Modal title="About me" visible={isModalVisible} footer={false} onCancel={handleCancel}>

                <div style={styles}>Name: <span>{data?.username}</span></div>
                <div style={styles}>Full name: <span>{data?.full_name}</span> </div>


            </Modal>
        </>
    );
}


const Logout = () => {
    const router = useRouter()
    const handleClick = () => {
        logOut()
        router.push('/login')
    }
    return (
        <div onClick={handleClick}>Logout</div>
    )
}


const menu = (
    <Menu
        items={[
            {
                label: <MeComponent />,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">Update</a>,
                key: '1',
            },
            {
                label: <Logout />,
                key: '3',
            },
        ]}
    />
)

const AccountMenu = () => {
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
                <Space>
                    <Avatar shape="square" icon={<UserOutlined />} />
                    Account
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
};

export default AccountMenu;