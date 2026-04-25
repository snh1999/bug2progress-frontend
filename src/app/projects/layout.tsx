"use client";

import type { ReactNode } from "react";
import {
  OPEN_CREATE_FEATURE_MODAL_KEY,
  OPEN_CREATE_PROJECT_MODAL_KEY,
  OPEN_JOIN_PROJECT_MODAL_KEY,
} from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { CreateFeatureForm } from "@/components/features/CreateFeatureForm/CreateFeatureForm";
import { CreateProjectForm } from "@/components/project/CreateProjectForm/CreateProjectForm";
import JoinProject from "@/components/project/JoinProject";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { useOpenModal } from "@/hooks/useModalHook";
import { SocketProvider } from "@/realtime/provider/websocket-provider";
import ProjectHeader from "@/components/sidebar/header/ProjectHeader";

interface IDashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  const { closeModal, isOpen } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  const { closeModal: closeJoinModal, isOpen: isJoinModalOpen } = useOpenModal(
    OPEN_JOIN_PROJECT_MODAL_KEY,
  );

  const { closeModal: closeFeatureModal, isOpen: isFeatureModalOpen } =
    useOpenModal(OPEN_CREATE_FEATURE_MODAL_KEY);
  return (
    <div className="bg-neutral-100  dark:bg-neutral-800 min-h-screen">
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <CreateProjectForm onCancel={closeModal} />
      </ResponsiveModal>

      <ResponsiveModal open={isJoinModalOpen} onOpenChange={closeJoinModal}>
        <JoinProject />
      </ResponsiveModal>

      <ResponsiveModal
        open={isFeatureModalOpen}
        onOpenChange={closeFeatureModal}
      >
        <CreateFeatureForm onCancel={closeFeatureModal} />
      </ResponsiveModal>

      <SocketProvider>
        <div className="flex w-full h-full lg:pl-[300px] pt-2">
          <div className="fixed left-0 top-0 hidden lg:block lg:w-[300px] h-full overflow-y-auto">
            <ProjectSidebar />
          </div>
          <div className="mx-auto px-4 max-w-(--breakpoint-2xl) w-full h-full">
            <ProjectHeader />
            <main className="h-full py-4 px-8 mx-auto flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </SocketProvider>
    </div>
  );
}
