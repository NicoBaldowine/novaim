import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  ...(process.env.STATIC_EXPORT === "1" ? {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/landing-1",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
