"use client";

import { getHeaderButtonLink } from "@/components/auth/auth.helpers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.png" width={200} height={200} alt="logo" />
          <Button asChild variant="secondary">
            {getHeaderButtonLink(pathName)}
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
