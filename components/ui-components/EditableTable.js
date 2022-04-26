import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import useMutateSomething from '../../hooks/useUpdate';
import { dataMappers, inputsMapping } from './Inputs/config';

export default ({ data, fields, route }) => {
  const [localData, setLocalData] = useState(data);
  const [editingKey, setEditingKey] = useState('');
  const [formValue, setFormValue] = useState({});
  const isEditing = (row) => row.key === editingKey;
  const isNew = (row) => row.key === NEW_RECORD_KEY;

  useEffect(() => {
    data && setLocalData(data);
  }, [data]);

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = (rowId) => {
    setEditingKey('');
    setFormValue({ [rowId]: undefined });
  };

  const save = (rowId, mutate) => {
    setEditingKey('');
    let rowToSave;
    setLocalData(
      localData.map((dataRow) => {
        if (dataRow._id === rowId) {
          rowToSave = { ...dataRow, ...formValue[rowId] };
          return rowToSave;
        }

        return dataRow;
      }),
    );
    mutate(rowToSave);
  };

  const deleteRecord = (rowId) => {
    setEditingKey('');
    setFormValue({});
    setLocalData(localData.filter((dataRow) => dataRow._id !== rowId));
  };

  const addRecord = () => {
    setLocalData([{ ...formValue[NEW_RECORD_KEY], key: 'added', _id: 'added' }, ...localData]);
  };

  const handleFormChange = (rowId, cellId, value) => {
    setFormValue({
      ...formValue,
      [rowId]: { ...formValue[rowId], [cellId]: value },
    });
  };

  const actionsColumn = {
    title: 'Actions',
    dataIndex: 'action',
    width: '10%',
    render: (_, record) => (
      <ActionColumn
        row={record}
        save={save}
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

  const dataSource = [getBlankData(fields), ...mapData(localData)];

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

const mapData = (data) => data.map((dataRow) => ({ key: dataRow._id, ...dataRow }));

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

const NEW_RECORD_KEY = 'add_new_record';
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
  type,
  ...restProps
}) => {
  const isGeo = type === 'geo';

  const onChangeHandler = (value) => {
    handleFormChange(record.key, dataIndex, value);
  };

  const onInputChangeHandler = (e) => onChangeHandler(e.target.value);

  const dataMapper = dataMappers[type];
  const InputComponent = inputsMapping[type];

  const getCellValue = () => {
    const current = record[dataIndex];
    const changed = formValue[record.key] ? formValue[record.key][dataIndex] : null;

    if (!editing || !changed) return dataMapper(current);

    return dataMapper(changed);
  };

  const getChangeHandler = () => {
    if (isGeo) return onChangeHandler;

    return onInputChangeHandler;
  };

  return (
    <td {...restProps}>
      {editing || isNew ? (
        <InputComponent value={getCellValue()} onChange={getChangeHandler()} placeholder={`${dataIndex}...`} />
      ) : isGeo ? (
        <InputComponent {...getCellValue()} readonly />
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
  const mutateUpdate = useMutateSomething(`rowEdit_${row._id}`, route + row._id, route);
  const mutateAdd = useMutateSomething(`rowAdd_${row._id}`, route + row._id, route);
  const mutateDelete = useMutateSomething(`rowEdit_${row._id}`, route + row._id, route);

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
        <Typography.Link onClick={() => save(row.key, mutateUpdate)} style={{ marginRight: 8 }}>
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
      <Typography.Link
        disabled={editingKey !== ''}
        onClick={() => deleteRecord(row._id, mutateDelete)}
      >
        Delete
      </Typography.Link>
    </span>
  );
};
