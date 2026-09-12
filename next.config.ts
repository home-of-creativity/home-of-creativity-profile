import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
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
