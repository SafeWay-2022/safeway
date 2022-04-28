import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Skeleton } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableById, getTableByRoute, withProps } from '../lib/helpers';
import '../styles/globals.css';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }) => {
  const router = useRouter();
  const { asPath: route } = router;

  const { data: config = {}, commonTables, isLoading, isError, error } = useConfig();
  const { menu = [], tables = [], defaultPath = '' } = config;

  const [collapsed, setCollapsed] = useState(false);

  if (isError) {
    return <h1>Error getting application config:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  const currentTable = getTableByRoute(tables, route || defaultPath);

  const childrenWithProps = withProps({ children, currentTable, config, commonTables });

  const btnClass = ' p-3 m-3 inline-block cursor-pointer whitespace-nowrap overflow-hidden ';
  const getMenuClass = (id) =>
    (getTableById(tables, id)?.id === currentTable?.id ? 'bg-blue-600' : 'bg-gray-200') + btnClass;
  const getHref = (id) => getTableById(tables, id).apiRoute;
  const getTitle = (id) => getTableById(tables, id).title;

  console.log({ config, commonTables });

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider style={{ height: '99vh' }} className="overflow-hidden">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsed={collapsed}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <br />
        <Link href="/">
          <a style={{ width: !collapsed ? '170px' : '50px' }} className={getMenuClass()}>
            Home
          </a>
        </Link>
        {menu.map((id) => (
          <Link href={getHref(id)}>
            <a style={{ width: !collapsed ? '170px' : '50px' }} className={getMenuClass(id)}>
              {getTitle(id)}{' '}
            </a>
          </Link>
        ))}
      </Sider>
      <Layout style={{ marginLeft: collapsed ? '70px' : '180px', backgroundColor: 'white' }}>
        <Content className="h-full overflow-auto mt-4">{childrenWithProps}</Content>
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
