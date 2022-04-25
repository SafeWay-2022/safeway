import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Typography } from "antd";

const mapData = (data) =>
  data.map((dataRow) => ({ key: dataRow._id, ...dataRow }));

const mapColumns = (
  fields,
  { isEditing, isNew, handleFormChange, formValue }
) =>
  fields.map((field) => {
    return {
      ...field,
      onCell: (record) => ({
        record,
        handleFormChange,
        formValue,
        editing: isEditing(record),
        isNew: isNew(record),
        dataIndex: field.dataIndex,
      }),
    };
  });

const NEW_RECORD_KEY = "add_new_record";
const getBlankData = (fields) => ({
  _id: NEW_RECORD_KEY,
  key: NEW_RECORD_KEY,
  ...Object.fromEntries(fields.map(({ dataIndex }) => [dataIndex, null])),
});

const EditableCell = ({
  editing,
  isNew,
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

  const getCellValue = () => {
    const current = record[dataIndex];
    const changed = formValue[record.key]
      ? formValue[record.key][dataIndex]
      : null;

    if (!editing || !changed) return current;

    return changed;
  };

  return (
    <td {...restProps}>
      {editing || isNew ? (
        <input value={getCellValue()} type="text" onChange={onChangeHandler} />
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
  const isNew = (row) => row.key === NEW_RECORD_KEY;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = (rowId) => {
    setEditingKey("");
    setFormValue({ [rowId]: undefined });
  };

  const save = (rowId) => {
    setEditingKey("");
    setLocalData(
      localData.map((dataRow) =>
        dataRow._id === rowId ? { ...dataRow, ...formValue[rowId] } : dataRow
      )
    );
  };

  const deleteRecord = (rowId) => {
    setEditingKey("");
    setFormValue({});
    setLocalData(localData.filter((dataRow) => dataRow._id !== rowId));
  };

  const addRecord = () => {
    setLocalData([
      { ...formValue[NEW_RECORD_KEY], key: "added", _id: "added" },
      ...localData,
    ]);
  };

  const handleFormChange = (rowId, cellId, value) => {
    setFormValue({
      ...formValue,
      [rowId]: { ...formValue[rowId], [cellId]: value },
    });
  };

  const renderActionsColumn = (_, record) => {
    const addNew = record.key === NEW_RECORD_KEY;
    const editable = isEditing(record);
    if (addNew) {
      return (
        <span>
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => addRecord(record.key)}
            style={{ marginRight: 8 }}
          >
            Add
          </Typography.Link>
          <Popconfirm
            disabled={editingKey !== ""}
            title="Sure to cancel?"
            onConfirm={() => cancel(record.key)}
          >
            <a>Clear</a>
          </Popconfirm>
        </span>
      );
    }

    if (editable) {
      return (
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
      );
    }

    return (
      <span>
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
          style={{ marginRight: 8 }}
        >
          Edit
        </Typography.Link>
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => deleteRecord(record._id)}
        >
          Delete
        </Typography.Link>
      </span>
    );
  };

  const actionsColumn = {
    title: "Actions",
    dataIndex: "action",
    width: "10%",
    render: renderActionsColumn,
  };

  const columns = [
    ...mapColumns(fields, { isEditing, isNew, handleFormChange, formValue }),
    actionsColumn,
  ];

  const dataSource = [getBlankData(fields), ...mapData(localData)];
  console.log(formValue);
  console.log(dataSource);
  console.log(columns);
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
