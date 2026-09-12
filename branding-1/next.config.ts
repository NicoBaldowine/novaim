import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "1" ? {
    output: "export" as const,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/branding-1",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};
export default nextConfig;
