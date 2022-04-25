import { Input } from 'antd';
import React from 'react';

function InputText({ type = 'text', value = '' }) {
  return <Input type={type} defaultValue={value} />;
}

export default InputText;
