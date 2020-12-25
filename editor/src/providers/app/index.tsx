import { createContext, FC, useContext, useState } from "react";
import { SiteData, AdminConfig } from "@slotter/types";
import { devAppState } from "../../__fixtures__/dev-app-state";

export interface AppState {
  siteData: SiteData;
  adminConfig: AdminConfig;
}

export interface AppContext {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
const defaultSiteData: SiteData = {
  documents: [],
};

const defaultAppState: AppState = {
  siteData: defaultSiteData,
  adminConfig: {
    componentTypes: [],
    documentTypes: [],
    fieldTypes: [],
    appSidebar: { items: [{ label: "label" }] },
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
