/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pinehaus.net',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*.pinehaus.net', 'localhost:3000', 'localhost:8080'],
    },
  },
}

module.exports = nextConfig
