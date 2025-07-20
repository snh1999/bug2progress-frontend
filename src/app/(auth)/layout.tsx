"use client";

import Header from "@/components/common/header/header";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getHeaderButtonLink } from "@/components/auth/auth.helpers";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();

  return (
    <main className="bg-neutral-100 dark:bg-neutral-800 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <Header>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {getHeaderButtonLink(pathName)}
          </div>
        </Header>
        <div className="flex flex-col items-center justify-center pt-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
