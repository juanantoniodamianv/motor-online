import type { Metadata } from "next";
import "../globals.css";
import { createClient } from "../utils/supabase/server";
import { SidebarProvider } from "@/src/context/sidebar-context";
import { PublicLayoutContent } from "../components/public-layout/layout-content";

export const metadata: Metadata = {
  title: "Motor Online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  // TODO: handle error
  const avatarUrl = data?.user?.user_metadata.avatar_url;

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <PublicLayoutContent avatarUrl={avatarUrl}>
            {children}
          </PublicLayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
