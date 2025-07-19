import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { CgEnter } from "react-icons/cg";
import React from "react";
import { useOpenModal } from "@/hooks/useModalHook";
import {
  OPEN_CREATE_PROJECT_MODAL_KEY,
  OPEN_JOIN_PROJECT_MODAL_KEY,
} from "@/app.constants";

const SidebarHomeHeader = () => {
  const { openModal } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  const { openModal: openJoinModal } = useOpenModal(
    OPEN_JOIN_PROJECT_MODAL_KEY
  );

  return (
    <div className="flex justify-between items-center gap-2">
      <Button onClick={openModal} size="sm" variant="primary">
        {" "}
        New Project
        <RiAddCircleFill className="size-5  cursor-pointer hover:opacity-75 transition" />
      </Button>

      <Button onClick={openJoinModal} size="sm" variant="primary">
        <CgEnter className="size-5  cursor-pointer hover:opacity-75 transition" />{" "}
        Join Project
      </Button>
    </div>
  );
};

export default SidebarHomeHeader;
