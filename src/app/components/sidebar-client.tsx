import dynamic from "next/dynamic";

export const DashboardSidebar = dynamic(
  () => import("@/src/app/components/sidebar"),
  {
    ssr: false,
  }
);
