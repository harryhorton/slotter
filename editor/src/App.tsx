import React, { FC } from "react";
import { AppHeader } from "./components/AppHeader";
import { AppPage } from "./components/AppPage";
import { AppSidebar } from "./components/AppSidebar";
import { useAppContext } from "./providers/app";
import { Router } from "./router";

export const App: FC = () => {
  const { appState } = useAppContext();
  const sidebar = appState.adminConfig.appSidebar;

  return (
    <div className="text-gray-900 h-screen flex flex-col">
      <AppHeader />
      <main className="flex flex-1">
        <AppSidebar sidebar={sidebar} />
        <AppPage>
          <Router />
        </AppPage>
      </main>
      <footer className="bg-white border-t border-gray-100 mx-4 py-1 text-sm">
        app footer
      </footer>
    </div>
  );
};
