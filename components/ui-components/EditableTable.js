import { Table, Typography } from 'antd';
import React, { useState } from 'react';
import useAdd from '../../hooks/useAdd';
import useDelete from '../../hooks/useDelete';
import useUpdate from '../../hooks/useUpdate';
import { inputsMapping, pureValueTypes } from './Inputs/config';
import { getAddNewRowUIData, NEW_RECORD_KEY } from './Inputs/mappers';

export default ({ schema, data, fields, route, commonTablesData, pagination }) => {
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
    ...mapColumns(fields, { isEditing, isNew, handleFormChange, formValue, commonTablesData }),
    actionsColumn,
  ];

  const dataSource = [getAddNewRowUIData(fields), ...data];

  return (
    <Table
      pagination={false}
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

const mapColumns = (fields, { isEditing, isNew, handleFormChange, formValue, commonTablesData }) =>
  fields.map((field) => {
    return {
      ...field,
      onCell: (record) => ({
        record,
        handleFormChange,
        formValue,
        editing: isEditing(record),
        isNew: isNew(record),
        commonTablesData,
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
  commonTablesData,
  type,
  ...restProps
}) => {
  const isEditing = editing || isNew;

  const InputComponent = inputsMapping[type];

  const onChangeHandler = (value) => {
    handleFormChange(record.key, dataIndex, value);
  };

  const onInputChangeHandler = (e) => onChangeHandler(e.target.value);

  const getCellValue = () => {
    const currentCellValue = record[dataIndex];
    const changedRowValue = formValue[record.key];

    if (!changedRowValue) return currentCellValue;

    const changedCellValue = changedRowValue[dataIndex];
    if (changedCellValue === undefined) return currentCellValue;

    return changedCellValue;
  };

  const getChangeHandler = () =>
    pureValueTypes.includes(type) ? onChangeHandler : onInputChangeHandler;

  return (
    <td {...restProps}>
      {InputComponent ? (
        <InputComponent
          value={getCellValue()}
          label={record.name}
          readonly={!isEditing}
          placeholder={`Enter ${dataIndex}`}
          onChange={getChangeHandler()}
          options={commonTablesData[dataIndex]}
        >
          {children}
        </InputComponent>
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
