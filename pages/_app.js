import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableById, getTableByRoute, withProps } from '../lib/helpers';

import '../styles/globals.css';
import { Layout, Skeleton, Menu, MenuProps } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }) => {
  const router = useRouter();
  const { asPath: route } = router;

  const { data: config = {}, commonTables, isLoading, isError, error } = useConfig();
  const { menu = [], tables = [], defaultPath = '' } = config;

  if (isError) {
    return <h1>Error getting application config:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const currentTable = getTableByRoute(tables, route || defaultPath);

  const childrenWithProps = withProps({ children, currentTable, config, commonTables });

  const btnClass = ' p-3 m-3 inline-block cursor-pointer';
  const getMenuClass = (id) =>
    (getTableById(tables, id)?.id === currentTable?.id ? 'bg-blue-600' : 'bg-gray-200') + btnClass;
  const getHref = (id) => getTableById(tables, id).apiRoute;
  const getTitle = (id) => getTableById(tables, id).title;

  console.log({ config, commonTables });

  return (
    <Layout hasSider style={{ height: '99vh' }} className="overflow-auto">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="mt-16">
          <Link href="/">
            <a className={getMenuClass()}>Home</a>
          </Link>
          {menu.map((id) => (
            <Link href={getHref(id)}>
              <a className={getMenuClass(id)}>{getTitle(id)} </a>
            </Link>
          ))}
        </div>
      </Sider>
      <Layout className="ml-40">
        <Header />
        <Content className="h-full">{childrenWithProps}</Content>
        <Footer style={{ textAlign: 'center' }}>Safeway© 2022</Footer>
      </Layout>
    </Layout>
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
