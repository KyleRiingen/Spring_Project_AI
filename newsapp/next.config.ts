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
   // Move Turbopack configuration to experimental.turbo
   experimental: {
      turbo: {
         // Handle external dependencies
         resolveAlias: {
            // If you need any specific aliases
         },
         resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      },
   },
   // Your other existing config options can remain here
};

export default config;
