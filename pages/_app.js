import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import useConfig from '../hooks/useConfig';
import '../styles/globals.css';

const cleanPath = (path) => path.replace('/', '');

const getTableByRoute = (tables, route) =>
  tables.find(({ path }) => cleanPath(path) === cleanPath(route));

const getTableById = (tables, targetId) => tables.find(({ id }) => id === targetId);

const App = ({ children }) => {
  const router = useRouter();
  const { asPath: route } = router;

  const { data, isLoading, isError, error } = useConfig();
  const config = data || {};
  const { menu = [], tables = [], defaultPath = '' } = config;

  if (isError) {
    return <h1>Error getting application config:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <h1>loading config... </h1>;
  }

  const currentTable = getTableByRoute(tables, route || defaultPath);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentTable, config });
    }
    return child;
  });

  const btnClass = ' p-3 m-3 inline-block cursor-pointer';
  const getMenuClass = (id) =>
    (getTableById(tables, id)?.id === currentTable?.id ? 'bg-blue-600' : 'bg-gray-200') + btnClass;
  const getHref = (id) => getTableById(tables, id).apiRoute;
  const getTitle = (id) => getTableById(tables, id).title;

  return (
    <>
      <Link href="/">
        <a className={getMenuClass()}>Home</a>
      </Link>
      {menu.map((id) => (
        <Link href={getHref(id)}>
          <a className={getMenuClass(id)}>{getTitle(id)} </a>
        </Link>
      ))}
      {childrenWithProps}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="leaflet.css" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <App>
          <Component {...pageProps} />
        </App>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
