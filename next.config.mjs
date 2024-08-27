/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rshwzlgddvrlluhsagdb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
