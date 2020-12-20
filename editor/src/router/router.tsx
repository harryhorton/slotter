import { FC } from "reactcss/node_modules/@types/react";
import { Switch, Route } from "react-router-dom";
import { DocumentPage } from "../components/DocumentPage";
import { DocumentList } from "../components/DocumentList";

export const Router: FC = () => {
  return (
    <Switch>
      <Route path="/documentList/:documentType">
        <DocumentList />
      </Route>
      <Route path="/document/:documentId">
        <DocumentPage />
      </Route>
      <Route path="/"></Route>
    </Switch>
  );
};
