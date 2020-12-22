import React, { FC } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { useAppContext } from "./providers/app";
import { Router } from "./router";

export const App: FC = () => {
  const { appState } = useAppContext();
  const sidebar = appState.adminConfig.appSidebar;

  return (
    <div className="text-gray-900 h-screen flex flex-col">
      <header className="bg-gray-200 py-2 px-4">app header</header>
      <main className="flex flex-1">
        <AppSidebar sidebar={sidebar} />
        <article className="py-2 px-4">
          <Router />
        </article>
      </main>
      <footer className="bg-gray-100  py-1 px-4">app footer</footer>
    </div>
  );
};
