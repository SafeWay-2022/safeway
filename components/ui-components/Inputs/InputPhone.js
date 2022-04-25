import { Input } from 'antd';
import React from 'react';

function InputPhone({ value = '', onChange = () => {} }) {
  return <Input type="tel" defaultValue={value} onChange={onChange} />;
}

export default InputPhone;
