"use client";

import { PageHeader } from "@/components/dashboard/sidebar/PageHeader/PageHeader";
import { Sidebar } from "@/components/dashboard/sidebar/Sidebar";
import { ReactNode } from "react";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="flex w-full h-full lg:pl-[300px]">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[300px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="mx-auto max-w-screen-2xl w-full h-full">
          <PageHeader />
          <main className="h-full py-4 px-4 flex flex-col">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
