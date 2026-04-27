import FeaturesList from "@/components/features/FeaturesList";
import { ProjectSwitcher } from "@/components/project/ProjectSwitcher";
import { Separator } from "@/components/ui/separator";
import { LogoLink } from "../common/header/LogoLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";
import { ProjectMenu } from "./ProjectMenu";
import LogoutButton from "../common/LogoutButton";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";

export const ProjectSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar className="px-2">
        <SidebarHeader>
          <LogoLink />
        </SidebarHeader>
        <SidebarContent>
          <ProjectSwitcher />
          <ProjectMenu />
          <Separator className="my-3" />
          <FeaturesList />
        </SidebarContent>

        <SidebarFooter>
          <div className="flex justify-between">
            <LogoutButton compact />
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
