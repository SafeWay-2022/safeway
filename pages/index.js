import Link from "next/link";
import { useRouter } from "next/router";
import useConfig from "../hooks/useConfig";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { data: config, isLoading, isError, error } = useConfig();

  const { route } = useRouter();

  if (isError) {
    return <h1>Error:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading... </h1>;
  }

  const currentTable = route || config.defaultMenu;

  return (
    <div className={styles.container}>
      <main className="text-xl text-red-500">WELCOME HOME:</main>

      {config.menu.map((menuIndex) => (
        <Link href={config.tables[menuIndex].apiRoute}>
          <a className="bg-gray-200 p-3 m-3 inline-block cursor-pointer">
            {config.tables[menuIndex].title}{" "}
          </a>
        </Link>
      ))}

      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
}
