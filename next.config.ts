import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/**"
      }
    ],
    qualities: [25, 50, 75, 100],
  }
};

export default nextConfig;
