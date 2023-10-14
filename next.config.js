/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
