import React from 'react';
import { Checkbox } from 'antd';

function InputCheckbox({ value = false, onChange = () => {}, readonly }) {
  const handleOnChange = (e) => {
    onChange(e.target.checked);
  };

  return <Checkbox checked={value} onChange={handleOnChange} disabled={readonly}></Checkbox>;
}

export default InputCheckbox;
