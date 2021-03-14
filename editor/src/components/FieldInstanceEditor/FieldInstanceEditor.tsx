import { FieldInstance } from "@slotter/types";
import { FC } from "react";

interface FieldInstanceEditorProps {
  field: FieldInstance;
}

export const FieldInstanceEditor: FC<FieldInstanceEditorProps> = ({
  field,
}) => {
  return <div>Field Type: {field.fieldType}</div>;
};
