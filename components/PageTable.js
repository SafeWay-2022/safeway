import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import { API_HOST, PER_PAGE } from '../config';
import useGetTableData, { getTableFetch } from '../hooks/useGetTableData';
import styles from '../styles/Home.module.css';
import EditableFormTable from './ui-components/EditableTable';
import { getToken } from '../lib/auth';
import { mapServerTableToUIData } from './ui-components/Inputs/mappers';

//export default (url, skip) => useQuery([url, { url, skip }], fetchData2);

export default function PageTable({ table: tableConfig, commonTables: commonTablesData }) {
  const queryClient = useQueryClient();
  const { apiRoute: route, fields, schema = { default: 'hello, nice 2 see u' } } = tableConfig;
  const myFetch = getTableFetch(route);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(PER_PAGE);

  const {
    data: tableData,
    error,
    isLoading,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery([route, page], () => myFetch(page, limit), {
    keepPreviousData: true,
    staleTime: 15000,
  });

  if (error) {
    return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <Skeleton />;
  }
  const { list = [], skip = 0, total = 0 } = tableData;
  console.log(total);
  const pagination = {
    pageSize: limit,
    onChange: (currentPage, limit) => {
      setPage(currentPage);
      setLimit(limit);
    },
    total,
  };

  return (
    <div className={styles.container}>
      <main>
        {total > 0 && <Pagination {...pagination} />}
        <EditableFormTable
          route={route}
          schema={schema}
          fields={fields}
          data={list}
          commonTablesData={commonTablesData}
        />
      </main>
    </div>
  );
}
