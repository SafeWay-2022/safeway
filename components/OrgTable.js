import { useState } from 'react';
import { Pagination, Skeleton, Table, Checkbox, Tag, Popconfirm } from 'antd';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { PER_PAGE } from '../config';
import { nanoid } from 'nanoid';
import { getTableFetch, createOrg, updateOrg, deleteOrg } from '../lib/helpers';
import styles from '../styles/Home.module.css';
import ModalOrg from './ui-components/ModalOrg';
import ImageComponent from './ui-components/Image';

export default function PageTable() {
  const [tableConfig] = useState({
    route: '/org/',
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
      title: 'Name',
      dataIndex: 'name',
      render: (name) => {
        return <span>{name}</span>;
      },
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      render: (bool) => {
        return (
          <span>
            <ImageComponent
              src={bool ? '/checked.svg' : '/not_checked.svg'}
              alt="checkbox"
              width="25px"
              height="25px"
            />
          </span>
        );
      },
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      render: (categories) => {
        return (
          <>
            {categories?.map((e) => (
              <Tag key={nanoid()} color="blue">
                {e}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: 'Members',
      dataIndex: 'members',
      render: (members) => {
        return (
          <>
            {members?.map((e) => (
              <Tag key={nanoid()} color="green">
                {e}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (Phone) => {
        return <span>{Phone}</span>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (site) => {
        return <span>{site}</span>;
      },
    },
    {
      title: 'Contact',
      dataIndex: 'contact_person',
      render: (contact) => {
        return <Tag style={{ fontSize: '14px' }}>{contact}</Tag>;
      },
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      render: (admin) => {
        return <span>{admin}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => {
        return (
          <div style={{ display: 'flex' }}>
            <ModalOrg
              isTable={true}
              record={record}
              refetch={refetch}
              doFetch={updateOrg}
              title="Edit organization"
            />
            <Popconfirm
              placement="top"
              title="Do you really want to delete this item?"
              onConfirm={() => deleteOrg(record._id, refetch)}
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

  const ExpandedRowRender = ({ data }) => {
    const columns = [
      {
        title: 'Web-Site',
        dataIndex: 'url',
        render: (site) => {
          return <span>{site}</span>;
        },
      },
      {
        title: 'Social-Media',
        dataIndex: 'socialmedia',
        render: (media) => {
          return <span>{media}</span>;
        },
      },
      {
        title: 'Messenger',
        dataIndex: 'messenger',
        render: (media) => {
          return <span>{media}</span>;
        },
      },
      {
        title: 'Telegram',
        dataIndex: 'telegram',
        render: (tel) => <span>{tel}</span>,
      },
      {
        title: 'Whatsapp',
        dataIndex: 'whatsapp',
        render: (wat) => <span>{wat}</span>,
      },
    ];

    return <Table columns={columns} dataSource={[data]} pagination={false} />;
  };

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {total > 0 && <Pagination style={{ display: 'inline' }} {...pagination} />}
          <ModalOrg
            isTable={false}
            record={{}}
            refetch={refetch}
            doFetch={createOrg}
            title="Create organization"
          />
        </div>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData?.list}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <UpOutlined
                style={{ fontSize: '150%', float: 'right' }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <DownOutlined style={{ fontSize: '150%' }} onClick={(e) => onExpand(record, e)} />
            )
          }
          expandable={{
            expandedRowRender: (record) => <ExpandedRowRender data={record} />,
          }}
          pagination={false}
        />
      </main>
    </div>
  );
}
