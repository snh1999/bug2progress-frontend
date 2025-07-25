"use client";

import { useLogOut } from "@/api/auth/auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";
import EditFeatureButton from "@/components/features/EditFeatureButton";

const pathnameMap = {
  home: {
    title: "Home",
    description: "Monitor all of your projects and tasks here",
    component: <></>
  },
  settings: {
    title: "Settings",
    description: "View all of your settings here",
    component: <></>
  },
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks here",
    component: <></>
  },
  contributors: {
    title: "Contributors",
    description: "View all the contributing members of your projects here",
    component: <></>
  },
  features: {
    title: "Features",
    description: "View all of your features for the project here",
    component: <EditFeatureButton/>
  },
};

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetTitle></SheetTitle>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export const PageHeader = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description, component } =
    pathnameMap[pathnameKey] || pathnameMap.home;
  const { mutate: logOut, isPending } = useLogOut();

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex-col flex">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {component}
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => logOut()}
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
};
