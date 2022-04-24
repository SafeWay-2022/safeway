import React, {useState} from "react";
import { Table, Input, InputNumber, Popconfirm, Typography } from "antd";

const mapData = (data) => data.map(dataRow => ({key: dataRow._id, ...dataRow}))
// const mapColumns = (fields) => fields.map(field => {
//   field

export default ({data, fields}) => {
  console.log(data);

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (row) => row.key === editingKey;
  
  const dataSource = mapData(data);
  
  const edit = (record) => {
    setEditingKey(record.key);
  };
  
  const cancel = () => {
    setEditingKey('');
  };

  const actionsColumn = {
    "title": "Actions",
    "dataIndex": "action",
    "width": "50%",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    }
  }

  const columns = [...fields, actionsColumn];
  
  return <Table dataSource={dataSource} columns={columns} />;
};

