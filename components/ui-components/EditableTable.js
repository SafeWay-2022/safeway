import { Table, Typography } from 'antd';
import React, { useState } from 'react';
import useAdd from '../../hooks/useAdd';
import useDelete from '../../hooks/useDelete';
import useUpdate from '../../hooks/useUpdate';
import { inputsMapping } from './Inputs/config';
import { getAddNewRowUIData, NEW_RECORD_KEY } from './Inputs/mappers';

export default ({ schema, data, fields, route }) => {
  const [editingKey, setEditingKey] = useState('');
  const [formValue, setFormValue] = useState({});
  const isEditing = (row) => row.key === editingKey;
  const isNew = (row) => row.key === NEW_RECORD_KEY;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = (rowId) => {
    setEditingKey('');
    setFormValue((prevFormValue) => ({ ...prevFormValue, [rowId]: undefined }));
  };

  const saveRecord = (row, mutate) => {
    mutate({ ...row, ...formValue[row._id] });
    setEditingKey('');
  };

  const deleteRecord = (row, mutate) => {
    mutate(row._id);
    setEditingKey('');
    setFormValue({});
  };

  const addRecord = (rowId, mutate) => {
    mutate({ ...schema, ...formValue[rowId] });
    setFormValue({});
  };

  const handleFormChange = (rowId, cellId, value) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [rowId]: { ...prevFormValue[rowId], [cellId]: value },
    }));
  };

  const actionsColumn = {
    title: 'Actions',
    dataIndex: 'action',
    width: '10%',
    render: (_, record) => (
      <ActionColumn
        row={record}
        save={saveRecord}
        addRecord={addRecord}
        edit={edit}
        cancel={cancel}
        editable={isEditing(record)}
        editingKey={editingKey}
        route={route}
        deleteRecord={deleteRecord}
      />
    ),
  };

  const columns = [
    ...mapColumns(fields, { isEditing, isNew, handleFormChange, formValue }),
    actionsColumn,
  ];

  const dataSource = [getAddNewRowUIData(fields), ...data];

  console.log(dataSource);

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

const mapColumns = (fields, { isEditing, isNew, handleFormChange, formValue }) =>
  fields.map((field) => {
    return {
      ...field,
      onCell: (record) => ({
        record,
        handleFormChange,
        formValue,
        editing: isEditing(record),
        isNew: isNew(record),
        ...field,
      }),
    };
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
  type,
  ...restProps
}) => {
  const isGeo = type === 'geo';
  const isCountry = type === 'country';
  const isFirstRow = record?.key === NEW_RECORD_KEY;
  const isEditing = isFirstRow || editing;

  const InputComponent = inputsMapping[type];

  const onChangeHandler = (value) => {
    handleFormChange(record.key, dataIndex, value);
  };

  const onInputChangeHandler = (e) => onChangeHandler(e.target.value);

  const getCellValue = () => {
    if (!record) return;

    const current = record[dataIndex];
    const changed = formValue[record.key] ? formValue[record.key][dataIndex] : null;

    const takeCurrent = !isEditing || !changed;

    return takeCurrent ? current : changed;
  };

  const getChangeHandler = () => {
    if (isGeo || isCountry) return onChangeHandler;

    return onInputChangeHandler;
  };

  const cellValue = getCellValue();

  return (
    <td {...restProps}>
      {isEditing || isNew ? (
        <InputComponent
          value={cellValue}
          onChange={getChangeHandler()}
          placeholder={`Enter ${dataIndex}`}
          label={record.name}
        />
      ) : isGeo ? (
        <InputComponent value={cellValue} label={record.name} readonly />
      ) : (
        children
      )}
    </td>
  );
};

const ActionColumn = ({
  addRecord,
  save,
  edit,
  deleteRecord,
  row,
  editable,
  editingKey,
  cancel,
  route,
}) => {
  const mutateUpdate = useUpdate({
    mutationKey: `rowEdit_${row._id}`,
    tableKey: route,
    url: route + row._id,
    route,
  });
  const mutateAdd = useAdd({
    url: route,
    tableKey: route,
    mutationKey: `rowAdd_${row._id}`,
    route,
  });
  const mutateDelete = useDelete({
    url: route + row._id,
    tableKey: route,
    mutationKey: `rowDelete_${row._id}`,
    route,
  });

  const addNew = row.key === NEW_RECORD_KEY;

  if (addNew) {
    return (
      <span>
        <Typography.Link
          disabled={editingKey !== ''}
          onClick={() => addRecord(row.key, mutateAdd)}
          style={{ marginRight: 8 }}
        >
          Add
        </Typography.Link>
        <Typography.Link onClick={() => cancel(row.key)}>Clear</Typography.Link>
      </span>
    );
  }

  if (editable) {
    return (
      <span>
        <Typography.Link onClick={() => save(row, mutateUpdate)} style={{ marginRight: 8 }}>
          Save
        </Typography.Link>
        <Typography.Link onClick={() => cancel(row.key)}>Cancel</Typography.Link>
      </span>
    );
  }

  return (
    <span>
      <Typography.Link
        disabled={editingKey !== ''}
        onClick={() => edit(row)}
        style={{ marginRight: 8 }}
      >
        Edit
      </Typography.Link>
      <Typography.Link disabled={editingKey !== ''} onClick={() => deleteRecord(row, mutateDelete)}>
        Delete
      </Typography.Link>
    </span>
  );
};
