import { Input } from 'antd';
import React from 'react';

function InputEmail({ value = '', onChange = () => {} }) {
  return <Input type="email" defaultValue={value} onChange={onChange} />;
}

export default InputEmail;
