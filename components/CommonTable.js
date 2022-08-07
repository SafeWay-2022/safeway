import { useState } from 'react';
import { Pagination, Skeleton, Table, Tag, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { PER_PAGE } from '../config';
import { getTableFetch, createCommon } from '../lib/helpers';
import styles from '../styles/Home.module.css';
import ModalCommon from './ui-components/ModalCommon';
import ImageComponent from './ui-components/Image';

export default function PageTable() {
  const [tableConfig] = useState({
    route: '/common/',
  });
  const { route } = tableConfig;
  const myFetch = getTableFetch(route);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(PER_PAGE);
  const [searchData] = useState({});

  const {
    data: tableData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    [route, page, limit],
    () =>
      myFetch({
        skip: page,
        limit: limit,
        ...searchData,
      }),
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      staleTime: 15000,
      refetchInterval: 0,
    },
  );

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      render: (name) => {
        return (
          <Tag color="blue" style={{ fontSize: '14px' }}>
            {name}
          </Tag>
        );
      },
    },
    {
      title: 'Українська',
      dataIndex: 'ua',
      render: (ukr) => {
        return (
          <Tag color="geekblue" style={{ fontSize: '14px' }}>
            {ukr}
          </Tag>
        );
      },
    },
    {
      title: 'Русский',
      dataIndex: 'ru',
      render: (ru) => {
        return (
          <Tag color="purple" style={{ fontSize: '14px' }}>
            {ru}
          </Tag>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description) => {
        return <span>{description}</span>;
      },
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      render: (icon) => {
        return <>{icon && <img src={icon} alt="icon" width="50px" height="50px" />}</>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => {
        return (
          <div style={{ display: 'flex' }}>
            <ModalCommon
              isTable={true}
              record={record}
              refetch={refetch}
              doFetch={{}}
              title="Edit category"
            />
            <Popconfirm
              placement="top"
              title="Do you really want to delete this item?"
              // onConfirm={() => deletePoint(record._id, refetch)}
              okText="Delete"
              okType="secondary"
              cancelText="Cancel"
            >
              <span style={{ cursor: 'pointer' }}>
                <ImageComponent src="/delete.svg" alt="delete_icon" width="40px" height="40px" />
              </span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <h1>Error getting table data:{JSON.stringify(error)}</h1>;
  }

  if (isLoading) {
    return <Skeleton />;
  }
  const { total = 0 } = tableData;
  const pagination = {
    pageSize: limit,
    onChange: (currentPage, limit) => {
      if (currentPage === 1) {
        setPage(0);
      } else {
        setPage((currentPage - 1) * limit);
      }
      setLimit(limit);
    },
    total,
  };

  return (
    <div className={styles.container}>
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
          <ModalCommon
            isTable={false}
            record={{}}
            refetch={refetch}
            doFetch={createCommon}
            title="Create category"
          />
        </div>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData?.list}
          pagination={false}
        />
      </main>
    </div>
  );
}
