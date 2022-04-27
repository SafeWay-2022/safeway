import { Input } from 'antd';
import React, {useState} from 'react';

function InputEmail({ value = '', onChange = () => {} }) {
  return <Input type="email" placeholder="Enter email..." value={value} onChange={onChange} />;
}

export default InputEmail;
