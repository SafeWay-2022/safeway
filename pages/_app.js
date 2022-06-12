import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Skeleton } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useConfig from '../hooks/useConfig';
import { getTableById, getTableByRoute, withProps } from '../lib/helpers';
import AccountMenu from '../components/ui-components/dropdown';
import '../styles/globals.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Tabs } from 'antd';
import RouteGuard from '../components/AuthGuard';
const { TabPane } = Tabs;

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
  const getHref = (id) => getTableById(tables, id)?.apiRoute;
  const currentTable = getTableByRoute(tables, route || defaultPath);
  const childrenWithProps = withProps({ children, currentTable, config, commonTables });
  const getTitle = (id) => getTableById(tables, id)?.title;

  return (
    <Layout style={{ height: '99vh' }} className="overflow-hidden">
      <Layout>
        {!route.startsWith('/login') && (
          <Menu
            mode="horizontal"
            selectedKeys={[String(currentTable?.id)]}
            style={{ justifyContent: 'center' }}
          // onClick={({ key }) => (window.location.href = getHref(key))}
          >
            {menu.map((id) => (
              <Menu.Item onClick={({ key }) => (router.push(getHref(key)))} key={id}>{getTitle(id)}</Menu.Item>
            ))}

            <Menu.Item style={{ transform: 'translateX(200%)' }} key='dcdcd'><AccountMenu /></Menu.Item>

          </Menu>
        )}
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
