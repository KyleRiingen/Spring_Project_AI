import type { NextConfig } from "next";

const config: NextConfig = {
   eslint: {
      // This allows production builds to complete even with ESLint errors
      ignoreDuringBuilds: true,
   },
   typescript: {
      // This allows production builds to complete even with TypeScript errors
      ignoreBuildErrors: true,
   },
   webpack: (config) => {
      // Handle bcrypt as an external dependency to prevent build issues
      config.externals = [...(config.externals || []), "bcrypt"];
      return config;
   },
   // Your other existing config options can remain here
};

export default config;
