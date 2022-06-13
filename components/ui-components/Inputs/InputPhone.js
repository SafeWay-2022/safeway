import { Input } from 'antd';
import React from 'react';

function InputPhone({ value = '', onChange = () => { }, name = '' }) {
  return <Input type="tel" placeholder="Enter phone..." value={value} onChange={onChange} name={name} />;
}

function InputWrapper(props) {
  return !props.readonly ? <InputPhone {...props} /> : props.children;
}

export default InputWrapper;
