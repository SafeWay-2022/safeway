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
        route: '/common/'
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
            title: "Category",
            dataIndex: "category",
            render: (name) => {
                return (
                    <Tag style={{ fontSize: '14px' }}>{name}</Tag>
                )
            }
        },
        {
            title: "Українська",
            dataIndex: "ua",
            render: (ukr) => {
                return <span>{ukr}</span>
            }
        },
        {
            title: "Русский",
            dataIndex: "ru",
            render: (ru) => {
                return <span>{ru}</span>
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (description) => {
                return <span>{description}</span>
            }
        },
        {
            title: "Icon",
            dataIndex: "icon",
            render: (icon) => {
                return (
                    <>
                        {icon && <img src={icon} alt="icon" width="50px" height="50px" />}
                    </>
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
