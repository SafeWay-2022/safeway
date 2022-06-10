import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home({ config }) {
  const router = useRouter();
  router.push({
    pathname: '/login',
  });
  return (
    <div className={styles.container}>{/*  <pre>{JSON.stringify(config, null, 2)}</pre> */}</div>
  );
}
