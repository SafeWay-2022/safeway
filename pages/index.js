/* import Head from "next/head";
import Image from "next/image";
import EditableFormTable from "../components/Table"; */
//import { useSomething } from "../hooks/useSomething";
import useConfig from "../hooks/useConfig";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { data, isLoading, isError, error } = useConfig();

  if (isError) {
    return <h1>Error:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading... </h1>;
  }

  return (
    <div className={styles.container}>
      <h1>{JSON.stringify(data)}</h1>
      {/* <main>
        <EditableFormTable data={data} />
      </main> */}
    </div>
  );
}
