import { createContext, FC, useContext, useState } from "react";
import { ISiteData, IAdminLayout } from "@slotter/types";
import { devAppState } from "../../__fixtures__/dev-app-state";

export interface AppState {
  siteData: ISiteData;
  adminLayout: IAdminLayout;
}

export interface AppContext {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
const defaultSiteData: ISiteData = {
  fieldTypes: [],
  documents: [],
  documentTypes: [],
};

const defaultAppState: AppState = {
  siteData: defaultSiteData,
  adminLayout: {
    sidebar: { items: [{ label: "label" }] },
  },
};

const defaultAppContext: AppContext = {
  appState: defaultAppState,
  setAppState: () => {},
};

export const appContext = createContext<AppContext>(defaultAppContext);

export const AppProvider: FC = (props) => {
  const [appState, setAppState] = useState<AppState>(devAppState);

  return (
    <appContext.Provider
      value={{ appState, setAppState }}
      {...props}
    ></appContext.Provider>
  );
};

export const useAppContext = () => useContext(appContext);
