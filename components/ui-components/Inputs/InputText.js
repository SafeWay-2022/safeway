import { Input } from 'antd';
import React from 'react';

function InputText({ type = 'text', value = '', onChange = () => {} }) {
  return <Input type={type} defaultValue={value} onChange={onChange} />;
}

export default InputText;
