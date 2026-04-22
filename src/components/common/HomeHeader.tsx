import { CgEnter } from "react-icons/cg";
import { RiAddCircleFill } from "react-icons/ri";
import {
  OPEN_CREATE_PROJECT_MODAL_KEY,
  OPEN_JOIN_PROJECT_MODAL_KEY,
} from "@/app.constants";
import { LogoLink } from "@/components/common/header/LogoLink";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/useModalHook";
import LogoutButton from "./LogoutButton";

const HomeHeader = () => {
  const { openModal } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);
  const { openModal: openJoinModal } = useOpenModal(
    OPEN_JOIN_PROJECT_MODAL_KEY,
  );

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LogoLink />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="flex justify-between items-center gap-2">
          <Button onClick={openModal}>
            New Project
            <RiAddCircleFill className="size-4" />
          </Button>

          <Button onClick={openJoinModal}>
            <CgEnter className="size-4" />
            Join Project
          </Button>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default HomeHeader;
