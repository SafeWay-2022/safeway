import { useState } from 'react';
import { Pagination, Skeleton, Button, Radio, Table, Checkbox, Tag, Popconfirm } from 'antd';
import {
    RollbackOutlined,
    SearchOutlined,
    DeleteOutlined,
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons';
import GeoLocation from '../../components/ui-components/Inputs/MapPicker/GeoLocation';
import { useQuery } from 'react-query';
import { PER_PAGE } from '../../config';
import { nanoid } from 'nanoid';
import { updatePoint, createPoint, getTableFetch, initialPoint, deletePoint } from '../../lib/helpers';
import styles from '../../styles/Home.module.css';




export default function PageTable() {
    const [tableConfig, setTableConfig] = useState({
        route: '/need/'
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
            render: (category) => {
                return (
                    <Tag style={{ fontSize: '14px' }}>{category}</Tag>
                )
            }
        },
        {
            title: "Country",
            dataIndex: "country",
            render: (country) => {
                return <Tag style={{ fontSize: '14px' }}>{country}</Tag>
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (des) => {
                return <span>{des}</span>
            }
        },
        {
            title: "Coordinates",
            dataIndex: "geo",
            width: '120px',
            render: (coordinates) => {
                return (
                    <GeoLocation readonly={true} withoutInput={false} value={coordinates} />
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
