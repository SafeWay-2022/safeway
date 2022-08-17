import React from 'react';

import { Select } from 'antd';
const { Option } = Select;

const categories = [
  'Clothes',
  'Accommodation',
  'Medical',
  'Border Crossing',
  'Pharmacy',
  'Finance',
  'Information',
  'Mental help',
  'Transport',
  'Food',
  'Electronics',
  'Children',
  'Social help',
  'Any help',
  'Disability support',
  'Pets',
  'Water',
  'Jobs',
  'Education',
  'LGBTQ+',
];

function SelectCategory({ value = undefined, onChange = () => {} }) {
  return (
    <Select
      showSearch
      value={value}
      style={{ marginBottom: 10 }}
      placeholder="Search to Select Category"
      optionFilterProp="children"
      onChange={onChange}
    >
      {categories.map((e) => {
        return (
          <Option key={e} value={e}>
            {e}
          </Option>
        );
      })}
    </Select>
  );
}

function InputWrapper(props) {
  return !props.readonly ? <SelectCategory {...props} /> : props.children;
}

export default InputWrapper;
