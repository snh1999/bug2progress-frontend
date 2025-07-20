import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/common/themes/ThemeProvider";

export const metadata: Metadata = {
  title: "Bug2Progress",
  description: "Track bugs until the progress arrives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
