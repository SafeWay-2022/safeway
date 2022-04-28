import { Select, Tag } from 'antd';
import React from 'react';

const { Option } = Select;

function SelectMultiple({ options = [], value, placeholder, onChange = () => {} }) {
  return (
    <Select
      mode="tags"
      value={value || undefined}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={onChange}
    >
      {options.map((row) => {
        // TODO - take it to the mapper
        return (
          <Option key={row._id} value={row._id}>
            {row.ua || row.ru || row.en || row._id}
          </Option>
        );
      })}
    </Select>
  );
}

function SelectMultipleReadonly({ value }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {value &&
        value.map((option) => {
          return (
            <Tag className=" text-ellipsis overflow-hidden" color="processing">
              {option}
            </Tag>
          );
        })}
    </div>
  );
}

function InputWrapper(props) {
  return !props.readonly ? <SelectMultiple {...props} /> : <SelectMultipleReadonly {...props} />;
}

export default InputWrapper;
