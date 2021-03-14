import { FieldProps } from "@slotter/types";
import { FC } from "react";

interface ICheckboxFieldProps extends FieldProps<boolean> {}

export const CheckboxField: FC<ICheckboxFieldProps> = ({
  onChange = () => {},
  fieldType,
  value,
  label,
  id,
  ...props
}) => {
  return (
    <label className=" mb-2 flex justify-items-start">
      <input
        type="checkbox"
        className="block h-4 w-4 text-gray-600 mr-2"
        onChange={(e) => onChange(e.target.checked)}
        checked={value}
        {...props}
      />
      <span className="block text-gray-800 text-sm font-semibold">{label}</span>
    </label>
  );
};
