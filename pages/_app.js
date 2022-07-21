import { Layout, Skeleton, Menu } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableById, getTableByRoute, withProps } from '../lib/helpers';
import AccountMenu from '../components/ui-components/dropdown';
import AuthGuard from '../components/AuthGuard';
import '../styles/globals.css';


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

  const getHref = (id) => {
    if (getTableById(tables, id)?.path === '/nearby') {
      return '/nearby/'
    }
    return getTableById(tables, id)?.apiRoute
  };
  const currentTable = getTableByRoute(tables, route || defaultPath);
  const childrenWithProps = withProps({ children, currentTable, config, commonTables });
  const getTitle = (id) => getTableById(tables, id)?.title;

  return (
    <Layout style={{ height: '96vh' }} className="overflow-hidden">
      <Layout>
        <Content className="h-full overflow-auto mt-4">{childrenWithProps}</Content>
        <Footer style={{ textAlign: 'center' }}>Safeway© 2022</Footer>
      </Layout>
    </Layout >
  );
};
const Navigation = ({ route }) => {
  const [menu] = useState([
    { key: 'Points of interests', route: '/poi' },
    { key: 'Organizations', route: '/org' },
    { key: 'Users', route: '/users' },
    { key: 'Categories', route: '/common' },
    { key: 'Needs', route: '/need' },
  ])
  const router = useRouter()
  return (
    <>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['Points of interests']}
        style={{ justifyContent: 'center' }}
      >
        {menu.map((e) => (
          <Menu.Item
            key={e.key}
            className={route === '/search' && e.key === 'Points of interest' && 'ant-menu-item-selected'}
            onClick={() => router.push(e.route)}>
            {e.key}
          </Menu.Item>
        ))}

        <Menu.Item style={{ transform: 'translateX(200%)' }} key="dcdcd">
          <AccountMenu />
        </Menu.Item>
      </Menu>

    </>
  )
}

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
          <>
            <Navigation route={route} />
            <AuthGuard>
              <App>
                <Component {...pageProps} />
              </App>
            </AuthGuard>
          </>
        )}
      </QueryClientProvider>
    </>
  );
}
