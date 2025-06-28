"use client";

import Header from "@/components/common/header/header";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getHeaderButtonLink } from "@/components/auth/auth.helpers";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <Header>{getHeaderButtonLink(pathName)}</Header>
        <div className="flex flex-col items-center justify-center pt-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
