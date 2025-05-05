import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
      // This allows production builds to complete even with ESLint errors
      ignoreDuringBuilds: true,
   },
   typescript: {
      // This allows production builds to complete even with TypeScript errors
      ignoreBuildErrors: true,
   },
   // Your other existing config options can remain here
};

export default nextConfig;
