import dynamic from "next/dynamic";

export const PublicSidebar = dynamic(
  () => import("@/src/app/components/public-layout/sidebar"),
  {
    ssr: false,
  }
);
