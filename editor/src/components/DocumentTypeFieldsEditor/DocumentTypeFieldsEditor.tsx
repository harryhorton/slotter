import { FieldInstance } from "@slotter/types";
import React, { FC } from "react";
import { FieldInstanceEditor } from "../FieldInstanceEditor";

interface DocumentTypeFieldsEditorProps {
  fields?: FieldInstance[];
}

export const DocumentTypeFieldsEditor: FC<DocumentTypeFieldsEditorProps> = ({
  fields = [],
}) => {
  console.log(fields)
  return (
    <div>
      <h2 className="font-semibold">Fields</h2>
      <button className="text-sm">Add Field</button>
      <ul className="ml-2">
        {fields.map((field) => (
          <li>
            <FieldInstanceEditor field={field} />
          </li>
        ))}
      </ul>
    </div>
  );
};
