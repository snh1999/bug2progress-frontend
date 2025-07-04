import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ReactNode } from "react";

interface IHeaderProps {
  children: ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <nav className="flex justify-between items-center">
      <Image src="/logo.png" width={200} height={200} alt="logo" />
      <Button asChild variant="secondary">
        {children}
      </Button>
    </nav>
  );
};

export default Header;
