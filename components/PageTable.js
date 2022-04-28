import { Skeleton } from 'antd';
import useGetTableData from '../hooks/useGetTableData';
import styles from '../styles/Home.module.css';
import EditableFormTable from './ui-components/EditableTable';

export default function PageTable({ table: tableConfig, commonTables: commonTablesData }) {
  const { apiRoute: route, fields, schema = { default: 'hello, nice 2 see u' } } = tableConfig;
  const { data: tableData, isLoading, isError, error } = useGetTableData(route);

  if (isError) {
    return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.container}>
      <main>
        <EditableFormTable
          route={route}
          schema={schema}
          fields={fields}
          data={tableData}
          commonTablesData={commonTablesData}
        />
      </main>
    </div>
  );
}
