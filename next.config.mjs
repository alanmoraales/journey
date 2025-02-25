/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
    loader: "custom",
    loaderFile: "./src/lib/imageKitLoader.ts",
  },
};

export default nextConfig;
