import { FC } from "react";
import { AppProvider } from "../../providers/app";
import { LayoutEditor } from "./LayoutEditor";
import { sampleLayout } from "./__fixtures__";

export default {
  title: "Components/LayoutEditor",
  component: LayoutEditor,
};

export const Primary: FC = () => (
  <div className="p-3">
    <AppProvider>
      <LayoutEditor layout={sampleLayout}>Content</LayoutEditor>
    </AppProvider>
  </div>
);
