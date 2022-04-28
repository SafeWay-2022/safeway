import { Input } from 'antd';
import React from 'react';

function InputPhone({ value = '', onChange = () => {} }) {
  return <Input type="tel" placeholder="Enter phone..." value={value} onChange={onChange} />;
}

function InputWrapper(props) {
  return !props.readonly ? <InputPhone {...props} /> : props.children;
}

export default InputWrapper;
