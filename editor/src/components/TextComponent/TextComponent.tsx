import { ComponentInstance } from "@slotter/types";
import { FC } from "react";

interface TextComponentProps {
  component: ComponentInstance;
}

export const TextComponent: FC<TextComponentProps> = ({
  component,
  children,
}) => {
  return (
    <span>
      {component.config?.value} {children}
    </span>
  );
};
