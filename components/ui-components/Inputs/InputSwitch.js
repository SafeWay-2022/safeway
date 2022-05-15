import React from 'react';
import { Switch } from 'antd';

function InputSwitch({ value = false, onChange = () => {}, readonly }) {
  return (
    <Switch
      style={{ backgroundColor: '#1890ff' }}
      value={value}
      onChange={onChange}
      disabled={readonly}
      checkedChildren="true"
      unCheckedChildren="false"
    />
  );
}

export default InputSwitch;
