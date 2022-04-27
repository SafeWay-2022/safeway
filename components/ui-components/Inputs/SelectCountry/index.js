import React from 'react';

import { Select } from 'antd';
const { Option } = Select;

import { countries } from './data';

function SelectCountry({ value = '', onChange = () => {} }) {
  return (
    <Select
      showSearch
      defaultValue={value}
      style={{ width: 200 }}
      placeholder="Search to Select Country"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
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

export default SelectCountry;
