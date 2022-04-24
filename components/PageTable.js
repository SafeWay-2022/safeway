import EditableFormTable from "./ui-components/EditableTable";
import { API_HOST } from "../config";
import { useSomething } from "../hooks/useSomething";
import styles from "../styles/Home.module.css";

export default function PageTable({ route, fields }) {
  const {
    data: tableData,
    isLoading,
    isError,
    error,
  } = useSomething(API_HOST + route);

  if (isError) {
    return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading table data... </h1>;
  }

  return (
    <div className={styles.container}>
      <main>
        <EditableFormTable data={tableData} fields={fields} />
      </main>
    </div>
  );
}
