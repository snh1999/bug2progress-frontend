"use client";

import { PageHeader } from "@/components/dashboard/sidebar/PageHeader/PageHeader";
import { Sidebar } from "@/components/dashboard/sidebar/Sidebar";
import { ReactNode } from "react";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { CreateProjectForm } from "@/components/dashboard/project/CreateProjectForm";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_PROJECT_MODAL_KEY } from "@/app.constants";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  const { closeModal, isOpen } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  return (
    <div className="bg-neutral-100  dark:bg-neutral-800 min-h-screen">
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <CreateProjectForm onCancel={closeModal} />
      </ResponsiveModal>
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
