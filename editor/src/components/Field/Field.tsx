import { FC, useEffect } from "react";
import { FieldProps } from "@slotter/types";
import { TextField } from "../../Fields/TextField";

interface IFieldComponentProps extends FieldProps<any> {}

export const Field: FC<IFieldComponentProps> = ({
  fieldType,
  onChange,
  value,
  defaultValue,
  ...props
}) => {
  useEffect(() => {
    if (typeof defaultValue !== "undefined" && typeof value === "undefined") {
      onChange(defaultValue);
    }
  }, [value, onChange, defaultValue]);

  switch (fieldType) {
    case "text":
      return <TextField onChange={onChange} value={value} {...props} />;
    default:
      return (
        <span className="block text-red-500">
          Field type "{fieldType}" is not registered field.
        </span>
      );
  }
};
