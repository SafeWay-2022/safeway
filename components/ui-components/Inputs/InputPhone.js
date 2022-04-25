import { Input } from "antd";
import React from "react";

function InputPhone({ value = "" }) {
  return <Input type="tel" defaultValue={value} />;
}

export default InputPhone;
