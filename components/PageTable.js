import { useState } from 'react';
import { Pagination, Skeleton, Button } from 'antd';
import { RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { PER_PAGE } from '../config';
import { getTableFetch } from '../hooks/useGetTableData';
import styles from '../styles/Home.module.css';
import EditableFormTable from './ui-components/EditableTable';
import Search from './ui-components/search'
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('./ui-components/Inputs/MapPicker/MapPicker'), {
  ssr: false,
});

//export default (url, skip) => useQuery([url, { url, skip }], fetchData2);

export default function PageTable({ table: tableConfig, commonTables: commonTablesData }) {
  const { apiRoute: route, fields, schema = {} } = tableConfig;
  const router = useRouter()
  const myFetch = getTableFetch(route);
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
    isPreviousData,
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
  const pushRouter = () => {
    if (route === '/poi/') {
      return '/search/'
    }
    if (route === '/poi/search/') {
      return '/poi'
    }
  }
  return (
    <div className={styles.container}>
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
          {route === '/poi/' &&
            <Button
              onClick={() => router.push(pushRouter())}
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              style={{ background: "#1890ff", display: 'flex', alignItems: 'center' }}
            >
              Filter
            </Button>
          }
        </div>
        {route === '/poi/search/' &&
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
                onClick={() => router.push(pushRouter())}>
                <span>Back</span>
              </Button>
              }
            />
          </>
        }
        {!mapView ?
          <EditableFormTable
            route={route}
            schema={schema}
            fields={fields}
            data={list}
            commonTablesData={commonTablesData}
            currentPage={page}
            isFetching={isFetching}
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
      </main>
    </div>
  );
}
