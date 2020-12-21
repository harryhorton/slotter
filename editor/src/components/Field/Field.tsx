import { FC } from "react";
import { IFieldProps } from "@slotter/types";
import { TextField } from "../TextField";

interface IFieldComponentProps extends IFieldProps<any> {}

export const Field: FC<IFieldComponentProps> = ({ fieldType, ...props }) => {
  switch (fieldType) {
    case "text":
      return <TextField {...props} />;
    default:
      return <span className="block text-red-500">Field type "{fieldType}" is not registered field.</span>;
  }
};
