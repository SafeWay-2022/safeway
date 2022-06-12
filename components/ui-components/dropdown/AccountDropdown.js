import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_REMOTE_HOST } from '../../../config'
import { logOut, getToken } from '../../../lib/auth';
import { useRouter } from 'next/router';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Avatar, Modal, Spin, Label } from 'antd';
import InputEmail from '../Inputs/InputEmail'
import InputPhone from '../Inputs/InputPhone'
import InputText from '../Inputs/InputText'



const MeComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const token = getToken()
    const options = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (isModalVisible) {
            let name
            setIsLoading(true)
            axios.get(`${API_REMOTE_HOST}/aaa/me`, options)
                .then(({ data }) => name = data?.username)
                .then(() => axios.get(`${API_REMOTE_HOST}/users/get/${name}`, options)
                    .then(({ data }) => setData(data)).catch(e => console.log(e)))
                .catch(e => console.log(e)).finally(() => setIsLoading(false))
        }
    }, [isModalVisible])

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
                {isLoading ? <div style={{ textAlign: 'center' }}><Spin /></div> :
                    <>
                        <div style={styles}>Full name: <span>{data?.full_name}</span> </div>
                        <div style={styles}>Email: <span>{data?.email}</span> </div>
                        <div style={styles}>Url: <span>{data?.url}</span> </div>
                        <div style={styles}>Social media: <span>{data?.socialmedia}</span> </div>
                        <div style={styles}>Messenger: <span>{data?.messenger}</span> </div>
                    </>
                }

            </Modal>
        </>
    );
}

const UpdateMeComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const token = getToken()
    const options = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const style = {
        marginBottom: 10
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (isModalVisible) {
            let name
            setIsLoading(true)
            axios.get(`${API_REMOTE_HOST}/aaa/me`, options)
                .then(({ data }) => name = data?.username)
                .then(() => axios.get(`${API_REMOTE_HOST}/users/get/${name}`, options)
                    .then(({ data }) => setData(data)).catch(e => console.log(e)))
                .catch(e => console.log(e)).finally(() => setIsLoading(false))
        }
    }, [isModalVisible])

    return (
        <>
            <div onClick={showModal}>
                Update
            </div>
            <Modal title="Update" visible={isModalVisible} onOk={() => { }} onCancel={handleCancel} okType='secondary'>
                {isLoading ? <div style={{ textAlign: 'center' }}><Spin /></div> :
                    <>
                        <div style={style}> Name: <InputText name="name" value={data?.full_name} onChange={() => { }} placeholder='Enter name...' /></div>
                        <div style={style}>Phone: <InputPhone name="phone" value={data?.phone} onChange={() => { }} /></div>
                        <div style={style}>Email: <InputEmail name="email" value={data?.email} onChange={() => { }} /></div>
                        <div style={style}>Url:<InputText name="url" value={data?.url} onChange={() => { }} placeholder='Enter url...' /></div>
                        <div style={style}>Social media: <InputText name="socialmedia" value={data?.socialmedia} onChange={() => { }} placeholder='Enter social media...' /></div>
                        <div style={style}>Messenger: <InputText name="messenger" value={data?.messenger} onChange={() => { }} placeholder='Enter messenger...' /></div>
                    </>
                }

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
                label: <UpdateMeComponent />,
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