import { Input } from "antd";
import React from "react";

function InputEmail({ value = "" }) {
  return <Input type="email" defaultValue={value} />;
}

export default InputEmail;
