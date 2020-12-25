import { FieldData, FieldInstance } from "@slotter/types";
import { FC } from "react";
import { Field } from "../Field";

export interface FieldEditorProps {
  fields: FieldInstance[];
  data: FieldData;
  onChange?: (data: FieldData) => void;
}

export const FieldEditor: FC<FieldEditorProps> = ({
  fields,
  data,
  onChange = () => {},
}) => {
  const handleFieldChange = (fieldId: string, value: any) => {
    onChange({ ...data, [fieldId]: value });
  };

  return (
    <div>
      {fields.map((field) => (
        <Field
          key={field.id}
          {...field}
          value={data[field.id]}
          onChange={(value: any) => {
            handleFieldChange(field.id, value);
          }}
        />
      ))}
    </div>
  );
};
