import { Layout, Skeleton } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableById, getTableByRoute, withProps } from '../lib/helpers';
import AccountMenu from '../components/ui-components/dropdown';
import AuthGuard from '../components/AuthGuard';
import '../styles/globals.css';
import { Menu } from 'antd';

const { Content, Footer } = Layout;

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

  const getHref = (id) => getTableById(tables, id)?.apiRoute;
  const currentTable = getTableByRoute(tables, route || defaultPath);
  const childrenWithProps = withProps({ children, currentTable, config, commonTables });
  const getTitle = (id) => getTableById(tables, id)?.title;

  return (
    <Layout style={{ height: '99vh' }} className="overflow-hidden">
      <Layout>
        <Menu
          mode="horizontal"
          selectedKeys={[String(currentTable?.id)]}
          style={{ justifyContent: 'center' }}
        >
          {menu.map((id) => (
            <Menu.Item onClick={({ key }) => router.push(getHref(key))} key={id}>
              {getTitle(id)}
            </Menu.Item>
          ))}

          <Menu.Item style={{ transform: 'translateX(200%)' }} key="dcdcd">
            <AccountMenu />
          </Menu.Item>
        </Menu>

        <Content className="h-full overflow-auto mt-4">{childrenWithProps}</Content>
        <Footer style={{ textAlign: 'center' }}>Safeway© 2022</Footer>
      </Layout>
    </Layout>
  );
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { asPath: route } = router;
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
        {route.startsWith('/login') ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            <App>
              <Component {...pageProps} />
            </App>
          </AuthGuard>
        )}
      </QueryClientProvider>
    </>
  );
}
