import type { Metadata } from "next";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { PublicLayoutContent } from "@/src/app/components/public-layout/layout-content";

import "@/src/app/globals.css";
import { AuthProvider } from "@/src/context/auth-context";

export const metadata: Metadata = {
  title: "Motor Online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarProvider>
            <PublicLayoutContent>{children}</PublicLayoutContent>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
