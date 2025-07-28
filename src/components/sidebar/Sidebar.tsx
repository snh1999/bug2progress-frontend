import { LogoLink } from "../common/header/LogoLink";
import { SidebarMenu } from "./SidebarMenu";
import { ProjectSwitcher } from "@/components/project/ProjectSwitcher";
import { Separator } from "@/components/ui/separator";
import FeaturesList from "@/components/features/FeaturesList";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-50 dark:bg-neutral-900 p-4 w-full">
      <LogoLink />
      <ProjectSwitcher/>
      <SidebarMenu />
      <Separator className="my-3" />
      <FeaturesList />
    </aside>
  );
};
