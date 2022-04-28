import { Input } from 'antd';
import React from 'react';

function InputEmail({ value = '', onChange = () => {} }) {
  return <Input type="email" placeholder="Enter email..." value={value} onChange={onChange} />;
}

function InputWrapper(props) {
  return !props.readonly ? <InputEmail {...props} /> : props.children;
}

export default InputWrapper;
