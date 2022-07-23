import { useState } from 'react';
import { Pagination, Skeleton, Button, Radio, Table, Checkbox, Tag, Popconfirm } from 'antd';
import {
    RollbackOutlined,
    SearchOutlined,
    DeleteOutlined,
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons';
import { useQuery } from 'react-query';
import { PER_PAGE } from '../../config';
import { nanoid } from 'nanoid';
import { updatePoint, createPoint, getTableFetch, initialPoint, deletePoint } from '../../lib/helpers';
import styles from '../../styles/Home.module.css';
import ModalUser from '../../components/ui-components/ModalUserUpdate'
import ModalUserCreate from '../../components/ui-components/ModalUserCreate'
import GeoLocation from '../../components/ui-components/Inputs/MapPicker/GeoLocation';
import { defaultGeolocationProps } from '../../components/ui-components/Inputs/mappers'




export default function PageTable() {
    const [tableConfig, setTableConfig] = useState({
        route: '/users/'
    })
    const { route } = tableConfig;
    const myFetch = getTableFetch(route)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(PER_PAGE);
    const [searchData, setSearchData] = useState({})
    const [mapView, setMapView] = useState(false)
    const [value, setValue] = useState({})

    const {
        data: tableData,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery([route, page, limit], () => myFetch(
        {
            skip: page,
            limit: limit,
            ...searchData
        }), {
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: 15000,
        refetchInterval: 0,
    });

    const columns = [
        {
            title: "Name",
            dataIndex: "full_name",
            render: (name) => {
                return (
                    <Tag style={{ fontSize: '14px' }}>{name}</Tag>
                )
            }
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (Phone) => {
                return <span>{Phone}</span>
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (site) => {
                return <span>{site}</span>
            }
        },
        {
            title: "Managed cities",
            dataIndex: "managed_cities",
            render: (cities) => {
                return (
                    <>
                        {cities?.map(e => (<Tag key={nanoid()} color="green">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Managed countries",
            dataIndex: "managed_countries",
            render: (cities) => {
                return (
                    <>
                        {cities?.map(e => (<Tag key={nanoid()} color="green">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Organization position",
            dataIndex: "organization_position",
            render: (coordinates) => {
                return (
                    <GeoLocation readonly={true} withoutInput={true} value={coordinates ? coordinates : defaultGeolocationProps} />
                )
            }
        },
        {
            title: "Organization membership",
            dataIndex: "organization_membership",
            render: (cities) => {
                return (
                    <>
                        {cities?.map(e => (<Tag key={nanoid()} color="blue">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Super user",
            dataIndex: "superuser",
            render: (bool) => {
                return (
                    <Checkbox checked={bool} />
                )
            }
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <ModalUser isTable={true} record={record} refetch={refetch} doFetch={() => { }} title="Edit user" />
                        <Popconfirm
                            placement="top"
                            title="Do you really want to delete this item?"
                            // onConfirm={() => deletePoint(record._id, refetch)}
                            okText="Delete"
                            okType="secondary"
                            cancelText="Cancel">
                            <DeleteOutlined style={{ fontSize: '150%', cursor: 'pointer' }} />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]




    if (error) {
        return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
    }

    if (isLoading) {
        return <Skeleton />;
    }
    const { list = [], skip = 0, total = 0 } = tableData;
    const pagination = {
        pageSize: limit,
        onChange: (currentPage, limit) => {
            if (currentPage === 1) {
                setPage(0);
            } else {
                setPage((currentPage - 1) * limit);
            }
            setLimit(limit);
        },
        total,
    };


    return (
        <div className={styles.container}>
            <main>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
                    <ModalUserCreate isTable={false} record={{}} refetch={refetch} doFetch={() => { }} title="Create user" />
                </div>
                <Table
                    loading={isFetching}
                    columns={columns}
                    dataSource={tableData?.list}
                    pagination={false}
                />

            </main >
        </div >
    );
}
