import { FC } from "reactcss/node_modules/@types/react";
import { Switch, Route } from "react-router-dom";
import { DocumentPage } from "../components/DocumentPage";
import { DocumentList } from "../components/DocumentList";
import { routes } from "./routes";

export const Router: FC = () => {
  return (
    <Switch>
      <Route path={routes.documentList}>
        <DocumentList />
      </Route>
      <Route path={routes.document}>
        <DocumentPage />
      </Route>
      <Route path="/"></Route>
    </Switch>
  );
};
