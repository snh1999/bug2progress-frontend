"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoutButton from "@/components/common/LogoutButton";

const pathnameMap = {
  home: "Home",
  settings: "Settings",
  tickets: "Ticket",
  contributors: "Contributors",
  features: "Feature",
  admin: "Admin Dashboard",
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
        <ProjectSidebar />
      </SheetContent>
    </Sheet>
  );
};

export const PageHeader = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const title = pathnameMap[pathnameKey] || pathnameMap.home;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex-col gap-2 flex">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </nav>
  );
};
