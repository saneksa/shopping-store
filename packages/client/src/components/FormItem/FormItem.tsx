import React from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";

export const FormItem: React.FC<FormItemProps> = ({ children, ...rest }) => {
  return <Form.Item {...rest}>{children}</Form.Item>;
};
