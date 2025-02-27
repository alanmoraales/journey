// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
    loader: "custom",
    loaderFile: "./src/services/imageKitLoader.ts",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
};

export default withPlaiceholder(nextConfig);
