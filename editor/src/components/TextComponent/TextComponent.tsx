import { ComponentInstance, ComponentType } from "@slotter/types";
import { FC } from "react";

interface TextComponentProps {
  component: ComponentInstance;
}

export const TextComponentType: ComponentType = {
  id: "text",
  label: "Text",
  fields: [
    {
      id: "className",
      fieldType: "text",
      label: "Class Names",
      defaultValue: "",
      placeholder: "Enter CSS classnames",
    },
    {
      id: "value",
      fieldType: "text",
      label: "Value",
      defaultValue: "",
      placeholder: "Enter some text",
    },
  ],
};

export const TextComponent: FC<TextComponentProps> = ({
  component,
  children,
}) => {
  return (
    <span className={component.config?.className || ""}>
      {component.config?.value} {children}
    </span>
  );
};
