import Head from "next/head";
import Image from "next/image";
import EditableFormTable from "../components/Table";
import { useSomething } from "../hooks/useSomething";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { data, isLoading, isError, error, isSuccess } = useSomething();

  if (isError) {
    return <h1>Error:{JSON.stringify(error)}</h1>;
  }

  return (
    <div className={styles.container}>
      <h1>Volia it works</h1>
      <main>
        {isLoading ? "loading..." : <EditableFormTable data={data} />}
      </main>
    </div>
  );
}
