/* import Head from "next/head";
import Image from "next/image";
import EditableFormTable from "../components/Table"; */
//import { useSomething } from "../hooks/useSomething";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useConfig from "../hooks/useConfig";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { data, isLoading, isError, error } = useConfig();

  const { route } = useRouter();

  if (isError) {
    return <h1>Error:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading... </h1>;
  }

  const currentTable = route || data.defaultMenu;

  return (
    <div className={styles.container}>
      <main>New HOME:</main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
