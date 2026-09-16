import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim() ||
      "",
  },
  output: "export",
  allowedDevOrigins: ["*.trycloudflare.com"],
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  serverExternalPackages: ["gsap", "@gsap/react"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
    ],
  },
};

export default nextConfig;
