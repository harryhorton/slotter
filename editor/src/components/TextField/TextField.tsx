import { IField, IFieldProps } from "@slotter/types";
import { FC } from "react";

interface ITextFieldProps extends IFieldProps<string> {}

export const TextField: FC<ITextFieldProps> = ({
  onChange,
  fieldType,
  value,
  label,
  id,
  ...props
}) => {
  return (
    <label className="block mb-2">
      <span className="block mb-1 text-gray-800 text-sm font-semibold">{label}</span>
      <input
        className="block w-full border border-gray-300 rounded px-3"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </label>
  );
};
