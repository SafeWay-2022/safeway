import { Input } from 'antd';
import React from 'react';

function InputText({ type = 'text', value = '', onChange = () => {}, placeholder }) {
  return <Input placeholder={placeholder} type={type} defaultValue={value} onChange={onChange} />;
}

export default InputText;
