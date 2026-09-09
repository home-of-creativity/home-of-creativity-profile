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
  },
};

export default nextConfig;
