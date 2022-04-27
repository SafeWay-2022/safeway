import styles from '../styles/Home.module.css';

export default function Home({ config }) {
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
}
