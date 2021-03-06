import React from 'react';

import { Select } from 'antd';
const { Option } = Select;

import { countries } from './data';

function SelectCountry({ value = undefined, onChange = () => { } }) {
  return (
    <Select
      showSearch
      value={value}
      style={{ width: 200 }}
      placeholder="Search to Select Country"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      filterSort={(optionA, optionB) =>
        optionA.value.toLowerCase().localeCompare(optionB.value.toLowerCase())
      }
    >
      {countries.map(({ label, value, flagUrl }) => {
        return (
          <Option key={value} value={value}>
            {label}
            {/* <img src={flagUrl} aria-label={label} /> */}
          </Option>
        );
      })}
    </Select>
  );
}

function InputWrapper(props) {
  return !props.readonly ? <SelectCountry {...props} /> : props.children;
}

export default InputWrapper;
