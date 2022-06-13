import { Input } from 'antd';
import React from 'react';

function InputEmail({ value = '', onChange = () => { }, name = '' }) {
  return <Input type="email" placeholder="Enter email..." value={value} onChange={onChange} name={name} />;
}

function InputWrapper(props) {
  return !props.readonly ? <InputEmail {...props} /> : props.children;
}

export default InputWrapper;
