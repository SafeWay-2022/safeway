import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Typography } from "antd";

const mapData = (data) =>
  data.map((dataRow) => ({ key: dataRow._id, ...dataRow }));

const mapColumns = (fields, isEditing, handleFormChange, formValue) =>
  fields.map((field) => {
    return {
      ...field,
      onCell: (record) => {
        return {
          record,
          handleFormChange,
          formValue,
          editing: isEditing(record),
          dataIndex: field.dataIndex,
        };
      },
    };
  });

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleFormChange,
  formValue,
  ...restProps
}) => {
  const onChangeHandler = (e) => {
    handleFormChange(record.key, dataIndex, e.target.value);
  };
  return (
    <td {...restProps}>
      {editing ? (
        <input
          value={
            formValue[record.key]
              ? formValue[record.key][dataIndex]
                ? formValue[record.key][dataIndex]
                : record[dataIndex]
              : record[dataIndex]
          }
          type="text"
          onChange={onChangeHandler}
        />
      ) : (
        children
      )}
    </td>
  );
};

export default ({ data, fields }) => {
  const [localData, setLocalData] = useState(data);
  const [editingKey, setEditingKey] = useState("");
  const [formValue, setFormValue] = useState({});
  const isEditing = (row) => row.key === editingKey;

  const dataSource = mapData(localData);

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = (rowId) => {
    setEditingKey("");
    setFormValue({ [rowId]: undefined });
  };

  const save = (rowId) => {
    setEditingKey("");
    const index = localData.findIndex((row) => row._id === rowId);
    setLocalData(
      localData.map((r) => {
        if (r._id === rowId) {
          return { ...r, ...formValue[rowId] };
        }
        return r;
      })
    );
    // insert(localData, index, formValue[rowId]));
    console.log(index);
  };

  const handleFormChange = (rowId, cellId, value) => {
    console.log({ rowId, cellId, value });
    setFormValue({
      ...formValue,
      [rowId]: { ...formValue[rowId], [cellId]: value },
    });
  };

  const actionsColumn = {
    title: "Actions",
    dataIndex: "action",
    width: "50%",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{ marginRight: 8 }}
          >
            Save
          </Typography.Link>
          <Popconfirm
            title="Sure to cancel?"
            onConfirm={() => cancel(record.key)}
          >
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
        >
          Edit
        </Typography.Link>
      );
    },
  };

  const columns = [
    ...mapColumns(fields, isEditing, handleFormChange, formValue),
    actionsColumn,
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
    />
  );
};
