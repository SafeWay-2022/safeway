import { Input } from 'antd';
import React from 'react';

function InputPhone({ value = '', onChange = () => {} }) {
  console.log(value);
  return <Input type="tel"  placeholder="Enter phone..." value={value} onChange={onChange} />;
}

export default InputPhone;
