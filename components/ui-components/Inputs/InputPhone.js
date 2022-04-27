import { Input } from 'antd';
import React from 'react';

function InputPhone({ value = '', onChange = () => {} }) {
  console.log(value);
  return <Input type="tel"  placeholder="Phone..." value={value} onChange={onChange} />;
}

export default InputPhone;
