import { Layout, Skeleton, Menu } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableByRoute, withProps } from '../lib/helpers';
import AccountMenu from '../components/ui-components/dropdown';
import AuthGuard from '../components/AuthGuard';
import '../styles/globals.css';
import ImageComponent from '../components/ui-components/Image'



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

  const currentTable = getTableByRoute(tables, route || defaultPath);
  const childrenWithProps = withProps({ children, currentTable, config, commonTables });

  return (
    <Layout style={{ height: '96vh' }} className="overflow-hidden">
      <Layout>
        <Content className="h-full overflow-auto mt-4">{childrenWithProps}</Content>
        <Footer style={{ textAlign: 'center' }}>Safeway© 2022</Footer>
      </Layout>
    </Layout >
  );
};
const Navigation = () => {
  const [menu] = useState([
    { key: 'Points of interests', route: '/poi', label: <Link href="/poi">Points of interests</Link> },
    { key: 'Organizations', route: '/org', label: <Link href="/org">Organizations</Link> },
    { key: 'Users', route: '/users', label: <Link href="/users">Users</Link> },
    { key: 'Categories', route: '/common', label: <Link href="/common">Categories</Link> },
    { key: 'Needs', route: '/need', label: <Link href='/need'>Needs</Link> },
  ])
  return (
    <div style={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
      <ImageComponent src="/logoSafe.svg" alt="logoSafe" width="80px" height="50px" />
      <Menu
        mode="horizontal"
        items={menu}
        defaultSelectedKeys={['Points of interests']}
      />
      <AccountMenu />
    </div>
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
            <Navigation />
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
