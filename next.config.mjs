/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        canvas: "canvas",
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      new URL("https://rbdstore.s3.ap-southeast-1.amazonaws.com/schools/**"),
      {
        protocol: "https",
        hostname: "pico-bucket.kkr.picopublic.cloud",
        pathname: "/swift/v1/**",
      },
      {
        protocol: "https",
        hostname: "server.mastersab.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
