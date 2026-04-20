import type { ReactNode } from "react";
import { LogoLink } from "@/components/common/header/LogoLink";
import { Button } from "@/components/ui/button";

interface IHeaderProps {
  children: ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <nav className="flex justify-between items-center">
      <LogoLink />
      <Button asChild variant="secondary">
        {children}
      </Button>
    </nav>
  );
};

export default Header;
