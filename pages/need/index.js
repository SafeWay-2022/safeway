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
import { updatePoint, createPoint, getTableFetch, initialPoint, createNeed } from '../../lib/helpers';
import styles from '../../styles/Home.module.css';
import ModalNeed from '../../components/ui-components/ModalNeed'
import { defaultGeolocationProps } from '../../components/ui-components/Inputs/mappers'
import SearchNeeds from '../../components/ui-components/search/SearchNeeds'
import MapPicker from '../../components/ui-components/Inputs/MapPicker/NeedsPicker';




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
                    <GeoLocation readonly={true} withoutInput={false} value={coordinates ? coordinates : defaultGeolocationProps} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}

                    <div>
                        <Radio.Button style={!mapView ? { backgroundColor: '#1890ff' } : {}} onClick={() => setMapView(false)} value="Table">

                            Table</Radio.Button>
                        <Radio.Button style={mapView ? { backgroundColor: '#1890ff' } : {}} onClick={() => setMapView(true)} value="Map">Map</Radio.Button>
                    </div>
                    {route === '/need/' && <Button
                        onClick={() => {
                            setSearchData({
                                latitude: 50,
                                longitude: 50
                            })
                            setTableConfig({ route: '/need/nearby/' })
                        }}
                        type="primary"
                        size="large"
                        icon={<SearchOutlined />}
                        style={{ background: "#1890ff", display: 'flex', alignItems: 'center' }}
                    >
                        Search
                    </Button>}
                    {route === '/need/nearby/' &&

                        <Button
                            type="primary"
                            size="large"
                            style={{ background: "#1890ff", display: 'flex', alignItems: 'center' }}
                            icon={<RollbackOutlined />}
                            onClick={() => {
                                setSearchData({})
                                setTableConfig({ route: '/need/' })
                            }}>
                            <span>Back</span>
                        </Button>
                    }

                    <ModalNeed isTable={false} record={{}} refetch={refetch} doFetch={createNeed} title="Create need" />


                </div>
                {
                    route === '/need/nearby/' &&
                    <>
                        <SearchNeeds
                            setSearchData={setSearchData}
                            refetch={refetch}
                            page={page}
                            setPage={setPage}
                            value={value}
                            setValue={setValue}
                        />
                    </>
                }
                {!mapView ?
                    <Table
                        loading={isFetching}
                        columns={columns}
                        dataSource={tableData?.list}
                        pagination={false}
                        isNeeds={true}
                    />
                    :

                    <div style={{ height: '900px' }}>
                        <MapPicker
                            value={value}
                            list={list}
                            setLimit={setLimit}
                        />
                    </div>

                }




            </main >
        </div >
    );
}
