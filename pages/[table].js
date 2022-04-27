import { useRouter } from 'next/router';
import useConfig from '../hooks/useConfig';
import styles from '../styles/Home.module.css';
import PageTable from '../components/PageTable';

const getTable = ({ tables }, route) => tables.find(({ path }) => path === route);

export default function DynamicPage() {
  const { data: config, isLoading, isError, error } = useConfig();

  const router = useRouter();
  const { asPath: route } = router;

  if (isError) {
    return <h1>Error getting application config:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading config... </h1>;
  }

  const currentTable = getTable(config, route || config.defaultPath);

  if (!currentTable) {
    return <h1>Error: no table...</h1>;
  }

  return (
    <div className={styles.container}>
      <main>
        <PageTable table={currentTable} />
      </main>
    </div>
  );
}
