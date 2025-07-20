"use client";

import { ReactNode } from "react";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_PROJECT_MODAL_KEY, OPEN_JOIN_PROJECT_MODAL_KEY, } from "@/app.constants";
import { CreateProjectForm } from "@/components/project/CreateProjectForm/CreateProjectForm";
import JoinProject from "@/components/project/JoinProject";
import HomeHeader from "@/components/common/HomeHeader";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const HomePageLayout = ({ children }: IDashboardLayoutProps) => {
  const { closeModal, isOpen } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  const { closeModal: closeJoinModal, isOpen: isJoinModalOpen } = useOpenModal(
    OPEN_JOIN_PROJECT_MODAL_KEY
  );
  return (
    <div className="bg-neutral-100  dark:bg-neutral-800 min-h-screen">
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <CreateProjectForm onCancel={closeModal} />
      </ResponsiveModal>

      <ResponsiveModal open={isJoinModalOpen} onOpenChange={closeJoinModal}>
        <JoinProject />
      </ResponsiveModal>

      <div className="flex w-full h-full">
        <div className="mx-auto max-w-screen-2xl w-full h-full">
          <HomeHeader />
          <main className="h-full mx-10 mt-5 py-4 px-4 flex flex-col">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
