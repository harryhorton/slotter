import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AppProvider } from "./providers/app";

export default {
  title: "App/App",
  component: App,
};

export const Primary: FC = () => (
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
