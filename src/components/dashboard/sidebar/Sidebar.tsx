import { LogoLink } from "../../common/header/LogoLink";
import { SidebarMenu } from "./SidebarMenu";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-50 p-4 w-full">
      <LogoLink />
      <SidebarMenu />
    </aside>
  );
};
