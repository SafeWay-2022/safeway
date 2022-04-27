import EditableFormTable from './ui-components/EditableTable';
import useGetTableData from '../hooks/useGetTableData';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';

export default function PageTable({ table }) {
  const { apiRoute: route, fields, schema = { default: 'hello, nice 2 see u' } } = table;
  const { data: tableData, isLoading, isError, error } = useGetTableData(route);

  if (isError) {
    return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading table data... </h1>;
  }
  return (
    <div className={styles.container}>
      <main>
        <EditableFormTable schema={schema} data={tableData} fields={fields} route={route} />
      </main>
    </div>
  );
}
