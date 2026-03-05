/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid Windows file-lock/cache-rename issues in .next/cache/webpack.
      config.cache = { type: "memory" }
    }
    return config
  },
}
export default nextConfig
