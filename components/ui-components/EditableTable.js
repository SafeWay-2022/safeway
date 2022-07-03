import { Table, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined, FileAddOutlined, ClearOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import useAdd from '../../hooks/useAdd';
import useDelete from '../../hooks/useDelete';
import useUpdate from '../../hooks/useUpdate';
import { inputsMapping, pureValueTypes } from './Inputs/config';
import { getAddNewRowUIData, NEW_RECORD_KEY, changingData } from './Inputs/mappers';

export default ({ schema, data, fields, route, commonTablesData, currentPage, isFetching }) => {
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
    fixed: 'right',
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
        currentPage={currentPage}
      />
    ),
  };

  const columns = [
    ...mapColumns(fields, { isEditing, isNew, handleFormChange, formValue, commonTablesData }),
    actionsColumn,
  ];

  const dataSource = [getAddNewRowUIData(fields), ...changingData(data)];

  const getRowClassName = (record) => {
    const shouldCut =
      route === '/poi/nearby/' && record.key === 'add_new_record' ? 'shouldCut' : '';
    return `${shouldCut} bg-white`;
  };
  return (
    <Table
      rowClassName={getRowClassName}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      loading={isFetching}
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
    <>
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
    </>
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
  currentPage,
}) => {
  const mutateUpdate = useUpdate({
    mutationKey: `rowEdit_${row._id}`,
    tableKey: [route, currentPage],
    url: route + row._id,
    route,
  });
  const mutateAdd = useAdd({
    url: route,
    tableKey: [route, currentPage],
    mutationKey: `rowAdd_${row._id}`,
    route,
  });
  const mutateDelete = useDelete({
    url: route + row._id,
    tableKey: [route, currentPage],
    mutationKey: `rowDelete_${row._id}`,
    route,
  });

  const addNew = row.key === NEW_RECORD_KEY;
  if (addNew) {
    return (
      <span>
        <FileAddOutlined
          disabled={editingKey !== ''}
          onClick={() => addRecord(row.key, mutateAdd)}
          style={{ marginRight: 8, fontSize: '150%' }}
        />
        <ClearOutlined onClick={() => cancel(row.key)} style={{ fontSize: '150%' }} />
      </span>
    );
  }

  if (editable) {
    return (
      <span>
        <SaveOutlined onClick={() => save(row, mutateUpdate)} style={{ marginRight: 8, fontSize: '150%' }} />
        <CloseCircleOutlined onClick={() => cancel(row.key)} style={{ fontSize: '150%' }} />
      </span>
    );
  }

  return (
    <span style={{ display: 'flex' }}>
      <EditOutlined
        disabled={editingKey !== ''}
        onClick={() => edit(row)}
        style={{ marginRight: 8, fontSize: '150%' }}
      />
      <Popconfirm
        placement="top"
        title="Do you really want to delete this item?"
        onConfirm={() => deleteRecord(row, mutateDelete)}
        okText="Delete"
        okType="secondary"
        cancelText="Cancel">
        <DeleteOutlined disabled={editingKey !== ''} style={{ fontSize: '150%' }} />
      </Popconfirm>
    </span>
  );
};
