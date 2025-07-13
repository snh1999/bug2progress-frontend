import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LogoLink } from "@/components/common/header/LogoLink";

interface IHeaderProps {
  children: ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <nav className="flex justify-between items-center">
      <LogoLink/>
      <Button asChild variant="secondary">
        {children}
      </Button>
    </nav>
  );
};

export default Header;
