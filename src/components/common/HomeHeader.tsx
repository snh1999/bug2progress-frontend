import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { CgEnter } from "react-icons/cg";
import React from "react";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_PROJECT_MODAL_KEY, OPEN_JOIN_PROJECT_MODAL_KEY, } from "@/app.constants";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LogoLink } from "@/components/common/header/LogoLink";
import { useLogOut } from "@/api/auth/auth";

const HomeHeader = () => {
  const {openModal} = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  const {openModal: openJoinModal} = useOpenModal(
    OPEN_JOIN_PROJECT_MODAL_KEY
  );

  const {mutate: logOut, isPending} = useLogOut();

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LogoLink/>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle/>
        <div className="flex justify-between items-center gap-2">
          <Button onClick={openModal} size="sm" variant="primary">
            {" "}
            New Project
            <RiAddCircleFill className="size-5  cursor-pointer hover:opacity-75 transition"/>
          </Button>

          <Button onClick={openJoinModal} size="sm" variant="primary">
            <CgEnter className="size-5  cursor-pointer hover:opacity-75 transition"/>{" "}
            Join Project
          </Button>
        </div>
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

export default HomeHeader;
