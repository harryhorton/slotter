import { FC } from "react";

interface IAppPageProps {}

/**
 * Wrapper for app page content
 */
export const AppPage: FC<IAppPageProps> = (props) => {
  return <article className="py-2 px-4" {...props} />;
};
