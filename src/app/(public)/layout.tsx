import type { Metadata } from "next";
import "../globals.css";
import { MainNavbar } from "../components/main-navbar";

export const metadata: Metadata = {
  title: "Motor Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
