"use client";

import { SettingsIcon, UsersIcon, Ticket, TicketCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { PROJECTS_PATH } from "@/app.constants";
import {
  EContributorAction,
  useCheckPermission,
} from "@/components/contributors/contributor.helper";
import { useProjectId } from "@/hooks/useProjectId";
import { SidebarMenu, SidebarMenuButton } from "../ui/sidebar";

export const sidebarMenuItems = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
    permission: true,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
    activeIcon: TicketCheck,
    permission: true,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
    permission: false,
  },
  {
    label: "Contributors",
    href: "/contributors",
    icon: UsersIcon,
    activeIcon: UsersIcon,
    permission: true,
  },
];

export const ProjectMenu = () => {
  const projectId = useProjectId();
  const pathname = usePathname();
  const router = useRouter();
  const isPermitted = useCheckPermission(
    EContributorAction.VIEW_SETTINGS,
    projectId,
  );

  return (
    <SidebarMenu className="flex flex-col pt-5">
      {sidebarMenuItems.map((menuItem) => {
        const fullHref = `${PROJECTS_PATH}/${projectId}${menuItem.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? menuItem.activeIcon : menuItem.icon;

        if (!menuItem.permission && !isPermitted) return null;
        return (
          <SidebarMenuButton
            key={menuItem.label}
            isActive={isActive}
            onClick={() => router.push(fullHref)}
            className="px-5 pb-2 space-y-1 text-sm"
          >
            <Icon />
            {menuItem.label}
          </SidebarMenuButton>
        );
      })}
    </SidebarMenu>
  );
};
