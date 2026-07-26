import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g0mxohaq0g.ufs.sh",
      },
    ],
  },
};
export default nextConfig;