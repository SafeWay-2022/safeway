import { useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { useQuery, useQueryClient } from 'react-query';
import { PER_PAGE } from '../config';
import { getTableFetch } from '../hooks/useGetTableData';
import styles from '../styles/Home.module.css';
import EditableFormTable from './ui-components/EditableTable';
import Search from './ui-components/search'

//export default (url, skip) => useQuery([url, { url, skip }], fetchData2);

export default function PageTable({ table: tableConfig, commonTables: commonTablesData }) {
  const { apiRoute: route, fields, schema = {} } = tableConfig;
  const myFetch = getTableFetch(route);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(PER_PAGE);
  const [searchData, setSearchData] = useState({})

  const {
    data: tableData,
    error,
    isLoading,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery([route, page], () => myFetch(
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

  return (
    <div className={styles.container}>
      <main>
        {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
        {route === '/poi/nearby/' && <Search setSearchData={setSearchData} refetch={refetch} page={page} setPage={setPage} />}
        <EditableFormTable
          route={route}
          schema={schema}
          fields={fields}
          data={list}
          commonTablesData={commonTablesData}
          currentPage={page}
          isFetching={isFetching}
        />
      </main>
    </div>
  );
}
