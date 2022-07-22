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
            render: (position) => {
                return (
                    <span>{position}</span>
                )
            }
        },
        {
            title: "Organization membership",
            dataIndex: "organization_membership",
            render: (position) => {
                return (
                    <span>{position}</span>
                )
            }
        },
        {
            title: "Super user",
            dataIndex: "superuser",
            render: (position) => {
                return (
                    <span>{position}</span>
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
                        {/* <Modal isTable={true} record={record} refetch={refetch} doFetch={updatePoint} title="Edit point" /> */}
                        <Popconfirm
                            placement="top"
                            title="Do you really want to delete this item?"
                            onConfirm={() => deletePoint(record._id, refetch)}
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

                {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}

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
