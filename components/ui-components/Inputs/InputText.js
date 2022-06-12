import { Input } from 'antd';
import React from 'react';

function InputText({ type = 'text', value = '', onChange = () => { }, placeholder, name = '' }) {
  return <Input placeholder={placeholder} type={type} value={value} onChange={onChange} name={name} />;
}

function InputWrapper({ ...props }) {
  return !props.readonly ? <InputText {...props} /> : props.children;
}

export default InputWrapper;
