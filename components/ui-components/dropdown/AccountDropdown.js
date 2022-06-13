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
        },
        method: 'GET'
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (isModalVisible) {
            setIsLoading(true)
            axios.get(`${API_REMOTE_HOST}/users/me/`, options)
                .then(({ data }) => setData(data))
                .catch(e => console.log(e)).finally(() => setIsLoading(false))
        }
    }, [isModalVisible])

    const styles = {
        border: '1px solid #d9d9d9',
        margin: 2,
        padding: '2px 2px 2px 10px'
    }
    const text = {
        marginRight: 10,
        fontSize: '12px'
    }
    return (
        <>
            <div onClick={showModal}>
                About me
            </div>
            <Modal title="About me" visible={isModalVisible} footer={false} onCancel={handleCancel}>
                {isLoading ? <div style={{ textAlign: 'center' }}><Spin /></div> :
                    <>
                        <div style={styles}><span style={text}> Full name:</span> <span>{data?.full_name}</span> </div>
                        <div style={styles}><span style={text}>Email:</span> <span>{data?.email}</span> </div>
                        <div style={styles}><span style={text}>Url:</span> <span>{data?.url}</span> </div>
                        <div style={styles}><span style={text}>Social media:</span> <span>{data?.socialmedia}</span> </div>
                        <div style={styles}><span style={text}>Messenger:</span> <span>{data?.messenger}</span> </div>
                        <div style={styles}><span style={text}>Telegram:</span> <span>{data?.telegram}</span> </div>
                        <div style={styles}><span style={text}>Whatsapp:</span> <span>{data?.whatsapp}</span> </div>
                    </>
                }

            </Modal>
        </>
    );
}

const UpdateMeComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [data, setData] = useState({
        full_name: '',
        phone: '',
        email: '',
        url: '',
        socialmedia: '',
        messenger: '',
        whatsapp: '',
        telegram: ''
    })
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
    const onChangeFill = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const onHandleOk = () => {
        axios.patch(`${API_REMOTE_HOST}/users/set/${name}`, data, options)
            .then(({ data }) => setData(data))
            .catch(e => console.log(e))
            .finally(() => handleCancel())
    }
    useEffect(() => {
        if (isModalVisible) {
            let name
            setIsLoading(true)
            axios.get(`${API_REMOTE_HOST}/aaa/me`, options)
                .then(({ data }) => {
                    name = data?.username
                    setName(name)
                })
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
            <Modal title="Update" visible={isModalVisible} onOk={onHandleOk} onCancel={handleCancel} okType='secondary'>
                {isLoading ? <div style={{ textAlign: 'center' }}><Spin /></div> :
                    <>
                        <div style={style}>
                            Name: <InputText name="full_name" value={data?.full_name} onChange={onChangeFill} placeholder='Enter name...' />
                        </div>
                        <div style={style}>
                            Phone: <InputPhone name="phone" value={data?.phone} onChange={onChangeFill} />
                        </div>
                        <div style={style}>
                            Email: <InputEmail name="email" value={data?.email} onChange={onChangeFill} />
                        </div>
                        <div style={style}>
                            Url:<InputText name="url" value={data?.url} onChange={onChangeFill} placeholder='Enter url...' />
                        </div>
                        <div style={style}>
                            Social media: <InputText name="socialmedia" value={data?.socialmedia} onChange={onChangeFill} placeholder='Enter social media...' />
                        </div>
                        <div style={style}>
                            Messenger: <InputText name="messenger" value={data?.messenger} onChange={onChangeFill} placeholder='Enter messenger...' />
                        </div>
                        <div style={style}>
                            Telegram: <InputText name="telegram" value={data?.telegram} onChange={onChangeFill} placeholder='Enter telegram...' />
                        </div>
                        <div style={style}>
                            Whatsapp: <InputText name="whatsapp" value={data?.whatsapp} onChange={onChangeFill} placeholder='Enter whatsapp...' />
                        </div>
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