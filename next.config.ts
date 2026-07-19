import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR / dev assets when accessing the dev server over Tailscale, not just localhost.
  allowedDevOrigins: ["100.127.36.34"],
};

export default nextConfig;
