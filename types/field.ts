export interface FieldType {
  id: string;
}

export interface FieldInstance {
  id: string;
  label: string;
  defaultValue?: any;
  value?: any;
  fieldType: FieldType["id"];
  placeholder?: string;
}

export interface FieldProps<T> extends Partial<FieldInstance> {
  onChange: (value: T) => void;
  value: T;
}
