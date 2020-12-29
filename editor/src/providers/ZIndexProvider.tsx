import { createContext, FC, useContext } from "react";

export const zIndexContext = createContext(1);

export const ZIndexProvider: FC<{ value?: number }> = ({ value, children }) => {
  const prevZIndex = useContext(zIndexContext);
  const zIndex = value ?? prevZIndex + 1;

  return <zIndexContext.Provider value={zIndex}>{children}</zIndexContext.Provider>;
};
