import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Framer & Spline: allow external domains for embeds and scripts */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framer.app", pathname: "/**" },
      { protocol: "https", hostname: "spline.design", pathname: "/**" },
    ],
  },
};

export default nextConfig;
