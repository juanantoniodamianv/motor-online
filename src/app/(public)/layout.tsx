import type { Metadata } from "next";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { PublicLayoutContent } from "@/src/app/components/public-layout/layout-content";
import useServerUser from "@/src/app/hooks/useServerUser";
import "@/src/app/globals.css";

export const metadata: Metadata = {
  title: "Motor Online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, user } = await useServerUser();

  // TODO: default profile image here
  const avatarUrl = user?.avatar_url;

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <PublicLayoutContent
            avatarUrl={avatarUrl}
            authenticated={isAuthenticated}
          >
            {children}
          </PublicLayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
