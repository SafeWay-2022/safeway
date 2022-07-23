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
import styles from '../../styles/Home.module.css';
import Search from '../../components/ui-components/search'
import Modal from '../../components/ui-components/ModalPoi'
import GeoLocation from '../../components/ui-components/Inputs/MapPicker/GeoLocation';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import { updatePoint, createPoint, getTableFetch, initialPoint, deletePoint } from '../../lib/helpers';




const MapPicker = dynamic(() => import('../../components/ui-components/Inputs/MapPicker/MapPicker'), {
    ssr: false,
});









export default function PageTable() {
    const [tableConfig, setTableConfig] = useState({
        route: '/poi/'
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

    const filterColumns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (name) => {
                return (
                    <Tag style={{ fontSize: '14px' }}>{name}</Tag>
                )
            }
        },
        {
            title: "Approved",
            dataIndex: "approved",
            render: (bool) => {
                return (
                    <Checkbox checked={bool} />
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
            title: "City",
            dataIndex: "city",
            render: (city) => {
                return <Tag style={{ fontSize: '14px' }}>{city}</Tag>
            }
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (address) => {
                return <span>{address}</span>
            }
        },
        {
            title: "Categories",
            dataIndex: "categories",
            render: (categories) => {
                return (
                    <>
                        {categories?.map(e => (<Tag key={nanoid()} color="blue">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Organizations",
            dataIndex: "organizations",
            render: (organizations) => {
                return (
                    <>
                        {organizations?.map(e => (<Tag key={nanoid()} color="green">{e}</Tag>))}
                    </>
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
            title: "Distance (KM)",
            dataIndex: "distance_km",
            render: (distance) => {
                return <span>{distance?.toFixed(3)}</span>
            }

        },
        {
            title: "Description",
            dataIndex: "description",
            render: (description) => {
                return (
                    <span>{description}</span>
                )
            }
        },
        {
            title: "Active",
            dataIndex: "active",
            render: (bool) => {
                return <Checkbox checked={bool} />
            }
        },
        {
            title: "Activated at",
            dataIndex: "active_at",
            render: (bool) => {
                return <Checkbox checked={bool} />
            }
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <Modal isTable={true} record={record} refetch={refetch} doFetch={updatePoint} title="Edit point" />
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
    const columns = [
        {
            title: "Approved",
            dataIndex: "approved",
            render: (bool) => {
                return (
                    <Checkbox checked={bool} />
                )
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (name) => {
                return (
                    <span>{name}</span>
                )
            }
        },
        {
            title: "Map",
            dataIndex: "geo",
            render: (coordinates) => {
                return (
                    <GeoLocation readonly={true} withoutInput={true} value={coordinates} />
                )
            }
        },
        {
            title: "Country",
            dataIndex: "country",
            render: (country) => {
                return <Tag>{country}</Tag>
            }
        },
        {
            title: "City",
            dataIndex: "city",
            render: (city) => {
                return <Tag>{city}</Tag>
            }
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (address) => {
                return <span>{address}</span>
            }
        },
        {
            title: "Categories",
            dataIndex: "categories",
            render: (categories) => {
                return (
                    <>
                        {categories?.map(e => (<Tag key={nanoid()} color="blue">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Organizations",
            dataIndex: "organizations",
            render: (organizations) => {
                return (
                    <>
                        {organizations?.map(e => (<Tag key={nanoid()} color="green">{e}</Tag>))}
                    </>
                )
            }
        },
        {
            title: "Contact",
            dataIndex: "contact_person",
            render: (contact) => {
                return <Tag style={{ fontSize: '14px' }}>{contact}</Tag>
            }
        },
        {
            title: "Active",
            dataIndex: "active",
            render: (bool) => {
                return <Checkbox checked={bool} />
            }
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (record) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <Modal isTable={true} record={record} refetch={refetch} doFetch={updatePoint} title="Edit point" />
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


    ];
    const ExpandedRowRender = ({ data }) => {
        const columns = [
            {
                title: "Description",
                dataIndex: "description",
                render: (description) => {
                    return (
                        <span>{description}</span>
                    )
                }
            },
            {
                title: "Open hours",
                dataIndex: "open_hours",
                render: (hours) => {
                    return (
                        <span>{hours}</span>
                    )
                }

            },
            {
                title: "Languages",
                dataIndex: "languages",
                render: (lang) => {
                    return (
                        <>
                            {lang?.map(e => (<Tag key={nanoid()}>{e}</Tag>))}
                        </>
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
                render: (email) => {
                    return <span>{email}</span>
                }
            },
            {
                title: "Web-Site",
                dataIndex: "url",
                render: (site) => {
                    return <span>{site}</span>
                }
            },
            {
                title: "Social-Media",
                dataIndex: "socialmedia",
                render: (media) => {
                    return <span>{media}</span>
                }
            },
            {
                title: "Admin",
                dataIndex: "admin",
                render: (admin) => {
                    return (
                        <span>{admin}</span>
                    )
                }
            },
            {
                title: "Telegram",
                dataIndex: "telegram",
                render: (tel) => (<span>{tel}</span>)
            },
            {
                title: "Whatsapp",
                dataIndex: "whatsapp",
                render: (wat) => (<span>{wat}</span>)
            },
        ];

        return <Table columns={columns} dataSource={[data]} pagination={false} />;
    };


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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
                    {route === '/poi/' &&
                        <>
                            <div>
                                <Radio.Button style={!mapView ? { backgroundColor: '#1890ff' } : {}} onClick={() => setMapView(false)} value="Table">

                                    Table</Radio.Button>
                                <Radio.Button style={mapView ? { backgroundColor: '#1890ff' } : {}} onClick={() => setMapView(true)} value="Map">Map</Radio.Button>
                            </div>
                            <Modal isTable={false} record={initialPoint} refetch={refetch} doFetch={createPoint} title="Create point" />
                            <Button
                                onClick={() => setTableConfig({ route: '/poi/search/' })}
                                type="primary"
                                size="large"
                                icon={<SearchOutlined />}
                                style={{ background: "#1890ff", display: 'flex', alignItems: 'center' }}
                            >
                                Search
                            </Button>
                        </>
                    }
                </div>
                {
                    route === '/poi/search/' &&
                    <>
                        <Search
                            setSearchData={setSearchData}
                            refetch={refetch}
                            page={page}
                            setPage={setPage}
                            mapView={mapView}
                            setMapView={setMapView}
                            value={value}
                            setValue={setValue}
                            component={<Button
                                type="primary"
                                size="large"
                                style={{ background: "#1890ff", display: 'flex', alignItems: 'center' }}
                                icon={<RollbackOutlined />}
                                onClick={() => setTableConfig({ route: '/poi/' })}>
                                <span>Back</span>
                            </Button>
                            }
                        />
                    </>
                }
                {
                    !mapView ?
                        <>
                            {route === '/poi/' &&
                                <Table
                                    loading={isFetching}
                                    columns={columns}
                                    dataSource={tableData?.list}
                                    expandIcon={({ expanded, onExpand, record }) =>
                                        expanded ? (
                                            <UpOutlined style={{ fontSize: '150%', float: 'right' }} onClick={e => onExpand(record, e)} />
                                        ) : (
                                            <DownOutlined style={{ fontSize: '150%' }} onClick={e => onExpand(record, e)} />
                                        )
                                    }

                                    expandable={{
                                        expandedRowRender: record => (
                                            <ExpandedRowRender data={record} />
                                        ),
                                    }}
                                    pagination={false}
                                />
                            }
                            {route === '/poi/search/' &&
                                <Table
                                    loading={isFetching}
                                    columns={filterColumns}
                                    dataSource={tableData?.list}
                                    pagination={false}
                                />

                            }

                        </>
                        :
                        <div style={{ height: '900px' }}>
                            <MapPicker
                                value={value}
                                list={list}
                                setLimit={setLimit}
                                refetch={refetch}
                            />
                        </div>
                }
            </main >
        </div >
    );
}
