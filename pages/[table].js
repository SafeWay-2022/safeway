import PageTable from '../components/PageTable';
import styles from '../styles/Home.module.css';

export default function DynamicPage({ currentTable, commonTables }) {
  if (!currentTable) {
    return <h1>Error: no table...</h1>;
  }
  return (
    <div className={styles.container}>
      <main>
        <PageTable table={currentTable} commonTables={commonTables} />
      </main>
    </div>
  );
}
