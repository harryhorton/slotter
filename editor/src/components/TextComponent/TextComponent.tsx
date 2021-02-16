import { ComponentInstance, ComponentType } from "@slotter/types";
import { FC, forwardRef } from "react";

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
      defaultValue: "text",
      placeholder: "Enter some text",
    },
  ],
};

export const TextComponent = forwardRef<HTMLSpanElement, TextComponentProps>(
  ({ component, children }, ref) => {
    return (
      <span ref={ref} className={component.config?.className || ""}>
        {component.config?.value} {children}
      </span>
    );
  }
);
