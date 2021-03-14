import { AppSidebarInstance } from "@slotter/types";
import { FC } from "react";
import { AppSidebar } from "./AppSidebar";

export default {
  title: "Components/AppSidebar",
  component: AppSidebar,
};

const sampleSidebar: AppSidebarInstance = {
  items: [
    {
      label: "only label",
    },
    {
      label: "link string",
      link: { to: "#" },
    },
    {
      label: "group",
      children: [
        {
          label: "child ",
          link: { to: "#" },
        },
        {
          label: "child ",
          link: { to: "#" },
        },
        {
          label: "child ",
          link: { to: "#" },
        },
      ],
    },
  ],
};

export const Primary: FC = () => (
  <div className="p-3">
    <AppSidebar sidebar={sampleSidebar} />
  </div>
);
