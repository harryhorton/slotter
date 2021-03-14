import { FC } from "react";

interface IAppHeaderProps {}

export const AppHeader: FC<IAppHeaderProps> = () => {
  return (
    <header className="bg-white py-1 mx-4 flex justify-between border-b border-gray-100">
      <div>Logo</div>
      <div>Search</div>
      <div>
        <nav>nav</nav>
      </div>
    </header>
  );
};
