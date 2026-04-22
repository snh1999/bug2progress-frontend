"use client";

import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { PROJECTS_PATH } from "@/app.constants";
import {
  EContributorAction,
  useCheckPermission,
} from "@/components/contributors/contributor.helper";
import { useProjectId } from "@/hooks/useProjectId";
import { cn } from "@/lib/utils";

const menuItems = [
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
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
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

export const SidebarMenu = () => {
  const projectId = useProjectId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col pt-2">
      {menuItems.map((menuItem) => {
        const fullHref = `${PROJECTS_PATH}/${projectId}${menuItem.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? menuItem.activeIcon : menuItem.icon;
        if (
          !menuItem.permission &&
          !useCheckPermission(EContributorAction.VIEW_SETTINGS, projectId)
        )
          return null;
        return (
          <Link key={menuItem.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-md font-medium hover:font-semibold transition text-neutral-600 dark:text-neutral-400",
                isActive &&
                  "bg-neutral-200 dark:bg-neutral-700 font-bold shadow-xs hover:opacity-100 text-primary",
              )}
            >
              <Icon className="size-5 text-neutral-600 dark:text-neutral-400" />
              {menuItem.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
