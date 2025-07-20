import { LogoLink } from "../common/header/LogoLink";
import { SidebarMenu } from "./SidebarMenu";
import { ProjectSwitcher } from "@/components/project/ProjectSwitcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-50 dark:bg-neutral-900 p-4 w-full">
      <LogoLink />
      <ProjectSwitcher/>
      <SidebarMenu />
    </aside>
  );
};
