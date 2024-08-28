import dynamic from "next/dynamic";

export const DashboardSidebar = dynamic(
  () => import("@/src/app/components/private-layout/sidebar"),
  {
    ssr: false,
  }
);
